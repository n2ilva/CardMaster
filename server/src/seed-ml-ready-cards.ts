import { Prisma } from "@prisma/client";
import dotenv from "dotenv";

import { prisma } from "./prisma.js";

dotenv.config();

const track = "MACHINE_LEARNING" as const;

const categories = [
  "IA Generativa em Produção",
  "Multimodalidade",
  "Engenharia de Contexto",
  "Modelos de Domínio Específico",
  "Modelos Leves (Edge AI/Quantização)",
  "Fine-Tuning Eficiente (PEFT)",
  "IA Agêntica (Agentic AI)",
  "AutoML Avançado",
  "Governança de ML (ML Governance)",
  "MLOps e LLMOps",
  "Gradient Boosting Machines (GBM)",
  "Redes Neurais (Deep Learning)",
  "Aprendizado Federado (Federated Learning)",
  "Cientista de Dados/ML Engineer",
  "Colaboração Humano-IA",
] as const;

const levels = ["INICIANTE", "JUNIOR", "PLENO", "SENIOR"] as const;
const cardsPerLevel = 60;

const contestBoards = [
  "CESPE/CEBRASPE",
  "FGV",
  "FCC",
  "VUNESP",
  "IBFC",
  "Quadrix",
  "AOCP",
  "IDECAN",
  "IADES",
  "FUNDATEC",
  "CESGRANRIO",
] as const;

function expandQuestionStemsToTarget(
  baseStems: readonly string[],
  target: number,
): string[] {
  if (baseStems.length >= target) {
    return [...baseStems];
  }

  const variants: string[] = [];
  let pointer = 0;

  while (baseStems.length + variants.length < target) {
    const stem = baseStems[pointer % baseStems.length];
    const board =
      contestBoards[
        Math.floor(pointer / baseStems.length) % contestBoards.length
      ];
    variants.push(`[${board}] ${stem}`);
    pointer += 1;
  }

  return [...baseStems, ...variants];
}

const beginnerQuestionStems = [
  "Qual o objetivo principal de {category} em um produto digital?",
  "Quando {category} costuma trazer mais valor para o negócio?",
  "Qual indicador simples ajuda a medir sucesso em {category}?",
  "Qual erro comum de início deve ser evitado em {category}?",
  "Como explicar {category} para um time não técnico?",
  "Qual pré-requisito mínimo para começar com {category}?",
  "Como validar rapidamente uma hipótese em {category}?",
  "Qual risco operacional básico aparece em {category}?",
  "Que tipo de dado costuma ser essencial em {category}?",
  "Quando uma abordagem simples é melhor em {category}?",
] as const;

const advancedQuestionStems = [
  "Como desenhar arquitetura escalável para {category} em produção?",
  "Quais trade-offs entre custo, latência e qualidade em {category}?",
  "Como monitorar drift e regressão de performance em {category}?",
  "Quais controles de segurança e compliance são críticos em {category}?",
  "Como estruturar avaliação offline e online para {category}?",
  "Como reduzir alucinação e aumentar confiabilidade em {category}?",
  "Quando usar abordagem híbrida em vez de modelo único em {category}?",
  "Como planejar rollout progressivo e rollback seguro em {category}?",
  "Quais práticas aumentam reprodutibilidade em pipelines de {category}?",
  "Como alinhar métricas técnicas e métricas de negócio em {category}?",
] as const;

const beginnerAnswerTemplates = [
  "Em {category}, o foco inicial é resolver um problema claro, com métrica objetiva e escopo pequeno para aprender rápido.",
  "Para {category}, comece com dados de qualidade mínima, baseline simples e ciclo curto de validação com usuários.",
  "Uma boa prática em {category} é priorizar confiabilidade e observabilidade antes de otimizações avançadas.",
  "No início de {category}, evite sobreengenharia e mantenha critérios de aceitação mensuráveis.",
  "Em {category}, comunique ganhos em termos de tempo, custo, risco e experiência do usuário.",
] as const;

