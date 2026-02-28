import { Prisma } from "@prisma/client";
import dotenv from "dotenv";

import { prisma } from "./prisma.js";

dotenv.config();

const track = "SEGURANCA_INFORMACAO" as const;

const categories = [
  "IA Generativa e Deepfakes",
  "Defesa Automatizada",
  "Engenharia Social e Phishing",
  "Identidade como Perímetro",
  "Segurança em Nuvem (CSPM/DSPM)",
  "Continuidade de Negócios",
  "Evolução do Ransomware",
  "Regulação Rígida",
  "Preparação Pós-Quântica (PQC)",
  "Segurança em IoT/OT (Cidades Conectadas)",
] as const;

const levels = ["INICIANTE", "JUNIOR", "PLENO", "SENIOR"] as const;
const cardsPerLevel = 30;

const beginnerQuestionStems = [
  "Qual risco principal deve ser observado em {category}?",
  "Quando {category} exige resposta imediata do time de segurança?",
  "Qual controle básico reduz impacto em {category}?",
  "Como priorizar incidentes relacionados a {category}?",
  "Qual métrica inicial acompanhar em {category}?",
  "Como comunicar risco de {category} para áreas de negócio?",
  "Que evidência ajuda auditoria em casos de {category}?",
  "Como iniciar política simples para {category}?",
  "Qual erro comum enfraquece proteção em {category}?",
  "Que ação preventiva é mais efetiva em {category}?",
] as const;

const advancedQuestionStems = [
  "Como desenhar estratégia resiliente para {category} em escala?",
  "Quais trade-offs entre fricção de usuário e proteção em {category}?",
  "Como estruturar detecção e resposta contínua em {category}?",
  "Quais controles de governança e compliance são críticos em {category}?",
  "Como validar eficácia de controles técnicos em {category}?",
  "Quando automatizar resposta e quando manter aprovação humana em {category}?",
  "Como reduzir tempo de contenção e recuperação em eventos de {category}?",
  "Como integrar telemetria, threat intel e playbooks em {category}?",
  "Quais práticas evitam regressão de segurança em {category}?",
  "Como alinhar prioridades de segurança e continuidade em {category}?",
] as const;

const beginnerAnswerTemplates = [
  "Em {category}, comece com mapeamento de ativos críticos, controles mínimos e runbook de resposta simples.",
  "Para {category}, defina responsáveis, critérios de severidade e fluxo de escalonamento com comunicação clara.",
  "Uma base sólida em {category} combina prevenção, detecção e recuperação com responsabilidades explícitas.",
  "Em {category}, reduza exposição com princípio do menor privilégio e revisão periódica de acessos.",
  "No contexto de {category}, priorize ações com impacto mensurável em risco e continuidade do serviço.",
] as const;

const advancedAnswerTemplates = [
  "Em {category}, arquitetura de segurança deve ser orientada a risco, com observabilidade e melhoria contínua.",
  "Para {category}, combine automação, validação de controles e testes recorrentes para manter resiliência operacional.",
  "Em cenários de {category}, governança efetiva exige trilha de auditoria, políticas versionadas e métricas executivas.",
  "Em {category}, resposta eficiente depende de playbooks testados, integração entre times e aprendizado pós-incidente.",
  "Para {category}, equilíbrio entre usabilidade e proteção deve ser guiado por contexto e criticidade do ativo.",
] as const;

const contextAngles = [
  "órgão público de grande porte",
  "ambiente híbrido com cloud e on-premises",
  "operação 24x7",
  "dados pessoais sensíveis",
  "integração com fornecedores terceiros",
  "pressão regulatória elevada",
  "alto risco reputacional",
  "time reduzido de segurança",
  "ameaças internas e externas",
  "necessidade de resposta rápida",
  "infraestrutura crítica",
  "serviços digitais para cidadãos",
] as const;

type PromptPair = {
  question: string;
  answer: string;
};

function buildPromptPool(
  questionStems: readonly string[],
  answerTemplates: readonly string[],
): PromptPair[] {
  return questionStems.flatMap((questionStem) =>
    answerTemplates.flatMap((answerTemplate) =>
      contextAngles.map((angle) => ({
        question: `${questionStem} Cenário: ${angle}.`,
        answer: `${answerTemplate} Contexto aplicado: ${angle}.`,
      })),
    ),
  );
}

function hashString(value: string): number {
  let hash = 0;

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash * 31 + value.charCodeAt(index)) % 2147483647;
  }

  return hash;
}

function rotationSeed(): number {
  const rawSeed = process.env.SEED_ROTATION;

  if (!rawSeed) {
    return Math.floor(Date.now() / 86400000);
  }

  const numeric = Number(rawSeed);
  return Number.isFinite(numeric) ? numeric : hashString(rawSeed);
}

function selectRotatingPrompts(
  pool: PromptPair[],
  count: number,
  key: string,
): PromptPair[] {
  if (pool.length === 0) {
    return [];
  }

  const start = (hashString(key) + rotationSeed()) % pool.length;

  return Array.from({ length: count }, (_, index) =>
    pool[(start + index) % pool.length],
  );
}

function buildCardsForCategory(
  category: (typeof categories)[number],
): Prisma.ReadyFlashcardCreateManyInput[] {
  return levels.flatMap((level) => {
    const beginner = level === "INICIANTE";
    const promptPool = buildPromptPool(
      beginner ? beginnerQuestionStems : advancedQuestionStems,
      beginner ? beginnerAnswerTemplates : advancedAnswerTemplates,
    );

    return selectRotatingPrompts(
      promptPool,
      cardsPerLevel,
      `${track}:${category}:${level}`,
    ).map((prompt) => ({
      track,
      category,
      level,
      question: prompt.question.replaceAll("{category}", category),
      answer: prompt.answer.replaceAll("{category}", category),
    }));
  });
}

async function main() {
  const cards = categories.flatMap((category) =>
    buildCardsForCategory(category),
  );

  await Promise.all(
    categories.map((category) =>
      prisma.readyTheme.upsert({
        where: {
          track_nameKey: {
            track,
            nameKey: category.toLocaleLowerCase("pt-BR"),
          },
        },
        update: {
          name: category,
        },
        create: {
          track,
          name: category,
          nameKey: category.toLocaleLowerCase("pt-BR"),
        },
      }),
    ),
  );

  await prisma.readyFlashcard.deleteMany({
    where: {
      track,
      category: {
        in: [...categories],
      },
    },
  });

  await prisma.readyFlashcard.createMany({ data: cards });

  console.log(
    `Seed concluído: ${cards.length} cards de Segurança da Informação salvos no MongoDB.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
