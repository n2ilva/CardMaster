import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, Text, View, useColorScheme, type ScrollView as ScrollViewType } from 'react-native';

import { DesktopSidebar } from '@/components/desktop-sidebar';

import { QuizActionButton } from '@/components/quiz/action-button';
import { SelectableCard } from '@/components/quiz/selectable-card';
import { TRACK_STYLE_FALLBACK, trackStyles } from '@/constants/track-styles';
import { hasDocumentation } from '@/data/documentation';
import { CATEGORY_TYPE_LABEL } from '@/data/tracks';
import { getLanguageStudyPlan, getStudyPlan, LANGUAGE_GROUPS, STUDY_LEVEL_DESCRIPTIONS, STUDY_LEVELS, type StudyLevel } from '@/data/study-plans';
import { useStudyPlans } from '@/hooks/use-last-study-plan';
import { useLayoutMode } from '@/hooks/use-layout-mode';
import { getPlanEntryRoute } from '@/lib/study-flow';
import { useAuth } from '@/providers/auth-provider';
import { useData } from '@/providers/data-provider';

import { PlanningStepIndicator } from './components/planning-step-indicator';
import { isLightColor } from './ready-planning.utils';

type PlanningStep = 1 | 2 | 3 | 4;

export function ReadyPlanningScreen() {
  const router = useRouter();
  const { trackCatalog, userProgress } = useData();
  const layoutMode = useLayoutMode();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const isDesktopLayout = layoutMode === 'desktop';
  const bottomPadding = 40;

  const studyProgressMap = useMemo(() => {
    const map = new Map<string, { studied: number; percent: number }>();
    for (const category of userProgress?.categories ?? []) {
      map.set(`${category.track}__${category.category}`, {
        studied: category.uniqueQuestionsAnswered,
        percent: category.studyPercent,
      });
    }
    return map;
  }, [userProgress]);

  const scrollRef = useRef<ScrollViewType>(null);
  const [step, setStep] = useState<PlanningStep>(1);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<StudyLevel | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [customSequence, setCustomSequence] = useState<string[] | null>(null);
  const { user } = useAuth();
  const { addPlan } = useStudyPlans(user?.id);
  const { resume, track: resumeTrack, level: resumeLevel, language: resumeLanguage } = useLocalSearchParams<{
    resume?: string;
    track?: string;
    level?: string;
    language?: string;
  }>();

  const isLanguageTrack = selectedTrack === 'linguagens-de-programacao';
  const stepLabels = isLanguageTrack ? ['Tema', 'Linguagem', 'Nível', 'Plano'] : ['Tema', 'Nível', 'Plano'];

  useEffect(() => {
    if (resume === '1' && resumeTrack) {
      setSelectedTrack(resumeTrack);
      if (resumeLanguage) setSelectedLanguage(resumeLanguage);
      if (resumeLevel) setSelectedLevel(resumeLevel as StudyLevel);
      const isLanguageResume = resumeTrack === 'linguagens-de-programacao';
      setStep(isLanguageResume ? 4 : 3);
    }
  }, [resume, resumeTrack, resumeLevel, resumeLanguage]);

  const tracks = trackCatalog.map((item) => {
    const style = trackStyles[item.key] ?? TRACK_STYLE_FALLBACK;
    return { key: item.key, label: item.label, icon: style.icon, color: style.color };
  });

  const languageGroup = selectedLanguage ? LANGUAGE_GROUPS.find((group) => group.language === selectedLanguage) : null;

  const plan = useMemo(() => {
    if (isLanguageTrack && languageGroup && selectedLevel) {
      return getLanguageStudyPlan(languageGroup.language, selectedLevel);
    }
    return selectedTrack && selectedLevel ? getStudyPlan(selectedTrack, selectedLevel) : null;
  }, [isLanguageTrack, languageGroup, selectedTrack, selectedLevel]);

  const sequence = customSequence ?? plan?.sequence ?? [];
  const selectedTrackStyle = selectedTrack ? (trackStyles[selectedTrack] ?? TRACK_STYLE_FALLBACK) : null;

  useEffect(() => {
    if (plan) setCustomSequence([...plan.sequence]);
  }, [plan]);

  const moveItem = useCallback((from: number, to: number) => {
    setCustomSequence((prev) => {
      if (!prev) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  }, []);

  function renderTrackStep() {
    return (
      <>
        <Text style={{ color: '#ECEDEE', fontSize: isDesktopLayout ? 22 : 20, fontWeight: '700', marginBottom: 6 }}>
          O que você quer estudar?
        </Text>
        <Text style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
          Escolha a área de conhecimento para montar seu plano.
        </Text>

        {isDesktopLayout ? (
          <View style={{ flexDirection: 'row', gap: 14, flexWrap: 'wrap' }}>
            {tracks.map((trackItem) => {
              const active = selectedTrack === trackItem.key;
              return (
                <SelectableCard
                  key={trackItem.key}
                  title={trackItem.label}
                  accentColor={trackItem.color}
                  active={active}
                  onPress={() => setSelectedTrack(trackItem.key)}
                  icon={<MaterialIcons name={trackItem.icon} size={22} color={active ? (isLightColor(trackItem.color) ? '#1A1A1A' : '#FFFFFF') : trackItem.color} />}
                  containerStyle={{ width: '31%' }}
                  contentStyle={{ justifyContent: 'center' }}
                />
              );
            })}
          </View>
        ) : (
          <View style={{ gap: 10 }}>
            {tracks.map((trackItem) => {
              const active = selectedTrack === trackItem.key;
              return (
                <SelectableCard
                  key={trackItem.key}
                  title={trackItem.label}
                  accentColor={trackItem.color}
                  active={active}
                  onPress={() => {
                    setSelectedTrack(trackItem.key);
                    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 50);
                  }}
                  icon={<MaterialIcons name={trackItem.icon} size={22} color={active ? (isLightColor(trackItem.color) ? '#1A1A1A' : '#FFFFFF') : trackItem.color} />}
                  compact
                />
              );
            })}
          </View>
        )}

        <QuizActionButton label="Próximo" icon="arrow-forward" trailingIcon="arrow-forward" onPress={() => { if (selectedTrack) setStep(2); }} disabled={!selectedTrack} variant="primary-solid" style={{ marginTop: 28 }} />
      </>
    );
  }

  function renderLanguageStep() {
    return (
      <>
        <Text style={{ color: '#ECEDEE', fontSize: isDesktopLayout ? 22 : 20, fontWeight: '700', marginBottom: 6 }}>
          Qual linguagem você quer estudar?
        </Text>
        <Text style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
          Escolha a linguagem e veja todo o conteúdo disponível, incluindo frameworks.
        </Text>

        {isDesktopLayout ? (
          <View style={{ flexDirection: 'row', gap: 12, flexWrap: 'wrap' }}>
            {LANGUAGE_GROUPS.map((group) => {
              const active = selectedLanguage === group.language;
              return (
                <SelectableCard
                  key={group.language}
                  title={group.language}
                  subtitle={group.categories.length > 1 ? `+ ${group.categories.slice(1).join(', ')}` : undefined}
                  accentColor={group.color}
                  active={active}
                  onPress={() => setSelectedLanguage(group.language)}
                  icon={<MaterialCommunityIcons name={group.icon as any} size={22} color={active ? (isLightColor(group.color) ? '#1A1A1A' : '#FFFFFF') : group.color} />}
                  containerStyle={{ width: '31%' }}
                />
              );
            })}
          </View>
        ) : (
          <View style={{ gap: 8 }}>
            {LANGUAGE_GROUPS.map((group) => {
              const active = selectedLanguage === group.language;
              return (
                <SelectableCard
                  key={group.language}
                  title={group.language}
                  subtitle={group.categories.length > 1 ? `+ ${group.categories.slice(1).join(', ')}` : undefined}
                  accentColor={group.color}
                  active={active}
                  onPress={() => setSelectedLanguage(group.language)}
                  icon={<MaterialCommunityIcons name={group.icon as any} size={22} color={active ? (isLightColor(group.color) ? '#1A1A1A' : '#FFFFFF') : group.color} />}
                  compact
                />
              );
            })}
          </View>
        )}

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 28 }}>
          <QuizActionButton label="Voltar" icon="arrow-back" onPress={() => setStep(1)} variant="secondary" style={{ flex: 1 }} />
          <QuizActionButton label="Próximo" icon="arrow-forward" trailingIcon="arrow-forward" onPress={() => { if (selectedLanguage) setStep(3); }} disabled={!selectedLanguage} variant="primary-solid" style={{ flex: 2 }} />
        </View>
      </>
    );
  }

  function renderLevelStep() {
    return (
      <>
        <Text style={{ color: '#ECEDEE', fontSize: isDesktopLayout ? 22 : 20, fontWeight: '700', marginBottom: 6 }}>
          Qual é o seu nível?
        </Text>
        <Text style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
          Seja honesto — o plano será montado conforme seu ponto de partida.
        </Text>

        <View style={{ gap: 14 }}>
          {STUDY_LEVELS.map((level) => {
            const active = selectedLevel === level;
            const levelColors: Record<string, string> = {
              Iniciante: '#22C55E',
              Intermediário: '#F59E0B',
              Avançado: '#8B5CF6',
            };
            const color = levelColors[level]!;
            return (
              <SelectableCard key={level} title={level} subtitle={STUDY_LEVEL_DESCRIPTIONS[level]} accentColor={color} active={active} onPress={() => setSelectedLevel(level)} />
            );
          })}
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginTop: 28 }}>
          <QuizActionButton label="Voltar" icon="arrow-back" onPress={() => setStep(isLanguageTrack ? 2 : 1)} variant="secondary" style={{ flex: 1 }} />
          <QuizActionButton
            label="Ver meu plano"
            icon="auto-awesome"
            trailingIcon="arrow-forward"
            onPress={() => {
              if (selectedLevel && selectedTrack) {
                const trackLabel = tracks.find((trackItem) => trackItem.key === selectedTrack)?.label ?? selectedTrack;
                if (isLanguageTrack && languageGroup) {
                  addPlan({ track: selectedTrack, trackLabel: `${trackLabel} > ${selectedLanguage}`, level: selectedLevel, firstCategory: languageGroup.categories[0], language: selectedLanguage ?? undefined });
                } else {
                  const currentPlan = getStudyPlan(selectedTrack, selectedLevel);
                  if (currentPlan) {
                    addPlan({ track: selectedTrack, trackLabel, level: selectedLevel, firstCategory: currentPlan.sequence[0] });
                  }
                }
                setStep(isLanguageTrack ? 4 : 3);
              }
            }}
            disabled={!selectedLevel}
            variant="primary-solid"
            style={{ flex: 2 }}
          />
        </View>
      </>
    );
  }

  function renderPlanStep() {
    if (!plan || !selectedTrackStyle) return null;

    const levelColors: Record<string, string> = {
      Iniciante: '#22C55E',
      Intermediário: '#F59E0B',
      Avançado: '#8B5CF6',
    };
    const levelColor = levelColors[selectedLevel!]!;
    const trackColor = selectedTrackStyle.color;
    const getCategoryRoute = (category: string, index: number) =>
      getPlanEntryRoute({
        track: selectedTrack!,
        category,
        sequence,
        index,
      });

    return (
      <>
        <View style={{ borderRadius: 16, borderWidth: 1, borderColor: `${trackColor}40`, backgroundColor: `${trackColor}12`, padding: 20, marginBottom: 24, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 50, height: 50, borderRadius: 14, backgroundColor: `${trackColor}25`, alignItems: 'center', justifyContent: 'center' }}>
            <MaterialIcons name={selectedTrackStyle.icon} size={26} color={trackColor} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ECEDEE', fontSize: 16, fontWeight: '700' }}>
              {isLanguageTrack && selectedLanguage ? `${tracks.find((trackItem) => trackItem.key === selectedTrack)?.label} › ${selectedLanguage}` : tracks.find((trackItem) => trackItem.key === selectedTrack)?.label}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <View style={{ paddingHorizontal: 10, paddingVertical: 3, borderRadius: 99, backgroundColor: `${levelColor}20` }}>
                <Text style={{ color: levelColor, fontSize: 12, fontWeight: '700' }}>{selectedLevel}</Text>
              </View>
              <Text style={{ color: '#6B7280', fontSize: 12 }}>{plan.sequence.length} tópicos</Text>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 10, backgroundColor: '#1A1D21', borderRadius: 12, padding: 14, marginBottom: 24, borderLeftWidth: 3, borderLeftColor: '#F59E0B' }}>
          <MaterialIcons name="lightbulb" size={18} color="#F59E0B" />
          <Text style={{ color: '#9BA1A6', fontSize: 13, flex: 1, lineHeight: 19 }}>{plan.tip}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}>
          <Text style={{ color: '#ECEDEE', fontSize: 15, fontWeight: '700', flex: 1 }}>Sequência de estudos recomendada</Text>
          <Text style={{ color: '#6B7280', fontSize: 11 }}>Arraste para reordenar</Text>
        </View>

        <Text style={{ color: isDark ? '#6B7280' : '#94A3B8', fontSize: 12, lineHeight: 18, marginBottom: 14 }}>
          Cada tópico segue o mesmo ciclo: ler a documentação primeiro e depois praticar com os quizzes.
        </Text>

        <View style={{ gap: 10 }}>
          {sequence.map((category, index) => (
            <View key={category} style={{ borderRadius: 16, borderWidth: 1, borderColor: isDark ? '#30363D' : '#E2E8F0', backgroundColor: isDark ? '#1C1F24' : '#FFFFFF', padding: 16, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{ gap: 2 }}>
                <Pressable
                  onPress={() => moveItem(index, index - 1)}
                  disabled={index === 0}
                  style={({ pressed }) => ({ width: 28, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed && index > 0 ? '#2A2F36' : 'transparent', opacity: index === 0 ? 0.25 : 1 })}>
                  <MaterialIcons name="keyboard-arrow-up" size={20} color="#9BA1A6" />
                </Pressable>
                <Pressable
                  onPress={() => moveItem(index, index + 1)}
                  disabled={index === sequence.length - 1}
                  style={({ pressed }) => ({ width: 28, height: 22, borderRadius: 6, alignItems: 'center', justifyContent: 'center', backgroundColor: pressed && index < sequence.length - 1 ? '#2A2F36' : 'transparent', opacity: index === sequence.length - 1 ? 0.25 : 1 })}>
                  <MaterialIcons name="keyboard-arrow-down" size={20} color="#9BA1A6" />
                </Pressable>
              </View>

              <View style={{ width: 28, height: 28, borderRadius: 8, backgroundColor: index === 0 ? `${trackColor}30` : isDark ? '#2D3139' : '#F1F5F9', alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: index === 0 ? trackColor : isDark ? '#9BA1A6' : '#64748B', fontSize: 12, fontWeight: '700' }}>{index + 1}</Text>
              </View>

              <Pressable onPress={() => router.push(getCategoryRoute(category, index) as never)} style={{ flex: 1 }}>
                <Text style={{ color: isDark ? '#ECEDEE' : '#11181C', fontSize: 14, fontWeight: '700', letterSpacing: -0.3 }}>{category}</Text>
                {CATEGORY_TYPE_LABEL[category] && <Text style={{ color: isDark ? '#9BA1A6' : '#64748B', fontSize: 11, marginTop: 2 }}>{CATEGORY_TYPE_LABEL[category]}</Text>}
                <Text style={{ color: trackColor, fontSize: 11, fontWeight: '700', marginTop: 4 }}>
                  {hasDocumentation(selectedTrack!, category) ? '1. Ler documentação  2. Responder quizzes' : 'Ir direto para os quizzes'}
                </Text>
                {(() => {
                  const progress = studyProgressMap.get(`${selectedTrack}__${category}`);
                  if (!progress || progress.studied === 0) return null;
                  return <Text style={{ color: '#6B7280', fontSize: 11, marginTop: 2 }}>{progress.studied} cards estudados · {progress.percent}%</Text>;
                })()}
              </Pressable>

              {index === 0 && (
                <View style={{ backgroundColor: `${trackColor}20`, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 99 }}>
                  <Text style={{ color: trackColor, fontSize: 10, fontWeight: '700' }}>Comece aqui</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <QuizActionButton
          label={hasDocumentation(selectedTrack!, sequence[0]) ? 'Ler o primeiro tópico' : 'Iniciar pelo primeiro tópico'}
          icon={hasDocumentation(selectedTrack!, sequence[0]) ? 'auto-stories' : 'play-arrow'}
          onPress={() => router.push(getCategoryRoute(sequence[0], 0) as never)}
          variant="primary-solid"
          colors={{ backgroundColor: trackColor, pressedBackgroundColor: `${trackColor}CC`, borderColor: trackColor, textColor: '#FFFFFF' }}
          style={{ marginTop: 28 }}
        />

        <QuizActionButton
          label="Refazer planejamento"
          icon="refresh"
          onPress={() => {
            setStep(1);
            setSelectedTrack(null);
            setSelectedLevel(null);
            setSelectedLanguage(null);
          }}
          variant="ghost"
          style={{ marginTop: 12 }}
        />
      </>
    );
  }

  if (isDesktopLayout) {
    return (
      <View style={{ flex: 1, flexDirection: 'row', backgroundColor: isDark ? '#111316' : '#F8FAFC' }}>
        <DesktopSidebar />
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1, backgroundColor: isDark ? '#111316' : '#F8FAFC' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 40, paddingTop: 40, paddingBottom: bottomPadding }}>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, gap: 12 }}>
            <Pressable
              onPress={() => router.back()}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: isDark ? '#1C1F24' : '#F1F5F9',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 4,
                opacity: pressed ? 0.6 : 1,
              })}>
              <MaterialIcons name="arrow-back" size={24} color={isDark ? '#ECEDEE' : '#11181C'} />
            </Pressable>
            <View style={{ flex: 1 }}>
              <Text style={{ color: isDark ? '#ECEDEE' : '#11181C', fontSize: 26, fontWeight: '800', letterSpacing: -0.5 }}>Planejamento</Text>
              <Text style={{ color: isDark ? '#9BA1A6' : '#64748B', fontSize: 14, marginTop: 4 }}>Configure sua rota de estudos ideal.</Text>
            </View>
          </View>
          
          <View style={{ maxWidth: 720, width: '100%', alignSelf: 'center' }}>
            <PlanningStepIndicator current={step} labels={stepLabels} />

            {step === 1 && renderTrackStep()}
            {step === 2 && (isLanguageTrack ? renderLanguageStep() : renderLevelStep())}
            {step === 3 && (isLanguageTrack ? renderLevelStep() : renderPlanStep())}
            {step === 4 && renderPlanStep()}
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView
      ref={scrollRef}
      style={{ flex: 1, backgroundColor: isDark ? '#111316' : '#FFFFFF' }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ padding: 20, paddingTop: 56, paddingBottom: bottomPadding }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24, gap: 12 }}>
        <Pressable
          onPress={() => router.back()}
          style={({ pressed }) => ({
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: isDark ? '#1C1F24' : '#F1F5F9',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.6 : 1,
          })}>
          <MaterialIcons name="arrow-back" size={20} color={isDark ? '#ECEDEE' : '#11181C'} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={{ color: isDark ? '#ECEDEE' : '#11181C', fontSize: 24, fontWeight: '800', letterSpacing: -0.5 }}>Planejamento</Text>
          <Text style={{ color: isDark ? '#9BA1A6' : '#64748B', fontSize: 14, marginTop: 2 }}>Crie sua rota de estudos ideal.</Text>
        </View>
      </View>

      <PlanningStepIndicator current={step} labels={stepLabels} />

      {step === 1 && renderTrackStep()}
      {step === 2 && (isLanguageTrack ? renderLanguageStep() : renderLevelStep())}
      {step === 3 && (isLanguageTrack ? renderLevelStep() : renderPlanStep())}
      {step === 4 && renderPlanStep()}
    </ScrollView>
  );
}