const advancedAnswerTemplates = [
  "Em {category}, combine avaliação contínua, monitoramento em produção e governança para manter qualidade ao escalar.",
  "Para {category}, trate custo, latência e precisão como dimensões de produto, com SLOs e revisão periódica.",
  "Em cenários de {category}, versione dados/modelos/prompts e automatize testes para reduzir regressões.",
  "Em {category}, segurança e compliance exigem controle de acesso, rastreabilidade e políticas de uso bem definidas.",
  "Para {category}, decisões de arquitetura devem considerar evolução incremental e estratégia clara de rollback.",
] as const;

const contextAngles = [
  "ambiente regulado",
  "produto B2B de larga escala",
  "startup com time enxuto",
  "latência crítica em produção",
  "alto volume de usuários",
  "dados sensíveis",
  "integração com sistemas legados",
  "orçamento limitado",
  "jornada mobile-first",
  "pipeline com múltiplos modelos",
  "necessidade de auditoria",
  "expansão internacional",
] as const;

const beginnerMLDescriptions: string[] = [
  "O objetivo é resolver um problema claro do produto com métricas objetivas. ML deve gerar valor mensurável.\n\nAplicação: Defina o problema de negócio antes de escolher abordagem técnica.",
  "Traz mais valor quando há dados suficientes, problema bem definido e métrica clara de sucesso.\n\nAplicação: Comece por problemas onde a solução manual é cara ou lenta.",
  "Indicadores: taxa de acerto, latência da predição, custo por inferência e satisfação do usuário.\n\nAplicação: Defina baseline humano para comparar com o modelo.",
  "Erros comuns: pular validação de dados, treinar sem baseline, ignorar custos e não medir drift.\n\nAplicação: Comece simples, meça resultados e evolua incrementalmente.",
  "Explique em termos de impacto: 'reduz tempo de X para Y' ou 'automatiza com Z% de acerto'.\n\nAplicação: Use métricas de negócio ao comunicar com stakeholders.",
  "Pré-requisitos: dados representativos, problema definido, infra mínima e equipe com conhecimento básico.\n\nAplicação: Sem dados de qualidade, nenhum modelo produzirá bons resultados.",
  "Validação rápida: protótipo com dados reais, métricas claras e feedback de usuários em ciclo curto.\n\nAplicação: PoC/notebook para validar hipótese antes de pipeline completo.",
  "Riscos: modelo com resultados errados em produção, custos inesperados e dados sensíveis mal protegidos.\n\nAplicação: Monitore saída em produção e tenha fallback manual.",
  "Dados essenciais: representativos, em volume suficiente, com qualidade verificada e labels confiáveis.\n\nAplicação: Invista em qualidade de dados antes de sofisticar o modelo.",
  "Abordagem simples é melhor quando dados são poucos, interpretabilidade é crítica ou prazo é curto.\n\nAplicação: Regressão logística pode superar redes neurais em cenários simples.",
];

const advancedMLDescriptions: string[] = [
  "Arquitetura escalável: desacople treinamento de inferência, cache de predições, auto-scaling e monitoramento.\n\nAplicação: Versione modelos com registro central e separe serving de training.",
  "Trade-offs: modelo maior = melhor qualidade mas mais custo e latência. Avalie o que o produto tolera.\n\nAplicação: Defina SLOs para latência e custo por predição.",
  "Drift: monitore distribuição de features e target, métricas de performance e dados fora do domínio.\n\nAplicação: Alertas para degradação e retreino periódico.",
  "Segurança: controle de acesso a dados/modelos, rastreabilidade de predições e políticas de uso.\n\nAplicação: LGPD e regulações exigem explicabilidade e controle sobre dados pessoais.",
  "Offline: holdout, cross-validation, métricas por segmento. Online: A/B test, canary, métricas de negócio.\n\nAplicação: Offline valida o modelo; online valida o impacto no produto.",
  "Reduzir alucinação: grounding com dados reais, RAG, guardrails de saída e human-in-the-loop.\n\nAplicação: Nunca confie em saída de LLM sem verificação para decisões críticas.",
  "Híbrida: combine regras, modelos clássicos e deep learning conforme complexidade de cada sub-problema.\n\nAplicação: Ensemble ou pipeline simples + complexo reduz custo e risco.",
  "Rollout: canary com % pequeno, métricas de impacto e rollback automático se degradar.\n\nAplicação: Feature flags para modelos permitem rollback instantâneo.",
  "Reprodutibilidade: versione dados, código, configuração e ambiente. Seeds fixos e artefatos armazenados.\n\nAplicação: MLflow, DVC ou W&B para rastreabilidade completa.",
  "Alinhar métricas: conecte accuracy/F1 a métricas de produto (conversão, NPS, receita).\n\nAplicação: Dashboard compartilhado entre ML e produto.",
];

