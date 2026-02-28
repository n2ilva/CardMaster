import { Prisma } from "@prisma/client";
import dotenv from "dotenv";

import { prisma } from "./prisma.js";

dotenv.config();

const levels = ["INICIANTE", "JUNIOR", "PLENO", "SENIOR"] as const;
const cardsPerLevel = 30;

const infraCategories = [
  "Cabeamento Estruturado",
  "Rede de Computadores",
  "Arquitetura de Computadores",
  "Fundamentos de Redes",
  "Infraestrutura e Hardware",
  "Protocolos e Roteamento",
  "Administração e Gestão",
  "Segurança",
  "Tecnologias Modernas",
  "Programação e Suporte",
] as const;

const cloudCategories = ["AWS", "AZURE", "GOOGLE CLOUD", "GERAL"] as const;

const cloudThemes = [
  "Modelos de Serviço",
  "Modelos de Implantação",
  "Conceitos Essenciais",
  "Virtualização",
  "Computação",
  "Redes em Nuvem",
  "Armazenamento",
  "Bancos de Dados",
  "Infraestrutura como Código (IaC)",
  "Conteinerização e Orquestração",
  "CI/CD",
  "Gerenciamento de Identidade e Acesso",
  "Segurança em Nuvem",
  "Plataformas Líderes",
  "Cloud Nativo",
  "Implantação de AI",
  "Engenharia de Dados",
] as const;

const cloudQuestionStems = [
  "Qual prática é mais indicada em {theme} na categoria {category}?",
  "Qual erro recorrente deve ser evitado em {theme} para {category}?",
  "Como estruturar um plano inicial de {theme} em {category}?",
  "Qual métrica priorizar para avaliar {theme} em {category}?",
  "Como reduzir riscos operacionais em {theme} na categoria {category}?",
  "Quais decisões arquiteturais impactam {theme} em {category}?",
  "Como escalar soluções de {theme} mantendo governança em {category}?",
  "Quais controles mínimos de segurança aplicar em {theme} para {category}?",
  "Como melhorar desempenho e custo em cenários de {theme} em {category}?",
  "Qual abordagem de troubleshooting funciona melhor em {theme} para {category}?",
] as const;

const cloudAnswerTemplates = [
  "Em {theme}, padronizar arquitetura, observabilidade e automação reduz falhas e melhora previsibilidade.",
  "Em {theme}, aplicar boas práticas de segurança, IAM e segregação de ambientes reduz risco operacional.",
  "Em {theme}, usar IaC, revisão por pares e versionamento facilita auditoria e rollback confiável.",
  "Em {theme}, monitorar custo, desempenho e disponibilidade orienta decisões técnicas sustentáveis.",
  "Em {theme}, testes contínuos, CI/CD e validações automáticas diminuem erros em produção.",
  "Em {theme}, definir padrões de rede, identidade e criptografia eleva resiliência e compliance.",
  "Em {theme}, priorizar arquitetura cloud nativa com componentes desacoplados melhora escalabilidade.",
  "Em {theme}, criar runbooks e playbooks acelera resposta a incidentes e troubleshooting.",
  "Em {theme}, políticas de backup, recuperação e testes periódicos garantem continuidade do serviço.",
  "Em {theme}, alinhar engenharia de dados e implantação de AI ao ciclo de governança evita retrabalho.",
] as const;

