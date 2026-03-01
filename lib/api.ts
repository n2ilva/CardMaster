import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getCountFromServer,
    getDocs,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    where,
    writeBatch,
} from "firebase/firestore";

import { selectRandomCards, shuffleCardOptions } from "@/data/cards/generator";
import { trackCategories } from "@/data/tracks";
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
  accuracyPercent: number;
  avgTimeMs: number;
  totalLessons: number;
  totalScore: number;
  categories: CategoryProgress[];
};

/** User's summary level for display and community ranking */
export type SummaryLevel =
  | "Iniciante"
  | "Intermediário"
  | "Profissional"
  | "Expert";

/** Score level for community ranking - badge system */
export type ScoreLevel = "Bronze" | "Prata" | "Ouro" | "Diamante";

/** User profile for community/ranking */
export type UserProfile = {
  userId: string;
  name: string;
  level: SummaryLevel;
  scoreLevel: ScoreLevel;
  score: number;
  totalQuestionsAnswered: number;
  overallAccuracy: number;
  avgTimePerQuestion: number;
  updatedAt: unknown;
};

/** Progress data stored in users/{uid}/profile - used by community */
export type UserProgressData = {
  level: SummaryLevel;
  scoreLevel: ScoreLevel;
  score: number;
  totalQuestionsAnswered: number;
  overallAccuracy: number;
  avgTimePerQuestion: number;
  updatedAt: unknown;
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

/**
 * Calcula o nível resumido do usuário baseado em acurácia
 * Iniciante: 0-20%, Intermediário: 21-50%, Profissional: 51-80%, Expert: >80%
 */
export function getSummaryLevel(accuracyPercent: number): SummaryLevel {
  if (accuracyPercent > 80) return "Expert";
  if (accuracyPercent > 50) return "Profissional";
  if (accuracyPercent > 20) return "Intermediário";
  return "Iniciante";
}
/**
 * Calcula o nível de pontuação (medalha) baseado na pontuação total
 * Bronze: 0-500, Prata: 501-1500, Ouro: 1501-3000, Diamante: >3000
 */
export function getScoreLevel(score: number): ScoreLevel {
  if (score > 3000) return "Diamante";
  if (score > 1500) return "Ouro";
  if (score > 500) return "Prata";
  return "Bronze";
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
      accuracyPercent: 0,
      avgTimeMs: 0,
      totalLessons: 0,
      totalScore: 0,
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

  // Calcula o score total usando a mesma fórmula de updateUserProfile
  const avgTimePerQuestion =
    totalQuestions > 0 ? totalDuration / totalQuestions : 0;
  const totalScore = calculateScore(
    totalQuestions,
    accuracyPercent,
    avgTimePerQuestion,
  );

  const categories: CategoryProgress[] = (
    await Promise.all(
      Array.from(grouped.values()).map(async (data) => {
        const totalCardsInCategory =
          data.track && data.category
            ? await getTotalCardsForCategory(data.track, data.category)
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
      }),
    )
  ).sort((a, b) => {
    const trackCompare = a.track.localeCompare(b.track, "pt-BR");
    if (trackCompare !== 0) return trackCompare;
    return a.category.localeCompare(b.category, "pt-BR");
  });

  return {
    accuracyPercent,
    avgTimeMs,
    totalLessons: lessons.length,
    totalScore,
    categories,
  };
}

// ---------------------------------------------------------------------------
// Analyze performance issues (weakest categories)
// ---------------------------------------------------------------------------

export type WeakestSubject = {
  track: string;
  category: string;
  accuracy: number;
  totalQuestions: number;
  totalLessons: number;
};

/**
 * Identifica os assuntos onde o usuário erra mais frequentemente
 * Retorna os 3 assuntos com menor acurácia
 */
export async function getWeakestSubjects(
  uid: string,
  limit: number = 3,
): Promise<WeakestSubject[]> {
  const lessonsRef = collection(db, "users", uid, "lessons");
  const lessonsQuery = query(lessonsRef, orderBy("createdAt", "desc"));
  const lessonsSnapshot = await getDocs(lessonsQuery);

  const lessons: LessonRecord[] = lessonsSnapshot.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<LessonRecord, "id">),
  }));

  // Agrupa por assunto e calcula estatísticas
  const subjectStats = new Map<
    string,
    {
      track: string;
      category: string;
      correct: number;
      total: number;
      lessonCount: number;
    }
  >();

  for (const lesson of lessons) {
    const key = `${lesson.track}__${lesson.category}`;
    const existing = subjectStats.get(key);

    if (existing) {
      existing.correct += lesson.correctCount;
      existing.total += lesson.totalCount;
      existing.lessonCount += 1;
    } else {
      subjectStats.set(key, {
        track: lesson.track ?? "",
        category: lesson.category,
        correct: lesson.correctCount,
        total: lesson.totalCount,
        lessonCount: 1,
      });
    }
  }

  // Converte para array e ordena pela menor acurácia
  const subjects = Array.from(subjectStats.values())
    .map((stat) => ({
      track: stat.track,
      category: stat.category,
      accuracy:
        stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0,
      totalQuestions: stat.total,
      totalLessons: stat.lessonCount,
    }))
    .sort((a, b) => a.accuracy - b.accuracy); // Menor acurácia primeiro

  return subjects.slice(0, limit);
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
// Card counts (Firestore-based)
// ---------------------------------------------------------------------------

