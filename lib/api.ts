import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import {
  generateCardsForCategory,
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
  category: string;
  correctCount: number;
  totalCount: number;
  /** Duration of the lesson in milliseconds */
  durationMs: number;
  createdAt: unknown; // Firestore Timestamp
};

/** Aggregated stats per category */
export type CategoryProgress = {
  category: string;
  totalLessons: number;
  accuracyPercent: number; // 0-100
  avgTimeMs: number;
};

/** Overall progress summary */
export type ProgressSummary = {
  level: UserLevel;
  accuracyPercent: number;
  avgTimeMs: number;
  totalLessons: number;
  categories: CategoryProgress[];
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function computeLevel(accuracyPercent: number): UserLevel {
  if (accuracyPercent >= 80) return "Difícil";
  if (accuracyPercent >= 50) return "Médio";
  return "Fácil";
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
  const q = query(lessonsRef, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  const lessons: LessonRecord[] = snapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<LessonRecord, "id">),
  }));

  if (lessons.length === 0) {
    return {
      level: "Fácil",
      accuracyPercent: 0,
      avgTimeMs: 0,
      totalLessons: 0,
      categories: [],
    };
  }

  // Group by category
  const grouped = new Map<
    string,
    { correct: number; total: number; durations: number[] }
  >();

  let totalCorrect = 0;
  let totalQuestions = 0;
  let totalDuration = 0;

  for (const lesson of lessons) {
    totalCorrect += lesson.correctCount;
    totalQuestions += lesson.totalCount;
    totalDuration += lesson.durationMs;

    const existing = grouped.get(lesson.category);
    if (existing) {
      existing.correct += lesson.correctCount;
      existing.total += lesson.totalCount;
      existing.durations.push(lesson.durationMs);
    } else {
      grouped.set(lesson.category, {
        correct: lesson.correctCount,
        total: lesson.totalCount,
        durations: [lesson.durationMs],
      });
    }
  }

  const accuracyPercent =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  const avgTimeMs =
    lessons.length > 0 ? Math.round(totalDuration / lessons.length) : 0;

  const categories: CategoryProgress[] = Array.from(grouped.entries())
    .map(([category, data]) => ({
      category,
      totalLessons: data.durations.length,
      accuracyPercent:
        data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      avgTimeMs:
        data.durations.length > 0
          ? Math.round(
              data.durations.reduce((a, b) => a + b, 0) / data.durations.length,
            )
          : 0,
    }))
    .sort((a, b) => a.category.localeCompare(b.category, "pt-BR"));

  return {
    level: computeLevel(accuracyPercent),
    accuracyPercent,
    avgTimeMs,
    totalLessons: lessons.length,
    categories,
  };
}

// ---------------------------------------------------------------------------
// Themes
// ---------------------------------------------------------------------------

/** A theme document stored in the `themes` collection */
export type ThemeItem = {
  id: string;
  name: string;
  description: string;
};

/**
 * Fetch all themes from Firestore, ordered by name.
 * Collection: `themes` — each doc has `name` (string) and `description` (string).
 */
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

/** A single flashcard question stored under cards/{id} */
export type Flashcard = {
  id: string;
  track: string;
  category: string;
  difficulty: UserLevel;
  question: string;
  options: [string, string, string, string]; // A, B, C, D
  correctIndex: number; // 0-3
  explanation: string; // Explanation of the correct answer
  example: string; // Practical example
};

/** Stats for a specific category for a specific user */
export type CategoryStats = {
  cardsStudied: number;
  accuracyPercent: number;
};

/**
 * Fetch flashcards from Firestore for a given track + category.
 * Collection: `cards` — each doc has track, category, difficulty, question, options[], correctIndex, explanation, example.
 *
 * If Firestore has no cards for the requested filter, a deterministic local generator
 * returns 20 cards per difficulty to keep the app fully usable and maintainable.
 */
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

/**
 * Fetch category stats for a specific user from their lessons sub-collection.
 */
export async function fetchCategoryStats(
  uid: string,
  category: string,
): Promise<CategoryStats> {
  const lessonsRef = collection(db, "users", uid, "lessons");
  const q = query(lessonsRef, where("category", "==", category));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    return { cardsStudied: 0, accuracyPercent: 0 };
  }

  let totalCorrect = 0;
  let totalQuestions = 0;

  for (const doc of snapshot.docs) {
    const data = doc.data();
    totalCorrect += (data.correctCount as number) ?? 0;
    totalQuestions += (data.totalCount as number) ?? 0;
  }

  return {
    cardsStudied: totalQuestions,
    accuracyPercent:
      totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : 0,
  };
}

/**
 * Save a completed lesson to Firestore under users/{uid}/lessons.
 */
export async function saveLesson(
  uid: string,
  data: {
    category: string;
    track: string;
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