const beginnerInfraPrompts = [
  {
    question: "O que significa infraestrutura de TI em {category}?",
    answer:
      "É o conjunto de recursos que mantém sistemas e serviços funcionando.",
  },
  {
    question: "Para que serve documentação básica em {category}?",
    answer: "Ajuda a equipe a entender configuração e operação do ambiente.",
  },
  {
    question: "O que é um incidente simples em {category}?",
    answer: "É uma falha que afeta o serviço e precisa de correção.",
  },
  {
    question: "Por que monitorar serviços em {category}?",
    answer: "Para identificar problemas cedo e reduzir tempo de parada.",
  },
  {
    question: "O que é backup em {category}?",
    answer: "É uma cópia de segurança para recuperar dados quando necessário.",
  },
  {
    question: "Para que serve checklist operacional em {category}?",
    answer: "Garante execução padronizada e evita esquecimentos.",
  },
  {
    question: "O que é disponibilidade em {category}?",
    answer: "É o tempo em que o serviço fica acessível para uso.",
  },
  {
    question: "Por que usar senhas fortes em {category}?",
    answer: "Reduz risco de acesso indevido aos sistemas.",
  },
  {
    question: "O que significa menor privilégio em {category}?",
    answer: "Cada usuário recebe apenas o acesso necessário.",
  },
  {
    question: "O que é atualização de sistema em {category}?",
    answer: "É aplicar correções e melhorias para segurança e estabilidade.",
  },
  {
    question: "Por que registrar mudanças em {category}?",
    answer: "Facilita auditoria e rollback quando algo falhar.",
  },
  {
    question: "O que é redundância em {category}?",
    answer: "É ter recurso de reserva para evitar ponto único de falha.",
  },
  {
    question: "Para que serve um alerta em {category}?",
    answer: "Avisar rapidamente quando um indicador sai do normal.",
  },
  {
    question: "O que é latência em {category}?",
    answer: "É o tempo de resposta entre pedido e retorno.",
  },
  {
    question: "Por que organizar acesso por perfil em {category}?",
    answer: "Evita permissões excessivas e melhora segurança.",
  },
  {
    question: "O que é capacidade em {category}?",
    answer: "É o limite de carga que o ambiente suporta.",
  },
  {
    question: "Para que serve ambiente de teste em {category}?",
    answer: "Validar mudanças antes de aplicar em produção.",
  },
  {
    question: "O que é restauração de backup em {category}?",
    answer: "Recuperar dados a partir de uma cópia salva.",
  },
  {
    question: "Por que padronizar nomes e recursos em {category}?",
    answer: "Facilita organização, suporte e operação diária.",
  },
  {
    question: "O que é log em {category}?",
    answer: "É o registro de eventos para análise e troubleshooting.",
  },
  {
    question: "Para que serve inventário técnico em {category}?",
    answer: "Mapear ativos para manter controle do ambiente.",
  },
  {
    question: "O que é manutenção preventiva em {category}?",
    answer: "Ações periódicas para evitar falhas maiores.",
  },
  {
    question: "Por que testar plano de contingência em {category}?",
    answer: "Garante que recuperação funcione quando houver falha real.",
  },
  {
    question: "O que significa escalabilidade em {category}?",
    answer: "Capacidade de crescer sem perder desempenho.",
  },
  {
    question: "Para que serve segmentação de rede em {category}?",
    answer: "Separar áreas para melhorar segurança e controle.",
  },
  {
    question: "O que é comunicação de incidente em {category}?",
    answer: "Informar status, impacto e próximos passos para equipe.",
  },
  {
    question: "Por que revisar permissões periodicamente em {category}?",
    answer: "Remove acessos antigos e reduz risco operacional.",
  },
  {
    question: "O que é diagnóstico inicial em {category}?",
    answer: "Primeira análise para entender causa provável do problema.",
  },
  {
    question: "Para que serve runbook em {category}?",
    answer: "Guia passo a passo para operação e solução de falhas.",
  },
  {
    question: "O que é melhoria contínua em {category}?",
    answer: "Ajustes frequentes baseados em dados e incidentes anteriores.",
  },
] as const;

const beginnerCloudQuestionStems = [
  "No básico de {category}, o que é {theme}?",
  "Qual a utilidade inicial de {theme} em {category}?",
  "Qual prática simples ajuda em {theme} para {category}?",
  "Qual cuidado iniciante é importante em {theme} na categoria {category}?",
  "Como explicar {theme} para quem está começando em {category}?",
] as const;

const beginnerCloudAnswerTemplates = [
  "{theme} é um conceito central para organizar recursos de nuvem com segurança e clareza.",
  "Comece em {theme} entendendo o objetivo do serviço e quando ele deve ser usado.",
  "Uma boa prática inicial em {theme} é manter configuração simples e bem documentada.",
  "No início de {theme}, monitore uso e custos para evitar surpresas no ambiente.",
  "Para iniciantes, {theme} fica mais fácil com exemplos práticos e passos curtos.",
] as const;