const expandedBeginnerQuestionStems = expandQuestionStemsToTarget(
  beginnerQuestionStems,
  cardsPerLevel,
);
const expandedAdvancedQuestionStems = expandQuestionStemsToTarget(
  advancedQuestionStems,
  cardsPerLevel,
);

type PromptPair = {
  question: string;
  answer: string;
  answerDescription?: string;
};

function stripMetadata(text: string): string {
  return text
    .replace(/\s*Foco\s*(?:prático)?\s*:[^.]*\./gi, "")
    .replace(/\s*Cenário\s*:[^.]*\./gi, "")
    .replace(/\s*Contexto\s*(?:aplicado)?\s*:[^.]*\./gi, "")
    .trim();
}

function buildPromptPool(
  questionStems: readonly string[],
  answerTemplates: readonly string[],
  descriptions?: readonly string[],
): PromptPair[] {
  return questionStems.flatMap((questionStem, stemIdx) =>
    answerTemplates.flatMap((answerTemplate) =>
      contextAngles.map((angle) => ({
        question: `${questionStem} Cenário: ${angle}.`,
        answer: `${answerTemplate} Contexto aplicado: ${angle}.`,
        answerDescription: descriptions?.[stemIdx % descriptions.length],
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

  const extractBaseQuestion = (question: string): string =>
    question.split(" Foco:")[0].split(" Cenário:")[0].trim();

  const groupsMap = new Map<string, PromptPair[]>();
  for (const prompt of pool) {
    const groupKey = extractBaseQuestion(prompt.question);
    const existing = groupsMap.get(groupKey);
    if (existing) {
      existing.push(prompt);
    } else {
      groupsMap.set(groupKey, [prompt]);
    }
  }

  const groups = Array.from(groupsMap.values());
  if (groups.length === 0) {
    return [];
  }

  const baseSeed = hashString(`${key}:${rotationSeed()}`);
  const groupStart = baseSeed % groups.length;
  const pointers = groups.map(
    (group, index) => hashString(`${key}:group:${index}`) % group.length,
  );

  const selected: PromptPair[] = [];
  for (let index = 0; index < count; index += 1) {
    const groupIndex = (groupStart + index) % groups.length;
    const group = groups[groupIndex];
    const pointer = pointers[groupIndex] % group.length;
    selected.push(group[pointer]);
    pointers[groupIndex] = (pointer + 1) % group.length;
  }

  return selected;
}

function buildCardsForCategory(
  category: (typeof categories)[number],
): Prisma.ReadyFlashcardCreateManyInput[] {
  return levels.flatMap((level) => {
    const beginner = level === "INICIANTE";
    const promptPool = buildPromptPool(
      beginner ? [...beginnerQuestionStems] : [...advancedQuestionStems],
      beginner ? beginnerAnswerTemplates : advancedAnswerTemplates,
      beginner ? beginnerMLDescriptions : advancedMLDescriptions,
    );

    return selectRotatingPrompts(
      promptPool,
      cardsPerLevel,
      `${track}:${category}:${level}`,
    ).map((prompt) => ({
      track,
      category,
      level,
      question: stripMetadata(
        prompt.question.replaceAll("{category}", category),
      ),
      answer: stripMetadata(prompt.answer.replaceAll("{category}", category)),
      ...(prompt.answerDescription && {
        answerDescription: prompt.answerDescription.replaceAll(
          "{category}",
          category,
        ),
      }),
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
    `Seed concluído: ${cards.length} cards de Machine Learning salvos no MongoDB.`,
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
