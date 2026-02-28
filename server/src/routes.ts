import bcrypt from "bcryptjs";
import { Router } from "express";
import { z } from "zod";

import { createToken, requireAuth, type AuthenticatedRequest } from "./auth.js";
import { prisma } from "./prisma.js";

type SeniorityLevel = "INICIANTE" | "JUNIOR" | "PLENO" | "SENIOR";
type Track =
  | "DESENVOLVIMENTO"
  | "INFRAESTRUTURA"
  | "CLOUD"
  | "MACHINE_LEARNING";

const seniorityLevels = ["INICIANTE", "JUNIOR", "PLENO", "SENIOR"] as const;
const tracks = [
  "DESENVOLVIMENTO",
  "INFRAESTRUTURA",
  "CLOUD",
  "MACHINE_LEARNING",
] as const;
const orderedLevels: SeniorityLevel[] = [
  "INICIANTE",
  "JUNIOR",
  "PLENO",
  "SENIOR",
];

const millisecondsPerDay = 24 * 60 * 60 * 1000;

function toUtcDayTimestamp(date: Date): number {
  return Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
}

function calculateConsecutiveStreak(dayTimestamps: number[]): number {
  if (dayTimestamps.length === 0) {
    return 0;
  }

  const uniqueDays = Array.from(new Set(dayTimestamps)).sort((a, b) => b - a);
  const today = toUtcDayTimestamp(new Date());
  const yesterday = today - millisecondsPerDay;

  if (uniqueDays[0] !== today && uniqueDays[0] !== yesterday) {
    return 0;
  }

  let streak = 1;
  for (let index = 1; index < uniqueDays.length; index += 1) {
    if (uniqueDays[index - 1] - uniqueDays[index] === millisecondsPerDay) {
      streak += 1;
      continue;
    }
    break;
  }

  return streak;
}

async function getUserStreakDays(userId: string): Promise<number> {
  const attempts = await prisma.sessionAttempt.findMany({
    where: { userId },
    select: { createdAt: true },
    orderBy: { createdAt: "desc" },
  });

  return calculateConsecutiveStreak(
    attempts.map((attempt) => toUtcDayTimestamp(attempt.createdAt)),
  );
}

function toPercent(value: number, total: number): number {
  if (total <= 0) {
    return 0;
  }
  return Math.round((value / total) * 100);
}

type LevelProgressStats = {
  totalCards: number;
  studiedCards: number;
  correctCards: number;
  studiedPercent: number;
  correctPercent: number;
  unlocked: boolean;
  completed: boolean;
};

type CategoryProgressStats = {
  category: string;
  studiedPercent: number;
  levels: Record<SeniorityLevel, LevelProgressStats>;
};

