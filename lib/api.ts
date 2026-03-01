import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
    writeBatch,
} from "firebase/firestore";

import {
    generateCardsForCategory,
    getTotalCardsForCategory,
    type GeneratedCard,
} from "@/data/cards/generator";
import { db } from "@/lib/firebase";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type UserLevel = "Fácil" | "Médio" | "Difícil";

/** A single completed lesson stored under users/{uid}/lessons/{id} */
export type LessonRecord = {
  id: string;
  track?: string;
  category: string;
  difficulty?: UserLevel;
  correctCount: number;
  totalCount: number;
  durationMs: number;
  createdAt: unknown;
};

/** A lesson started but not yet completed under users/{uid}/inProgressLessons/{id} */
export type InProgressLessonRecord = {
  id: string;
  track: string;
  category: string;
  difficulty: UserLevel;
  answeredCount: number;
  correctCount: number;
  totalCount: number;
  elapsedMs: number;
  updatedAt?: unknown;
};

/** Aggregated stats per category */
export type CategoryProgress = {
  track: string;
  category: string;
  totalLessons: number;
  studyPercent: number;
  accuracyPercent: number;
  avgTimePerQuestionMs: number;
  inProgressAnswered: number;
  hasInProgressLesson: boolean;
};

/** Overall progress summary */
export type ProgressSummary = {
  level: UserLevel;
  accuracyPercent: number;
  avgTimeMs: number;
  totalLessons: number;
  categories: CategoryProgress[];
};

