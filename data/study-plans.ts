/**
 * Sequências de estudo recomendadas por trilha e nível.
 * As categorias são listadas em ordem de complexidade crescente,
 * permitindo ao usuário aprender de forma progressiva e coesa.
 */

export type StudyLevel = "Iniciante" | "Intermediário" | "Avançado";

export interface StudyPlan {
  track: string;
  level: StudyLevel;
  /** Lista ordenada de categorias do mais básico ao mais avançado */
  sequence: string[];
  /** Dica contextual sobre o plano */
  tip: string;
}

const plans: StudyPlan[] = [
  // ─── Engenharia de Software ───────────────────────────────────────────────
  {
    track: "engenharia-de-software",
    level: "Iniciante",
    sequence: [
      "Git e Versionamento",
      "Algoritmos e Estruturas de Dados",
      "Programação Orientada a Objetos",
      "Clean Code e Boas Práticas",
      "Banco de Dados SQL",
      "APIs REST e GraphQL",
      "Testes de Software",
      "Metodologias Ágeis",
    ],
    tip: "Construa a base de desenvolvimento primeiro: versionamento, lógica, modelagem e qualidade antes de avançar para arquitetura.",
  },
  {
    track: "engenharia-de-software",
    level: "Intermediário",
    sequence: [
      "Arquitetura de Software",
      "Design Patterns",
      "Banco de Dados NoSQL",
      "Docker e Containers",
      "Autenticação e Autorização",
      "Segurança no Desenvolvimento",
      "CI/CD e DevOps",
      "Mensageria e Filas",
    ],
    tip: "Aqui o foco já é engenharia de produto real: arquitetura, integração, entrega contínua e segurança aplicada.",
  },
  {
    track: "engenharia-de-software",
    level: "Avançado",
    sequence: [
      "System Design",
      "Arquitetura de Software",
      "CI/CD e DevOps",
      "Mensageria e Filas",
      "Autenticação e Autorização",
      "Segurança no Desenvolvimento",
      "Design Patterns",
      "Testes de Software",
      "Docker e Containers",
    ],
    tip: "O plano avançado prioriza decisões de escala, integração, confiabilidade e segurança em sistemas distribuídos.",
  },

  // ─── Linguagens de Programação ────────────────────────────────────────────
  {
    track: "linguagens-de-programacao",
    level: "Iniciante",
    sequence: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "SQL",
      "Python",
      "Shell/Bash",
      "React e React Native",
      "Java",
    ],
    tip: "O melhor início combina base web, lógica prática, consultas e automação, sem dispersar cedo demais em stacks pesadas.",
  },
  {
    track: "linguagens-de-programacao",
    level: "Intermediário",
    sequence: [
      "TypeScript",
      "React e React Native",
      "Next.js",
      "Python",
      "Django",
      "Java",
      "Spring Boot",
      "C#",
      "Go",
      "Kotlin",
    ],
    tip: "No nível intermediário, vale estudar ecossistemas completos: linguagem, framework principal e modelo de arquitetura associado.",
  },
  {
    track: "linguagens-de-programacao",
    level: "Avançado",
    sequence: [
      "C",
      "C++",
      "Rust",
      "Go",
      "Kotlin",
      "Swift",
      "Dart",
      "Flutter",
      "Vue.js",
    ],
    tip: "O plano avançado privilegia linguagens e runtimes em que performance, concorrência, mobile nativo e decisões de plataforma fazem diferença real.",
  },

  // ─── Machine Learning e IA ────────────────────────────────────────────────
  {
    track: "machine-learning-e-ia",
    level: "Iniciante",
    sequence: [
      "Estatística para ML",
      "Pré-processamento de Dados",
      "Algoritmos de Regressão",
      "Algoritmos de Classificação",
      "Aprendizado Não Supervisionado",
      "Processamento de Linguagem Natural",
    ],
    tip: "A ordem correta em ML começa por dados e estatística, não por redes neurais. Isso evita aprendizado frágil e decorado.",
  },
  {
    track: "machine-learning-e-ia",
    level: "Intermediário",
    sequence: [
      "Pré-processamento de Dados",
      "Algoritmos de Regressão",
      "Algoritmos de Classificação",
      "Aprendizado Não Supervisionado",
      "Deep Learning e Redes Neurais",
      "Processamento de Linguagem Natural",
      "Visão Computacional",
      "MLOps e Deploy de Modelos",
    ],
    tip: "Neste estágio, o ganho de qualidade vem de conectar modelagem clássica, deep learning e operação de modelos em produção.",
  },
  {
    track: "machine-learning-e-ia",
    level: "Avançado",
    sequence: [
      "Estatística para ML",
      "Deep Learning e Redes Neurais",
      "Processamento de Linguagem Natural",
      "Visão Computacional",
      "IA Generativa e LLMs",
      "MLOps e Deploy de Modelos",
      "Aprendizado Não Supervisionado",
    ],
    tip: "IA avançada exige voltar aos fundamentos estatísticos enquanto aprofunda arquiteturas modernas, avaliação e operação em escala.",
  },

  // ─── Cloud ────────────────────────────────────────────────────────────────
  {
    track: "cloud",
    level: "Iniciante",
    sequence: [
      "Arquitetura em Nuvem",
      "AWS — Fundamentos",
      "Azure — Fundamentos",
      "Segurança em Cloud",
      "Monitoramento e Observabilidade",
      "Containers e Kubernetes",
      "DevOps e CI/CD",
    ],
    tip: "Primeiro entenda conceitos universais de cloud e só depois compare provedores, automação e orquestração.",
  },
  {
    track: "cloud",
    level: "Intermediário",
    sequence: [
      "Containers e Kubernetes",
      "Infrastructure as Code",
      "DevOps e CI/CD",
      "AWS — Serviços Avançados",
      "Azure — Serviços Avançados",
      "Serverless e Functions",
      "Segurança em Cloud",
      "Monitoramento e Observabilidade",
    ],
    tip: "O nível intermediário precisa unir provisionamento, pipeline, observabilidade e uso mais estratégico dos serviços gerenciados.",
  },
  {
    track: "cloud",
    level: "Avançado",
    sequence: [
      "Infrastructure as Code",
      "DevOps e CI/CD",
      "Containers e Kubernetes",
      "AWS — Serviços Avançados",
      "Azure — Serviços Avançados",
      "Google Cloud Platform",
      "Serverless e Functions",
      "Monitoramento e Observabilidade",
      "Segurança em Cloud",
    ],
    tip: "O plano avançado trata cloud como plataforma operacional completa: multi-cloud, automação, resiliência e governança técnica.",
  },

  // ─── Redes de Computadores ────────────────────────────────────────────────
  {
    track: "rede-de-computadores",
    level: "Iniciante",
    sequence: [
      "Modelo OSI e TCP/IP",
      "Endereçamento IP e Sub-redes",
      "DNS, DHCP e NAT",
      "Equipamentos de Rede",
      "Redes Sem Fio (Wi-Fi)",
      "Cabeamento Estruturado",
    ],
    tip: "Uma boa base em redes nasce do entendimento de camadas, endereçamento e serviços essenciais antes de partir para troubleshooting complexo.",
  },
  {
    track: "rede-de-computadores",
    level: "Intermediário",
    sequence: [
      "VLANs e Switching",
      "Protocolos de Roteamento",
      "IPv6",
      "Serviços de Rede (HTTP, FTP, SSH)",
      "Monitoramento e Diagnóstico de Redes",
      "Firewall e Proxy",
      "VPN e Túneis",
      "Segurança de Redes",
      "VoIP e Comunicações Unificadas",
    ],
    tip: "No intermediário, o salto de qualidade vem quando você conecta switching, roteamento, segurança e diagnóstico no mesmo raciocínio operacional.",
  },
  {
    track: "rede-de-computadores",
    level: "Avançado",
    sequence: [
      "Protocolos de Roteamento",
      "Segurança de Redes",
      "Firewall e Proxy",
      "VPN e Túneis",
      "IPv6",
      "Monitoramento e Diagnóstico de Redes",
      "VoIP e Comunicações Unificadas",
      "Serviços de Rede (HTTP, FTP, SSH)",
    ],
    tip: "Em nível avançado, a prioridade é operar redes complexas com segurança, visibilidade, redundância e decisões técnicas bem justificadas.",
  },

  // ─── Segurança da Informação ──────────────────────────────────────────────
  {
    track: "seguranca-da-informacao",
    level: "Iniciante",
    sequence: [
      "Políticas de Segurança",
      "Malwares",
      "Criptografia",
      "Controle de Acesso",
      "Gestão de Riscos",
      "LGPD",
      "Cibersegurança",
    ],
    tip: "Comece por fundamentos de proteção, ameaça, acesso e risco; sem isso, o restante vira ferramenta sem contexto.",
  },
  {
    track: "seguranca-da-informacao",
    level: "Intermediário",
    sequence: [
      "Segurança em Aplicações Web",
      "Segurança de Redes",
      "Certificados Digitais e PKI",
      "Normas ISO 27001/27002",
      "Governança e Compliance",
      "Gestão de Riscos",
      "Segurança em Cloud",
    ],
    tip: "Aqui o objetivo é sair do conceito e entrar em controles concretos, conformidade e superfícies reais de ataque.",
  },
  {
    track: "seguranca-da-informacao",
    level: "Avançado",
    sequence: [
      "Cibersegurança",
      "Forense Digital",
      "DevSecOps",
      "Segurança em Aplicações Web",
      "Segurança em Cloud",
      "Certificados Digitais e PKI",
      "Governança e Compliance",
      "Normas ISO 27001/27002",
    ],
    tip: "O nível avançado combina capacidade ofensiva e defensiva com resposta, evidência, automação de segurança e governança madura.",
  },

  // ─── Matemática ───────────────────────────────────────────────────────────
  {
    track: "matematica",
    level: "Iniciante",
    sequence: [
      "Razão e Proporção",
      "Porcentagem e Regra de Três",
      "Juros Simples e Compostos",
      "Equações e Inequações",
      "Funções",
      "Estatística e Probabilidade",
    ],
    tip: "Sem domínio de proporção, álgebra básica e interpretação de grandezas, os tópicos seguintes ficam artificialmente difíceis.",
  },
  {
    track: "matematica",
    level: "Intermediário",
    sequence: [
      "Funções",
      "Geometria Plana",
      "Geometria Espacial",
      "Progressões (PA e PG)",
      "Lógica Matemática",
      "Análise Combinatória",
      "Estatística e Probabilidade",
    ],
    tip: "O intermediário precisa consolidar visualização geométrica, estruturas algébricas e raciocínio combinatório.",
  },
  {
    track: "matematica",
    level: "Avançado",
    sequence: [
      "Trigonometria",
      "Geometria Analítica",
      "Matrizes e Determinantes",
      "Números Complexos",
      "Análise Combinatória",
      "Estatística e Probabilidade",
      "Lógica Matemática",
      "Funções",
    ],
    tip: "No nível avançado, a meta é navegar bem entre abstração algébrica, geometria analítica e modelagem matemática.",
  },

  // ─── Português ────────────────────────────────────────────────────────────
  {
    track: "portugues",
    level: "Iniciante",
    sequence: [
      "Ortografia",
      "Acentuação Gráfica",
      "Classes de Palavras",
      "Pontuação",
      "Compreensão e Interpretação de Texto",
      "Coesão e Coerência Textual",
      "Formação de Palavras",
    ],
    tip: "O plano inicial de português deve fortalecer leitura e construção textual, e não apenas decorar regra isolada.",
  },
  {
    track: "portugues",
    level: "Intermediário",
    sequence: [
      "Semântica e Vocabulário",
      "Concordância Nominal e Verbal",
      "Regência Nominal e Verbal",
      "Crase",
      "Figuras de Linguagem",
      "Sintaxe do Período Composto",
      "Coesão e Coerência Textual",
    ],
    tip: "No intermediário, vale combinar gramática normativa com interpretação, estilo e relações de sentido.",
  },
  {
    track: "portugues",
    level: "Avançado",
    sequence: [
      "Sintaxe do Período Composto",
      "Variação Linguística",
      "Figuras de Linguagem",
      "Redação Oficial",
      "Compreensão e Interpretação de Texto",
      "Coesão e Coerência Textual",
      "Regência Nominal e Verbal",
    ],
    tip: "O nível avançado de português exige leitura fina, domínio sintático e adaptação de registro conforme contexto e objetivo.",
  },

  // ─── Inglês ───────────────────────────────────────────────────────────────
  {
    track: "ingles",
    level: "Iniciante",
    sequence: [
      "Gramática Fundamental",
      "Vocabulário Essencial",
      "Tempos Verbais",
      "Preposições e Conectivos",
      "Compreensão de Texto",
    ],
    tip: "Inglês evolui melhor quando gramática e vocabulário andam junto com leitura frequente desde o começo.",
  },
  {
    track: "ingles",
    level: "Intermediário",
    sequence: [
      "Tempos Verbais",
      "Preposições e Conectivos",
      "Phrasal Verbs",
      "Expressões Idiomáticas",
      "Compreensão de Texto",
      "Pronúncia e Fonética",
    ],
    tip: "A transição para o intermediário depende de naturalidade: conectivos, phrasal verbs e leitura com menos tradução mental.",
  },
  {
    track: "ingles",
    level: "Avançado",
    sequence: [
      "Compreensão de Texto",
      "Expressões Idiomáticas",
      "Phrasal Verbs",
      "Pronúncia e Fonética",
      "Tempos Verbais",
      "Vocabulário Essencial",
    ],
    tip: "No avançado, o foco sai da regra pura e vai para nuance, fluidez, leitura precisa e comunicação mais natural.",
  },

  // ─── Banco de Dados ───────────────────────────────────────────────────────
  {
    track: "banco-de-dados",
    level: "Iniciante",
    sequence: ["SQL Relacional", "PostgreSQL", "MySQL", "SQL Server", "NoSQL"],
    tip: "Comece dominando modelagem e consulta relacional; bancos específicos fazem mais sentido depois disso.",
  },
  {
    track: "banco-de-dados",
    level: "Intermediário",
    sequence: [
      "SQL Relacional",
      "PostgreSQL",
      "MySQL",
      "SQL Server",
      "MongoDB",
      "Redis",
      "NoSQL",
    ],
    tip: "O nível intermediário deve comparar modelos, engines e casos de uso em vez de tratar banco como tecnologia única.",
  },
  {
    track: "banco-de-dados",
    level: "Avançado",
    sequence: [
      "PostgreSQL",
      "SQL Server",
      "MySQL",
      "MongoDB",
      "Redis",
      "NoSQL",
      "SQL Relacional",
    ],
    tip: "No avançado, a qualidade vem da comparação arquitetural entre motores, consistência, desempenho e padrões de acesso.",
  },

  // ─── Sistemas Operacionais ────────────────────────────────────────────────
  {
    track: "sistemas-operacionais",
    level: "Iniciante",
    sequence: [
      "Conceitos de Sistemas Operacionais",
      "Linux — Comandos Básicos do Terminal",
      "Linux — Gerenciamento de Arquivos e Permissões",
      "Linux — Gerenciamento de Usuários e Grupos",
      "Linux — Gerenciamento de Processos",
      "Linux — Shell Script e Automação",
    ],
    tip: "A base de sistemas operacionais precisa começar por conceito, navegação, permissões e processos antes de administração mais pesada.",
  },
  {
    track: "sistemas-operacionais",
    level: "Intermediário",
    sequence: [
      "Linux — Gerenciamento de Processos",
      "Linux — Shell Script e Automação",
      "Windows Server — Serviços de Rede",
      "Windows Server — Active Directory",
      "Windows Server — GPO",
      "Windows Server — Backup e Recuperação",
    ],
    tip: "O intermediário deve ligar administração Linux e serviços Windows, porque esse é o cenário comum em ambientes corporativos.",
  },
  {
    track: "sistemas-operacionais",
    level: "Avançado",
    sequence: [
      "Windows Server — Active Directory",
      "Windows Server — GPO",
      "Windows Server — Serviços de Rede",
      "Windows Server — Hyper-V",
      "Windows Server — Backup e Recuperação",
      "Linux — Shell Script e Automação",
      "Linux — Gerenciamento de Processos",
    ],
    tip: "No avançado, o objetivo é operar serviços críticos, padronização, virtualização e automação com visão de continuidade.",
  },

  // ─── Governança de TI ─────────────────────────────────────────────────────
  {
    track: "governanca-de-ti",
    level: "Iniciante",
    sequence: [
      "ITIL 4 — Conceitos Fundamentais",
      "ITIL 4 — Quatro Dimensões do Gerenciamento",
      "ITIL 4 — Cadeia de Valor de Serviço",
      "ITIL 4 — Melhoria Contínua",
      "COBIT — Framework e Princípios",
    ],
    tip: "Comece entendendo linguagem, princípios e estrutura mental dos frameworks antes de entrar em medição e implementação.",
  },
  {
    track: "governanca-de-ti",
    level: "Intermediário",
    sequence: [
      "ITIL 4 — Práticas de Gerenciamento",
      "ITIL 4 — Cadeia de Valor de Serviço",
      "COBIT — Framework e Princípios",
      "COBIT — Objetivos de Governança",
      "COBIT — Componentes do Sistema",
      "ITIL 4 — Melhoria Contínua",
    ],
    tip: "No intermediário, governança deixa de ser teoria e passa a ser desenho de processo, responsabilidade e controle.",
  },
  {
    track: "governanca-de-ti",
    level: "Avançado",
    sequence: [
      "COBIT — Objetivos de Governança",
      "COBIT — Componentes do Sistema",
      "COBIT — Métricas e Maturidade",
      "COBIT — Implementação e Design",
      "ITIL 4 — Práticas de Gerenciamento",
      "ITIL 4 — Melhoria Contínua",
    ],
    tip: "O nível avançado trata governança como capacidade de desenho organizacional, medição, priorização e evolução sustentada.",
  },
];

