export type SeniorityLevel = "INICIANTE" | "JUNIOR" | "PLENO" | "SENIOR";

export type Track = "DESENVOLVIMENTO" | "INFRAESTRUTURA" | "CLOUD";

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
};
