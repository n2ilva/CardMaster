import { Audio } from 'expo-av';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Animated, useColorScheme, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTabContentPadding, useTopContentPadding } from '@/hooks/use-tab-content-padding';
import { useAuth } from '@/providers/auth-provider';

import {
  LANGUAGE_TOKENS,
  LANGUAGES,
  type LanguageInfo,
} from './coding-practice.constants';
import { type Exercise, type Language, type PlacedToken } from './coding-practice.types';
import { StudyFeedbackOverlay } from '../study-session/components/study-feedback-overlay';
import { StudyCompletionOverlay } from '../study-session/components/study-completion-overlay';
import { QUIZ_COLORS } from '@/constants/quiz-ui';
import { QuizStatCard } from '@/components/quiz/stat-card';
import {
  AnswerArea,
  CategoryGridCard,
  DIFFICULTY_CONFIG,
  ExerciseListCard,
  LanguageSelector,
  QuestionCard,
  TokenKeyboard,
  ValidateButton,
} from './components/coding-practice-components';

// ─── helpers ─────────────────────────────────────────────
function uid() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
}

// JSON data source — exercises loaded from separate files per language
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jsExercises = require('./data/exjavascript.json') as { exercises: Exercise[] };
// eslint-disable-next-line @typescript-eslint/no-var-requires
const javaExercises = require('./data/exjava.json') as { exercises: Exercise[] };
// eslint-disable-next-line @typescript-eslint/no-var-requires
const csharpExercises = require('./data/excsharp.json') as { exercises: Exercise[] };
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pythonExercises = require('./data/expython.json') as { exercises: Exercise[] };
// eslint-disable-next-line @typescript-eslint/no-var-requires
const typescriptExercises = require('./data/extypescript.json') as { exercises: Exercise[] };

const ALL_EXERCISES: Exercise[] = [
  ...jsExercises.exercises,
  ...javaExercises.exercises,
  ...csharpExercises.exercises,
  ...pythonExercises.exercises,
  ...typescriptExercises.exercises,
];


function validate(placed: PlacedToken[], exercise: Exercise): boolean {
  const cleanPlaced = placed.filter((p) => p.tokenId !== 'sym_newline');
  const cleanSolution = exercise.solution.filter((s) => s !== 'sym_newline');
  if (cleanPlaced.length !== cleanSolution.length) return false;
  return cleanPlaced.every((p, i) => p.tokenId === cleanSolution[i]);
}

import { CodingPracticeStore, type GlobalProgress } from './coding-practice.store';