/** Stats for a specific category for a specific user */
export type CategoryStats = {
  cardsStudied: number;
  totalAnswered: number;
  inProgressAnswered: number;
  hasInProgressLesson: boolean;
  inProgressDifficulty?: UserLevel;
  accuracyPercent: number;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeLevel(accuracyPercent: number): UserLevel {
  if (accuracyPercent >= 80) return "Difícil";
  if (accuracyPercent >= 50) return "Médio";
  return "Fácil";
}

function computeLevelFromLessons(
  lessons: LessonRecord[],
  fallbackAccuracyPercent: number,
): UserLevel {
  const byDifficulty: Record<UserLevel, { correct: number; total: number }> = {
    Fácil: { correct: 0, total: 0 },
    Médio: { correct: 0, total: 0 },
    Difícil: { correct: 0, total: 0 },
  };

  for (const lesson of lessons) {
    if (!lesson.difficulty) continue;
    byDifficulty[lesson.difficulty].correct += lesson.correctCount;
    byDifficulty[lesson.difficulty].total += lesson.totalCount;
  }

  const difficultAccuracy =
    byDifficulty.Difícil.total > 0
      ? Math.round(
          (byDifficulty.Difícil.correct / byDifficulty.Difícil.total) * 100,
        )
      : 0;
  const mediumAccuracy =
    byDifficulty.Médio.total > 0
      ? Math.round(
          (byDifficulty.Médio.correct / byDifficulty.Médio.total) * 100,
        )
      : 0;
  const easyAccuracy =
    byDifficulty.Fácil.total > 0
      ? Math.round(
          (byDifficulty.Fácil.correct / byDifficulty.Fácil.total) * 100,
        )
      : 0;

  if (difficultAccuracy >= 80) return "Difícil";
  if (mediumAccuracy >= 80) return "Médio";
  if (easyAccuracy >= 80) return "Fácil";

  return computeLevel(fallbackAccuracyPercent);
}

function getInProgressLessonId(
  track: string,
  category: string,
  difficulty: UserLevel,
): string {
  return `${track}__${category}__${difficulty}`;
}

function formatDuration(ms: number): string {
  const totalSeconds = Math.round(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export { formatDuration };

// ---------------------------------------------------------------------------
// Fetch user progress
// ---------------------------------------------------------------------------

export async function fetchUserProgress(uid: string): Promise<ProgressSummary> {
  const lessonsRef = collection(db, "users", uid, "lessons");
  const inProgressRef = collection(db, "users", uid, "inProgressLessons");

  const lessonsQuery = query(lessonsRef, orderBy("createdAt", "desc"));
  const [lessonsSnapshot, inProgressSnapshot] = await Promise.all([
    getDocs(lessonsQuery),
    getDocs(inProgressRef),
  ]);

  const lessons: LessonRecord[] = lessonsSnapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<LessonRecord, "id">),
  }));

  const inProgressLessons: InProgressLessonRecord[] =
    inProgressSnapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as Omit<InProgressLessonRecord, "id">),
    }));

  if (lessons.length === 0 && inProgressLessons.length === 0) {
    return {
      level: "Fácil",
      accuracyPercent: 0,
      avgTimeMs: 0,
      totalLessons: 0,
      categories: [],
    };
  }

  const grouped = new Map<
    string,
    {
      track: string;
      category: string;
      correct: number;
      total: number;
      totalDurationMs: number;
      totalQuestionsAnswered: number;
      totalLessons: number;
      inProgressAnswered: number;
      hasInProgressLesson: boolean;
    }
  >();

  let totalCorrect = 0;
  let totalQuestions = 0;
  let totalDuration = 0;

  for (const lesson of lessons) {
    totalCorrect += lesson.correctCount;
    totalQuestions += lesson.totalCount;
    totalDuration += lesson.durationMs;

    const track = lesson.track ?? "";
    const key = `${track}__${lesson.category}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.correct += lesson.correctCount;
      existing.total += lesson.totalCount;
      existing.totalDurationMs += lesson.durationMs;
      existing.totalQuestionsAnswered += lesson.totalCount;
      existing.totalLessons += 1;
    } else {
      grouped.set(key, {
        track,
        category: lesson.category,
        correct: lesson.correctCount,
        total: lesson.totalCount,
        totalDurationMs: lesson.durationMs,
        totalQuestionsAnswered: lesson.totalCount,
        totalLessons: 1,
        inProgressAnswered: 0,
        hasInProgressLesson: false,
      });
    }
  }

  for (const inProgress of inProgressLessons) {
    const key = `${inProgress.track}__${inProgress.category}`;
    const existing = grouped.get(key);
    if (existing) {
      existing.correct += inProgress.correctCount;
      existing.total += inProgress.answeredCount;
      existing.totalDurationMs += inProgress.elapsedMs;
      existing.totalQuestionsAnswered += inProgress.answeredCount;
      existing.inProgressAnswered += inProgress.answeredCount;
      existing.hasInProgressLesson = true;
    } else {
      grouped.set(key, {
        track: inProgress.track,
        category: inProgress.category,
        correct: inProgress.correctCount,
        total: inProgress.answeredCount,
        totalDurationMs: inProgress.elapsedMs,
        totalQuestionsAnswered: inProgress.answeredCount,
        totalLessons: 0,
        inProgressAnswered: inProgress.answeredCount,
        hasInProgressLesson: true,
      });
    }
  }

  const accuracyPercent =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const avgTimeMs =
    lessons.length > 0 ? Math.round(totalDuration / lessons.length) : 0;

  const categories: CategoryProgress[] = Array.from(grouped.values())
    .map((data) => {
      const totalCardsInCategory =
        data.track && data.category
          ? getTotalCardsForCategory(data.track, data.category)
          : 0;

      const studyPercent =
        totalCardsInCategory > 0
          ? Math.min(
              100,
              Math.round(
                (data.totalQuestionsAnswered / totalCardsInCategory) * 100,
              ),
            )
          : 0;

      return {
        track: data.track,
        category: data.category,
        totalLessons: data.totalLessons,
        studyPercent,
        accuracyPercent:
          data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
        avgTimePerQuestionMs:
          data.totalQuestionsAnswered > 0
            ? Math.round(data.totalDurationMs / data.totalQuestionsAnswered)
            : 0,
        inProgressAnswered: data.inProgressAnswered,
        hasInProgressLesson: data.hasInProgressLesson,
      };
    })
    .sort((a, b) => {
      const trackCompare = a.track.localeCompare(b.track, "pt-BR");
      if (trackCompare !== 0) return trackCompare;
      return a.category.localeCompare(b.category, "pt-BR");
    });

  return {
    level: computeLevelFromLessons(lessons, accuracyPercent),
    accuracyPercent,
    avgTimeMs,
    totalLessons: lessons.length,
    categories,
  };
}

// ---------------------------------------------------------------------------
// Themes
// ---------------------------------------------------------------------------

export type ThemeItem = {
  id: string;
  name: string;
  description: string;
};

export async function fetchThemes(): Promise<ThemeItem[]> {
  const themesRef = collection(db, "themes");
  const q = query(themesRef, orderBy("name", "asc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => ({
    id: d.id,
    name: (d.data().name as string) ?? "",
    description: (d.data().description as string) ?? "",
  }));
}

// ---------------------------------------------------------------------------
// Flashcards (exercise cards)
// ---------------------------------------------------------------------------

export type Flashcard = {
  id: string;
  track: string;
  category: string;
  difficulty: UserLevel;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  example: string;
};

export async function fetchCards(
  track: string,
  category: string,
  difficulty?: UserLevel,
): Promise<Flashcard[]> {
  const cardsRef = collection(db, "cards");
  const q = difficulty
    ? query(
        cardsRef,
        where("track", "==", track),
        where("category", "==", category),
        where("difficulty", "==", difficulty),
      )
    : query(
        cardsRef,
        where("track", "==", track),
        where("category", "==", category),
      );

  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    const generated = generateCardsForCategory(
      track,
      category,
      difficulty ?? "Fácil",
    );

    return generated.map((card: GeneratedCard) => ({
      id: card.id,
      track: card.track,
      category: card.category,
      difficulty: card.difficulty,
      question: card.question,
      options: card.options,
      correctIndex: card.correctIndex,
      explanation: card.explanation,
      example: card.example,
    }));
  }

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      track: data.track as string,
      category: data.category as string,
      difficulty: (data.difficulty as UserLevel) ?? "Fácil",
      question: data.question as string,
      options: data.options as [string, string, string, string],
      correctIndex: data.correctIndex as number,
      explanation: (data.explanation as string) ?? "",
      example: (data.example as string) ?? "",
    };
  });
}

export async function fetchCategoryStats(
  uid: string,
  track: string,
  category: string,
): Promise<CategoryStats> {
  const lessonsRef = collection(db, "users", uid, "lessons");
  const inProgressRef = collection(db, "users", uid, "inProgressLessons");

  const lessonsQuery = query(
    lessonsRef,
    where("track", "==", track),
    where("category", "==", category),
  );
  const inProgressQuery = query(
    inProgressRef,
    where("track", "==", track),
    where("category", "==", category),
  );

  const [lessonsSnapshot, inProgressSnapshot] = await Promise.all([
    getDocs(lessonsQuery),
    getDocs(inProgressQuery),
  ]);

  let totalCorrect = 0;
  let totalQuestions = 0;
  let inProgressAnswered = 0;
  let inProgressDifficulty: UserLevel | undefined;

  for (const lessonDoc of lessonsSnapshot.docs) {
    const data = lessonDoc.data();
    totalCorrect += (data.correctCount as number) ?? 0;
    totalQuestions += (data.totalCount as number) ?? 0;
  }

  for (const inProgressDoc of inProgressSnapshot.docs) {
    const data = inProgressDoc.data();
    const answered = (data.answeredCount as number) ?? 0;
    inProgressAnswered += answered;
    totalCorrect += (data.correctCount as number) ?? 0;
    totalQuestions += answered;
    if (!inProgressDifficulty && answered > 0) {
      inProgressDifficulty = (data.difficulty as UserLevel) ?? undefined;
    }
  }

  if (lessonsSnapshot.empty && inProgressSnapshot.empty) {
    return {
      cardsStudied: 0,
      totalAnswered: 0,
      inProgressAnswered: 0,
      hasInProgressLesson: false,
      inProgressDifficulty: undefined,
      accuracyPercent: 0,
    };
  }

  return {
    cardsStudied: totalQuestions - inProgressAnswered,
    totalAnswered: totalQuestions,
    inProgressAnswered,
    hasInProgressLesson: inProgressAnswered > 0,
    inProgressDifficulty,
    accuracyPercent:
      totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0,
  };
}

export async function fetchInProgressLesson(
  uid: string,
  track: string,
  category: string,
  difficulty: UserLevel,
): Promise<InProgressLessonRecord | null> {
  const inProgressRef = collection(db, "users", uid, "inProgressLessons");
  const inProgressQuery = query(
    inProgressRef,
    where("track", "==", track),
    where("category", "==", category),
    where("difficulty", "==", difficulty),
  );
  const snapshot = await getDocs(inProgressQuery);
  if (snapshot.empty) return null;
  const first = snapshot.docs[0];
  return {
    id: first.id,
    ...(first.data() as Omit<InProgressLessonRecord, "id">),
  };
}

/** Save/update in-progress lesson under users/{uid}/inProgressLessons/{track__category__difficulty}. */
export async function upsertInProgressLesson(
  uid: string,
  data: {
    track: string;
    category: string;
    difficulty: UserLevel;
    answeredCount: number;
    correctCount: number;
    totalCount: number;
    elapsedMs: number;
  },
): Promise<void> {
  const lessonId = getInProgressLessonId(
    data.track,
    data.category,
    data.difficulty,
  );
  const lessonRef = doc(db, "users", uid, "inProgressLessons", lessonId);
  await setDoc(
    lessonRef,
    {
      ...data,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}

/** Clear in-progress lesson when user completes it. */
export async function clearInProgressLesson(
  uid: string,
  data: {
    track: string;
    category: string;
    difficulty: UserLevel;
  },
): Promise<void> {
  const lessonId = getInProgressLessonId(
    data.track,
    data.category,
    data.difficulty,
  );
  const lessonRef = doc(db, "users", uid, "inProgressLessons", lessonId);
  await deleteDoc(lessonRef);
}

/** Save a completed lesson under users/{uid}/lessons. */
export async function saveLesson(
  uid: string,
  data: {
    category: string;
    track: string;
    difficulty: UserLevel;
    correctCount: number;
    totalCount: number;
    durationMs: number;
  },
): Promise<void> {
  const lessonsRef = collection(db, "users", uid, "lessons");
  await addDoc(lessonsRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

/** Reset all user progress by deleting lessons and in-progress lessons. */
export async function resetUserProgress(uid: string): Promise<void> {
  const batch = writeBatch(db);

  // Delete all lessons
  const lessonsRef = collection(db, "users", uid, "lessons");
  const lessonsSnapshot = await getDocs(lessonsRef);
  lessonsSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Delete all in-progress lessons
  const inProgressRef = collection(db, "users", uid, "inProgressLessons");
  const inProgressSnapshot = await getDocs(inProgressRef);
  inProgressSnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  // Commit the batch
  await batch.commit();
}
