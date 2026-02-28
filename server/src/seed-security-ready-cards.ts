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

const beginnerSecurityDescriptions: string[] = [
  "Identifique o risco principal: qual ativo está exposto, qual a probabilidade e qual o impacto se explorado.\n\nAplicação: Mapeie ativos críticos e classifique riscos por probabilidade x impacto.",
  "Resposta imediata: quando há evidência de comprometimento ativo, vazamento de dados ou indisponibilidade crítica.\n\nAplicação: Defina critérios claros de severidade e fluxo de escalação.",
  "Controles básicos: autenticação forte, menor privilégio, patches em dia e monitoramento de acessos.\n\nAplicação: Esses controles cobrem a maioria das vulnerabilidades mais exploradas.",
  "Priorize por impacto no negócio: dados sensíveis expostos > indisponibilidade > degradação de serviço.\n\nAplicação: Use matriz de severidade alinhada com áreas de negócio.",
  "Métricas iniciais: tempo médio de detecção (MTTD), tempo de resposta (MTTR) e número de incidentes por tipo.\n\nAplicação: Acompanhe tendências mensais para avaliar evolução da maturidade.",
  "Comunique risco em termos de negócio: impacto financeiro, reputacional e regulatório.\n\nAplicação: Use cenários concretos para que gestão entenda a necessidade de investimento.",
  "Evidências: logs de acesso, trilhas de auditoria, registros de mudança e capturas de tela.\n\nAplicação: Preserve evidências intactas para investigação forense e compliance.",
  "Política simples: defina o que é proibido, quem é responsável e qual a consequência de violação.\n\nAplicação: Políticas curtas e claras têm mais adesão que documentos extensos.",
  "Erro comum: confiar apenas em perímetro, ignorar ameaças internas e não testar controles.\n\nAplicação: Segurança em camadas (defense in depth) é essencial.",
  "Ação preventiva mais efetiva: conscientização do usuário + controles técnicos automáticos.\n\nAplicação: Treinamento regular + automação reduz superfície de ataque significativamente.",
];

const advancedSecurityDescriptions: string[] = [
  "Estratégia resiliente: defesa em profundidade, zero trust, monitoramento contínuo e resposta automatizada.\n\nAplicação: Arquitetura que assume comprometimento e limita raio de explosão.",
  "Equilíbrio usabilidade-segurança: use autenticação adaptativa, SSO e MFA contextuais.\n\nAplicação: Frição excessiva leva usuários a burlar controles — calibre por risco do ativo.",
  "Detecção contínua: SIEM, EDR, NDR integrados com threat intelligence e correlação de eventos.\n\nAplicação: Automatize detecção de IOCs conhecidos e investigue anomalias.",
  "Governança: políticas versionadas, trilha de auditoria completa, métricas executivas e revisão periódica.\n\nAplicação: Compliance é resultado de governança operacional, não apenas checklist.",
  "Validar controles: pentests, red team, tabletop exercises e revisão de configuração automatizada.\n\nAplicação: Controles não testados são apenas hipóteses de segurança.",
  "Automatizar vs. humano: automatize detecção e resposta para eventos conhecidos. Mantenha humano para contexto.\n\nAplicação: SOAR para playbooks repetitivos; analista para investigação e decisões críticas.",
  "Contenção rápida: isolar sistema comprometido, revogar credenciais, preservar evidência e comunicar.\n\nAplicação: Playbooks pré-definidos e testados reduzem MTTR significativamente.",
  "Integrar telemetria: enriquecer alertas com threat intel, contexto de negócio e histórico.\n\nAplicação: Alert fatigue reduz quando alertas têm contexto e priorização clara.",
  "Evitar regressão: baseline de segurança, testes automatizados de configuração e revisão em code review.\n\nAplicação: Pipeline CI com checagens de segurança bloqueia vulnerabilidades antes de produção.",
  "Alinhar segurança e continuidade: RPO/RTO por criticidade, planos testados e comunicação de crise.\n\nAplicação: Continuidade não é só backup — inclui pessoas, processos e tecnologia.",
];

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
        answerDescription: descriptions?.[stemIdx],
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
      beginner ? beginnerQuestionStems : advancedQuestionStems,
      beginner ? beginnerAnswerTemplates : advancedAnswerTemplates,
      beginner ? beginnerSecurityDescriptions : advancedSecurityDescriptions,
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
