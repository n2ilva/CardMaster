import { useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, Pressable, Text, View } from 'react-native';

import { SeniorityLevel, Track } from '@/data/flashcards';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type ReadyCard = {
  id: string;
  category: string;
  level: SeniorityLevel;
  question: string;
  answer: string;
  track: Track;
};

type CategoryInsight = {
  category: string;
  track: Track;
  summary: string;
  applications: string[];
  basicExample: string;
};

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

  const rankedPool = Array.from(new Set([...sameCategoryAndLevel, ...sameCategory, ...sameTrack]))
    .map((answer) => ({
      answer,
      score: similarityScore(card.answer, answer),
    }))
    .sort((left, right) => right.score - left.score)
    .map((item) => item.answer);

  const generatedDistractors = generateSimilarDistractors(card.answer);

  const incorrectAnswers = Array.from(new Set([...rankedPool, ...generatedDistractors]))
    .filter((answer) => answer !== card.answer)
    .slice(0, 3);

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

export default function StudySessionScreen() {
  const { token, notifyProgressChanged } = useAuth();
  const { track, category, level } = useLocalSearchParams<{
    track: Track;
    category: string;
    level: SeniorityLevel;
  }>();

  const [cards, setCards] = useState<ReadyCard[]>([]);
  const [categoryInsight, setCategoryInsight] = useState<CategoryInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [wrongCountdown, setWrongCountdown] = useState<number | null>(null);
  const [sessionStartedAt, setSessionStartedAt] = useState<number | null>(null);
  const [sessionCompletedAt, setSessionCompletedAt] = useState<number | null>(null);
  const [recentCorrectIndexes, setRecentCorrectIndexes] = useState<number[]>([]);

  const progressAnimated = useRef(new Animated.Value(0)).current;
  const contentFadeAnimated = useRef(new Animated.Value(1)).current;
  const correctOptionScaleAnimated = useRef(new Animated.Value(1)).current;
  const wrongAdvanceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrongCountdownIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const questionStartedAtRef = useRef<number | null>(null);

  const decodedCategory = useMemo(() => decodeURIComponent(category ?? ''), [category]);

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

        const [payload, insightPayload] = await Promise.all([
          apiRequest<ReadyCard[]>(`/ready-cards?${params.toString()}`),
          apiRequest<CategoryInsight>(
            `/ready-themes/insight?track=${track}&category=${encodeURIComponent(decodedCategory)}`,
          ).catch(() => null),
        ]);

        setCards(shuffleArray(payload));
        setCategoryInsight(insightPayload);
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
  }, [decodedCategory, level, track]);

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

  function clearWrongTimers() {
    if (wrongAdvanceTimeoutRef.current) {
      clearTimeout(wrongAdvanceTimeoutRef.current);
      wrongAdvanceTimeoutRef.current = null;
    }

    if (wrongCountdownIntervalRef.current) {
      clearInterval(wrongCountdownIntervalRef.current);
      wrongCountdownIntervalRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      clearWrongTimers();
    };
  }, []);

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
    clearWrongTimers();

    Animated.timing(contentFadeAnimated, {
      toValue: 0,
      duration: 140,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      setSelectedOption(null);
      setFeedback(null);
      setWrongCountdown(null);
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
      clearWrongTimers();
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

    if (isCorrect) {
      setTimeout(() => {
        goNextCard(correctOptionIndex >= 0 ? correctOptionIndex : undefined);
      }, 700);
    } else {
      setWrongCountdown(5);
      clearWrongTimers();

      wrongCountdownIntervalRef.current = setInterval(() => {
        setWrongCountdown((previous) => {
          if (previous === null || previous <= 1) {
            return null;
          }
          return previous - 1;
        });
      }, 1000);

      wrongAdvanceTimeoutRef.current = setTimeout(() => {
        goNextCard();
      }, 5000);
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
          {track} · {decodedCategory} · {level}
        </Text>
        <Text className="mt-2 text-center text-xs text-[#687076] dark:text-[#9BA1A6]">100% concluído</Text>
        <View className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
          <Animated.View className="h-full rounded-full bg-[#3F51B5]" style={{ width: '100%' }} />
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
        {track} · {decodedCategory} · {level}
      </Text>
      <Text className="mt-2 text-xs text-[#687076] dark:text-[#9BA1A6]">
        Card {currentIndex + 1} de {cards.length}
      </Text>
      <View className="mt-3 mb-5 h-2 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
        <Animated.View className="h-full rounded-full bg-[#3F51B5]" style={{ width: progressWidth }} />
      </View>
      <Text className="mb-4 text-xs text-[#687076] dark:text-[#9BA1A6]">{progressPercent}% concluído</Text>

      <Animated.View className="mt-6" style={{ opacity: contentFadeAnimated, marginBottom: 40 }}>
        <View className="min-h-[220px] items-center justify-center rounded-2xl border border-[#E6E8EB] bg-[#F8FAFC] px-5 py-6 dark:border-[#30363D] dark:bg-[#1E2228]">
          <Text className="text-center text-2xl font-bold leading-8 text-[#11181C] dark:text-[#ECEDEE]">
            {currentCard.question}
          </Text>
        </View>
      </Animated.View>

      <Animated.View className="mt-4 mb-12 gap-8" style={{ opacity: contentFadeAnimated }}>
        {feedback === 'wrong' ? (
          <View className="mb-2 rounded-xl border border-[#E6E8EB] bg-[#F8FAFC] px-4 py-3 dark:border-[#30363D] dark:bg-[#1E2228]">
            <Text className="text-center text-sm text-[#687076] dark:text-[#9BA1A6]">
              Próximo card em {wrongCountdown ?? 0}s
            </Text>
            <Pressable
              onPress={() => {
                goNextCard();
              }}
              className="mt-2 rounded-lg bg-[#3F51B5] px-3 py-2">
              <Text className="text-center text-sm font-semibold text-white">Próximo card agora</Text>
            </Pressable>
          </View>
        ) : null}

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
                  <Text className="flex-1 text-sm font-semibold text-white">{option}</Text>
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
              ✅ Correta: {currentCard.answer}
            </Text>

            {categoryInsight ? (
              <>
                <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                  💡 Contexto: {categoryInsight.summary}
                </Text>
                <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                  🛠️ Aplicação: {categoryInsight.applications[0]}
                </Text>
                <Text className="mt-2 text-sm text-[#687076] dark:text-[#9BA1A6]">
                  🧪 Exemplo: {categoryInsight.basicExample}
                </Text>
              </>
            ) : null}
          </View>
        ) : null}
      </Animated.View>
    </View>
  );
}