const infraFocusesByCategory: Record<
  (typeof infraCategories)[number],
  readonly string[]
> = {
  "Cabeamento Estruturado": [
    "padrões TIA/EIA",
    "certificação de enlaces",
    "organização de rack",
    "continuidade elétrica",
  ],
  "Rede de Computadores": [
    "modelo OSI/TCP-IP",
    "sub-redes e CIDR",
    "NAT e roteamento",
    "diagnóstico com ping/traceroute",
  ],
  "Arquitetura de Computadores": [
    "memória cache",
    "processamento paralelo",
    "barramentos",
    "desempenho e gargalos",
  ],
  "Fundamentos de Redes": [
    "endereçamento IPv4/IPv6",
    "switching",
    "DNS/DHCP",
    "protocolos de transporte",
  ],
  "Infraestrutura e Hardware": [
    "redundância física",
    "monitoramento de hardware",
    "manutenção preventiva",
    "capacidade e expansão",
  ],
  "Protocolos e Roteamento": ["OSPF/BGP", "VLAN e trunk", "ACLs", "QoS"],
  "Administração e Gestão": [
    "ITIL e incidentes",
    "mudança controlada",
    "SLA/SLO",
    "inventário de ativos",
  ],
  Segurança: [
    "menor privilégio",
    "hardening",
    "gestão de vulnerabilidades",
    "resposta a incidentes",
  ],
  "Tecnologias Modernas": [
    "virtualização",
    "containers",
    "automação",
    "observabilidade",
  ],
  "Programação e Suporte": [
    "scripts de automação",
    "debug e troubleshooting",
    "integração via API",
    "runbooks",
  ],
};

const cloudFocusesByCategory: Record<
  (typeof cloudCategories)[number],
  readonly string[]
> = {
  AWS: ["IAM", "VPC", "EC2/Lambda", "S3 e resiliência", "Well-Architected"],
  AZURE: [
    "Entra ID",
    "VNets",
    "App Service/Functions",
    "Storage e monitoramento",
    "governança com Policy",
  ],
  "GOOGLE CLOUD": [
    "IAM",
    "VPC",
    "GKE/Cloud Run",
    "BigQuery",
    "SRE e confiabilidade",
  ],
  GERAL: [
    "custos e FinOps",
    "segurança em nuvem",
    "IaC",
    "MLOps",
    "disaster recovery",
  ],
};

const contextAngles = [
  "prova de concurso público",
  "operação crítica 24x7",
  "ambiente híbrido",
  "time enxuto",
  "migração de legado",
  "restrição orçamentária",
  "compliance regulatório",
  "alta demanda de usuários",
  "incidente em produção",
  "escala nacional",
] as const;

type PromptPair = {
  question: string;
  answer: string;
};

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

