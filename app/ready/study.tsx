import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SeniorityLevel, Track } from '@/data/flashcards';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type ReadyCard = {
  id: string;
  category: string;
  categoryDescription?: string;
  questionTag?: string;
  level: SeniorityLevel;
  question: string;
  questionDescription?: string;
  answer: string;
  answerDescription?: string;
  wrongOptions?: string[];
  track: Track;
};

type AnswerGuidance = {
  why: string;
  application: string;
  example: string;
};

type ParsedAnswerDescription = {
  summary: string;
  application: string;
  example: string;
  plain: string;
};

type GuidanceMode =
  | 'conceito'
  | 'pratica'
  | 'seguranca'
  | 'cloud'
  | 'analise'
  | 'comparacao'
  | 'geral';

function shuffleArray<T>(items: T[]): T[] {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function normalizeText(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function stripLeadingGuidancePrefixes(text: string): string {
  return text
    .replace(
      /^\s*(?:justificativa(?:\s+avançada)?|resumo\s+direto|leitura\s+técnica|interpretação\s+de\s+cenário|aplicação\s+estratégica|aplicação\s+prática|exemplo\s+simples|exemplo\s+prático|exemplo\s+com\s+visão\s+de\s+arquitetura)\s*:\s*/i,
      '',
    )
    .trim();
}

function cleanStandaloneDescription(text: string): string {
  return normalizeText(
    stripLeadingGuidancePrefixes(text)
      .replace(/\bResumo\s*:\s*/gi, '')
      .replace(/\bAplicação\s*:\s*/gi, '')
      .replace(/\bExemplo\s*:\s*/gi, ''),
  );
}

function parseAnswerDescription(text?: string): ParsedAnswerDescription {
  const source = stripLeadingGuidancePrefixes((text ?? '').replace(/\r\n/g, '\n').trim());

  if (!source) {
    return {
      summary: '',
      application: '',
      example: '',
      plain: '',
    };
  }

  const summaryMatch = source.match(
    /(?:^|\n)\s*Resumo\s*:\s*([\s\S]*?)(?=\n\s*(?:Aplicação|Exemplo)\s*:|$)/i,
  );
  const applicationMatch = source.match(
    /(?:^|\n)\s*Aplicação\s*:\s*([\s\S]*?)(?=\n\s*Exemplo\s*:|$)/i,
  );
  const exampleMatch = source.match(/(?:^|\n)\s*Exemplo\s*:\s*([\s\S]*?)$/i);

  return {
    summary: normalizeText(summaryMatch?.[1] ?? ''),
    application: normalizeText(applicationMatch?.[1] ?? ''),
    example: normalizeText(exampleMatch?.[1] ?? ''),
    plain: cleanStandaloneDescription(source),
  };
}

function stripQuestionMetadata(text: string): string {
  return normalizeText(
    text
      .replace(/^\[.*?\]\s*/i, '')
      .replace(
        /^(?:Versão concurso:\s*|Em prova de concurso sobre [^,]+,\s*|Noções básicas de concurso:\s*|Questão de concurso:\s*)/i,
        '',
      )
      .replace(/\s+Foco:\s+.*$/i, '')
      .replace(/\s+Cenário:\s+.*$/i, ''),
  );
}

function stripAnswerMetadata(text: string): string {
  return normalizeText(
    text
      .replace(/\s+Foco prático:\s+.*$/i, '')
      .replace(/\s+Contexto aplicado:\s+.*$/i, '')
      .replace(/\s+Contexto:\s+.*$/i, ''),
  );
}

function canonicalAnswerKey(text: string): string {
  return stripAnswerMetadata(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function canonicalQuestionKey(text: string): string {
  return stripQuestionMetadata(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function dedupeCardsByQuestion(cards: ReadyCard[]): ReadyCard[] {
  const seen = new Set<string>();
  const unique: ReadyCard[] = [];

  for (const card of cards) {
    const key = canonicalQuestionKey(card.question);
    if (!key || seen.has(key)) {
      continue;
    }
    seen.add(key);
    unique.push(card);
  }

  return unique;
}

function tokenize(text: string): string[] {
  return normalizeText(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 2);
}

function similarityScore(base: string, candidate: string): number {
  const baseTokens = tokenize(base);
  const candidateTokens = tokenize(candidate);

  if (baseTokens.length === 0 || candidateTokens.length === 0) {
    return 0;
  }

  const baseSet = new Set(baseTokens);
  const candidateSet = new Set(candidateTokens);

  let shared = 0;
  for (const token of candidateSet) {
    if (baseSet.has(token)) {
      shared += 1;
    }
  }

  return shared / Math.max(baseSet.size, candidateSet.size);
}

function generateSimilarDistractors(answer: string): string[] {
  const base = normalizeText(answer);

  const swapPairs: [string, string][] = [
    ['reduz', 'aumenta'],
    ['aumenta', 'reduz'],
    ['melhora', 'piora'],
    ['piora', 'melhora'],
    ['evitar', 'causar'],
    ['causar', 'evitar'],
    ['segurança', 'instabilidade'],
    ['estável', 'instável'],
    ['rápido', 'lento'],
    ['baixo', 'alto'],
    ['alta', 'baixa'],
    ['frequente', 'raro'],
    ['assíncrono', 'síncrono'],
    ['desacoplado', 'fortemente acoplado'],
  ];

  let swapped = base;
  for (const [from, to] of swapPairs) {
    const regex = new RegExp(`\\b${from}\\b`, 'i');
    if (regex.test(swapped)) {
      swapped = swapped.replace(regex, to);
      break;
    }
  }

  const withRestriction = base.includes(' e ')
    ? base.replace(' e ', ' porém com menor foco em ')
    : `${base} com menor prioridade operacional.`;

  const withTradeoff = `${base} com maior custo de manutenção.`;

  const withScopeChange = base.includes('Em ') || base.includes('em ')
    ? base.replace(/\bEm\b/i, 'Em parte dos cenários de')
    : `${base} em cenários específicos.`;

  return Array.from(
    new Set([
      normalizeText(swapped),
      normalizeText(withRestriction),
      normalizeText(withTradeoff),
      normalizeText(withScopeChange),
    ])
  ).filter((item) => item !== base);
}

function chooseBalancedCorrectIndex(recentHistory: number[], optionCount: number): number {
  const counts = Array.from({ length: optionCount }, () => 0);

  for (const index of recentHistory) {
    if (index >= 0 && index < optionCount) {
      counts[index] += 1;
    }
  }

  const minCount = Math.min(...counts);
  let candidates = counts
    .map((count, index) => ({ count, index }))
    .filter((item) => item.count === minCount)
    .map((item) => item.index);

  const lastIndex = recentHistory[recentHistory.length - 1];
  if (candidates.length > 1 && lastIndex !== undefined) {
    const filtered = candidates.filter((index) => index !== lastIndex);
    if (filtered.length > 0) {
      candidates = filtered;
    }
  }

  return candidates[Math.floor(Math.random() * candidates.length)] ?? 0;
}

function buildOptions(cards: ReadyCard[], card: ReadyCard, recentCorrectIndexes: number[]): string[] {
  // Se o card tem wrongOptions pré-definidas (ex: Matemática), usa-las diretamente
  if (card.wrongOptions && card.wrongOptions.length >= 3) {
    const targetCorrectIndex = chooseBalancedCorrectIndex(recentCorrectIndexes, 4);
    const shuffledWrong = shuffleArray(card.wrongOptions.slice(0, 3));
    const finalOptions: string[] = [];
    let wrongPointer = 0;
    for (let i = 0; i < 4; i++) {
      if (i === targetCorrectIndex) {
        finalOptions.push(card.answer);
      } else {
        finalOptions.push(shuffledWrong[wrongPointer]);
        wrongPointer++;
      }
    }
    return finalOptions;
  }

  const sameCategoryAndLevel = cards
    .filter(
      (item) =>
        item.id !== card.id && item.category === card.category && item.level === card.level
    )
    .map((item) => item.answer);

  const sameCategory = cards
    .filter((item) => item.id !== card.id && item.category === card.category)
    .map((item) => item.answer);

  const sameTrack = cards
    .filter((item) => item.id !== card.id && item.track === card.track)
    .map((item) => item.answer);

  const rankedCandidates = Array.from(new Set([...sameCategoryAndLevel, ...sameCategory, ...sameTrack]))
    .map((answer) => ({
      answer,
      score: similarityScore(stripAnswerMetadata(card.answer), stripAnswerMetadata(answer)),
    }))
    .sort((left, right) => right.score - left.score)
    .map((item) => item.answer);

  const canonicalCorrect = canonicalAnswerKey(card.answer);
  const rankedPool: string[] = [];
  const rankedSeen = new Set<string>();

  for (const answer of rankedCandidates) {
    const canonical = canonicalAnswerKey(answer);
    if (!canonical || canonical === canonicalCorrect || rankedSeen.has(canonical)) {
      continue;
    }
    rankedPool.push(answer);
    rankedSeen.add(canonical);
  }

  const generatedDistractors = generateSimilarDistractors(stripAnswerMetadata(card.answer));

  const incorrectAnswers: string[] = [];
  const incorrectSeen = new Set<string>();

  for (const answer of [...generatedDistractors, ...rankedPool]) {
    const canonical = canonicalAnswerKey(answer);
    if (!canonical || canonical === canonicalCorrect || incorrectSeen.has(canonical)) {
      continue;
    }
    incorrectAnswers.push(answer);
    incorrectSeen.add(canonical);
    if (incorrectAnswers.length === 3) {
      break;
    }
  }

  while (incorrectAnswers.length < 3) {
    incorrectAnswers.push(`Variação incorreta ${incorrectAnswers.length + 1} da resposta.`);
  }

  const targetCorrectIndex = chooseBalancedCorrectIndex(recentCorrectIndexes, 4);
  const orderedIncorrectAnswers = shuffleArray(incorrectAnswers);
  const finalOptions: string[] = [];
  let incorrectPointer = 0;

  for (let optionIndex = 0; optionIndex < 4; optionIndex += 1) {
    if (optionIndex === targetCorrectIndex) {
      finalOptions.push(card.answer);
      continue;
    }
    finalOptions.push(orderedIncorrectAnswers[incorrectPointer]);
    incorrectPointer += 1;
  }

  return finalOptions;
}

function formatDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(safeSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function removeTrailingPunctuation(text: string): string {
  return text.replace(/[.!?\s]+$/g, '').trim();
}

function truncateText(text: string, maxLength: number): string {
  const normalized = text.trim();
  if (normalized.length <= maxLength) {
    return normalized;
  }
  return `${normalized.slice(0, maxLength).trimEnd()}...`;
}

function hasAnyToken(text: string, tokens: string[]): boolean {
  return tokens.some((token) => text.includes(token));
}

function detectGuidanceMode(card: ReadyCard): GuidanceMode {
  const base = `${card.track} ${card.category} ${card.question}`.toLowerCase();

  if (
    card.track === 'SEGURANCA_INFORMACAO' ||
    hasAnyToken(base, [
      'segurança',
      'vulnerabilidade',
      'risco',
      'phishing',
      'ransomware',
      'incidente',
      'iam',
      'mfa',
      'criptografia',
    ])
  ) {
    return 'seguranca';
  }

  if (
    card.track === 'CLOUD' ||
    hasAnyToken(base, [
      'cloud',
      'aws',
      'azure',
      'gcp',
      'google cloud',
      'kubernetes',
      'container',
      'iac',
      'terraform',
      'custo',
      'escalabilidade',
    ])
  ) {
    return 'cloud';
  }

  if (hasAnyToken(base, ['diferença', 'compar', 'versus', 'vs', 'melhor'])) {
    return 'comparacao';
  }

  if (hasAnyToken(base, ['diagnóstico', 'troubleshooting', 'causa', 'análise', 'métrica'])) {
    return 'analise';
  }

  if (
    hasAnyToken(base, [
      'como ',
      'implement',
      'aplicar',
      'configurar',
      'deploy',
      'pipeline',
      'automação',
    ])
  ) {
    return 'pratica';
  }

  if (hasAnyToken(base, ['o que é', 'conceito', 'defini', 'fundamento', 'significa'])) {
    return 'conceito';
  }

  return 'geral';
}

function detectQuestionType(card: ReadyCard): string {
  if (card.questionTag?.trim()) {
    return card.questionTag.trim();
  }

  const base = `${card.track} ${card.category} ${card.question}`.toLowerCase();

  if (hasAnyToken(base, ['lógica', 'algoritmo', 'estrutura de dados', 'complexidade'])) {
    return 'Lógica';
  }

  if (
    hasAnyToken(base, ['arquitetura', 'design', 'acoplamento', 'escalabilidade', 'microserviço'])
  ) {
    return 'Arquitetura';
  }

  if (
    card.track === 'SEGURANCA_INFORMACAO' ||
    hasAnyToken(base, ['segurança', 'vulnerabilidade', 'phishing', 'ransomware', 'iam', 'mfa'])
  ) {
    return 'Segurança';
  }

  if (card.track === 'CLOUD' || hasAnyToken(base, ['cloud', 'aws', 'azure', 'gcp', 'terraform'])) {
    return 'Cloud';
  }

  if (hasAnyToken(base, ['rede', 'protocolo', 'roteamento', 'latência', 'dns', 'dhcp'])) {
    return 'Redes';
  }

  if (hasAnyToken(base, ['diagnóstico', 'troubleshooting', 'métrica', 'observabilidade', 'log'])) {
    return 'Diagnóstico';
  }

  if (hasAnyToken(base, ['deploy', 'pipeline', 'ci/cd', 'automação', 'container', 'kubernetes'])) {
    return 'DevOps';
  }

  if (hasAnyToken(base, ['o que é', 'conceito', 'defini', 'fundamento'])) {
    return 'Conceito';
  }

  return 'Prática';
}

function levelWhyComplement(level: SeniorityLevel, mode: GuidanceMode): string {
  if (level === 'INICIANTE') {
    return 'Priorize a alternativa que responde exatamente ao enunciado, sem adicionar hipóteses extras.';
  }

  if (level === 'JUNIOR') {
    return 'Confirme palavras-chave do enunciado e escolha a opção com melhor aderência técnica ao contexto pedido.';
  }

  if (level === 'PLENO') {
    return mode === 'analise' || mode === 'comparacao'
      ? 'Considere impacto, causa raiz e trade-offs antes de validar a alternativa final.'
      : 'Valide a alternativa considerando impacto operacional, consistência técnica e possíveis trade-offs.';
  }

  return mode === 'cloud' || mode === 'seguranca'
    ? 'Além da correção técnica, avalie governança, risco, custo e sustentabilidade da decisão no ambiente real.'
    : 'Além da correção técnica, avalie efeitos sistêmicos, trade-offs e alinhamento com arquitetura de longo prazo.';
}

function buildAnswerGuidance(card: ReadyCard): AnswerGuidance {
  const normalizedAnswer = removeTrailingPunctuation(card.answer);
  const normalizedQuestion = removeTrailingPunctuation(card.question);
  const mode = detectGuidanceMode(card);
  const whyComplement = levelWhyComplement(card.level, mode);
  const parsedDescription = parseAnswerDescription(card.answerDescription);

  const whyCore =
    parsedDescription.summary ||
    (card.answerDescription?.trim()
      ? parsedDescription.plain
      : `A alternativa correta é esta porque responde diretamente ao enunciado com o critério técnico esperado: ${normalizedAnswer}.`);
  const why = `${whyCore} ${whyComplement}`.trim();

  let application =
    parsedDescription.application ||
    `Ao resolver questões de ${card.category}, valide se a alternativa segue exatamente este critério — ${normalizedAnswer}.`;
  let example =
    parsedDescription.example ||
    `Para a pergunta “${truncateText(normalizedQuestion, 110)}”, a escolha correta é a opção que afirma “${truncateText(normalizedAnswer, 110)}”.`;

  if (mode === 'seguranca') {
    application = parsedDescription.application
      ? parsedDescription.application
      : `Em cenários de segurança, priorize a alternativa que reduz risco e exposição real — ${normalizedAnswer}.`;
    example = parsedDescription.example
      ? parsedDescription.example
      : `Diante de ameaça/incidente, a resposta correta é a que fortalece prevenção, detecção ou contenção: “${truncateText(
      normalizedAnswer,
      115,
    )}”.`;
  } else if (mode === 'cloud') {
    application = parsedDescription.application
      ? parsedDescription.application
      : `Em cloud, escolha a opção que melhora confiabilidade, custo e governança ao mesmo tempo — ${normalizedAnswer}.`;
    example = parsedDescription.example
      ? parsedDescription.example
      : `Para “${truncateText(normalizedQuestion, 90)}”, a decisão correta é “${truncateText(
      normalizedAnswer,
      110,
    )}”.`;
  } else if (mode === 'pratica') {
    application = parsedDescription.application
      ? parsedDescription.application
      : `Trate essa resposta como passo operacional recomendado para execução no ambiente real — ${normalizedAnswer}.`;
    example = parsedDescription.example
      ? parsedDescription.example
      : `Quando for implementar o cenário da pergunta, siga o procedimento indicado na alternativa correta: “${truncateText(
      normalizedAnswer,
      115,
    )}”.`;
  } else if (mode === 'analise') {
    application = parsedDescription.application
      ? parsedDescription.application
      : `Em análise/troubleshooting, use a alternativa correta como hipótese principal de diagnóstico — ${normalizedAnswer}.`;
    example = parsedDescription.example
      ? parsedDescription.example
      : `Ao investigar “${truncateText(
      normalizedQuestion,
      90,
    )}”, priorize o critério “${truncateText(normalizedAnswer, 110)}”.`;
  } else if (mode === 'comparacao') {
    application = parsedDescription.application
      ? parsedDescription.application
      : `Em questões comparativas, escolha a alternativa com melhor aderência ao requisito central do enunciado — ${normalizedAnswer}.`;
    example = parsedDescription.example
      ? parsedDescription.example
      : `Entre opções parecidas, a correta é a que atende o objetivo principal descrito: “${truncateText(
      normalizedAnswer,
      115,
    )}”.`;
  } else if (mode === 'conceito') {
    application = parsedDescription.application
      ? parsedDescription.application
      : `Use essa definição como referência-base para diferenciar alternativas conceitualmente próximas — ${normalizedAnswer}.`;
    example = parsedDescription.example
      ? parsedDescription.example
      : `Se a pergunta pede definição/fundamento, a opção correta é a que descreve com precisão: “${truncateText(
      normalizedAnswer,
      115,
    )}”.`;
  }

  return {
    why,
    application,
    example,
  };
}

export default function StudySessionScreen() {
  const { token, notifyProgressChanged } = useAuth();
  const insets = useSafeAreaInsets();
  const { track, category, level } = useLocalSearchParams<{
    track: Track;
    category: string;
    level: SeniorityLevel;
  }>();

  const [cards, setCards] = useState<ReadyCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(null);
  const [sessionCompletedAt, setSessionCompletedAt] = useState<number | null>(null);
  const [recentCorrectIndexes, setRecentCorrectIndexes] = useState<number[]>([]);

  const progressAnimated = useRef(new Animated.Value(0)).current;
  const contentFadeAnimated = useRef(new Animated.Value(1)).current;
  const correctOptionScaleAnimated = useRef(new Animated.Value(1)).current;
  const questionStartedAtRef = useRef<number | null>(null);

  const decodedCategory = useMemo(() => decodeURIComponent(category ?? ''), [category]);
  const contextLabel = useMemo(() => {
    return `${track ?? ''} · ${decodedCategory} · ${level ?? ''}`.toLocaleUpperCase('pt-BR');
  }, [decodedCategory, level, track]);

  useEffect(() => {
    async function loadCards() {
      if (!track || !decodedCategory || !level) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          track,
          category: decodedCategory,
          level,
        });

        const payload = await apiRequest<ReadyCard[]>(
          `/ready-cards/session?${params.toString()}`,
          { token },
        );

        const uniqueCards = dedupeCardsByQuestion(payload);

        setCards(uniqueCards);
        setCurrentIndex(0);
        setSelectedOption(null);
        setFeedback(null);
        setCorrectCount(0);
        setWrongCount(0);
        setSessionStartedAt(Date.now());
        setSessionCompletedAt(null);
        setRecentCorrectIndexes([]);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Erro ao carregar sessão.');
      } finally {
        setLoading(false);
      }
    }

    void loadCards();
  }, [decodedCategory, level, token, track]);

  const currentCard = cards[currentIndex];
  const completedCards = Math.min(currentIndex, cards.length);
  const progressPercent = cards.length === 0 ? 0 : Math.round((completedCards / cards.length) * 100);
  const progressWidth = progressAnimated.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  });

  const options = useMemo(() => {
    if (!currentCard) {
      return [];
    }
    return buildOptions(cards, currentCard, recentCorrectIndexes);
  }, [cards, currentCard, recentCorrectIndexes]);

  const answerGuidance = useMemo(() => {
    if (!currentCard) {
      return null;
    }
    return buildAnswerGuidance({
      ...currentCard,
      question: stripQuestionMetadata(currentCard.question),
      answer: stripAnswerMetadata(currentCard.answer),
    });
  }, [currentCard]);

  const questionType = useMemo(() => {
    if (!currentCard) {
      return '';
    }
    return detectQuestionType(currentCard);
  }, [currentCard]);

  const elapsedSeconds = useMemo(() => {
    if (!sessionStartedAt) {
      return 0;
    }
    const end = sessionCompletedAt ?? Date.now();
    return Math.round((end - sessionStartedAt) / 1000);
  }, [sessionCompletedAt, sessionStartedAt]);

  useEffect(() => {
    Animated.timing(progressAnimated, {
      toValue: progressPercent,
      duration: 350,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progressAnimated, progressPercent]);

  useEffect(() => {
    if (cards.length > 0 && currentIndex >= cards.length && !sessionCompletedAt) {
      setSessionCompletedAt(Date.now());
    }
  }, [cards.length, currentIndex, sessionCompletedAt]);

  useEffect(() => {
    if (currentCard) {
      questionStartedAtRef.current = Date.now();
    }
  }, [currentCard?.id]);

  async function registerAttempt(isCorrect: boolean, durationSeconds?: number) {
    if (!token || !currentCard) {
      return;
    }

    try {
      await apiRequest('/study/attempt', {
        method: 'POST',
        token,
        body: {
          level: currentCard.level,
          isCorrect,
          readyCardId: currentCard.id,
          durationSeconds,
        },
      });
      notifyProgressChanged();
    } catch {
      return;
    }
  }

  function goNextCard(correctOptionIndex?: number) {
    Animated.timing(contentFadeAnimated, {
      toValue: 0,
      duration: 140,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setSelectedOption(null);
      setFeedback(null);
      correctOptionScaleAnimated.setValue(1);
      if (correctOptionIndex !== undefined) {
        setRecentCorrectIndexes((previous) => [...previous.slice(-7), correctOptionIndex]);
      }
      setCurrentIndex((previous) => previous + 1);

      Animated.timing(contentFadeAnimated, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    });
  }

  async function onSelectOption(option: string) {
    if (!currentCard || feedback !== null) {
      return;
    }

    setSelectedOption(option);

    const isCorrect = option === currentCard.answer;
    const durationSeconds = questionStartedAtRef.current
      ? Math.max(1, Math.round((Date.now() - questionStartedAtRef.current) / 1000))
      : undefined;
    const correctOptionIndex = options.findIndex((item) => item === currentCard.answer);
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      setCorrectCount((previous) => previous + 1);

      Animated.sequence([
        Animated.timing(correctOptionScaleAnimated, {
          toValue: 1.06,
          duration: 120,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(correctOptionScaleAnimated, {
          toValue: 1,
          duration: 150,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      setWrongCount((previous) => previous + 1);
    }

    await registerAttempt(isCorrect, durationSeconds);

    if (isCorrect && correctOptionIndex >= 0) {
      setRecentCorrectIndexes((previous) => [...previous.slice(-7), correctOptionIndex]);
    }
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-[#151718]">
        <Text className="text-base text-[#687076] dark:text-[#9BA1A6]">Carregando sessão...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-6 dark:bg-[#151718]">
        <Text className="text-center text-base text-[#C92A2A]">{error}</Text>
      </View>
    );
  }

  if (!currentCard) {
    return (
      <View className="flex-1 bg-white px-6 pt-14 dark:bg-[#151718]">
        <Text className="text-center text-xs text-[#687076] dark:text-[#9BA1A6]">
          {contextLabel}
        </Text>
        <Text className="mt-2 text-center text-xs text-[#687076] dark:text-[#9BA1A6]">100% concluído</Text>
        <View className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
          <Animated.View style={{ height: '100%', width: '100%', borderRadius: 999, backgroundColor: '#22C55E' }} />
        </View>

        <View className="mt-8 rounded-2xl border border-[#E6E8EB] p-5 dark:border-[#30363D]">
          <Text className="text-center text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">
            Sessão concluída ✅
          </Text>
          <Text className="mt-2 text-center text-[#687076] dark:text-[#9BA1A6]">
            Você finalizou os cards para {decodedCategory} ({level}).
          </Text>

          <View className="mt-5 gap-3">
            <View className="rounded-xl bg-[#EEF2F5] px-4 py-3 dark:bg-[#2A2F36]">
              <Text className="text-center text-sm text-[#687076] dark:text-[#9BA1A6]">Acertos</Text>
              <Text className="text-center text-xl font-bold text-[#11181C] dark:text-[#ECEDEE]">
                {correctCount}
              </Text>
            </View>

            <View className="rounded-xl bg-[#EEF2F5] px-4 py-3 dark:bg-[#2A2F36]">
              <Text className="text-center text-sm text-[#687076] dark:text-[#9BA1A6]">Erros</Text>
              <Text className="text-center text-xl font-bold text-[#11181C] dark:text-[#ECEDEE]">
                {wrongCount}
              </Text>
            </View>

            <View className="rounded-xl bg-[#EEF2F5] px-4 py-3 dark:bg-[#2A2F36]">
              <Text className="text-center text-sm text-[#687076] dark:text-[#9BA1A6]">Tempo total</Text>
              <Text className="text-center text-xl font-bold text-[#11181C] dark:text-[#ECEDEE]">
                {formatDuration(elapsedSeconds)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]">
      <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
        {contextLabel}
      </Text>
      <Text className="mt-2 text-xs text-[#687076] dark:text-[#9BA1A6]">
        Card {currentIndex + 1} de {cards.length}
      </Text>
      <View className="mt-3 mb-5 h-2 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
        <Animated.View
          style={{
            height: '100%',
            width: progressWidth,
            borderRadius: 999,
            backgroundColor: '#22C55E',
          }}
        />
      </View>
      <Text className="mb-4 text-xs text-[#687076] dark:text-[#9BA1A6]">{progressPercent}% concluído</Text>

      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom:
            feedback !== null
              ? Math.max(insets.bottom, Platform.OS === 'web' ? 16 : 0) + 98
              : Math.max(insets.bottom, Platform.OS === 'web' ? 16 : 0) + 28,
        }}>
        <Animated.View className="mt-6" style={{ opacity: contentFadeAnimated, marginBottom: 24 }}>
          <View className="relative min-h-[220px] items-center justify-center rounded-2xl border border-[#E6E8EB] bg-[#F8FAFC] px-5 py-6 dark:border-[#30363D] dark:bg-[#1E2228]">
            <View className="absolute top-3 right-3 rounded-full bg-[#E6ECFF] px-3 py-1 dark:bg-[#2A3352]">
              <Text className="text-[11px] font-semibold text-[#3F51B5] dark:text-[#C7D2FE]">
                {questionType}
              </Text>
            </View>
            <Text className="text-center text-2xl font-bold leading-8 text-[#11181C] dark:text-[#ECEDEE]">
              {stripQuestionMetadata(currentCard.question)}
            </Text>
          </View>
          {currentCard.questionDescription ? (
            <View className="mt-3 rounded-xl border border-[#E6E8EB] bg-[#F8FAFC] px-4 py-3 dark:border-[#30363D] dark:bg-[#1E2228]">
              <Text className="text-sm font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                Descrição da pergunta
              </Text>
              <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                {currentCard.questionDescription}
              </Text>
            </View>
          ) : null}
        </Animated.View>

        <Animated.View className="mt-2 gap-5" style={{ opacity: contentFadeAnimated }}>
          {options.map((option, index) => {
          const isSelected = selectedOption === option;
          const isCorrect = option === currentCard.answer;
          const optionLabel = String.fromCharCode(65 + index);

          const className =
            (feedback === 'correct' || feedback === 'wrong') && isCorrect
              ? 'bg-[#2F9E44]'
              : feedback === 'wrong' && isSelected
                ? 'bg-[#C92A2A]'
                : 'bg-[#3F51B5]';

            return (
              <Animated.View
                key={`${currentCard.id}-${option}`}
                style={{
                  marginBottom: 6,
                  transform:
                    feedback === 'correct' && isCorrect
                      ? [{ scale: correctOptionScaleAnimated }]
                      : [{ scale: 1 }],
                }}>
                <Pressable
                  disabled={feedback !== null}
                  onPress={() => {
                    void onSelectOption(option);
                  }}
                  style={({ pressed }) => ({
                    opacity: pressed ? 0.9 : 1,
                    transform: [{ scale: pressed ? 0.985 : 1 }],
                  })}
                  className={`rounded-xl px-3 py-3.5 ${className}`}>
                  <View className="flex-row items-start gap-2.5">
                    <View className="mt-0.5 h-6 w-6 items-center justify-center rounded-full bg-white/25">
                      <Text className="text-xs font-bold text-white">{optionLabel}</Text>
                    </View>
                    <Text className="flex-1 text-sm font-semibold text-white">{stripAnswerMetadata(option)}</Text>
                  </View>
                </Pressable>
              </Animated.View>
            );
          })}

          {feedback !== null ? (
            <View className="mt-2 rounded-xl border border-[#E6E8EB] bg-[#F8FAFC] px-4 py-3 dark:border-[#30363D] dark:bg-[#1E2228]">
              <Text className="text-sm font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                Entendendo a resposta correta
              </Text>
              <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                ✅ Correta: {stripAnswerMetadata(currentCard.answer)}
              </Text>

              {currentCard.answerDescription ? (
                <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                  🧾 {cleanStandaloneDescription(currentCard.answerDescription)}
                </Text>
              ) : null}

              {currentCard.categoryDescription ? (
                <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                  📚 Descrição da categoria: {currentCard.categoryDescription}
                </Text>
              ) : null}

              {answerGuidance ? (
                <>
                  <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                    💡 Justificativa: {answerGuidance.why}
                  </Text>
                  <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                    🛠️ Aplicação: {answerGuidance.application}
                  </Text>
                  <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                    🧪 Exemplo: {answerGuidance.example}
                  </Text>
                </>
              ) : null}
            </View>
          ) : null}
        </Animated.View>
      </ScrollView>

      {feedback !== null ? (
        <View
          className="absolute right-5 left-5 border-t border-[#E6E8EB] bg-white pt-3 dark:border-[#30363D] dark:bg-[#151718]"
          style={{ bottom: Math.max(insets.bottom, Platform.OS === 'web' ? 16 : 0) + 6 }}>
          <Pressable
            onPress={() => {
              const correctOptionIndex = options.findIndex((item) => item === currentCard.answer);
              goNextCard(correctOptionIndex >= 0 ? correctOptionIndex : undefined);
            }}
            className="rounded-xl bg-[#3F51B5] px-4 py-3">
            <Text className="text-center text-sm font-semibold text-white">Próximo</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}
