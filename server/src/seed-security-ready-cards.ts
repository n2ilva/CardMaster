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
const cardsPerLevel = 20;

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

function buildCardsForCategory(
  category: (typeof categories)[number],
): Prisma.ReadyFlashcardCreateManyInput[] {
  return levels.flatMap((level) =>
    Array.from({ length: cardsPerLevel }, (_, index) => {
      const beginner = level === "INICIANTE";
      const questionSource = beginner
        ? beginnerQuestionStems
        : advancedQuestionStems;
      const answerSource = beginner
        ? beginnerAnswerTemplates
        : advancedAnswerTemplates;

      const question = questionSource[index % questionSource.length].replaceAll(
        "{category}",
        category,
      );
      const answer = answerSource[index % answerSource.length].replaceAll(
        "{category}",
        category,
      );

      return {
        track,
        category,
        level,
        question,
        answer,
      };
    }),
  );
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
