/**
 * generator.ts — loader de cards
 *
 * Para adicionar ou editar perguntas, edite apenas o arquivo de banco
 * da trilha correspondente em data/cards/banks/<trilha>.ts
 */

import { trackCategories } from "@/data/tracks";
import type { UserLevel } from "@/lib/api";

import { cloudBank }           from "./banks/cloud";
import { desenvolvimentoBank } from "./banks/desenvolvimento";
import { linguagensBank }      from "./banks/linguagens";
import { machineLearningBank } from "./banks/machine-learning";
import { matematicaBank }      from "./banks/matematica";
import { portuguesBank }       from "./banks/portugues";
import { redesBank }           from "./banks/redes";
import { segurancaBank }       from "./banks/seguranca";

// ---------------------------------------------------------------------------
// Tipos publicos
// ---------------------------------------------------------------------------

export type SeedCard = {
  q: string;
  o: [string, string, string, string];
  c: number;
  e: string;
  x: string;
};

export type GeneratedCard = {
  id: string;
  track: string;
  category: string;
  difficulty: UserLevel;
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  example: string;
};

// ---------------------------------------------------------------------------
// Mapa de bancos por trilha
// ---------------------------------------------------------------------------

const BANKS: Record<string, Record<string, Record<UserLevel, SeedCard[]>>> = {
  "cloud":                     cloudBank,
  "desenvolvimento":           desenvolvimentoBank,
  "linguagens-de-programacao": linguagensBank,
  "machine-learning-e-ia":     machineLearningBank,
  "matematica":                matematicaBank,
  "portugues":                 portuguesBank,
  "rede-de-computadores":      redesBank,
  "seguranca-da-informacao":   segurancaBank,
};

const DIFFICULTIES: UserLevel[] = ["Fácil", "Médio", "Difícil"] as UserLevel[];

// ---------------------------------------------------------------------------
// Funcoes publicas
// ---------------------------------------------------------------------------

export function generateCardsForCategory(
  track: string,
  category: string,
  difficulty: UserLevel,
): GeneratedCard[] {
  const trackBank = BANKS[track];
  const cards: SeedCard[] = trackBank?.[category]?.[difficulty] ?? [];
  return cards.map((card, i) => ({
    id:           `${track}__${category}__${difficulty}__${i + 1}`,
    track,
    category,
    difficulty,
    question:     card.q,
    options:      card.o,
    correctIndex: card.c,
    explanation:  card.e,
    example:      card.x,
  }));
}

export function generateCardsForCategoryAllDifficulties(
  track: string,
  category: string,
): GeneratedCard[] {
  return DIFFICULTIES.flatMap((d) =>
    generateCardsForCategory(track, category, d),
  );
}

export function generateAllCards(): GeneratedCard[] {
  return Object.entries(trackCategories).flatMap(([track, categories]) =>
    categories.flatMap((category) =>
      generateCardsForCategoryAllDifficulties(track, category),
    ),
  );
}
