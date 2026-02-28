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
  | "MACHINE_LEARNING"
  | "SEGURANCA_INFORMACAO";

const seniorityLevels = ["INICIANTE", "JUNIOR", "PLENO", "SENIOR"] as const;
const tracks = [
  "DESENVOLVIMENTO",
  "INFRAESTRUTURA",
  "CLOUD",
  "MACHINE_LEARNING",
  "SEGURANCA_INFORMACAO",
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

type CategoryInsight = {
  category: string;
  track: Track;
  summary: string;
  applications: string[];
  basicExample: string;
};

const trackContext: Record<Track, string> = {
  DESENVOLVIMENTO:
    "engenharia de software com foco em código limpo, testes, APIs e arquitetura",
  INFRAESTRUTURA:
    "operação e sustentação de ambientes com confiabilidade, redes e observabilidade",
  CLOUD:
    "arquitetura em nuvem com escalabilidade, segurança, automação e controle de custos",
  MACHINE_LEARNING:
    "soluções de IA/ML com ciclo de dados, treinamento, avaliação e operação em produção",
  SEGURANCA_INFORMACAO:
    "proteção de ativos digitais, gestão de riscos, conformidade e resposta a incidentes",
};

type CategoryInsightProfile = {
  summary: string;
  applications: [string, string, string];
  basicExample: string;
};

function categoryKey(category: string): string {
  return category.trim().toLocaleLowerCase("pt-BR");
}

const categoryInsightProfiles: Record<string, CategoryInsightProfile> = {
  javascript: {
    summary:
      "JavaScript é linguagem central para aplicações web modernas, com uso intenso em frontend e backend com Node.js.",
    applications: [
      "Construção de interfaces web reativas e componentes reutilizáveis.",
      "Desenvolvimento de APIs e serviços assíncronos com Node.js.",
      "Automação de build, testes e tarefas de integração contínua.",
    ],
    basicExample:
      "Criar uma API simples em Node.js com rota GET para listar cards e validação básica de entrada.",
  },
  java: {
    summary:
      "Java é linguagem amplamente cobrada em concursos e usada em sistemas corporativos robustos com forte tipagem e ecossistema maduro.",
    applications: [
      "Backends empresariais com Spring Boot e integração com bancos relacionais.",
      "Sistemas transacionais com requisitos de confiabilidade e escalabilidade.",
      "Microserviços com mensageria, observabilidade e autenticação centralizada.",
    ],
    basicExample:
      "Implementar endpoint REST em Spring Boot para cadastro de usuário com validação e tratamento de exceções.",
  },
  "c#": {
    summary:
      "C# é linguagem forte no ecossistema .NET, muito usada em APIs, sistemas corporativos e integrações com nuvem.",
    applications: [
      "APIs com ASP.NET Core e autenticação JWT.",
      "Aplicações corporativas com Entity Framework e arquitetura limpa.",
      "Serviços assíncronos e filas para processamento desacoplado.",
    ],
    basicExample:
      "Criar controller em ASP.NET Core com rota POST para persistir entidade com EF Core e retornar status adequado.",
  },
  "c++": {
    summary:
      "C++ é linguagem de alto desempenho, usada em sistemas críticos, aplicações de baixa latência e software embarcado.",
    applications: [
      "Desenvolvimento de componentes com controle fino de memória.",
      "Aplicações de alta performance e processamento intensivo.",
      "Soluções embarcadas e integração com hardware.",
    ],
    basicExample:
      "Implementar classe com RAII para gerenciar recurso de arquivo sem vazamento de memória.",
  },
  kotlin: {
    summary:
      "Kotlin é linguagem moderna usada em Android e backend, com foco em produtividade e segurança contra null.",
    applications: [
      "Apps Android com arquitetura MVVM e coroutines.",
      "APIs backend com Ktor ou Spring em ambientes JVM.",
      "Integração gradual com bases legadas Java.",
    ],
    basicExample:
      "Criar função suspend para buscar dados de API e atualizar estado de tela no Android.",
  },
  python: {
    summary:
      "Python é linguagem versátil muito demandada em automação, backend, dados e IA, além de bastante cobrada em provas.",
    applications: [
      "APIs com FastAPI/Django e validação de payloads.",
      "Scripts de automação e integração entre sistemas.",
      "Pipelines de dados e prototipação de modelos de ML.",
    ],
    basicExample:
      "Criar endpoint FastAPI para receber requisição, validar schema e devolver resposta padronizada.",
  },
  "cabeamento estruturado": {
    summary:
      "Cabeamento Estruturado define padrões físicos para redes confiáveis, com organização, manutenção e expansão facilitadas.",
    applications: [
      "Planejamento de patch panels e identificação de pontos de rede.",
      "Certificação de enlaces e redução de falhas intermitentes.",
      "Padronização de infraestrutura para ambientes corporativos.",
    ],
    basicExample:
      "Montar checklist de instalação com etiquetagem, teste de continuidade e documentação de portas.",
  },
  "rede de computadores": {
    summary:
      "Rede de Computadores cobre comunicação entre dispositivos, roteamento, segmentação e diagnóstico de conectividade.",
    applications: [
      "Configuração de sub-redes, gateways e roteamento básico.",
      "Troubleshooting com ping, traceroute e análise de latência.",
      "Segmentação de rede para desempenho e segurança.",
    ],
    basicExample:
      "Dividir uma rede /24 em sub-redes e definir gateway correto para cada VLAN.",
  },
  "arquitetura de computadores": {
    summary:
      "Arquitetura de Computadores aborda CPU, memória, cache e barramentos, influenciando desempenho de sistemas.",
    applications: [
      "Análise de gargalos de processamento e memória.",
      "Escolha de hardware conforme perfil de carga.",
      "Otimização de execução com paralelismo e cache.",
    ],
    basicExample:
      "Comparar impacto de cache miss no tempo de resposta de uma aplicação intensiva em leitura.",
  },
  "fundamentos de redes": {
    summary:
      "Fundamentos de Redes reúne conceitos base como OSI/TCP-IP, IP, portas e protocolos essenciais.",
    applications: [
      "Configuração inicial de conectividade em ambientes corporativos.",
      "Interpretação de tráfego por camadas de protocolo.",
      "Resolução de falhas básicas de DNS/DHCP e roteamento.",
    ],
    basicExample:
      "Diagnosticar perda de acesso validando IP, máscara, gateway e resolução DNS.",
  },
  "infraestrutura e hardware": {
    summary:
      "Infraestrutura e Hardware envolve disponibilidade física, capacidade, redundância e manutenção preventiva.",
    applications: [
      "Planejamento de capacidade para evitar saturação de recursos.",
      "Estratégias de redundância de energia e armazenamento.",
      "Gestão de ciclo de vida de equipamentos críticos.",
    ],
    basicExample:
      "Definir plano de manutenção preventiva para servidores com monitoramento de temperatura e disco.",
  },
  "protocolos e roteamento": {
    summary:
      "Protocolos e Roteamento trata da troca de rotas, segmentação de tráfego e políticas de encaminhamento.",
    applications: [
      "Configuração de protocolos dinâmicos como OSPF/BGP.",
      "Aplicação de ACL e QoS para controle de tráfego.",
      "Estratégias de alta disponibilidade entre links.",
    ],
    basicExample:
      "Criar regra de ACL para permitir apenas tráfego HTTP/HTTPS entre duas redes.",
  },
  "administração e gestão": {
    summary:
      "Administração e Gestão foca em processos operacionais, governança, métricas de serviço e melhoria contínua.",
    applications: [
      "Gestão de incidentes, problemas e mudanças.",
      "Definição e acompanhamento de SLA/SLO.",
      "Documentação e auditoria de operações críticas.",
    ],
    basicExample:
      "Montar fluxo de incidentes com classificação por severidade e tempo alvo de resolução.",
  },
  segurança: {
    summary:
      "Segurança (Infra) concentra controles técnicos para proteger rede, servidores e dados contra ameaças operacionais.",
    applications: [
      "Hardening de servidores e revisão de privilégios.",
      "Gestão de vulnerabilidades e patching contínuo.",
      "Monitoramento de eventos e resposta a incidentes.",
    ],
    basicExample:
      "Aplicar baseline de hardening em servidor Linux e validar portas expostas com varredura controlada.",
  },
  "tecnologias modernas": {
    summary:
      "Tecnologias Modernas em infraestrutura inclui virtualização, automação, containers e observabilidade.",
    applications: [
      "Provisionamento automatizado com scripts e IaC.",
      "Execução de workloads em containers com isolamento.",
      "Monitoramento centralizado com métricas e logs.",
    ],
    basicExample:
      "Subir serviço containerizado com healthcheck e coletar métricas básicas de CPU/memória.",
  },
  "programação e suporte": {
    summary:
      "Programação e Suporte integra automação operacional com análise de falhas e suporte técnico estruturado.",
    applications: [
      "Criação de scripts para tarefas repetitivas de operação.",
      "Automação de coleta de evidências para troubleshooting.",
      "Padronização de runbooks e procedimentos de suporte.",
    ],
    basicExample:
      "Criar script que verifica serviços críticos e envia alerta quando algum ficar indisponível.",
  },
  aws: {
    summary:
      "AWS é plataforma cloud com amplo portfólio para computação, dados e segurança em escala global.",
    applications: [
      "Hospedagem de APIs e aplicações com EC2, ECS e Lambda.",
      "Armazenamento e backup com S3 e políticas de ciclo de vida.",
      "Segurança e governança com IAM, VPC e CloudWatch.",
    ],
    basicExample:
      "Publicar API em serviço gerenciado, armazenar arquivos em S3 e monitorar erros no CloudWatch.",
  },
  azure: {
    summary:
      "Azure oferece serviços corporativos para aplicações, integração e governança com forte aderência ao ecossistema Microsoft.",
    applications: [
      "Publicação de APIs com App Service e Functions.",
      "Gestão de identidade com Entra ID e RBAC.",
      "Monitoramento e policy para compliance de recursos.",
    ],
    basicExample:
      "Subir API no App Service com identidade gerenciada para acessar banco sem senha no código.",
  },
  "google cloud": {
    summary:
      "Google Cloud combina serviços de dados, containers e computação gerenciada com foco em escala e analytics.",
    applications: [
      "Deploy de serviços em Cloud Run ou GKE.",
      "Analytics e BI com BigQuery.",
      "Segurança e IAM para controle de acesso granular.",
    ],
    basicExample:
      "Publicar serviço no Cloud Run e registrar métricas de latência para otimizar autoscaling.",
  },
  geral: {
    summary:
      "Cloud Geral cobre fundamentos transversais de arquitetura, custos, segurança e operação em múltiplos provedores.",
    applications: [
      "Desenho de arquitetura resiliente multiambiente.",
      "Gestão de custos e direitos de uso de recursos.",
      "Automação de deploy e governança com IaC.",
    ],
    basicExample:
      "Comparar duas arquiteturas cloud para escolher entre menor custo mensal e maior disponibilidade.",
  },
  "ia generativa em produção": {
    summary:
      "IA Generativa em Produção trata da entrega confiável de modelos generativos com controle de qualidade e risco.",
    applications: [
      "Assistentes internos para acelerar fluxos operacionais.",
      "Geração assistida de conteúdo com revisão humana.",
      "Automação de tarefas repetitivas com políticas de segurança.",
    ],
    basicExample:
      "Criar endpoint que recebe contexto, consulta modelo e aplica validações antes de retornar resposta.",
  },
  multimodalidade: {
    summary:
      "Multimodalidade combina texto, imagem, áudio e outros sinais para melhorar entendimento e resposta de sistemas de IA.",
    applications: [
      "Análise conjunta de documento e imagem em atendimento.",
      "Classificação de conteúdo com múltiplas fontes de entrada.",
      "Experiências conversacionais enriquecidas por mídia.",
    ],
    basicExample:
      "Receber imagem + pergunta textual e retornar descrição estruturada com campos principais.",
  },
  "engenharia de contexto": {
    summary:
      "Engenharia de Contexto organiza instruções e dados relevantes para elevar precisão de respostas em IA generativa.",
    applications: [
      "Montagem de prompts com políticas e conhecimento de domínio.",
      "Uso de histórico e metadados para respostas consistentes.",
      "Controle de contexto para reduzir ambiguidades e alucinações.",
    ],
    basicExample:
      "Construir prompt template com seção de regras, contexto e formato obrigatório de saída.",
  },
  "modelos de domínio específico": {
    summary:
      "Modelos de Domínio Específico são ajustados para áreas como jurídico, saúde ou finanças, com vocabulário e regras próprias.",
    applications: [
      "Classificação e extração de informação em documentos especializados.",
      "Assistência técnica em processos regulados por domínio.",
      "Aumento de precisão em tarefas com jargão específico.",
    ],
    basicExample:
      "Treinar classificador para identificar tipos de documento de um domínio e sugerir fluxo adequado.",
  },
  "modelos leves (edge ai/quantização)": {
    summary:
      "Modelos Leves (Edge AI/Quantização) priorizam inferência eficiente em dispositivos com recursos limitados.",
    applications: [
      "Inferência local em dispositivos móveis e IoT.",
      "Redução de latência e custo de processamento em tempo real.",
      "Execução offline para cenários com conectividade instável.",
    ],
    basicExample:
      "Quantizar modelo para 8 bits e medir ganho de tempo de inferência sem perda crítica de acurácia.",
  },
  "fine-tuning eficiente (peft)": {
    summary:
      "Fine-Tuning Eficiente (PEFT) adapta modelos grandes com custo menor, atualizando subconjuntos de parâmetros.",
    applications: [
      "Customização de LLM para domínio interno com baixo custo.",
      "Ciclos rápidos de experimentação e melhoria incremental.",
      "Ajuste de comportamento sem retreinamento completo do modelo.",
    ],
    basicExample:
      "Aplicar LoRA em base de perguntas do domínio e comparar métricas antes/depois do ajuste.",
  },
  "ia agêntica (agentic ai)": {
    summary:
      "IA Agêntica (Agentic AI) coordena planejamento e execução de tarefas com uso de ferramentas e memória de contexto.",
    applications: [
      "Automação de fluxos com múltiplas etapas e decisões.",
      "Orquestração de chamadas a APIs e bases de conhecimento.",
      "Assistentes que executam ações com validação de políticas.",
    ],
    basicExample:
      "Criar agente que consulta base, propõe plano e executa etapas com confirmação humana nas ações críticas.",
  },
  "automl avançado": {
    summary:
      "AutoML Avançado automatiza busca de modelos e hiperparâmetros para acelerar experimentação com governança.",
    applications: [
      "Comparação automática de pipelines candidatos.",
      "Otimização de hiperparâmetros com limites de custo.",
      "Padronização de avaliação e seleção de modelos.",
    ],
    basicExample:
      "Rodar experimento AutoML com budget definido e publicar melhor modelo apenas se superar baseline.",
  },
  "governança de ml (ml governance)": {
    summary:
      "Governança de ML define regras de risco, rastreabilidade e conformidade ao longo do ciclo de vida dos modelos.",
    applications: [
      "Auditoria de dados, features, versões e decisões do modelo.",
      "Controles de aprovação para deploy em produção.",
      "Monitoramento de viés, drift e impacto regulatório.",
    ],
    basicExample:
      "Implementar checklist de governança antes de promover modelo para produção.",
  },
  "mlops e llmops": {
    summary:
      "MLOps e LLMOps unem práticas de engenharia para operar modelos de ML/LLM com confiabilidade e evolução contínua.",
    applications: [
      "Pipeline de treino, avaliação, deploy e monitoramento automatizado.",
      "Versionamento de dados, modelos, prompts e artefatos.",
      "Alertas de performance para rollback e retreinamento.",
    ],
    basicExample:
      "Criar pipeline CI/CD para modelos com teste automático e promoção controlada entre ambientes.",
  },
  "gradient boosting machines (gbm)": {
    summary:
      "Gradient Boosting Machines (GBM) são modelos supervisionados fortes para dados tabulares e tarefas de classificação/regressão.",
    applications: [
      "Scoring de risco e previsão em cenários estruturados.",
      "Modelagem com foco em interpretabilidade por feature importance.",
      "Baseline robusta para comparação com redes neurais.",
    ],
    basicExample:
      "Treinar GBM para classificação binária e validar AUC com cross-validation.",
  },
  "redes neurais (deep learning)": {
    summary:
      "Redes Neurais (Deep Learning) aprendem representações complexas e são essenciais para visão, linguagem e áudio.",
    applications: [
      "Classificação de imagens e reconhecimento de padrões.",
      "Modelos de linguagem e tarefas de NLP.",
      "Sistemas preditivos em dados de alta dimensionalidade.",
    ],
    basicExample:
      "Treinar rede simples com camadas densas e comparar overfitting entre treino e validação.",
  },
  "aprendizado federado (federated learning)": {
    summary:
      "Aprendizado Federado treina modelos de forma distribuída sem centralizar dados sensíveis.",
    applications: [
      "Treino colaborativo entre dispositivos mantendo privacidade.",
      "Redução de risco de exposição de dados brutos.",
      "Ajuste de modelos em ambientes regulados.",
    ],
    basicExample:
      "Simular dois nós de treino local e agregar pesos globalmente sem enviar datasets originais.",
  },
  "cientista de dados/ml engineer": {
    summary:
      "Cientista de Dados/ML Engineer conecta análise, modelagem e engenharia para gerar valor com soluções de IA.",
    applications: [
      "Transformação de problema de negócio em experimento mensurável.",
      "Construção de pipeline de dados e modelos para produção.",
      "Acompanhamento de métricas técnicas e de negócio.",
    ],
    basicExample:
      "Definir baseline de modelo, feature set inicial e plano de monitoramento pós-deploy.",
  },
  "colaboração humano-ia": {
    summary:
      "Colaboração Humano-IA combina automação com revisão humana para decisões mais seguras e efetivas.",
    applications: [
      "Fluxos com aprovação humana em casos críticos.",
      "Assistência à decisão com explicabilidade e trilha de auditoria.",
      "Treinamento contínuo baseado em feedback humano.",
    ],
    basicExample:
      "Criar tela de revisão onde IA sugere resposta e analista aprova, corrige ou rejeita.",
  },
  "ia generativa e deepfakes": {
    summary:
      "IA Generativa e Deepfakes aborda riscos de conteúdo sintético malicioso e técnicas de prevenção/detecção.",
    applications: [
      "Detecção de manipulação de mídia em processos sensíveis.",
      "Políticas de validação de identidade e origem de conteúdo.",
      "Campanhas de conscientização para reduzir fraude digital.",
    ],
    basicExample:
      "Definir fluxo de checagem para conteúdo suspeito com validação de metadados e dupla revisão humana.",
  },
  "defesa automatizada": {
    summary:
      "Defesa Automatizada usa regras e orquestração para reduzir tempo de detecção e resposta a ameaças.",
    applications: [
      "Playbooks SOAR para contenção inicial de incidentes.",
      "Automação de bloqueios com critérios de risco.",
      "Correlação de alertas para priorização operacional.",
    ],
    basicExample:
      "Configurar playbook que isola endpoint quando detectar comportamento de ransomware.",
  },
  "engenharia social e phishing": {
    summary:
      "Engenharia Social e Phishing explora fator humano para roubo de credenciais e acesso indevido.",
    applications: [
      "Treinamentos periódicos com simulações realistas.",
      "Filtros de e-mail e validação de remetentes.",
      "Procedimentos de reporte rápido de mensagens suspeitas.",
    ],
    basicExample:
      "Executar campanha simulada de phishing e medir taxa de clique por equipe para plano de melhoria.",
  },
  "identidade como perímetro": {
    summary:
      "Identidade como Perímetro coloca IAM, MFA e contexto de acesso no centro da estratégia de segurança.",
    applications: [
      "Controle granular de acesso por função e risco.",
      "Políticas de acesso condicional por dispositivo/local.",
      "Revisão contínua de privilégios e contas críticas.",
    ],
    basicExample:
      "Implementar MFA obrigatório para contas administrativas e acesso condicional para sistemas críticos.",
  },
  "segurança em nuvem (cspm/dspm)": {
    summary:
      "Segurança em Nuvem (CSPM/DSPM) monitora postura de configuração e exposição de dados em ambientes cloud.",
    applications: [
      "Detecção de configurações inseguras em recursos cloud.",
      "Mapeamento de dados sensíveis e risco de exposição.",
      "Correção contínua com políticas automatizadas.",
    ],
    basicExample:
      "Criar regra que alerta bucket público com dados sensíveis e dispara remediação automática.",
  },
  "continuidade de negócios": {
    summary:
      "Continuidade de Negócios garante operação mínima em cenários de falha grave, desastre ou ataque.",
    applications: [
      "Definição de RTO/RPO por serviço crítico.",
      "Planos de contingência e testes periódicos de recuperação.",
      "Comunicação de crise e priorização de restauração.",
    ],
    basicExample:
      "Executar teste de recuperação de serviço crítico validando tempo real de retorno e integridade dos dados.",
  },
  "evolução do ransomware": {
    summary:
      "Evolução do Ransomware inclui táticas de dupla extorsão e movimentação lateral com alto impacto operacional.",
    applications: [
      "Segmentação de rede e proteção de backups imutáveis.",
      "Detecção de comportamentos anômalos em endpoints e servidores.",
      "Resposta rápida com isolamento e plano de recuperação.",
    ],
    basicExample:
      "Validar estratégia de backup imutável e simular restauração completa após incidente crítico.",
  },
  "regulação rígida": {
    summary:
      "Regulação Rígida exige aderência a requisitos legais de privacidade, segurança e auditoria contínua.",
    applications: [
      "Implementação de controles e evidências de conformidade.",
      "Mapeamento de riscos regulatórios por processo.",
      "Governança de dados com trilha de auditoria.",
    ],
    basicExample:
      "Criar matriz de controles regulatórios vinculada a evidências técnicas e responsáveis.",
  },
  "preparação pós-quântica (pqc)": {
    summary:
      "Preparação Pós-Quântica (PQC) trata da transição criptográfica para algoritmos resistentes a ataques quânticos.",
    applications: [
      "Inventário de ativos criptográficos e dependências.",
      "Plano de migração gradual para algoritmos pós-quânticos.",
      "Teste de interoperabilidade em ambientes híbridos.",
    ],
    basicExample:
      "Mapear certificados e bibliotecas usadas hoje e definir ordem de migração para suites pós-quânticas.",
  },
  "segurança em iot/ot (cidades conectadas)": {
    summary:
      "Segurança em IoT/OT protege dispositivos e infraestrutura crítica conectada com foco em disponibilidade e segurança física.",
    applications: [
      "Segmentação de redes industriais e IoT.",
      "Gestão de firmware e vulnerabilidades em dispositivos.",
      "Monitoramento contínuo de anomalias operacionais.",
    ],
    basicExample:
      "Definir zona de rede isolada para sensores críticos e monitorar tráfego fora do padrão esperado.",
  },
};

function generateCategoryInsight(
  track: Track,
  category: string,
): CategoryInsight {
  const normalized = category.trim();
  const profile = categoryInsightProfiles[categoryKey(normalized)];

  if (profile) {
    return {
      category: normalized,
      track,
      summary: profile.summary,
      applications: profile.applications,
      basicExample: profile.basicExample,
    };
  }

  const baseSummary = `${normalized} é um tópico de ${trackContext[track]}, frequentemente cobrado em mercado e concursos por impactar decisões técnicas e operacionais.`;

  const baseApplications = [
    `Aplicar ${normalized} no desenho de soluções com critérios de qualidade e risco.`,
    `Usar ${normalized} para melhorar confiabilidade, desempenho e governança no dia a dia.`,
    `Avaliar ${normalized} em cenários práticos de prova, produção e troubleshooting.`,
  ];

  const lower = normalized.toLocaleLowerCase("pt-BR");

  if (
    lower.includes("aws") ||
    lower.includes("azure") ||
    lower.includes("google")
  ) {
    return {
      category: normalized,
      track,
      summary: `${normalized} representa uma plataforma cloud estratégica para provisionar serviços com alta disponibilidade, segurança e escalabilidade sob demanda.`,
      applications: [
        "Provisionamento de infraestrutura e serviços gerenciados para aplicações web/API.",
        "Implementação de segurança com identidade, redes privadas e políticas de acesso.",
        "Automação de deploy e operação com observabilidade e controle de custos.",
      ],
      basicExample:
        "Exemplo básico: publicar uma API em serviço gerenciado, armazenar arquivos em object storage e monitorar métricas de disponibilidade.",
    };
  }

  if (
    lower.includes("phishing") ||
    lower.includes("ransomware") ||
    lower.includes("deepfake")
  ) {
    return {
      category: normalized,
      track,
      summary: `${normalized} é um vetor de ameaça relevante que exige prevenção, detecção e resposta coordenada entre tecnologia, processo e pessoas.`,
      applications: [
        "Treinamento contínuo de usuários e simulações controladas para reduzir engenharia social.",
        "Monitoramento de comportamento suspeito e contenção rápida de incidentes.",
        "Planos de continuidade, backup testado e recuperação para minimizar impacto. ",
      ],
      basicExample:
        "Exemplo básico: criar campanha interna anti-phishing com métricas de clique e reforço educacional por área.",
    };
  }

  if (
    lower.includes("mlops") ||
    lower.includes("llmops") ||
    lower.includes("automl")
  ) {
    return {
      category: normalized,
      track,
      summary: `${normalized} organiza o ciclo de vida de modelos de IA com versionamento, automação, monitoramento e governança contínua.`,
      applications: [
        "Automatizar treino, validação e deploy de modelos com pipelines reproduzíveis.",
        "Monitorar drift e qualidade para evitar degradação em produção.",
        "Rastrear dados, modelos e prompts para auditoria e melhoria contínua.",
      ],
      basicExample:
        "Exemplo básico: pipeline que treina modelo semanalmente, valida métricas e publica nova versão apenas se superar baseline.",
    };
  }

  return {
    category: normalized,
    track,
    summary: baseSummary,
    applications: baseApplications,
    basicExample: `Exemplo básico: montar um mini-caso de ${normalized} com objetivo, métrica de sucesso e uma ação prática de implementação.`,
  };
}

type LevelProgressStats = {
  totalCards: number;
  studiedCards: number;
  correctCards: number;
  studiedPercent: number;
  correctPercent: number;
  unlocked: boolean;
  completed: boolean;
  categories: {
    category: string;
    cards: number;
    attempts: number;
    correctAttempts: number;
    correctPercent: number;
    averageDurationSeconds: number;
  }[];
};

type CategoryProgressStats = {
  category: string;
  studiedPercent: number;
  levels: Record<SeniorityLevel, LevelProgressStats>;
};

async function getUserReadyCardsProgress(userId: string, track?: Track) {
  const attemptsWindowSize = 30;
  const approvalPercent = 80;
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
        level: true,
        createdAt: true,
        durationSeconds: true,
      },
      orderBy: { createdAt: "desc" },
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

  const latestAttemptsByLevel = orderedLevels.reduce(
    (accumulator, level) => {
      accumulator[level] = [];
      return accumulator;
    },
    {} as Record<SeniorityLevel, boolean[]>,
  );

  for (const attempt of attempts) {
    const bucket = latestAttemptsByLevel[attempt.level];
    if (bucket.length >= attemptsWindowSize) {
      continue;
    }
    bucket.push(attempt.isCorrect);
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

  const cardMetadataMap = new Map<
    string,
    { category: string; level: SeniorityLevel }
  >();

  for (const card of cards) {
    cardMetadataMap.set(card.id, {
      category: card.category,
      level: card.level,
    });
  }

  const levelCategoryStats = orderedLevels.reduce(
    (accumulator, level) => {
      accumulator[level] = new Map<
        string,
        {
          uniqueCardIds: Set<string>;
          attempts: number;
          correctAttempts: number;
          durationSum: number;
          durationCount: number;
        }
      >();
      return accumulator;
    },
    {} as Record<
      SeniorityLevel,
      Map<
        string,
        {
          uniqueCardIds: Set<string>;
          attempts: number;
          correctAttempts: number;
          durationSum: number;
          durationCount: number;
        }
      >
    >,
  );

  for (const attempt of attempts) {
    if (!attempt.readyCardId) {
      continue;
    }

    const metadata = cardMetadataMap.get(attempt.readyCardId);
    if (!metadata) {
      continue;
    }

    const categoryMap = levelCategoryStats[attempt.level];
    const existing = categoryMap.get(metadata.category) ?? {
      uniqueCardIds: new Set<string>(),
      attempts: 0,
      correctAttempts: 0,
      durationSum: 0,
      durationCount: 0,
    };

    existing.uniqueCardIds.add(attempt.readyCardId);
    existing.attempts += 1;
    if (attempt.isCorrect) {
      existing.correctAttempts += 1;
    }
    if (
      attempt.durationSeconds !== null &&
      attempt.durationSeconds !== undefined
    ) {
      existing.durationSum += attempt.durationSeconds;
      existing.durationCount += 1;
    }

    categoryMap.set(metadata.category, existing);
  }

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
          categories: [],
        },
        JUNIOR: {
          totalCards: 0,
          studiedCards: 0,
          correctCards: 0,
          studiedPercent: 0,
          correctPercent: 0,
          unlocked: false,
          completed: false,
          categories: [],
        },
        PLENO: {
          totalCards: 0,
          studiedCards: 0,
          correctCards: 0,
          studiedPercent: 0,
          correctPercent: 0,
          unlocked: false,
          completed: false,
          categories: [],
        },
        SENIOR: {
          totalCards: 0,
          studiedCards: 0,
          correctCards: 0,
          studiedPercent: 0,
          correctPercent: 0,
          unlocked: false,
          completed: false,
          categories: [],
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
            categories: [],
          },
          JUNIOR: {
            totalCards: 0,
            studiedCards: 0,
            correctCards: 0,
            studiedPercent: 0,
            correctPercent: 0,
            unlocked: false,
            completed: false,
            categories: [],
          },
          PLENO: {
            totalCards: 0,
            studiedCards: 0,
            correctCards: 0,
            studiedPercent: 0,
            correctPercent: 0,
            unlocked: false,
            completed: false,
            categories: [],
          },
          SENIOR: {
            totalCards: 0,
            studiedCards: 0,
            correctCards: 0,
            studiedPercent: 0,
            correctPercent: 0,
            unlocked: false,
            completed: false,
            categories: [],
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
        const attemptsInWindow = latestAttemptsByLevel[level].length;
        const windowCorrect =
          latestAttemptsByLevel[level].filter(Boolean).length;
        const windowCorrectPercent = toPercent(
          windowCorrect,
          attemptsWindowSize,
        );

        levelStats.unlocked =
          attemptsInWindow >= attemptsWindowSize &&
          windowCorrectPercent >= approvalPercent;
        levelStats.completed =
          attemptsInWindow >= attemptsWindowSize && windowCorrectPercent >= 100;

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
      const attemptsInWindow = latestAttemptsByLevel[level].length;
      const windowCorrect = latestAttemptsByLevel[level].filter(Boolean).length;
      const correctPercent = toPercent(windowCorrect, attemptsWindowSize);
      const categories = Array.from(levelCategoryStats[level].entries())
        .map(([category, stats]) => ({
          category,
          cards: stats.uniqueCardIds.size,
          attempts: stats.attempts,
          correctAttempts: stats.correctAttempts,
          correctPercent: toPercent(stats.correctAttempts, stats.attempts),
          averageDurationSeconds:
            stats.durationCount > 0
              ? Math.round(stats.durationSum / stats.durationCount)
              : 0,
        }))
        .sort((left, right) => {
          if (right.cards !== left.cards) {
            return right.cards - left.cards;
          }
          if (right.attempts !== left.attempts) {
            return right.attempts - left.attempts;
          }
          if (right.correctPercent !== left.correctPercent) {
            return right.correctPercent - left.correctPercent;
          }
          return left.category.localeCompare(right.category, "pt-BR");
        });

      accumulator[level] = {
        totalCards: attemptsWindowSize,
        studiedCards: attemptsInWindow,
        correctCards: windowCorrect,
        studiedPercent: toPercent(attemptsInWindow, attemptsWindowSize),
        correctPercent,
        unlocked:
          attemptsInWindow >= attemptsWindowSize &&
          correctPercent >= approvalPercent,
        completed:
          attemptsInWindow >= attemptsWindowSize && correctPercent >= 100,
        categories,
      };
      return accumulator;
    },
    {} as Record<SeniorityLevel, LevelProgressStats>,
  );

  let currentLevel: SeniorityLevel = "INICIANTE";
  if (levelProgress.SENIOR.unlocked) {
    currentLevel = "SENIOR";
  } else if (levelProgress.PLENO.unlocked) {
    currentLevel = "PLENO";
  } else if (levelProgress.JUNIOR.unlocked) {
    currentLevel = "JUNIOR";
  } else if (levelProgress.INICIANTE.unlocked) {
    currentLevel = "INICIANTE";
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

router.post("/auth/reset-password", async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    newPassword: z.string().min(6),
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
    return res.status(404).json({ message: "Email não encontrado." });
  }

  const passwordHash = await bcrypt.hash(parsed.data.newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash },
  });

  return res.json({ message: "Senha redefinida com sucesso." });
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

