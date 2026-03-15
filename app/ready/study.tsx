import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';

import { GlossaryText } from '@/components/glossary-text';
import { useScreenSize } from '@/hooks/use-screen-size';
import {
  clearInProgressLesson,
  fetchCards,
  fetchInProgressLesson,
  fetchMasterTestCards,
  resolveTrackLabel,
  saveCardResult,
  saveLesson,
  updateUserProfile,
  upsertInProgressLesson,
  type DifficultyProgress,
  type Flashcard,
  type UserLevel,
} from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';
import { useData } from '@/providers/data-provider';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

type AnswerState = {
  selectedIndex: number | null;
  revealed: boolean;
};

export default function StudySessionScreen() {
  const { track, category, mode } = useLocalSearchParams<{
    track: string;
    category: string;
    mode?: string;
  }>();
  const isMasterTest = mode === 'master-test';
  const router = useRouter();
  const { user } = useAuth();
  const { refreshUserProgress } = useData();

  const decodedCategory = useMemo(() => decodeURIComponent(category ?? ''), [category]);
  const decodedTrack = useMemo(() => decodeURIComponent(track ?? ''), [track]);
  const contextLabel = useMemo(
    () =>
      isMasterTest
        ? `🏆 TESTE MASTER · ${resolveTrackLabel(decodedTrack)}`.toLocaleUpperCase('pt-BR')
        : `${decodedTrack} · ${decodedCategory}`.toLocaleUpperCase('pt-BR'),
    [decodedTrack, decodedCategory, isMasterTest],
  );

  // ---- State ----
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [activeDifficulty, setActiveDifficulty] = useState<UserLevel>('Fácil');
  const [nextDifficulty, setNextDifficulty] = useState<UserLevel | null>(null);
  const [progressByDifficulty, setProgressByDifficulty] = useState<DifficultyProgress[]>([]);
  const [supplementalDifficulties, setSupplementalDifficulties] = useState<UserLevel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState<AnswerState>({ selectedIndex: null, revealed: false });
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [questionElapsedSeconds, setQuestionElapsedSeconds] = useState(0);

  const startTimeRef = useRef(Date.now());
  const questionStartTimeRef = useRef(Date.now());
  const scrollViewRef = useRef<ScrollView>(null);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);
  const iconScale = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;
  const correctSoundRef = useRef<Audio.Sound | null>(null);
  const wrongSoundRef = useRef<Audio.Sound | null>(null);
  const completionSoundRef = useRef<Audio.Sound | null>(null);
  const [showCompletionEffect, setShowCompletionEffect] = useState(false);
  const completionBgOpacity = useRef(new Animated.Value(0)).current;
  const completionIconScale = useRef(new Animated.Value(0)).current;
  const completionTextOpacity = useRef(new Animated.Value(0)).current;
  const completionRingScale = useRef(new Animated.Value(0.8)).current;
  const completionRingOpacity = useRef(new Animated.Value(0)).current;

  // Pré-carrega e persiste os sons no dispositivo
  useEffect(() => {
    (async () => {
      // Configura sessão de áudio antes de qualquer playback
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
      });

      // Garante que os assets estão baixados e em cache (web e native)
      await Asset.loadAsync([
        require('@/assets/songs/acertou.mp3'),
        require('@/assets/songs/errou.mp3'),
        require('@/assets/songs/concluido.mp3'),
      ]);

      const [{ sound: correctSound }, { sound: wrongSound }, { sound: completionSound }] = await Promise.all([
        Audio.Sound.createAsync(require('@/assets/songs/acertou.mp3'), { shouldPlay: false }),
        Audio.Sound.createAsync(require('@/assets/songs/errou.mp3'), { shouldPlay: false }),
        Audio.Sound.createAsync(require('@/assets/songs/concluido.mp3'), { shouldPlay: false }),
      ]);

      // Pré-aquece o contexto de áudio tocando a 0ms de volume — elimina latência do primeiro play
      await Promise.all([
        correctSound.setStatusAsync({ shouldPlay: true, positionMillis: 0, volume: 0 }).then(() =>
          correctSound.setStatusAsync({ shouldPlay: false, positionMillis: 0, volume: 1 }),
        ),
        wrongSound.setStatusAsync({ shouldPlay: true, positionMillis: 0, volume: 0 }).then(() =>
          wrongSound.setStatusAsync({ shouldPlay: false, positionMillis: 0, volume: 1 }),
        ),
        completionSound.setStatusAsync({ shouldPlay: true, positionMillis: 0, volume: 0 }).then(() =>
          completionSound.setStatusAsync({ shouldPlay: false, positionMillis: 0, volume: 1 }),
        ),
      ]);

      correctSoundRef.current = correctSound;
      wrongSoundRef.current = wrongSound;
      completionSoundRef.current = completionSound;
    })();
    return () => {
      correctSoundRef.current?.unloadAsync();
      wrongSoundRef.current?.unloadAsync();
      completionSoundRef.current?.unloadAsync();
    };
  }, []);

  // Auto-scroll até a explicação quando a resposta for revelada
  useEffect(() => {
    if (answer.revealed) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [answer.revealed]);

  const { isDesktop: isDesktopWidth, isTablet: isTabletWidth } = useScreenSize();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // ---- Load cards ----
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        if (cancelled) return;
        if (isMasterTest) {
          const masterTestCards = await fetchMasterTestCards(decodedTrack);
          if (!cancelled) {
            setCards(masterTestCards);
          }
          return;
        }

        const studyDeck = await fetchCards(
          decodedTrack,
          decodedCategory,
          user?.id,
        );
        if (!cancelled) {
          setCards(studyDeck.cards);
          setActiveDifficulty(studyDeck.activeDifficulty);
          setNextDifficulty(studyDeck.nextDifficulty);
          setProgressByDifficulty(studyDeck.progressByDifficulty);
          setSupplementalDifficulties(studyDeck.supplementalDifficulties);

          if (user && studyDeck.cards.length > 0) {
            const inProgress = await fetchInProgressLesson(
              user.id,
              decodedTrack,
              decodedCategory,
              studyDeck.activeDifficulty,
            );
            if (!cancelled && inProgress && inProgress.answeredCount > 0) {
              const resumedIndex = Math.min(
                inProgress.answeredCount,
                Math.max(0, studyDeck.cards.length - 1),
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
  }, [decodedTrack, decodedCategory, user, isMasterTest]);

  // ---- Question timer (pausa quando resposta é revelada) ----
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
    setQuestionElapsedSeconds(0);
  }, [currentIndex]);

  useEffect(() => {
    if (answer.revealed) return; // pausado enquanto aguarda próxima questão

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
      setQuestionElapsedSeconds(elapsed);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex, answer.revealed]);

  const totalCards = cards.length;
  const currentCard = cards[currentIndex] as Flashcard | undefined;
  const progressPercent = totalCards > 0 ? ((currentIndex + (answer.revealed ? 1 : 0)) / totalCards) * 100 : 0;

  // ---- Handlers ----
  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (answer.revealed || !currentCard) return;
      const isCorrect = optionIndex === currentCard.correctIndex;

      // Som dispara PRIMEIRO — antes de qualquer atualização de estado ou animação
      const soundRef = isCorrect ? correctSoundRef.current : wrongSoundRef.current;
      void soundRef?.setStatusAsync({ shouldPlay: true, positionMillis: 0 });

      const newCorrectCount = isCorrect ? correctCount + 1 : correctCount;
      if (isCorrect) setCorrectCount((c) => c + 1);
      setAnswer({ selectedIndex: optionIndex, revealed: true });

      // Ícone animado de acerto/erro
      setFeedbackType(isCorrect ? 'correct' : 'wrong');
      iconScale.setValue(0);
      iconOpacity.setValue(1);
      Animated.sequence([
        Animated.spring(iconScale, {
          toValue: 1,
          friction: 4,
          tension: 160,
          useNativeDriver: true,
        }),
        Animated.delay(500),
        Animated.timing(iconOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();

      // Salva resultado individual do card no histórico de rotação
      if (user && currentCard.id) {
        void saveCardResult(user.id, currentCard.id, isCorrect);
      }

      if (user && !isMasterTest) {
        void upsertInProgressLesson(user.id, {
          track: decodedTrack,
          category: decodedCategory,
          difficulty: activeDifficulty,
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
      activeDifficulty,
      isMasterTest,
      totalCards,
      user,
      iconOpacity,
      iconScale,
    ],
  );

  const handleNext = useCallback(async () => {
    if (currentIndex + 1 < totalCards) {
      setCurrentIndex((i) => i + 1);
      setAnswer({ selectedIndex: null, revealed: false });
    } else {
      // Exibe efeito de conclusão (3s) enquanto salva em paralelo
      setShowCompletionEffect(true);
      try {
        const sound = completionSoundRef.current;
        if (sound) {
          await sound.setPositionAsync(0);
          await sound.playAsync();
        }
      } catch {}

      completionBgOpacity.setValue(0);
      completionIconScale.setValue(0);
      completionTextOpacity.setValue(0);
      completionRingScale.setValue(0.8);
      completionRingOpacity.setValue(0.7);

      Animated.sequence([
        Animated.parallel([
          Animated.timing(completionBgOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.sequence([
            Animated.timing(completionIconScale, { toValue: 1.15, duration: 300, useNativeDriver: true }),
            Animated.timing(completionIconScale, { toValue: 0.92, duration: 120, useNativeDriver: true }),
            Animated.timing(completionIconScale, { toValue: 1.0, duration: 100, useNativeDriver: true }),
          ]),
          Animated.timing(completionTextOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
          Animated.parallel([
            Animated.timing(completionRingScale, { toValue: 2.4, duration: 1400, useNativeDriver: true }),
            Animated.timing(completionRingOpacity, { toValue: 0, duration: 1400, useNativeDriver: true }),
          ]),
        ]),
        Animated.delay(1080),
        Animated.timing(completionBgOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start(() => {
        setShowCompletionEffect(false);
        setFinished(true);
      });

      if (user) {
        try {
          setSaving(true);
          const lessonCategory = isMasterTest ? 'Teste Master' : decodedCategory;
          await saveLesson(user.id, {
            category: lessonCategory,
            track: decodedTrack,
            difficulty: isMasterTest ? undefined : activeDifficulty,
            correctCount,
            totalCount: totalCards,
            durationMs: Date.now() - startTimeRef.current,
          });
          if (!isMasterTest) {
            await clearInProgressLesson(user.id, {
              track: decodedTrack,
              category: decodedCategory,
              difficulty: activeDifficulty,
            });
          }
          if (user.name) {
            await updateUserProfile(user.id, user.name);
          }
          await refreshUserProgress();
        } catch (error) {
          console.error('Erro ao salvar lição:', error);
        } finally {
          setSaving(false);
        }
      }
    }
  }, [currentIndex, totalCards, user, decodedCategory, decodedTrack, correctCount, activeDifficulty, isMasterTest, refreshUserProgress, completionBgOpacity, completionIconScale, completionTextOpacity, completionRingScale, completionRingOpacity]);

  const accuracyPercent = totalCards > 0 ? Math.round((correctCount / totalCards) * 100) : 0;
  const activeDifficultyProgress = useMemo(
    () => progressByDifficulty.find((item) => item.difficulty === activeDifficulty) ?? null,
    [activeDifficulty, progressByDifficulty],
  );
  const supplementalDifficultyLabel = useMemo(
    () => supplementalDifficulties.join(', '),
    [supplementalDifficulties],
  );

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
        <Text className="mt-3 text-[#687076] dark:text-[#9BA1A6]">Carregando quizzes...</Text>
      </View>
    );
  }

  // ---- Empty state ----
  if (totalCards === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-white px-5 dark:bg-[#151718]">
        <View>
        <Text className="text-lg font-bold text-[#11181C] dark:text-[#ECEDEE]">
          Nenhum quiz disponível
        </Text>
        <Text className="mt-2 text-center text-[#687076] dark:text-[#9BA1A6]">
          Esta categoria ainda não possui quizzes cadastrados.
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-6 rounded-xl bg-[#3F51B5] px-6 py-3 active:opacity-70">
          <Text className="font-semibold text-white">Voltar</Text>
        </Pressable>
        </View>
      </View>
    );
  }

  // ---- Finished state ----
  if (finished) {
    const wrongCount = totalCards - correctCount;
    const accentColor = accuracyPercent >= 70 ? '#22C55E' : accuracyPercent >= 40 ? '#F59E0B' : '#EF4444';
    const performanceLabel =
      accuracyPercent >= 90 ? 'Excelente!' :
      accuracyPercent >= 70 ? 'Bom trabalho!' :
      accuracyPercent >= 40 ? 'Continue praticando!' : 'Não desista!';
    const performanceIcon: React.ComponentProps<typeof MaterialIcons>['name'] =
      accuracyPercent >= 90 ? 'emoji-events' :
      accuracyPercent >= 70 ? 'star' :
      accuracyPercent >= 40 ? 'trending-up' : 'refresh';

    const bg = isDark ? '#151718' : '#FFFFFF';
    const cardBg = isDark ? '#1C1F24' : '#F8FAFC';
    const cardBorder = isDark ? '#30363D' : '#E6E8EB';
    const textPrimary = isDark ? '#ECEDEE' : '#11181C';
    const textMuted = isDark ? '#9BA1A6' : '#687076';

    return (
      <View style={{ flex: 1, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        {saving ? (
          <ActivityIndicator size="large" color="#3F51B5" />
        ) : (
          <View style={{ width: '100%', maxWidth: 420 }}>

            {/* ── Ícone + Porcentagem ── */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              {/* Anel duplo */}
              <View style={{
                width: 148, height: 148, borderRadius: 74,
                borderWidth: 2, borderColor: accentColor + '30',
                backgroundColor: accentColor + '0D',
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 24,
              }}>
                <View style={{
                  width: 108, height: 108, borderRadius: 54,
                  borderWidth: 2, borderColor: accentColor + '50',
                  backgroundColor: accentColor + '18',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <MaterialIcons name={performanceIcon} size={58} color={accentColor} />
                </View>
              </View>

              {/* Porcentagem grande */}
              <Text style={{ fontSize: 76, fontWeight: '800', color: accentColor, letterSpacing: -3, lineHeight: 80 }}>
                {accuracyPercent}%
              </Text>
              <Text style={{ fontSize: 15, color: textMuted, marginTop: 4 }}>de acertos</Text>
              <Text style={{ fontSize: 19, fontWeight: '700', color: textPrimary, marginTop: 10 }}>
                {performanceLabel}
              </Text>
            </View>

            {/* ── Stats ── */}
            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
              {/* Corretas */}
              <View style={{
                flex: 1, borderRadius: 18, padding: 16,
                backgroundColor: 'rgba(34,197,94,0.09)',
                borderWidth: 1.5, borderColor: 'rgba(34,197,94,0.25)',
                alignItems: 'center',
              }}>
                <MaterialIcons name="check-circle" size={26} color="#22C55E" />
                <Text style={{ fontSize: 30, fontWeight: '800', color: '#22C55E', marginTop: 6, lineHeight: 34 }}>
                  {correctCount}
                </Text>
                <Text style={{ fontSize: 11, fontWeight: '600', color: textMuted, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  corretas
                </Text>
              </View>
              {/* Erradas */}
              <View style={{
                flex: 1, borderRadius: 18, padding: 16,
                backgroundColor: 'rgba(239,68,68,0.09)',
                borderWidth: 1.5, borderColor: 'rgba(239,68,68,0.25)',
                alignItems: 'center',
              }}>
                <MaterialIcons name="cancel" size={26} color="#EF4444" />
                <Text style={{ fontSize: 30, fontWeight: '800', color: '#EF4444', marginTop: 6, lineHeight: 34 }}>
                  {wrongCount}
                </Text>
                <Text style={{ fontSize: 11, fontWeight: '600', color: textMuted, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  erradas
                </Text>
              </View>
              {/* Total */}
              <View style={{
                flex: 1, borderRadius: 18, padding: 16,
                backgroundColor: 'rgba(63,81,181,0.09)',
                borderWidth: 1.5, borderColor: 'rgba(63,81,181,0.25)',
                alignItems: 'center',
              }}>
                <MaterialIcons name="quiz" size={26} color="#3F51B5" />
                <Text style={{ fontSize: 30, fontWeight: '800', color: '#3F51B5', marginTop: 6, lineHeight: 34 }}>
                  {totalCards}
                </Text>
                <Text style={{ fontSize: 11, fontWeight: '600', color: textMuted, marginTop: 3, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  total
                </Text>
              </View>
            </View>

            {/* ── Badge de categoria ── */}
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <View style={{
                flexDirection: 'row', alignItems: 'center', gap: 6,
                backgroundColor: 'rgba(63,81,181,0.08)',
                borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7,
                borderWidth: 1.5, borderColor: 'rgba(63,81,181,0.22)',
              }}>
                <MaterialIcons name="school" size={14} color="#3F51B5" />
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#3F51B5', letterSpacing: 0.2 }}>
                  {isMasterTest ? 'Teste Master' : `${decodedCategory} · ${activeDifficulty}`}
                </Text>
              </View>
            </View>

            {/* ── Botões ── */}
            <View style={{ gap: 10 }}>
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
                style={({ pressed }) => ({
                  backgroundColor: '#3F51B5',
                  borderRadius: 16, paddingVertical: 15,
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                  opacity: pressed ? 0.7 : 1,
                } as any)}>
                <MaterialIcons name="replay" size={18} color="white" />
                <Text style={{ color: 'white', fontWeight: '700', fontSize: 15 }}>Tentar novamente</Text>
              </Pressable>
              <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => ({
                  borderRadius: 16, paddingVertical: 15,
                  flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
                  borderWidth: 1.5, borderColor: cardBorder,
                  backgroundColor: cardBg,
                  opacity: pressed ? 0.7 : 1,
                } as any)}>
                <MaterialIcons name="grid-view" size={18} color={textMuted} />
                <Text style={{ color: textMuted, fontWeight: '600', fontSize: 15 }}>Voltar às categorias</Text>
              </Pressable>
            </View>

          </View>
        )}
      </View>
    );
  }


  // ---- Exercise screen ----
  return (
    <View className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]" style={(isDesktopWidth || isTabletWidth) ? { alignItems: 'center' } : undefined}>
      <View
        style={[
          { flex: 1 },
          isDesktopWidth || isTabletWidth ? { width: '60%', alignSelf: 'center' } : undefined,
        ]}>
      {/* Header */}
      {(isDesktopWidth || isTabletWidth) && (
        <Pressable
          onPress={() => router.back()}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16, alignSelf: 'flex-start' }}>
          <MaterialIcons name="arrow-back" size={18} color="#687076" />
          <Text style={{ color: '#687076', fontSize: 14 }}>Voltar</Text>
        </Pressable>
      )}
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

      <ScrollView ref={scrollViewRef} className="mt-4 flex-1" showsVerticalScrollIndicator={false}>
        {/* Question card */}
        {currentCard && (
          <>
            {/* Difficulty + Category badges */}
            <View className="mb-2 flex-row flex-wrap items-center gap-2">
              <View
                className="rounded-full px-2.5 py-1"
                style={{
                  backgroundColor:
                    currentCard.difficulty === 'Fácil'
                      ? 'rgba(34,197,94,0.12)'
                      : currentCard.difficulty === 'Médio'
                        ? 'rgba(245,158,11,0.12)'
                        : 'rgba(239,68,68,0.12)',
                }}>
                <Text
                  className="text-[10px] font-bold"
                  style={{
                    color:
                      currentCard.difficulty === 'Fácil'
                        ? '#22C55E'
                        : currentCard.difficulty === 'Médio'
                          ? '#F59E0B'
                          : '#EF4444',
                  }}>
                  {currentCard.difficulty.toUpperCase()}
                </Text>
              </View>
              <View className="rounded-full bg-[#3F51B5]/10 px-2.5 py-1">
                <Text className="text-[10px] font-bold text-[#3F51B5]">
                  {currentCard.category}
                </Text>
              </View>
            </View>

            <View className="min-h-[180px] items-center justify-center rounded-2xl border border-[#E6E8EB] bg-[#F8FAFC] px-5 py-6 dark:border-[#30363D] dark:bg-[#1E2228]">
              <GlossaryText
                text={currentCard.question}
                track={decodedTrack}
                className="text-center text-lg font-bold leading-7 text-[#11181C] dark:text-[#ECEDEE]"
              />
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
                        <GlossaryText
                          text={currentCard.explanation}
                          track={decodedTrack}
                          className="mt-1.5 text-sm leading-5 text-[#11181C] dark:text-[#ECEDEE]"
                        />
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

      {/* Efeito de conclusão da lição */}
      {showCompletionEffect && (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            alignItems: 'center', justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.85)',
            opacity: completionBgOpacity,
          }}>
          {/* Anel expansivo */}
          <Animated.View
            style={{
              position: 'absolute',
              width: 180, height: 180, borderRadius: 90,
              borderWidth: 3,
              borderColor: '#F59E0B',
              opacity: completionRingOpacity,
              transform: [{ scale: completionRingScale }],
            }}
          />
          {/* Ícone de troféu */}
          <Animated.View style={{ alignItems: 'center', transform: [{ scale: completionIconScale }] }}>
            <View style={{
              width: 120, height: 120, borderRadius: 60,
              backgroundColor: 'rgba(245,158,11,0.2)',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MaterialIcons name="emoji-events" size={72} color="#F59E0B" />
            </View>
          </Animated.View>
          {/* Textos */}
          <Animated.Text
            style={{
              color: '#ECEDEE', fontSize: 22, fontWeight: '700',
              marginTop: 20, letterSpacing: 0.5,
              opacity: completionTextOpacity,
            }}>
            Lição concluída!
          </Animated.Text>
          <Animated.Text
            style={{
              color: '#9BA1A6', fontSize: 14, marginTop: 8,
              opacity: completionTextOpacity,
            }}>
            {correctCount} / {totalCards} corretas
          </Animated.Text>
        </Animated.View>
      )}

      {/* Ícone de feedback centralizado (acerto/erro) */}
      <Animated.View
        pointerEvents="none"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          alignItems: 'center', justifyContent: 'center',
          opacity: iconOpacity,
        }}>
        <Animated.View
          style={{
            transform: [{ scale: iconScale }],
            width: 120, height: 120, borderRadius: 60,
            backgroundColor: feedbackType === 'correct' ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)',
            alignItems: 'center', justifyContent: 'center',
          }}>
          <MaterialIcons
            name={feedbackType === 'correct' ? 'check-circle' : 'cancel'}
            size={88}
            color={feedbackType === 'correct' ? '#22C55E' : '#EF4444'}
          />
        </Animated.View>
      </Animated.View>
    </View>
  );
}
