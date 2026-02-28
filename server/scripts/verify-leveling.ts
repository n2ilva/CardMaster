type SeniorityLevel = "INICIANTE" | "JUNIOR" | "PLENO" | "SENIOR";
type Track =
  | "DESENVOLVIMENTO"
  | "INFRAESTRUTURA"
  | "CLOUD"
  | "MACHINE_LEARNING"
  | "SEGURANCA_INFORMACAO";

type ProgressResponse = {
  currentLevel?: SeniorityLevel;
  levelProgress?: Record<
    SeniorityLevel,
    {
      studiedCards: number;
      correctCards: number;
      correctPercent: number;
      unlocked: boolean;
      completed: boolean;
    }
  >;
};

const DEFAULT_BASE_URL =
  "http://ec2-52-67-13-135.sa-east-1.compute.amazonaws.com:4000/api";

const baseUrl = (process.env.API_BASE_URL ?? DEFAULT_BASE_URL).replace(
  /\/$/,
  "",
);
const track = (process.env.TRACK ?? "DESENVOLVIMENTO") as Track;
const level = (process.env.LEVEL ?? "SENIOR") as SeniorityLevel;
const attemptsCount = Number(process.env.ATTEMPTS ?? 30);
const correctCount = Number(process.env.CORRECT ?? 24);
const forcedCategory = process.env.CATEGORY?.trim();

async function request<T>(
  path: string,
  options: { method?: "GET" | "POST"; body?: unknown } = {},
  token?: string,
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = (await response.json().catch(() => ({}))) as T;

  if (!response.ok) {
    throw new Error(
      `Falha em ${path}: ${response.status} ${JSON.stringify(data)}`,
    );
  }

  return data;
}

async function main() {
  if (!Number.isFinite(attemptsCount) || attemptsCount <= 0) {
    throw new Error("ATTEMPTS deve ser um número inteiro positivo.");
  }

  if (
    !Number.isFinite(correctCount) ||
    correctCount < 0 ||
    correctCount > attemptsCount
  ) {
    throw new Error("CORRECT deve estar entre 0 e ATTEMPTS.");
  }

  const timestamp = Date.now();
  const email = `teste.nivelamento.${timestamp}@mailinator.com`;
  const password = "123456";
  const name = `Teste Nivelamento ${timestamp}`;

  const register = await request<{ token: string }>("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });

  const token = register.token;

  const categories = await request<{ category: string }[]>(
    `/ready-cards/categories?track=${track}`,
  );

  const selectedCategory = forcedCategory || categories[0]?.category;

  if (!selectedCategory) {
    throw new Error(`Nenhuma categoria encontrada para track=${track}.`);
  }

  const cards = await request<{ id: string }[]>(
    `/ready-cards?track=${track}&category=${encodeURIComponent(selectedCategory)}&level=${level}`,
  );

  if (cards.length < attemptsCount) {
    throw new Error(
      `Cards insuficientes em ${track}/${selectedCategory}/${level}. Necessário: ${attemptsCount}, encontrado: ${cards.length}.`,
    );
  }

  for (let index = 0; index < attemptsCount; index += 1) {
    const card = cards[index];
    const isCorrect = index < correctCount;

    await request(
      "/study/attempt",
      {
        method: "POST",
        body: {
          level,
          isCorrect,
          readyCardId: card.id,
        },
      },
      token,
    );
  }

  const progress = await request<ProgressResponse>("/progress/me", {}, token);
  const levelStats = progress.levelProgress?.[level];

  console.log("--- VERIFY LEVELING ---");
  console.log("API:", baseUrl);
  console.log("Usuário teste:", email);
  console.log("Track:", track);
  console.log("Categoria:", selectedCategory);
  console.log("Nível testado:", level);
  console.log("Tentativas enviadas:", attemptsCount);
  console.log("Acertos enviados:", correctCount);
  console.log("currentLevel:", progress.currentLevel);
  console.log("levelStats:", levelStats);

  const expectedPercent = Math.round((correctCount / attemptsCount) * 100);
  const shouldUnlock = attemptsCount >= 30 && expectedPercent >= 80;

  if (!levelStats) {
    throw new Error(`Sem estatísticas para o nível ${level} em /progress/me.`);
  }

  if (levelStats.correctPercent !== expectedPercent) {
    throw new Error(
      `Percentual divergente. Esperado=${expectedPercent}, recebido=${levelStats.correctPercent}.`,
    );
  }

  if (levelStats.unlocked !== shouldUnlock) {
    throw new Error(
      `Unlock divergente. Esperado=${shouldUnlock}, recebido=${levelStats.unlocked}.`,
    );
  }

  if (shouldUnlock && progress.currentLevel !== level) {
    throw new Error(
      `currentLevel divergente. Esperado=${level}, recebido=${progress.currentLevel}.`,
    );
  }

  console.log("✅ Validação concluída com sucesso.");
}

main().catch((error) => {
  console.error("❌ Falha na validação de nivelamento:");
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
