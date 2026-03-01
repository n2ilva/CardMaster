import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';

import {
    clearInProgressLesson,
    fetchCards,
    fetchInProgressLesson,
    saveLesson,
    updateUserProfile,
    upsertInProgressLesson,
    type Flashcard,
    type UserLevel
} from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

type AnswerState = {
  selectedIndex: number | null;
  revealed: boolean;
};

export default function StudySessionScreen() {
  const { track, category, difficulty: difficultyParam } = useLocalSearchParams<{
    track: string;
    category: string;
    difficulty?: string;
  }>();
  const router = useRouter();
  const { user } = useAuth();

  const decodedCategory = useMemo(() => decodeURIComponent(category ?? ''), [category]);
  const decodedTrack = useMemo(() => decodeURIComponent(track ?? ''), [track]);
  const contextLabel = useMemo(
    () => `${decodedTrack} · ${decodedCategory}`.toLocaleUpperCase('pt-BR'),
    [decodedTrack, decodedCategory],
  );

  // ---- State ----
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<AnswerState>({ selectedIndex: null, revealed: false });
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [difficulty, setDifficulty] = useState<UserLevel>('Fácil');
  const [questionElapsedSeconds, setQuestionElapsedSeconds] = useState(0);

  const startTimeRef = useRef(Date.now());
  const questionStartTimeRef = useRef(Date.now());

  // ---- Load cards ----
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        // Determine difficulty level: use URL param if provided, otherwise default to Fácil
        let level: UserLevel = 'Fácil';
        
        if (difficultyParam && ['Fácil', 'Médio', 'Difícil'].includes(difficultyParam)) {
          level = difficultyParam as UserLevel;
        }
        
        if (cancelled) return;
        setDifficulty(level);
        const data = await fetchCards(decodedTrack, decodedCategory, level);
        if (!cancelled) {
          setCards(data);
          if (user && data.length > 0) {
            const inProgress = await fetchInProgressLesson(
              user.id,
              decodedTrack,
              decodedCategory,
              level,
            );
            if (!cancelled && inProgress && inProgress.answeredCount > 0) {
              const resumedIndex = Math.min(
                inProgress.answeredCount,
                Math.max(0, data.length - 1),
              );
              setCurrentIndex(resumedIndex);
              setCorrectCount(Math.max(0, inProgress.correctCount));
              startTimeRef.current = Date.now() - Math.max(0, inProgress.elapsedMs);
            }
          }
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [decodedTrack, decodedCategory, difficultyParam, user]);

  // ---- Question timer ----
  useEffect(() => {
    // Reset timer when question changes
    questionStartTimeRef.current = Date.now();
    setQuestionElapsedSeconds(0);

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
      setQuestionElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const totalCards = cards.length;
  const currentCard = cards[currentIndex] as Flashcard | undefined;
  const progressPercent = totalCards > 0 ? ((currentIndex + (answer.revealed ? 1 : 0)) / totalCards) * 100 : 0;

  // ---- Handlers ----
  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (answer.revealed || !currentCard) return;
      const isCorrect = optionIndex === currentCard.correctIndex;
      const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
      if (isCorrect) setCorrectCount((c) => c + 1);
      setAnswer({ selectedIndex: optionIndex, revealed: true });

      if (user) {
        void upsertInProgressLesson(user.id, {
          track: decodedTrack,
          category: decodedCategory,
          difficulty,
          answeredCount: currentIndex + 1,
          correctCount: newCorrectCount,
          totalCount: totalCards,
          elapsedMs: Date.now() - startTimeRef.current,
        });
      }
    },
    [
      answer.revealed,
      correctCount,
      currentCard,
      currentIndex,
      decodedCategory,
      decodedTrack,
      difficulty,
      totalCards,
      user,
    ],
  );

  const handleNext = useCallback(async () => {
    if (currentIndex + 1 < totalCards) {
      setCurrentIndex((i) => i + 1);
      setAnswer({ selectedIndex: null, revealed: false });
    } else {
      // Finished
      setFinished(true);
      if (user) {
        try {
          setSaving(true);
          await saveLesson(user.id, {
            category: decodedCategory,
            track: decodedTrack,
            difficulty,
            correctCount,
            totalCount: totalCards,
            durationMs: Date.now() - startTimeRef.current,
          });
          await clearInProgressLesson(user.id, {
            track: decodedTrack,
            category: decodedCategory,
            difficulty,
          });
          // Atualiza o perfil do usuário na comunidade
          if (user.name) {
            console.log('Atualizando perfil do usuário:', user.id, user.name);
            await updateUserProfile(user.id, user.name);
            console.log('Perfil atualizado com sucesso!');
          }
        } catch (error) {
          console.error('Erro ao salvar lição:', error);
        } finally {
          setSaving(false);
        }
      }
    }
  }, [currentIndex, totalCards, user, decodedCategory, decodedTrack, difficulty, correctCount]);

  const accuracyPercent = totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;

  // ---- Option style helpers ----
  const getOptionStyle = useCallback(
    (optionIndex: number) => {
      if (!answer.revealed) {
        return 'border-[#E6E8EB] bg-white dark:border-[#30363D] dark:bg-[#1C1F24]';
      }
      if (!currentCard) return '';
      if (optionIndex === currentCard.correctIndex) {
        return 'border-[#22C55E] bg-[#22C55E]/10';
      }
      if (optionIndex === answer.selectedIndex && optionIndex !== currentCard.correctIndex) {
        return 'border-[#EF4444] bg-[#EF4444]/10';
      }
      return 'border-[#E6E8EB] bg-white opacity-50 dark:border-[#30363D] dark:bg-[#1C1F24]';
    },
    [answer, currentCard],
  );

  const getLetterStyle = useCallback(
    (optionIndex: number) => {
      if (!answer.revealed) return 'bg-[#3F51B5]';
      if (!currentCard) return 'bg-[#3F51B5]';
      if (optionIndex === currentCard.correctIndex) return 'bg-[#22C55E]';
      if (optionIndex === answer.selectedIndex && optionIndex !== currentCard.correctIndex) return 'bg-[#EF4444]';
      return 'bg-[#9BA1A6]';
    },
    [answer, currentCard],
  );

  // ---- Loading state ----
  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-[#151718]">
        <ActivityIndicator size="large" color="#3F51B5" />
        <Text className="mt-3 text-[#687076] dark:text-[#9BA1A6]">Carregando cards...</Text>
      </View>
    );
  }

  // ---- Empty state ----
  if (totalCards === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-5 dark:bg-[#151718]">
        <Text className="text-lg font-bold text-[#11181C] dark:text-[#ECEDEE]">
          Nenhum card disponível
        </Text>
        <Text className="mt-2 text-center text-[#687076] dark:text-[#9BA1A6]">
          Esta categoria ainda não possui cards cadastrados.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 rounded-xl bg-[#3F51B5] px-6 py-3 active:opacity-70">
          <Text className="font-semibold text-white">Voltar</Text>
        </Pressable>
      </View>
    );
  }

  // ---- Finished state ----
  if (finished) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-5 dark:bg-[#151718]">
        {saving ? (
          <ActivityIndicator size="large" color="#3F51B5" />
        ) : (
          <>
            <Text className="text-4xl font-bold text-[#11181C] dark:text-[#ECEDEE]">
              {accuracyPercent}%
            </Text>
            <Text className="mt-1 text-lg font-semibold text-[#687076] dark:text-[#9BA1A6]">
              de acertos
            </Text>
            <Text className="mt-4 text-[#11181C] dark:text-[#ECEDEE]">
              {correctCount} / {totalCards} corretas
            </Text>
            <View className="mt-8 w-full gap-3">
              <Pressable
                onPress={() => {
                  setCurrentIndex(0);
                  setAnswer({ selectedIndex: null, revealed: false });
                  setCorrectCount(0);
                  setFinished(false);
                  startTimeRef.current = Date.now();
                  questionStartTimeRef.current = Date.now();
                  setQuestionElapsedSeconds(0);
                }}
                className="rounded-xl bg-[#3F51B5] py-3 active:opacity-70">
                <Text className="text-center font-semibold text-white">Tentar novamente</Text>
              </Pressable>
              <Pressable
                onPress={() => router.back()}
                className="rounded-xl border border-[#E6E8EB] py-3 active:opacity-70 dark:border-[#30363D]">
                <Text className="text-center font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                  Voltar às categorias
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    );
  }

  // ---- Exercise screen ----
  return (
    <View className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]">
      {/* Header */}
      <Text className="text-xs font-medium tracking-wide text-[#687076] dark:text-[#9BA1A6]">
        {contextLabel}
      </Text>

      {/* Progress bar */}
      <View className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
        <View
          className="h-full rounded-full bg-[#3F51B5]"
          style={{ width: `${progressPercent}%` }}
        />
      </View>

      {/* Counter + Difficulty */}
      <View className="mt-2 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <View className="rounded-full bg-[#3F51B5]/10 px-2.5 py-0.5">
            <Text className="text-xs font-semibold text-[#3F51B5]">{difficulty}</Text>
          </View>
          <View className="rounded-full bg-[#F59E0B]/10 px-2.5 py-0.5">
            <Text className="text-xs font-semibold text-[#F59E0B]">
              {Math.floor(questionElapsedSeconds / 60)}:{(questionElapsedSeconds % 60).toString().padStart(2, '0')}
            </Text>
          </View>
        </View>
        <Text className="text-xs font-semibold text-[#687076] dark:text-[#9BA1A6]">
          {currentIndex + 1} / {totalCards}
        </Text>
      </View>

      <ScrollView className="mt-4 flex-1" showsVerticalScrollIndicator={false}>
        {/* Question card */}
        {currentCard && (
          <>
            <View className="min-h-[180px] items-center justify-center rounded-2xl border border-[#E6E8EB] bg-[#F8FAFC] px-5 py-6 dark:border-[#30363D] dark:bg-[#1E2228]">
              <Text className="text-center text-lg font-bold leading-7 text-[#11181C] dark:text-[#ECEDEE]">
                {currentCard.question}
              </Text>
            </View>

            {/* Options */}
            <View className="mt-5 gap-3">
              {currentCard.options.map((option, idx) => (
                <Pressable
                  key={idx}
                  onPress={() => handleSelect(idx)}
                  disabled={answer.revealed}
                  className={`flex-row items-center gap-3 rounded-xl border px-4 py-3.5 active:opacity-70 ${getOptionStyle(idx)}`}>
                  <View className={`h-8 w-8 items-center justify-center rounded-full ${getLetterStyle(idx)}`}>
                    <Text className="text-sm font-bold text-white">{OPTION_LETTERS[idx]}</Text>
                  </View>
                  <Text className="flex-1 text-sm text-[#11181C] dark:text-[#ECEDEE]">{option}</Text>
                </Pressable>
              ))}
            </View>

            {/* Feedback + Explanation + Next */}
            {answer.revealed && (
              <View className="mt-5 pb-8">
                <Text
                  className={`text-center text-sm font-semibold ${
                    answer.selectedIndex === currentCard.correctIndex
                      ? 'text-[#22C55E]'
                      : 'text-[#EF4444]'
                  }`}>
                  {answer.selectedIndex === currentCard.correctIndex
                    ? 'Resposta correta!'
                    : 'Resposta incorreta'}
                </Text>

                {/* Explanation card */}
                {(currentCard.explanation || currentCard.example) && (
                  <View className="mt-4 rounded-2xl border border-[#D1D9E0] bg-[#F0F4F8] px-5 py-4 dark:border-[#30363D] dark:bg-[#1E2228]">
                    {currentCard.explanation ? (
                      <>
                        <Text className="text-xs font-bold uppercase tracking-wide text-[#3F51B5]">
                          Explicação
                        </Text>
                        <Text className="mt-1.5 text-sm leading-5 text-[#11181C] dark:text-[#ECEDEE]">
                          {currentCard.explanation}
                        </Text>
                      </>
                    ) : null}

                    {currentCard.example ? (
                      <View className={currentCard.explanation ? 'mt-4' : ''}>
                        <Text className="text-xs font-bold uppercase tracking-wide text-[#F59E0B]">
                          Exemplo
                        </Text>
                        <View className="mt-1.5 rounded-lg bg-[#E6E8EB] px-3 py-2.5 dark:bg-[#2A2F36]">
                          <Text className="text-sm leading-5 text-[#11181C] dark:text-[#ECEDEE]">
                            {currentCard.example}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                )}

                <Pressable
                  onPress={handleNext}
                  className="mt-4 rounded-xl bg-[#3F51B5] py-3 active:opacity-70">
                  <Text className="text-center text-sm font-semibold text-white">
                    {currentIndex + 1 < totalCards ? 'Próxima' : 'Ver resultado'}
                  </Text>
                </Pressable>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
}