const prompts = [
  {
    question: "Quais fundamentos são essenciais para atuar com {category}?",
    answer:
      "Em {category}, dominar conceitos-base e boas práticas operacionais reduz incidentes e melhora previsibilidade.",
  },
  {
    question: "Quais erros comuns iniciantes cometem em {category}?",
    answer:
      "Em {category}, os erros mais comuns vêm de configuração sem validação, ausência de monitoramento e documentação insuficiente.",
  },
  {
    question: "Como criar uma rotina de diagnóstico rápido em {category}?",
    answer:
      "Em {category}, use checklist de sintomas, métricas-chave e histórico para reduzir tempo de resolução.",
  },
  {
    question: "Como priorizar segurança em cenários de {category}?",
    answer:
      "Em {category}, aplique princípio do menor privilégio, segmentação e auditoria contínua de mudanças.",
  },
  {
    question: "Quais indicadores ajudam a medir maturidade em {category}?",
    answer:
      "Para {category}, acompanhe disponibilidade, tempo de resposta, taxa de falha e tempo médio de recuperação.",
  },
  {
    question: "Como reduzir indisponibilidade em operações de {category}?",
    answer:
      "Em {category}, combine redundância, automação de rollback e testes periódicos de contingência.",
  },
  {
    question: "Qual papel da documentação técnica em {category}?",
    answer:
      "Em {category}, documentação atualizada acelera troubleshooting e facilita transferência de conhecimento.",
  },
  {
    question: "Como padronizar configuração em ambientes de {category}?",
    answer:
      "Em {category}, use templates versionados e revisão por pares para manter consistência entre ambientes.",
  },
  {
    question: "Quais práticas evitam mudanças arriscadas em {category}?",
    answer:
      "Em {category}, realize mudanças em janela controlada, com plano de teste e plano de reversão definido.",
  },
  {
    question: "Como melhorar observabilidade em {category}?",
    answer:
      "Em {category}, consolide logs, métricas e alertas com correlação para identificar causa raiz com rapidez.",
  },
  {
    question: "Quais critérios usar para escolher ferramentas em {category}?",
    answer:
      "Em {category}, avalie compatibilidade, custo total, curva de aprendizado e suporte operacional.",
  },
  {
    question: "Como aplicar automação de forma segura em {category}?",
    answer:
      "Em {category}, automatize tarefas repetitivas com validações, logs e execução idempotente.",
  },
  {
    question: "Como tratar incidentes críticos envolvendo {category}?",
    answer:
      "Em {category}, priorize contenção, comunicação objetiva, correção incremental e pós-mortem acionável.",
  },
  {
    question: "Qual a importância de capacidade e planejamento em {category}?",
    answer:
      "Em {category}, capacity planning evita saturação, melhora performance e reduz custos inesperados.",
  },
  {
    question: "Como testar resiliência de soluções em {category}?",
    answer:
      "Em {category}, simule falhas reais e valide recuperação, tolerância e degradação controlada.",
  },
  {
    question: "Quais riscos de compliance devem ser observados em {category}?",
    answer:
      "Em {category}, mapeie dados sensíveis, trilhas de auditoria e políticas de retenção e acesso.",
  },
  {
    question: "Como equilibrar custo e desempenho em {category}?",
    answer:
      "Em {category}, monitore consumo real, ajuste dimensionamento e elimine recursos ociosos.",
  },
  {
    question:
      "Como conduzir troubleshooting orientado por hipóteses em {category}?",
    answer:
      "Em {category}, formule hipóteses mensuráveis, teste uma variável por vez e registre resultados.",
  },
  {
    question: "Quais rotinas de manutenção preventiva ajudam em {category}?",
    answer:
      "Em {category}, atualização controlada, revisão de alertas e análise de tendência previnem falhas maiores.",
  },
  {
    question: "Como preparar ambiente de homologação para temas de {category}?",
    answer:
      "Em {category}, espelhe requisitos críticos de produção para validar mudanças com menor risco.",
  },
  {
    question: "Como definir SLOs úteis para serviços ligados a {category}?",
    answer:
      "Em {category}, SLOs devem refletir impacto no usuário e orientar prioridades de melhoria contínua.",
  },
  {
    question: "Como evitar pontos únicos de falha em {category}?",
    answer:
      "Em {category}, distribua componentes críticos e valide failover regularmente.",
  },
  {
    question:
      "Qual abordagem de backup e recuperação é recomendada para {category}?",
    answer:
      "Em {category}, combine políticas de backup frequente com testes reais de restauração.",
  },
  {
    question: "Como reduzir tempo de onboarding técnico em {category}?",
    answer:
      "Em {category}, disponibilize runbooks, exemplos práticos e trilhas de aprendizado progressivas.",
  },
  {
    question: "Quais boas práticas de versionamento ajudam em {category}?",
    answer:
      "Em {category}, versionar mudanças facilita auditoria, rollback e coordenação entre equipes.",
  },
  {
    question: "Como lidar com crescimento de demanda em {category}?",
    answer:
      "Em {category}, projete escalabilidade horizontal/vertical e monitore limites operacionais continuamente.",
  },
  {
    question: "Como melhorar confiabilidade operacional em {category}?",
    answer:
      "Em {category}, padronize procedimentos, automatize validações e aprenda com incidentes passados.",
  },
  {
    question: "Quais decisões arquiteturais impactam mais em {category}?",
    answer:
      "Em {category}, decisões de acoplamento, redundância e observabilidade determinam estabilidade de longo prazo.",
  },
  {
    question: "Como estruturar checklist de produção para {category}?",
    answer:
      "Em {category}, inclua segurança, capacidade, monitoramento, rollback e critérios de aceitação.",
  },
  {
    question: "Quais competências diferenciam nível sênior em {category}?",
    answer:
      "Em {category}, visão sistêmica, tomada de decisão orientada por dados e liderança técnica em incidentes.",
  },
] as const;