const SESSION_SIZE = 30;

router.get(
  "/ready-cards/session",
  requireAuth,
  async (req: AuthenticatedRequest, res) => {
    const querySchema = z.object({
      track: z.enum(tracks),
      level: z.enum(seniorityLevels),
      category: z.string().min(1),
    });

    const parsedQuery = querySchema.safeParse(req.query);
    if (!parsedQuery.success) {
      return res.status(400).json({
        message: "Parâmetros inválidos.",
        issues: parsedQuery.error.issues,
      });
    }

    const { track, level, category } = parsedQuery.data;

    const allCards = await prisma.readyFlashcard.findMany({
      where: { track, level, category },
    });

    if (allCards.length === 0) {
      return res.json([]);
    }

    const cardIds = allCards.map((card) => card.id);

    const attempts = await prisma.sessionAttempt.findMany({
      where: {
        userId: req.userId!,
        readyCardId: { in: cardIds },
      },
      orderBy: { createdAt: "desc" },
      select: {
        readyCardId: true,
        isCorrect: true,
        createdAt: true,
      },
    });

    const now = Date.now();
    const cardStats = new Map<
      string,
      {
        totalAttempts: number;
        wrongCount: number;
        lastAttemptAt: number;
        lastCorrect: boolean;
      }
    >();

    for (const attempt of attempts) {
      if (!attempt.readyCardId) continue;
      const existing = cardStats.get(attempt.readyCardId);
      if (!existing) {
        cardStats.set(attempt.readyCardId, {
          totalAttempts: 1,
          wrongCount: attempt.isCorrect ? 0 : 1,
          lastAttemptAt: attempt.createdAt.getTime(),
          lastCorrect: attempt.isCorrect,
        });
      } else {
        existing.totalAttempts += 1;
        if (!attempt.isCorrect) existing.wrongCount += 1;
      }
    }

    type ScoredCard = { card: (typeof allCards)[number]; priority: number };

    const scored: ScoredCard[] = allCards.map((card) => {
      const stats = cardStats.get(card.id);

      if (!stats) {
        return { card, priority: 50 };
      }

      const hoursSinceLast = (now - stats.lastAttemptAt) / 3600000;
      const errorRate = stats.wrongCount / stats.totalAttempts;

      let priority: number;
      if (stats.lastCorrect) {
        const cooldown = Math.min(errorRate > 0.4 ? 4 : 12, 48);
        priority = hoursSinceLast >= cooldown ? 20 + errorRate * 30 : 5;
      } else {
        priority = 80 + errorRate * 20;
      }

      if (hoursSinceLast < 1 && stats.lastCorrect) {
        priority = 1;
      }

      return { card, priority };
    });

    scored.sort((a, b) => b.priority - a.priority);

    const sessionCards = scored.slice(0, SESSION_SIZE).map((s) => s.card);

    for (let i = sessionCards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [sessionCards[i], sessionCards[j]] = [sessionCards[j], sessionCards[i]];
    }

    return res.json(sessionCards);
  },
);

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