async function getUserReadyCardsProgress(userId: string, track?: Track) {
  const whereClause = track ? { track } : undefined;

  const [cards, attempts, themes] = await Promise.all([
    prisma.readyFlashcard.findMany({
      where: whereClause,
      select: { id: true, category: true, level: true },
    }),
    prisma.sessionAttempt.findMany({
      where: {
        userId,
        readyCardId: { not: null },
      },
      select: {
        readyCardId: true,
        isCorrect: true,
      },
    }),
    track
      ? prisma.readyTheme.findMany({
          where: { track },
          select: { name: true },
        })
      : Promise.resolve([]),
  ]);

  const studiedCardIds = new Set<string>();
  const correctCardIds = new Set<string>();

  for (const attempt of attempts) {
    if (!attempt.readyCardId) {
      continue;
    }

    studiedCardIds.add(attempt.readyCardId);
    if (attempt.isCorrect) {
      correctCardIds.add(attempt.readyCardId);
    }
  }

  const levelTotals: Record<SeniorityLevel, number> = {
    INICIANTE: 0,
    JUNIOR: 0,
    PLENO: 0,
    SENIOR: 0,
  };
  const levelStudied: Record<SeniorityLevel, number> = {
    INICIANTE: 0,
    JUNIOR: 0,
    PLENO: 0,
    SENIOR: 0,
  };
  const levelCorrect: Record<SeniorityLevel, number> = {
    INICIANTE: 0,
    JUNIOR: 0,
    PLENO: 0,
    SENIOR: 0,
  };

  const categoriesMap = new Map<string, CategoryProgressStats>();

  for (const theme of themes) {
    categoriesMap.set(theme.name, {
      category: theme.name,
      studiedPercent: 0,
      levels: {
        INICIANTE: {
          totalCards: 0,
          studiedCards: 0,
          correctCards: 0,
          studiedPercent: 0,
          correctPercent: 0,
          unlocked: false,
          completed: false,
        },
        JUNIOR: {
          totalCards: 0,
          studiedCards: 0,
          correctCards: 0,
          studiedPercent: 0,
          correctPercent: 0,
          unlocked: false,
          completed: false,
        },
        PLENO: {
          totalCards: 0,
          studiedCards: 0,
          correctCards: 0,
          studiedPercent: 0,
          correctPercent: 0,
          unlocked: false,
          completed: false,
        },
        SENIOR: {
          totalCards: 0,
          studiedCards: 0,
          correctCards: 0,
          studiedPercent: 0,
          correctPercent: 0,
          unlocked: false,
          completed: false,
        },
      },
    });
  }

  for (const card of cards) {
    levelTotals[card.level] += 1;

    const hasStudied = studiedCardIds.has(card.id);
    const hasCorrect = correctCardIds.has(card.id);

    if (hasStudied) {
      levelStudied[card.level] += 1;
    }
    if (hasCorrect) {
      levelCorrect[card.level] += 1;
    }

    const existing = categoriesMap.get(card.category);
    if (!existing) {
      categoriesMap.set(card.category, {
        category: card.category,
        studiedPercent: 0,
        levels: {
          INICIANTE: {
            totalCards: 0,
            studiedCards: 0,
            correctCards: 0,
            studiedPercent: 0,
            correctPercent: 0,
            unlocked: false,
            completed: false,
          },
          JUNIOR: {
            totalCards: 0,
            studiedCards: 0,
            correctCards: 0,
            studiedPercent: 0,
            correctPercent: 0,
            unlocked: false,
            completed: false,
          },
          PLENO: {
            totalCards: 0,
            studiedCards: 0,
            correctCards: 0,
            studiedPercent: 0,
            correctPercent: 0,
            unlocked: false,
            completed: false,
          },
          SENIOR: {
            totalCards: 0,
            studiedCards: 0,
            correctCards: 0,
            studiedPercent: 0,
            correctPercent: 0,
            unlocked: false,
            completed: false,
          },
        },
      });
    }

    const currentCategory = categoriesMap.get(card.category)!;
    currentCategory.levels[card.level].totalCards += 1;
    if (hasStudied) {
      currentCategory.levels[card.level].studiedCards += 1;
    }
    if (hasCorrect) {
      currentCategory.levels[card.level].correctCards += 1;
    }
  }

  const categories = Array.from(categoriesMap.values())
    .map((categoryProgress) => {
      let categoryTotal = 0;
      let categoryStudied = 0;

      for (const level of orderedLevels) {
        const levelStats = categoryProgress.levels[level];
        levelStats.studiedPercent = toPercent(
          levelStats.studiedCards,
          levelStats.totalCards,
        );
        levelStats.correctPercent = toPercent(
          levelStats.correctCards,
          levelStats.totalCards,
        );
        levelStats.unlocked = levelStats.correctPercent >= 80;
        levelStats.completed = levelStats.correctPercent >= 100;

        categoryTotal += levelStats.totalCards;
        categoryStudied += levelStats.studiedCards;
      }

      categoryProgress.studiedPercent = toPercent(
        categoryStudied,
        categoryTotal,
      );
      return categoryProgress;
    })
    .sort((a, b) => a.category.localeCompare(b.category, "pt-BR"));

  const levelProgress = orderedLevels.reduce(
    (accumulator, level) => {
      const correctPercent = toPercent(levelCorrect[level], levelTotals[level]);
      accumulator[level] = {
        totalCards: levelTotals[level],
        studiedCards: levelStudied[level],
        correctCards: levelCorrect[level],
        studiedPercent: toPercent(levelStudied[level], levelTotals[level]),
        correctPercent,
        unlocked: correctPercent >= 80,
        completed: correctPercent >= 100,
      };
      return accumulator;
    },
    {} as Record<SeniorityLevel, LevelProgressStats>,
  );

  let currentLevel: SeniorityLevel = "INICIANTE";
  if (levelProgress.INICIANTE.unlocked) {
    currentLevel = "JUNIOR";
    if (levelProgress.JUNIOR.unlocked) {
      currentLevel = "PLENO";
      if (levelProgress.PLENO.unlocked) {
        currentLevel = "SENIOR";
      }
    }
  }

  return {
    categories,
    levelProgress,
    currentLevel,
  };
}

const router = Router();

router.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

router.post("/auth/register", async (req, res) => {
  const schema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Dados inválidos.", issues: parsed.error.issues });
  }

  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Email já cadastrado." });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      rewardProgress: { create: { badges: [] } },
    },
  });

  const token = createToken(user.id);
  return res
    .status(201)
    .json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

router.post("/auth/login", async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const parsed = schema.safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Dados inválidos.", issues: parsed.error.issues });
  }

  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const valid = await bcrypt.compare(parsed.data.password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Credenciais inválidas." });
  }

  const token = createToken(user.id);
  return res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
});