/**
 * Retorna o total de cards de uma categoria (todas as dificuldades).
 * Usa getCountFromServer para evitar baixar todos os documentos.
 */
export async function getTotalCardsForCategory(
  track: string,
  category: string,
): Promise<number> {
  const cardsRef = collection(db, "cards");
  const q = query(
    cardsRef,
    where("track", "==", track),
    where("category", "==", category),
  );
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
}

/**
 * Retorna estatísticas gerais do banco de cards no Firestore.
 */
export async function getDatabaseStats(): Promise<{
  totalCards: number;
  activeTracks: number;
}> {
  const cardsRef = collection(db, "cards");

  // Total de cards (eficiente — não baixa documentos)
  const countSnapshot = await getCountFromServer(query(cardsRef));
  const totalCards = countSnapshot.data().count;

  // Conta tracks que possuem pelo menos 1 card no Firestore
  const trackKeys = Object.keys(trackCategories);

  const trackCounts = await Promise.all(
    trackKeys.map(async (track) => {
      const q = query(cardsRef, where("track", "==", track));
      const snap = await getCountFromServer(q);
      return snap.data().count;
    }),
  );

  const activeTracks = trackCounts.filter((c) => c > 0).length;

  return { totalCards, activeTracks };
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

  const allCards: Flashcard[] = snapshot.docs.map((d) => {
    const data = d.data();
    const card: Flashcard = {
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
    // Embaralha as opções de cada card para evitar memorização por posição
    return shuffleCardOptions(card);
  });

  // Limita a 15 questões aleatórias e embaralhadas
  return selectRandomCards(allCards, 15);
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

  // Delete progress data
  const progressRef = doc(db, "users", uid, "progressData", "current");
  batch.delete(progressRef);

  // Commit the batch
  await batch.commit();

  // Reset community profile (separate call since document may not exist)
  try {
    const communityRef = doc(db, "community", uid);
    await setDoc(
      communityRef,
      {
        level: "Iniciante" as SummaryLevel,
        scoreLevel: "Bronze" as ScoreLevel,
        score: 0,
        totalQuestionsAnswered: 0,
        overallAccuracy: 0,
        avgTimePerQuestion: 0,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Erro ao resetar perfil da comunidade:", error);
    // Don't throw - the main reset already succeeded
  }
}

// ---------------------------------------------------------------------------
// Community & Scoring
// ---------------------------------------------------------------------------

/**
 * Calcula a pontuação do usuário baseado em:
 * - Quantidade de questões respondidas
 * - Taxa de acerto
 * - Tempo por questão (quanto mais rápido, melhor)
 */
export function calculateScore(
  totalQuestions: number,
  accuracyPercent: number,
  avgTimePerQuestionMs: number,
): number {
  // Base score: 1 ponto por questão respondida
  const baseScore = totalQuestions;

  // Bonus de acurácia: até 50% extra baseado em taxa de acerto
  const accuracyBonus = baseScore * (accuracyPercent / 100) * 0.5;

  // Bonus de velocidade: até 25% extra (quanto mais rápido, melhor)
  // Considera 20 segundos como tempo "ideal" (20000ms)
  const speedFactor = Math.max(0, 1 - avgTimePerQuestionMs / 20000);
  const speedBonus = baseScore * speedFactor * 0.25;

  const totalScore = baseScore + accuracyBonus + speedBonus;
  return Math.round(totalScore);
}

/**
 * Salva os dados de progresso do usuário em users/{uid}/progressData/current
 */
async function saveProgressData(
  uid: string,
  level: SummaryLevel,
  scoreLevel: ScoreLevel,
  score: number,
  totalQuestionsAnswered: number,
  overallAccuracy: number,
  avgTimePerQuestion: number,
): Promise<void> {
  const progressRef = doc(db, "users", uid, "progressData", "current");
  await setDoc(progressRef, {
    level,
    scoreLevel,
    score,
    totalQuestionsAnswered,
    overallAccuracy,
    avgTimePerQuestion,
    updatedAt: serverTimestamp(),
  } as UserProgressData);
}

/**
 * Atualiza o perfil público do usuário após uma lição completada
 */
export async function updateUserProfile(
  uid: string,
  userName: string,
): Promise<void> {
  console.log("[updateUserProfile] Iniciando para uid:", uid);

  // Busca todas as lições do usuário para calcular o total de questões
  const lessonsRef = collection(db, "users", uid, "lessons");
  const lessonsSnapshot = await getDocs(lessonsRef);

  let totalCorrect = 0;
  let totalQuestions = 0;
  let totalDuration = 0;

  lessonsSnapshot.docs.forEach((doc) => {
    const data = doc.data() as LessonRecord;
    totalCorrect += data.correctCount;
    totalQuestions += data.totalCount;
    totalDuration += data.durationMs;
  });

  console.log(
    "[updateUserProfile] Total questões:",
    totalQuestions,
    "Total corretas:",
    totalCorrect,
  );

  // Calcula a pontuação
  const avgTimePerQuestion =
    totalQuestions > 0 ? totalDuration / totalQuestions : 0;
  const accuracy =
    totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
  const score = calculateScore(totalQuestions, accuracy, avgTimePerQuestion);
  const summaryLevel = getSummaryLevel(accuracy);
  const scoreLevel = getScoreLevel(score);

  console.log(
    "[updateUserProfile] Score:",
    score,
    "Level:",
    summaryLevel,
    "ScoreLevel:",
    scoreLevel,
  );

  // Salva os dados de progresso em users/{uid}/progressData/current
  await saveProgressData(
    uid,
    summaryLevel,
    scoreLevel,
    score,
    totalQuestions,
    accuracy,
    avgTimePerQuestion,
  );

  console.log("[updateUserProfile] Dados de progresso salvos");

  // Atualiza o documento de perfil em community/{uid}
  const profileRef = doc(db, "community", uid);
  await setDoc(profileRef, {
    userId: uid,
    name: userName,
    level: summaryLevel,
    scoreLevel: scoreLevel,
    score: score,
    totalQuestionsAnswered: totalQuestions,
    overallAccuracy: accuracy,
    avgTimePerQuestion: avgTimePerQuestion,
    updatedAt: serverTimestamp(),
  });

  console.log("[updateUserProfile] Perfil da comunidade atualizado");
}

/**
 * Garante que o usuário tem um perfil na comunidade, mesmo sem lições completadas
 */
export async function ensureUserProfile(
  uid: string,
  userName: string,
): Promise<void> {
  console.log("[ensureUserProfile] Verificando perfil para uid:", uid);
  const profileRef = doc(db, "community", uid);

  // Usa setDoc com merge para criar ou atualizar apenas o nome se já existir
  await setDoc(
    profileRef,
    {
      userId: uid,
      name: userName,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );

  console.log("[ensureUserProfile] Perfil garantido para:", userName);
}

/**
 * Busca todos os usuários ordenados pela pontuação (decrescente)
 */
export async function fetchUsersByLevel(
  level: ScoreLevel,
  limit: number = 50,
): Promise<UserProfile[]> {
  const communityRef = collection(db, "community");
  // Busca todos os usuários ordenados por score (não filtra por level para evitar índice composto)
  const q = query(communityRef, orderBy("score", "desc"));

  const snapshot = await getDocs(q);

  // Filtra por nível de medalha localmente e limita o resultado
  return snapshot.docs
    .map((doc) => {
      const score = (doc.data().score as number) ?? 0;
      return {
        userId: doc.id,
        name: (doc.data().name as string) ?? "Usuário",
        level: (doc.data().level as SummaryLevel) ?? "Iniciante",
        scoreLevel:
          (doc.data().scoreLevel as ScoreLevel) ?? getScoreLevel(score),
        score: score,
        totalQuestionsAnswered:
          (doc.data().totalQuestionsAnswered as number) ?? 0,
        overallAccuracy: (doc.data().overallAccuracy as number) ?? 0,
        avgTimePerQuestion: (doc.data().avgTimePerQuestion as number) ?? 0,
        updatedAt: doc.data().updatedAt,
      };
    })
    .filter((user) => user.scoreLevel === level)
    .slice(0, limit);
}
