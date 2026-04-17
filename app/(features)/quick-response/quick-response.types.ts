export type QuickResponseDifficulty = 'fácil' | 'médio' | 'difícil';

export type QuickResponseOption = {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
};

export type QuickResponseExercise = {
  id: string;
  level: QuickResponseDifficulty;
  alert: string;
  options: QuickResponseOption[];
};

export type QuickResponseCategory = {
  id: string;
  name: string;
  description: string;
  color: string;
  exercises: QuickResponseExercise[];
};

export type QuickResponseData = {
  game: string;
  version: string;
  categories: QuickResponseCategory[];
};