/** Busca o plano de estudos para uma trilha e nível específicos */
export function getStudyPlan(
  track: string,
  level: StudyLevel,
): StudyPlan | null {
  return plans.find((p) => p.track === track && p.level === level) ?? null;
}

export const STUDY_LEVELS: StudyLevel[] = [
  "Iniciante",
  "Intermediário",
  "Avançado",
];

export const STUDY_LEVEL_DESCRIPTIONS: Record<StudyLevel, string> = {
  Iniciante: "Estou começando agora ou tenho pouco contato com o tema.",
  Intermediário: "Já conheço os conceitos básicos e quero aprofundar.",
  Avançado: "Tenho boa base e busco dominar tópicos complexos.",
};

export const STUDY_LEVEL_ICONS: Record<StudyLevel, string> = {
  Iniciante: "🌱",
  Intermediário: "🚀",
  Avançado: "⚡",
};

// ─── Agrupamento de linguagens e seus frameworks ────────────────────────────
export interface LanguageGroup {
  language: string;
  emoji: string;
  icon: string;
  color: string;
  /** Categorias: a própria linguagem + frameworks/ferramentas relacionados */
  categories: string[];
}

export const LANGUAGE_GROUPS: LanguageGroup[] = [
  {
    language: "TypeScript",
    emoji: "🟦",
    icon: "language-typescript",
    color: "#3178C6",
    categories: [
      "TypeScript",
      "React e React Native",
      "Angular",
      "Next.js",
      "Vue.js",
    ],
  },
  {
    language: "JavaScript",
    emoji: "🟨",
    icon: "language-javascript",
    color: "#F0DB4F",
    categories: [
      "JavaScript",
      "React e React Native",
      "Angular",
      "Next.js",
      "Vue.js",
    ],
  },
  {
    language: "Python",
    emoji: "🐍",
    icon: "language-python",
    color: "#3776AB",
    categories: ["Python", "Django"],
  },
  {
    language: "Java",
    emoji: "☕",
    icon: "language-java",
    color: "#E76F00",
    categories: ["Java", "Spring Boot"],
  },
  {
    language: "Kotlin",
    emoji: "🟣",
    icon: "language-kotlin",
    color: "#7F52FF",
    categories: ["Kotlin", "Spring Boot"],
  },
  {
    language: "PHP",
    emoji: "🐘",
    icon: "language-php",
    color: "#777BB4",
    categories: ["PHP", "Laravel"],
  },
  {
    language: "Dart",
    emoji: "🎯",
    icon: "language-dart",
    color: "#0175C2",
    categories: ["Dart", "Flutter"],
  },
  {
    language: "C#",
    emoji: "🟪",
    icon: "language-csharp",
    color: "#68217A",
    categories: ["C#"],
  },
  {
    language: "C",
    emoji: "⚙️",
    icon: "language-c",
    color: "#555555",
    categories: ["C"],
  },
  {
    language: "C++",
    emoji: "🔧",
    icon: "language-cpp",
    color: "#00599C",
    categories: ["C++"],
  },
  {
    language: "Go",
    emoji: "🐹",
    icon: "language-go",
    color: "#00ADD8",
    categories: ["Go"],
  },
  {
    language: "Rust",
    emoji: "🦀",
    icon: "language-rust",
    color: "#CE422B",
    categories: ["Rust"],
  },
  {
    language: "Swift",
    emoji: "🍎",
    icon: "language-swift",
    color: "#FA7343",
    categories: ["Swift"],
  },
  {
    language: "SQL",
    emoji: "🗃️",
    icon: "database",
    color: "#336791",
    categories: ["SQL"],
  },
  {
    language: "Shell/Bash",
    emoji: "💻",
    icon: "console",
    color: "#4EAA25",
    categories: ["Shell/Bash"],
  },
];

