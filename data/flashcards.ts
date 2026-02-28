export type SeniorityLevel = "INICIANTE" | "JUNIOR" | "PLENO" | "SENIOR";

export type Track =
  | "DESENVOLVIMENTO"
  | "INFRAESTRUTURA"
  | "CLOUD"
  | "MACHINE_LEARNING"
  | "SEGURANCA_INFORMACAO"
  | "MATEMATICA"
  | "PORTUGUES";

export type ReadyFlashcard = {
  id: string;
  track: Track;
  category: string;
  level: SeniorityLevel;
  question: string;
  answer: string;
};

export const pointsByLevel: Record<SeniorityLevel, number> = {
  INICIANTE: 5,
  JUNIOR: 10,
  PLENO: 20,
  SENIOR: 35,
};

export const tracks = {
  DESENVOLVIMENTO: [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "CSS",
    "Tailwind CSS",
  ],
  INFRAESTRUTURA: [
    "Cabeamento Estruturado",
    "Rede de Computadores",
    "Arquitetura de Computadores",
    "Sistemas Operacionais",
  ],
  CLOUD: ["AWS", "Azure", "Google Cloud"],
  MACHINE_LEARNING: [
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
  ],
  SEGURANCA_INFORMACAO: [
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
  ],
  MATEMATICA: [
    "Matemática Básica e Aritmética",
    "Raciocínio Lógico e Matemática Discreta",
    "Matemática para TI",
  ],
  PORTUGUES: [
    "Compreensão e Interpretação de Textos",
    "Sintaxe",
    "Morfologia",
    "Ortografia e Acentuação",
    "Semântica",
  ],
};
