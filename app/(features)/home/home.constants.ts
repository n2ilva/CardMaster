import { type TrackIcon } from "@/constants/track-styles";

export type HomeFeatureItem = {
  icon: TrackIcon;
  text: string;
};

export const HOME_FEATURES: HomeFeatureItem[] = [
  {
    icon: "auto-awesome",
    text: "Crie um planejamento de estudos personalizado",
  },
  { icon: "extension", text: "Monte código arrastando peças como quebra-cabeça" },
  { icon: "menu-book", text: "Glossário interativo com termos técnicos" },
  { icon: "lightbulb", text: "Explicações detalhadas e exemplos práticos" },
  { icon: "emoji-events", text: "Medalhas: Bronze, Prata, Ouro e Diamante" },
  { icon: "leaderboard", text: "Ranking comunitário por nível de medalha" },
  { icon: "speed", text: "Pontuação por acertos e velocidade de resposta" },
  { icon: "timer", text: "Temporizador por questão em tempo real" },
  { icon: "code", text: "Exercícios de código com drag-and-drop interativo" },
  { icon: "play-circle-filled", text: "Retome lições de onde parou" },
  { icon: "bar-chart", text: "Progresso detalhado por categoria e nível" },
  { icon: "auto-awesome", text: "Repetição espaçada adaptativa (SRS)" },
];