function getLanguageSequenceByLevel(
  categories: string[],
  level: StudyLevel,
): string[] {
  if (categories.length <= 2) return categories;

  if (level === "Iniciante") {
    return categories.slice(0, Math.min(2, categories.length));
  }

  if (level === "Intermediário") {
    return categories.slice(0, Math.min(3, categories.length));
  }

  return categories;
}

function getLanguageTip(language: string, level: StudyLevel): string {
  if (level === "Iniciante") {
    return `Comece pela base de ${language} e avance só até o primeiro ecossistema relacionado, para ganhar profundidade antes de ampliar a stack.`;
  }

  if (level === "Intermediário") {
    return `No intermediário, estude ${language} junto com o ecossistema principal para ganhar repertório de projeto real.`;
  }

  return `No avançado, percorra todo o ecossistema de ${language} para comparar abordagens, trade-offs e usos mais maduros.`;
}

export function getLanguageStudyPlan(
  language: string,
  level: StudyLevel,
): StudyPlan | null {
  const languageGroup = LANGUAGE_GROUPS.find(
    (group) => group.language === language,
  );
  if (!languageGroup) return null;

  return {
    track: "linguagens-de-programacao",
    level,
    sequence: getLanguageSequenceByLevel(languageGroup.categories, level),
    tip: getLanguageTip(language, level),
  };
}