// ─── Main Screen ─────────────────────────────────────────
export function CodingPracticeScreen() {
  const bottomPadding = useTabContentPadding();
  const topPadding = useTopContentPadding();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [selectedLang, setSelectedLang] = useState<LanguageInfo>(LANGUAGES[0]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [placed, setPlaced] = useState<PlacedToken[]>([]);
  const [pool, setPool] = useState<PlacedToken[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [hintIndex, setHintIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [finished, setFinished] = useState(false);
  const [showCompletionEffect, setShowCompletionEffect] = useState(false);
  const [feedbackType, setFeedbackType] = useState<'correct' | 'wrong' | null>(null);
  const [userProgress, setUserProgress] = useState<GlobalProgress>({});

  // Load progress
  React.useEffect(() => {
    CodingPracticeStore.getProgress(user?.id).then(setUserProgress);
  }, [user?.id]);

  const refreshProgress = useCallback(async () => {
    const p = await CodingPracticeStore.getProgress(user?.id);
    setUserProgress(p);
  }, [user?.id]);

  // Animated values for feedback
  const iconScale = useRef(new Animated.Value(0)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  // Animated values for completion
  const completionBgOpacity = useRef(new Animated.Value(0)).current;
  const completionIconScale = useRef(new Animated.Value(0)).current;
  const completionTextOpacity = useRef(new Animated.Value(0)).current;
  const completionRingScale = useRef(new Animated.Value(0.8)).current;
  const completionRingOpacity = useRef(new Animated.Value(0)).current;

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const initPool = useCallback((ex: Exercise) => {
    const newPool: PlacedToken[] = [];
    const tokensNeeded = ex.solution;
    const availableIds = ex.availableTokenIds;
    
    availableIds.forEach(id => {
      // Find how many times this token ID is needed in the solution
      const countInSolution = tokensNeeded.filter(sid => sid === id).length;
      // We provide at least 1 (if it's a distractor) or as many as needed
      const countToPool = Math.max(1, countInSolution);
      
      // Apply exercise-specific label if defined
      const customLabel = ex.tokenLabels?.[id];
      
      for (let i = 0; i < countToPool; i++) {
        newPool.push({ instanceId: uid(), tokenId: id, customLabel });
      }
    });
    
    setPool(newPool);
  }, []);

  const playSound = async (type: 'concluido' | 'erro') => {
    try {
      const source =
        type === 'concluido'
          ? require('../../../assets/songs/concluido.mp3')
          : require('../../../assets/songs/erro.mp3');
      const { sound } = await Audio.Sound.createAsync(source);
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync().catch(() => {});
        }
      });
    } catch (err) {
      console.log('Error playing sound', err);
    }
  };

  const exercisesForLang = useMemo(
    () => ALL_EXERCISES.filter((e) => e.language === (selectedLang.id as Language)),
    [selectedLang.id],
  );

  const categories = useMemo(() => {
    return Array.from(new Set(exercisesForLang.map((e) => e.exerciseType)));
  }, [exercisesForLang]);

  const exercisesForCategory = useMemo(() => {
    return exercisesForLang.filter((e) => e.exerciseType === selectedCategory);
  }, [exercisesForLang, selectedCategory]);

  const availableDifficulties = useMemo(() => {
    return Array.from(new Set(exercisesForCategory.map((e) => e.difficulty)));
  }, [exercisesForCategory]);

  const exercises = useMemo(() => {
    if (!selectedDifficulty) return exercisesForCategory;
    return exercisesForCategory.filter((e) => e.difficulty === selectedDifficulty);
  }, [exercisesForCategory, selectedDifficulty]);

  const allLangTokens = LANGUAGE_TOKENS[selectedLang.id as Language];
  const availableTokens = useMemo(() => {
    if (!activeExercise) return allLangTokens;
    return allLangTokens.filter((t) => activeExercise.availableTokenIds.includes(t.id));
  }, [activeExercise, allLangTokens]);

  // ── actions ──────────────────────────────────────────────
  const handleSelectLang = useCallback((lang: LanguageInfo) => {
    setSelectedLang(lang);
    setSelectedCategory(null);
    setSelectedDifficulty(null);
    setActiveExercise(null);
    setPlaced([]);
    setIsCorrect(null);
    setHintIndex(0);
  }, []);

  const handleSelectExercise = useCallback((ex: Exercise) => {
    setActiveExercise(ex);
    setPlaced([]);
    initPool(ex);
    setIsCorrect(null);
    setHintIndex(0);
    setStartTime(Date.now());
  }, [initPool]);
  const handleBack = useCallback(async () => {
    setActiveExercise(null);
    setPlaced([]);
    setPool([]);
    setIsCorrect(null);
    setHintIndex(0);
    setStartTime(null);
    setFinished(false);
    await refreshProgress();
  }, [refreshProgress]);

  const handleRestartExercise = useCallback(async () => {
    setPlaced([]);
    if (activeExercise) initPool(activeExercise);
    setIsCorrect(null);
    setHintIndex(0);
    setStartTime(Date.now());
    setFinished(false);
    await refreshProgress();
  }, [activeExercise, initPool, refreshProgress]);

  const handleAddToken = useCallback((instanceId: string) => {
    setPool((prevPool) => {
      const token = prevPool.find((p) => p.instanceId === instanceId);
      if (!token) return prevPool;
      setPlaced((prevPlaced) => [...prevPlaced, token]);
      return prevPool.filter((p) => p.instanceId !== instanceId);
    });
    setIsCorrect(null);
  }, []);

  const handleAddNewline = useCallback(() => {
    setPlaced((prev) => [...prev, { instanceId: uid(), tokenId: 'sym_newline' }]);
    setIsCorrect(null);
  }, []);

  const handleRemove = useCallback((instanceId: string) => {
    setPlaced((prev) => {
      const token = prev.find((p) => p.instanceId === instanceId);
      if (!token) return prev;
      
      if (token.tokenId !== 'sym_newline') {
        setPool((prevPool) => [...prevPool, token]);
      }
      return prev.filter((p) => p.instanceId !== instanceId);
    });
    setIsCorrect(null);
  }, []);

  const handleRename = useCallback((instanceId: string, newLabel: string) => {
    setPlaced((prev) =>
      prev.map((p) => (p.instanceId === instanceId ? { ...p, customLabel: newLabel } : p)),
    );
  }, []);

  const handleClear = useCallback(() => {
    setPool((prevPool) => {
      const toReturn = placed.filter((p) => p.tokenId !== 'sym_newline');
      return [...prevPool, ...toReturn];
    });
    setPlaced([]);
    setIsCorrect(null);
  }, [placed]);

  const handleValidate = useCallback(async () => {
    if (!activeExercise || placed.length === 0) return;
    const correct = validate(placed, activeExercise);

    if (correct) {
      setIsCorrect(true);
      const now = Date.now();
      const timeSecs = startTime ? Math.floor((now - startTime) / 1000) : 0;
      setElapsedTime(timeSecs);
      
      // Save global progress (sync to Firebase if logged in)
      await CodingPracticeStore.saveResult(activeExercise.id, timeSecs, user?.id);
      
      await playSound('concluido');

      // Feedback Popup
      setFeedbackType('correct');
      iconScale.setValue(0);
      iconOpacity.setValue(1);

      Animated.sequence([
        Animated.spring(iconScale, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }),
        Animated.delay(800),
        Animated.timing(iconOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => {
        // Completion Effect
        setShowCompletionEffect(true);
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
          Animated.delay(800),
          Animated.timing(completionBgOpacity, { toValue: 0, duration: 400, useNativeDriver: true }),
        ]).start(() => {
          setShowCompletionEffect(false);
          setFinished(true);
        });
      });
    } else {
      setIsCorrect(false);
      await playSound('erro');

      setFeedbackType('wrong');
      iconScale.setValue(0);
      iconOpacity.setValue(1);

      Animated.sequence([
        Animated.spring(iconScale, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }),
        Animated.delay(600),
        Animated.timing(iconOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
      ]).start(() => {
        setIsCorrect(null);
      });
    }
  }, [
    activeExercise,
    placed,
    startTime,
    iconScale,
    iconOpacity,
    completionBgOpacity,
    completionIconScale,
    completionTextOpacity,
    completionRingScale,
    completionRingOpacity,
  ]);

  const handleShowHint = useCallback(() => {
    const max = activeExercise?.hints?.length ?? 0;
    if (hintIndex < max) setHintIndex((h) => h + 1);
  }, [hintIndex, activeExercise]);

  // ─────────────────────────────────────────────
  // RENDER HELPERS
  // ─────────────────────────────────────────────

  const renderContent = () => {
    // 1. RESULTS VIEW
    if (finished && activeExercise) {
      const bg = isDark ? '#151718' : '#FFFFFF';
      const cardBg = isDark ? '#1C1F24' : '#F8FAFC';
      const cardBorder = isDark ? '#30363D' : '#E6E8EB';
      const textPrimary = isDark ? '#ECEDEE' : '#11181C';
      const textMuted = isDark ? '#9BA1A6' : '#687076';
      const accentColor = '#22C55E';

      return (
        <View style={{ flex: 1, backgroundColor: bg, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <View style={{ width: '100%', maxWidth: 420 }}>
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <View style={{ width: 148, height: 148, borderRadius: 74, borderWidth: 2, borderColor: `${accentColor}30`, backgroundColor: `${accentColor}0D`, alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                <View style={{ width: 108, height: 108, borderRadius: 54, borderWidth: 2, borderColor: `${accentColor}50`, backgroundColor: `${accentColor}18`, alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcons name="emoji-events" size={58} color={accentColor} />
                </View>
              </View>

              <Text style={{ fontSize: 42, fontWeight: '800', color: accentColor, letterSpacing: -1, textAlign: 'center' }}>EXCELENTE!</Text>
              <Text style={{ fontSize: 15, color: textMuted, marginTop: 8 }}>Exercício concluído com sucesso</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 10, marginBottom: 24 }}>
              <QuizStatCard 
                label="tempo" 
                value={`${Math.floor(elapsedTime / 60)}:${(elapsedTime % 60).toString().padStart(2, '0')}`} 
                icon="timer" 
                accentColor={QUIZ_COLORS.primary} 
                backgroundColor="rgba(63,81,181,0.09)" 
                borderColor="rgba(63,81,181,0.25)" 
                valueColor={QUIZ_COLORS.primary} 
                subtitleColor={textMuted} 
                style={{ flex: 1, padding: 16 }} 
                align="center" 
              />
              <QuizStatCard 
                label="precisão" 
                value="100%" 
                icon="check-circle" 
                accentColor={QUIZ_COLORS.success} 
                backgroundColor="rgba(34,197,94,0.09)" 
                borderColor="rgba(34,197,94,0.25)" 
                valueColor={QUIZ_COLORS.success} 
                subtitleColor={textMuted} 
                style={{ flex: 1, padding: 16 }} 
                align="center" 
              />
            </View>

            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(63,81,181,0.08)', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1.5, borderColor: 'rgba(63,81,181,0.22)' }}>
                <MaterialIcons name="code" size={14} color="#3F51B5" />
                <Text style={{ fontSize: 12, fontWeight: '700', color: '#3F51B5', letterSpacing: 0.2 }}>
                  {selectedLang.label} · {activeExercise.exerciseType}
                </Text>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <TouchableOpacity
                onPress={handleRestartExercise}
                style={{ padding: 16, borderRadius: 14, backgroundColor: '#3F51B5', alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                activeOpacity={0.7}
              >
                <MaterialIcons name="replay" size={20} color="#FFFFFF" />
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 16 }}>Praticar Novamente</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={handleBack}
                style={{ padding: 16, borderRadius: 14, backgroundColor: cardBg, borderWidth: 1, borderColor: cardBorder, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8 }}
                activeOpacity={0.7}
              >
                <MaterialIcons name="grid-view" size={20} color={textMuted} />
                <Text style={{ color: textMuted, fontWeight: 'bold', fontSize: 16 }}>Voltar aos Tópicos</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    // 2. ACTIVE EXERCISE VIEW
    if (activeExercise) {
      return (
        <View style={{ flex: 1 }}>
          {/* Scrollable area: pergunta + resposta */}
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingTop: topPadding + 8,
                paddingBottom: 16,
                flexGrow: 1,
                alignItems: 'center',
              }}
            >
              <View style={{ width: '100%', maxWidth: 768 }}>
                {/* ① Pergunta */}
                <QuestionCard
                  exercise={activeExercise}
                  language={selectedLang}
                  onBack={handleBack}
                  hintIndex={hintIndex}
                  onShowHint={handleShowHint}
                  onHideHints={() => setHintIndex(0)}
                />

                {/* ② Área de resposta */}
                <AnswerArea
                  placed={placed}
                  allTokens={availableTokens}
                  onRemove={handleRemove}
                  onRename={handleRename}
                  onClear={handleClear}
                  isCorrect={isCorrect}
                  expectedCount={activeExercise.solution.length}
                />
              </View>
            </ScrollView>
          </View>

          {/* ③④ Painel fixo na base: peças + botão verificar */}
          <View
            className="bg-white dark:bg-[#111316] border-t border-gray-200 dark:border-[#1E2328]"
            style={{
              paddingBottom: Math.max(insets.bottom, 12),
              shadowColor: '#000',
              shadowOffset: { width: 0, height: -3 },
              shadowOpacity: 0.12,
              shadowRadius: 8,
              elevation: 12,
              alignItems: 'center',
            }}
          >
            <View style={{ width: '100%', maxWidth: 768 }}>
              <View>
                {/* ③ Teclado de peças — fixo, sempre visível */}
                <TokenKeyboard
                  pool={pool}
                  allTokens={availableTokens}
                  onAddToken={handleAddToken}
                  onAddNewline={handleAddNewline}
                />

                {/* ④ Botão verificar */}
                <ValidateButton
                  onPress={handleValidate}
                  disabled={placed.length === 0}
                  isCorrect={isCorrect}
                />
              </View>
            </View>
          </View>
        </View>
      );
    }

    // 3. SELECTION VIEW (LANGUAGES/CATEGORIES)
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: topPadding, paddingBottom: bottomPadding + 16 }}
        >
          {/* Header - Padrão Quiz/Categorias */}
          <View className="px-5 mb-4 mt-5">
            <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">
              Prática de Código
            </Text>
            <Text className="mt-1 text-[#687076] dark:text-[#9BA1A6] text-sm">
              Monte a sintaxe como blocos de quebra-cabeça.
            </Text>
          </View>

          {/* Body limited container */}
          <View style={{ width: '100%', maxWidth: 880, alignSelf: 'center' }}>
            {/* Language selector */}
          <LanguageSelector
            languages={LANGUAGES}
            selected={selectedLang}
            onSelect={handleSelectLang}
          />

          {/* Main content area */}
          {!selectedCategory ? (
            /* CATEGORY GRID */
            <View style={{ paddingHorizontal: 16, marginTop: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: '#1E2328' }} />
                <Text style={{ color: '#6B7280', fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Tópicos de Estudo</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: '#1E2328' }} />
              </View>

              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {categories.map((cat) => {
                  const count = exercisesForLang.filter((e) => e.exerciseType === cat).length;
                  return (
                    <CategoryGridCard
                      key={cat}
                      categoryName={cat}
                      count={count}
                      onPress={() => setSelectedCategory(cat)}
                    />
                  );
                })}
                {categories.length === 0 && (
                  <View style={{ width: '100%', alignItems: 'center', paddingVertical: 48 }}>
                    <MaterialIcons name="code-off" size={40} color="#1E2328" />
                    <Text style={{ color: '#374151', fontSize: 13, marginTop: 12 }}>Nenhum tópico disponível para esta linguagem.</Text>
                  </View>
                )}
              </View>
            </View>
          ) : (
            /* EXERCISES LIST */
            <View>
              {/* Sub header for category */}
              <View style={{ paddingHorizontal: 16, marginBottom: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedCategory(null);
                    setSelectedDifficulty(null);
                  }}
                  hitSlop={12}
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 16,
                    backgroundColor: '#1E2328',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialIcons name="arrow-back" size={16} color="#ECEDEE" />
                </TouchableOpacity>
                <Text style={{ color: '#ECEDEE', fontSize: 16, fontWeight: '700' }}>{selectedCategory}</Text>
                <Text style={{ color: '#4B5563', fontSize: 13, marginLeft: 'auto' }}>
                  {exercisesForCategory.length} ex{exercisesForCategory.length !== 1 ? 's' : ''}
                </Text>
              </View>

              {/* Difficulty filter chips */}
              {availableDifficulties.length > 0 && (
                <View style={{ marginBottom: 16 }}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => setSelectedDifficulty(null)}
                      style={{
                        paddingHorizontal: 16,
                        paddingVertical: 6,
                        borderRadius: 20,
                        backgroundColor: selectedDifficulty === null ? '#ECEDEE' : '#1A1D21',
                        borderWidth: 1,
                        borderColor: selectedDifficulty === null ? '#ECEDEE' : '#2D3139',
                      }}
                    >
                      <Text style={{ color: selectedDifficulty === null ? '#111316' : '#9BA1A6', fontSize: 12, fontWeight: '700' }}>
                        Todos
                      </Text>
                    </TouchableOpacity>

                    {availableDifficulties.map((diff) => {
                      const isSelected = selectedDifficulty === diff;
                      const conf = DIFFICULTY_CONFIG[diff as keyof typeof DIFFICULTY_CONFIG];
                      return (
                        <TouchableOpacity
                          key={diff}
                          activeOpacity={0.7}
                          onPress={() => setSelectedDifficulty(diff)}
                          style={{
                            paddingHorizontal: 12,
                            paddingVertical: 6,
                            borderRadius: 20,
                            backgroundColor: isSelected ? conf.color : '#1A1D21',
                            borderWidth: 1,
                            borderColor: isSelected ? conf.color : '#2D3139',
                          }}
                        >
                          <Text style={{ color: isSelected ? '#111316' : conf.color, fontSize: 12, fontWeight: '700', textTransform: 'capitalize' }}>
                            {conf.label || diff}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </View>
              )}

              {/* Exercise cards */}
              <View style={{ paddingHorizontal: 16 }}>
                {exercises.length === 0 ? (
                  <View style={{ alignItems: 'center', paddingVertical: 48 }}>
                    <MaterialIcons name="inbox" size={40} color="#1E2328" />
                    <Text style={{ color: '#374151', fontSize: 13, marginTop: 12 }}>Nenhum exercício disponível nesta aba.</Text>
                  </View>
                ) : (
                  exercises.map((ex) => (
                    <ExerciseListCard
                      key={ex.id}
                      exercise={ex}
                      language={selectedLang}
                      progress={userProgress[ex.id]}
                      onPress={() => handleSelectExercise(ex)}
                    />
                  ))
                )}
              </View>
            </View>
          )}
        </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDark ? '#151718' : '#FFFFFF' }}>
      {renderContent()}

      {/* Overlays always rendered at top level */}
      <StudyFeedbackOverlay feedbackType={feedbackType} iconOpacity={iconOpacity} iconScale={iconScale} />
      <StudyCompletionOverlay
        visible={showCompletionEffect}
        correctCount={1}
        totalCards={1}
        title="Exercício concluído!"
        subtitle="Solução correta"
        backgroundOpacity={completionBgOpacity}
        iconScale={completionIconScale}
        textOpacity={completionTextOpacity}
        ringScale={completionRingScale}
        ringOpacity={completionRingOpacity}
      />
    </View>
  );
}