function cleanAnswerForButton(answer: string): string {
  return answer
    .replace(/^Resposta\s+[A-D]:\s*/i, "")
    .replace(/^Categoria\s+[^.]+\.\s*/i, "")
    .replace(/^Em\s+[^,]+,\s*/i, "")
    .replace(/^Em\s+aplicações\s+[^,]+,\s*/i, "")
    .replace(/^Em\s+sistemas\s+[^,]+,\s*/i, "")
    .replace(/^Em\s+times\s+[^,]+,\s*/i, "")
    .replace(/^Para\s+[^,]+,\s*/i, "")
    .replace(/^Com\s+[^,]+,\s*/i, "")
    .trim();
}

function buildCards(
  track: "INFRAESTRUTURA" | "CLOUD",
  category: string,
): Prisma.ReadyFlashcardCreateManyInput[] {
  return levels.flatMap((level) => {
    const promptSource = level === "INICIANTE" ? beginnerInfraPrompts : prompts;
    const focuses = infraFocusesByCategory[
      category as (typeof infraCategories)[number]
    ] ?? ["boas práticas operacionais"];

    const promptPool = promptSource.flatMap((prompt) =>
      focuses.flatMap((focus) =>
        contextAngles.map((angle) => ({
          question: `${prompt.question} Foco: ${focus}. Cenário: ${angle}.`,
          answer: `${prompt.answer} Foco prático: ${focus}. Contexto: ${angle}.`,
        })),
      ),
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
      answer: cleanAnswerForButton(
        prompt.answer.replaceAll("{category}", category),
      ),
    }));
  });
}

function buildCloudCards(
  category: (typeof cloudCategories)[number],
): Prisma.ReadyFlashcardCreateManyInput[] {
  return levels.flatMap((level) => {
    const focuses = cloudFocusesByCategory[category];
    const questionSource =
      level === "INICIANTE" ? beginnerCloudQuestionStems : cloudQuestionStems;
    const answerSource =
      level === "INICIANTE"
        ? beginnerCloudAnswerTemplates
        : cloudAnswerTemplates;

    const promptPool = questionSource.flatMap((questionStem) =>
      answerSource.flatMap((answerTemplate) =>
        cloudThemes.flatMap((theme) =>
          focuses.flatMap((focus) =>
            contextAngles.map((angle) => ({
              question: `${questionStem
                .replaceAll("{theme}", theme)
                .replaceAll(
                  "{category}",
                  category,
                )} Foco: ${focus}. Cenário: ${angle}.`,
              answer: `${answerTemplate
                .replaceAll("{theme}", theme)
                .replaceAll(
                  "{category}",
                  category,
                )} Foco prático: ${focus}. Contexto: ${angle}.`,
            })),
          ),
        ),
      ),
    );

    return selectRotatingPrompts(
      promptPool,
      cardsPerLevel,
      `CLOUD:${category}:${level}`,
    ).map((prompt) => ({
      track: "CLOUD",
      category,
      level,
      question: prompt.question,
      answer: cleanAnswerForButton(prompt.answer),
    }));
  });
}

async function main() {
  const infraCards = infraCategories.flatMap((category) =>
    buildCards("INFRAESTRUTURA", category),
  );
  const cloudCards = cloudCategories.flatMap((category) =>
    buildCloudCards(category),
  );
  const cards = [...infraCards, ...cloudCards];

  await prisma.readyFlashcard.deleteMany({
    where: {
      OR: [
        {
          track: "INFRAESTRUTURA",
          category: { in: [...infraCategories] },
        },
        {
          track: "CLOUD",
          category: {
            in: [...cloudCategories, "Azure", "Google Cloud"],
          },
        },
      ],
    },
  });

  await prisma.readyFlashcard.createMany({ data: cards });

  console.log(
    `Seed concluído: ${cards.length} cards de Infra + Cloud salvos no MongoDB.`,
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