router.get("/ready-cards", async (req, res) => {
  const querySchema = z.object({
    track: z.enum(tracks).optional(),
    level: z.enum(seniorityLevels).optional(),
    category: z.string().min(1).optional(),
  });

  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({
      message: "Parâmetros inválidos.",
      issues: parsedQuery.error.issues,
    });
  }

  const { track, level, category } = parsedQuery.data;

  const cards = await prisma.readyFlashcard.findMany({
    where: {
      track,
      level,
      category,
    },
    orderBy: [{ track: "asc" }, { category: "asc" }],
  });

  return res.json(cards);
});

router.get("/ready-cards/categories", async (req, res) => {
  const querySchema = z.object({
    track: z.enum(tracks),
  });

  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({
      message: "Parâmetros inválidos.",
      issues: parsedQuery.error.issues,
    });
  }

  const [cards, themes] = await Promise.all([
    prisma.readyFlashcard.findMany({
      where: { track: parsedQuery.data.track },
      select: { category: true },
      orderBy: { category: "asc" },
    }),
    prisma.readyTheme.findMany({
      where: { track: parsedQuery.data.track },
      select: { name: true },
      orderBy: { name: "asc" },
    }),
  ]);

  const categories = Array.from(
    new Set([
      ...cards.map((card) => card.category),
      ...themes.map((theme) => theme.name),
    ]),
  )
    .sort((a, b) => a.localeCompare(b, "pt-BR"))
    .map((category) => ({ category }));

  return res.json(categories);
});

router.get(
  "/ready-cards/categories-progress",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const querySchema = z.object({
      track: z.enum(tracks),
    });

    const parsedQuery = querySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        message: "Parâmetros inválidos.",
        issues: parsedQuery.error.issues,
      });
    }

    const progress = await getUserReadyCardsProgress(
      req.userId!,
      parsedQuery.data.track,
    );
    return res.json(progress.categories);
  },
);

router.get("/ready-themes", async (req, res) => {
  const querySchema = z.object({
    track: z.enum(tracks),
  });

  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({
      message: "Parâmetros inválidos.",
      issues: parsedQuery.error.issues,
    });
  }

  const themes = await prisma.readyTheme.findMany({
    where: { track: parsedQuery.data.track },
    select: { name: true },
    orderBy: { name: "asc" },
  });

  return res.json(themes.map((theme) => ({ category: theme.name })));
});

router.post(
  "/ready-themes",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const schema = z.object({
      track: z.enum(tracks),
      category: z.string().min(2),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", issues: parsed.error.issues });
    }

    const normalizedName = parsed.data.category.trim();
    const nameKey = normalizedName.toLocaleLowerCase("pt-BR");

    const theme = await prisma.readyTheme.upsert({
      where: {
        track_nameKey: {
          track: parsed.data.track,
          nameKey,
        },
      },
      update: {
        name: normalizedName,
      },
      create: {
        track: parsed.data.track,
        name: normalizedName,
        nameKey,
      },
    });

    return res.status(201).json({ category: theme.name });
  },
);

router.get("/ready-cards/summary", async (_req, res) => {
  const cards = await prisma.readyFlashcard.findMany({
    select: { track: true },
  });

  const summary = {
    DESENVOLVIMENTO: 0,
    INFRAESTRUTURA: 0,
    CLOUD: 0,
    MACHINE_LEARNING: 0,
  };

  for (const card of cards) {
    summary[card.track] += 1;
  }

  return res.json({
    counts: summary,
    total: cards.length,
  });
});

router.post(
  "/ready-cards",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const schema = z.object({
      track: z.enum(tracks),
      category: z.string().min(2),
      level: z.enum(seniorityLevels),
      question: z.string().min(5),
      answer: z.string().min(2),
      contestName: z.string().optional(),
      organization: z.string().optional(),
      year: z.number().int().min(2000).max(2100).optional(),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", issues: parsed.error.issues });
    }

    const { category, contestName, organization, year, ...cardData } =
      parsed.data;
    const normalizedThemeName = category.trim();
    const themeKey = normalizedThemeName.toLocaleLowerCase("pt-BR");

    const sourceParts = [contestName, organization, year?.toString()].filter(
      Boolean,
    );
    const normalizedCategory =
      sourceParts.length > 0
        ? `${normalizedThemeName} · ${sourceParts.join(" / ")}`
        : normalizedThemeName;

    const card = await prisma.readyFlashcard.create({
      data: {
        ...cardData,
        category: normalizedCategory,
      } as any,
    });

    await prisma.readyTheme.upsert({
      where: {
        track_nameKey: {
          track: cardData.track,
          nameKey: themeKey,
        },
      },
      update: {
        name: normalizedThemeName,
      },
      create: {
        track: cardData.track,
        name: normalizedThemeName,
        nameKey: themeKey,
      },
    });

    return res.status(201).json(card);
  },
);

