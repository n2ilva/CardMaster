/**
 * generator.ts — loader de cards
 *
 * Para adicionar ou editar perguntas, edite apenas o arquivo de banco
 * da trilha correspondente em data/cards/banks/<trilha>.ts
 */

import { trackCategories } from "@/data/tracks";
import type { UserLevel } from "@/lib/api";

import { cloudBank } from "./banks/cloud";
import { desenvolvimentoBank } from "./banks/desenvolvimento";
import { linguagensBank } from "./banks/linguagens";
import { machineLearningBank } from "./banks/machine-learning";
import { matematicaBank } from "./banks/matematica";
import { portuguesBank } from "./banks/portugues";
import { redesBank } from "./banks/redes";
import { segurancaBank } from "./banks/seguranca";

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
  cloud: cloudBank,
  desenvolvimento: desenvolvimentoBank,
  "linguagens-de-programacao": linguagensBank,
  "machine-learning-e-ia": machineLearningBank,
  matematica: matematicaBank,
  portugues: portuguesBank,
  "rede-de-computadores": redesBank,
  "seguranca-da-informacao": segurancaBank,
};

const DIFFICULTIES: UserLevel[] = ["Fácil", "Médio", "Difícil"] as UserLevel[];

// ---------------------------------------------------------------------------
// Funcoes auxiliares
// ---------------------------------------------------------------------------

/**
 * Fisher-Yates shuffle algorithm para embaralhar um array
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Embaralha as opções de um card mantendo o índice correto atualizado
 */
function shuffleCardOptions(card: GeneratedCard): GeneratedCard {
  // Cria um array com os índices originais
  const indices = [0, 1, 2, 3];
  const shuffledIndices = shuffle(indices);

  // Mapeia as opções de acordo com os novos índices
  const newOptions: [string, string, string, string] = [
    card.options[shuffledIndices[0]],
    card.options[shuffledIndices[1]],
    card.options[shuffledIndices[2]],
    card.options[shuffledIndices[3]],
  ];

  // Encontra a nova posição da resposta correta
  const newCorrectIndex = shuffledIndices.indexOf(card.correctIndex);

  return {
    ...card,
    options: newOptions,
    correctIndex: newCorrectIndex,
  };
}

/**
 * Seleciona exatamente N cards aleatórios de um array e os embaralha
 */
export function selectRandomCards<T>(cards: T[], limit: number): T[] {
  if (cards.length <= limit) {
    return shuffle(cards);
  }

  // Embaralha e pega apenas os primeiros N
  return shuffle(cards).slice(0, limit);
}

// ---------------------------------------------------------------------------
// Funcoes publicas
// ---------------------------------------------------------------------------

export function generateCardsForCategory(
  track: string,
  category: string,
  difficulty: UserLevel,
  shuffleOptions: boolean = true,
): GeneratedCard[] {
  const trackBank = BANKS[track];
  const cards: SeedCard[] = trackBank?.[category]?.[difficulty] ?? [];
  return cards.map((card, i) => {
    const generatedCard: GeneratedCard = {
      id: `${track}__${category}__${difficulty}__${i + 1}`,
      track,
      category,
      difficulty,
      question: card.q,
      options: card.o,
      correctIndex: card.c,
      explanation: card.e,
      example: card.x,
    };

    // Embaralha as opções se solicitado
    return shuffleOptions ? shuffleCardOptions(generatedCard) : generatedCard;
  });
}

export function generateCardsForCategoryAllDifficulties(
  track: string,
  category: string,
): GeneratedCard[] {
  return DIFFICULTIES.flatMap((d) =>
    generateCardsForCategory(track, category, d),
  );
}

export function getTotalCardsForCategory(
  track: string,
  category: string,
): number {
  return generateCardsForCategoryAllDifficulties(track, category).length;
}

export function generateAllCards(): GeneratedCard[] {
  return Object.entries(trackCategories).flatMap(([track, categories]) =>
    categories.flatMap((category) =>
      generateCardsForCategoryAllDifficulties(track, category),
    ),
  );
}

export function getDatabaseStats() {
  const allCards = generateAllCards();
  const totalCards = allCards.length;
  const activeTracks = Object.keys(BANKS).length;

  return {
    totalCards,
    activeTracks,
  };
}
