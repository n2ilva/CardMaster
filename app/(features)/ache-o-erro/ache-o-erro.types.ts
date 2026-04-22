export type Level = 'junior' | 'pleno' | 'senior';

export type Token = {
  id: string;
  value: string;
};

export type DebugExercise = {
  id: string;
  title: string;
  description: string;
  code_tokens: Token[];
  extra_tokens: Token[];
  correct_order: string[];
  explanation: string;
  hints?: string[];
  level: Level;
  language: string;
};

export type PlacedToken = {
  instanceId: string;
  tokenId: string;
  value: string;
};

export type LanguageInfo = {
  id: string;
  label: string;
  icon: string;
  color: string;
};