router.post(
  "/custom-cards",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const schema = z.object({
      topic: z.string().min(2),
      question: z.string().min(5),
      answer: z.string().min(2),
      level: z.enum(seniorityLevels),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", issues: parsed.error.issues });
    }

    const card = await prisma.customFlashcard.create({
      data: {
        userId: req.userId!,
        ...parsed.data,
      } as any,
    });

    return res.status(201).json(card);
  },
);

router.get(
  "/custom-cards",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const cards = await prisma.customFlashcard.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: "desc" },
    });

    return res.json(cards);
  },
);

router.post(
  "/study/attempt",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const schema = z.object({
      level: z.enum(seniorityLevels),
      isCorrect: z.boolean(),
      readyCardId: z.string().optional(),
      customCardId: z.string().optional(),
      durationSeconds: z.number().int().min(1).max(3600).optional(),
    });

    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Dados inválidos.", issues: parsed.error.issues });
    }

    const { level, isCorrect, readyCardId, customCardId, durationSeconds } =
      parsed.data;

    await prisma.sessionAttempt.create({
      data: {
        userId: req.userId!,
        level,
        isCorrect,
        pointsEarned: 0,
        readyCardId,
        customCardId,
        durationSeconds,
      },
    });

    const streakDays = await getUserStreakDays(req.userId!);
    const readyCardsProgress = await getUserReadyCardsProgress(req.userId!);
    const correctAttempts = await prisma.sessionAttempt.count({
      where: {
        userId: req.userId!,
        isCorrect: true,
      },
    });

    const updatedUser = await prisma.user.update({
      where: { id: req.userId },
      data: {
        streakDays,
      },
    });

    const badges: string[] = [];
    if (correctAttempts >= 20) badges.push("Primeiros 20 acertos");
    if (correctAttempts >= 100) badges.push("Ritmo Forte");
    if (
      ["JUNIOR", "PLENO", "SENIOR"].includes(readyCardsProgress.currentLevel)
    ) {
      badges.push("Nível Júnior desbloqueado");
    }
    if (["PLENO", "SENIOR"].includes(readyCardsProgress.currentLevel)) {
      badges.push("Nível Pleno desbloqueado");
    }
    if (readyCardsProgress.currentLevel === "SENIOR") {
      badges.push("Nível Sênior desbloqueado");
    }
    if (updatedUser.streakDays >= 7) badges.push("7 dias de sequência");

    await prisma.userRewardProgress.upsert({
      where: { userId: req.userId! },
      update: { badges: Array.from(new Set(badges)) },
      create: {
        userId: req.userId!,
        badges: Array.from(new Set(badges)),
      },
    });

    return res.json({
      streakDays,
      badges,
    });
  },
);

router.get(
  "/progress/me",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const user = await prisma.user.findUnique({
      where: { id: req.userId },
      select: {
        id: true,
        name: true,
        streakDays: true,
        rewardProgress: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const attempts = await prisma.sessionAttempt.aggregate({
      where: { userId: req.userId },
      _count: { _all: true },
    });

    const averageDurationResult = await prisma.sessionAttempt.aggregate({
      where: {
        userId: req.userId,
        durationSeconds: { not: null },
      },
      _avg: { durationSeconds: true },
    });

    const correctAttempts = await prisma.sessionAttempt.count({
      where: {
        userId: req.userId,
        isCorrect: true,
      },
    });

    const readyCardsProgress = await getUserReadyCardsProgress(req.userId!);

    const streakDays = await getUserStreakDays(req.userId!);

    if (user.streakDays !== streakDays) {
      await prisma.user.update({
        where: { id: req.userId },
        data: { streakDays },
      });
    }

    return res.json({
      ...user,
      streakDays,
      attempts: attempts._count._all,
      correctAttempts,
      averageDurationSeconds: Math.round(
        averageDurationResult._avg.durationSeconds ?? 0,
      ),
      currentLevel: readyCardsProgress.currentLevel,
      levelProgress: readyCardsProgress.levelProgress,
    });
  },
);

router.post(
  "/progress/reset",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    await prisma.sessionAttempt.deleteMany({
      where: { userId: req.userId },
    });

    await prisma.user.update({
      where: { id: req.userId },
      data: {
        streakDays: 0,
        totalPoints: 0,
      },
    });

    await prisma.userRewardProgress.upsert({
      where: { userId: req.userId! },
      update: { badges: [] },
      create: {
        userId: req.userId!,
        badges: [],
      },
    });

    return res.json({ message: "Progresso resetado com sucesso." });
  },
);

export { router };