router.get("/ready-themes/insight", async (req, res) => {
  const querySchema = z.object({
    track: z.enum(tracks),
    category: z.string().min(2),
  });

  const parsedQuery = querySchema.safeParse(req.query);
  if (!parsedQuery.success) {
    return res.status(400).json({
      message: "Parâmetros inválidos.",
      issues: parsedQuery.error.issues,
    });
  }

  const insight = generateCategoryInsight(
    parsedQuery.data.track,
    parsedQuery.data.category,
  );
  return res.json(insight);
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
    SEGURANCA_INFORMACAO: 0,
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
      categoryDescription: z.string().optional(),
      questionDescription: z.string().optional(),
      answerDescription: z.string().optional(),
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

    const {
      category,
      categoryDescription,
      questionDescription,
      answerDescription,
      contestName,
      organization,
      year,
      ...cardData
    } = parsed.data;
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
        categoryDescription: categoryDescription?.trim() || undefined,
        questionDescription: questionDescription?.trim() || undefined,
        answerDescription: answerDescription?.trim() || undefined,
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

    const uniqueReadyCardsAttempts = await prisma.sessionAttempt.findMany({
      where: {
        userId: req.userId,
        readyCardId: { not: null },
      },
      select: {
        readyCardId: true,
      },
    });

    const totalUniqueReadyCards = new Set(
      uniqueReadyCardsAttempts
        .map((attempt) => attempt.readyCardId)
        .filter((cardId): cardId is string => Boolean(cardId)),
    ).size;

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
      totalUniqueReadyCards,
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
    const userId = req.userId!;

    const [deletedAttempts, _updatedUser, _deletedRewardProgress] =
      await prisma.$transaction([
        prisma.sessionAttempt.deleteMany({
          where: { userId },
        }),
        prisma.user.update({
          where: { id: userId },
          data: {
            streakDays: 0,
            totalPoints: 0,
          },
        }),
        prisma.userRewardProgress.deleteMany({
          where: { userId },
        }),
      ]);

    return res.json({
      message: "Progresso resetado com sucesso.",
      deletedAttempts: deletedAttempts.count,
    });
  },
);

export { router };
