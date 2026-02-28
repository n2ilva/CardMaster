import { Link } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { SeniorityLevel } from '@/data/flashcards';
import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type LevelProgressItem = {
  totalCards: number;
  studiedCards: number;
  correctCards: number;
  studiedPercent: number;
  correctPercent: number;
  unlocked: boolean;
  completed: boolean;
  categories?: Array<{
    category: string;
    cards: number;
    attempts: number;
    correctAttempts: number;
    correctPercent: number;
    averageDurationSeconds: number;
  }>;
};

type ProgressPayload = {
  streakDays: number;
  attempts: number;
  totalUniqueReadyCards?: number;
  correctAttempts: number;
  averageDurationSeconds?: number;
  currentLevel?: SeniorityLevel;
  levelProgress?: Record<SeniorityLevel, LevelProgressItem>;
  rewardProgress?: {
    badges: string[];
  } | null;
};

const levelLabelByCode: Record<SeniorityLevel, string> = {
  INICIANTE: 'Iniciante',
  JUNIOR: 'Júnior',
  PLENO: 'Pleno',
  SENIOR: 'Sênior',
};

function formatSecondsToMMSS(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.round(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(safeSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
}

export default function ProgressScreen() {
  const bottomPadding = useTabContentPadding();
  const { token, user, progressRefreshKey, notifyProgressChanged } = useAuth();
  const [progress, setProgress] = useState<ProgressPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProgress() {
      if (!token) {
        setProgress(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const payload = await apiRequest<ProgressPayload>('/progress/me', { token });
        setProgress(payload);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Erro ao carregar progresso.');
      } finally {
        setLoading(false);
      }
    }

    void loadProgress();
  }, [progressRefreshKey, token]);

  const effectiveAttempts = progress?.attempts ?? 0;
  const effectiveTotalCards = progress?.totalUniqueReadyCards ?? 0;
  const effectiveCorrectAttempts = progress?.correctAttempts ?? 0;
  const effectiveStreak = progress?.streakDays ?? 0;
  const averageDurationSeconds = progress?.averageDurationSeconds ?? 0;

  const levelLabel = useMemo(() => {
    const currentLevel = progress?.currentLevel ?? 'INICIANTE';
    return levelLabelByCode[currentLevel];
  }, [progress?.currentLevel]);

  const accuracy = useMemo(() => {
    if (effectiveAttempts === 0) return 0;
    return Math.min(100, Math.round((effectiveCorrectAttempts / effectiveAttempts) * 100));
  }, [effectiveAttempts, effectiveCorrectAttempts]);

  const averageDurationLabel = useMemo(() => {
    if (averageDurationSeconds <= 0) {
      return '--:--';
    }

    const minutes = Math.floor(averageDurationSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(averageDurationSeconds % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }, [averageDurationSeconds]);

  async function onResetProgress() {
    if (!token) {
      return;
    }

    try {
      setResetting(true);
      setError(null);
      await apiRequest<{ message: string }>('/progress/reset', {
        method: 'POST',
        token,
      });
      notifyProgressChanged();
    } catch (resetError) {
      setError(resetError instanceof Error ? resetError.message : 'Erro ao resetar progresso.');
    } finally {
      setResetting(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Sua evolução</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Acompanhe desempenho, níveis e o tempo médio por card respondido.
      </Text>

      {!user ? (
        <>
          <Text className="mt-6 text-[#687076] dark:text-[#9BA1A6]">
            Faça login para ver sua evolução real.
          </Text>
          <Link href="/login" asChild>
            <Text className="mt-3 rounded-xl border border-[#3F51B5] px-4 py-3 text-center font-semibold text-[#3F51B5]">
              Entrar
            </Text>
          </Link>
        </>
      ) : null}

      {loading ? <Text className="mt-4 text-[#687076] dark:text-[#9BA1A6]">Carregando...</Text> : null}
      {error ? <Text className="mt-4 text-[#C92A2A]">{error}</Text> : null}
      <View className="mt-5 rounded-2xl bg-[#3F51B5] p-4">
        <Text className="text-sm text-white/80">Nível atual</Text>
        <Text className="text-2xl font-bold text-white">{levelLabel}</Text>
        <Text className="mt-1 text-white">
          {effectiveCorrectAttempts} acertos • {effectiveTotalCards} cards únicos • {effectiveAttempts} cards
        </Text>
      </View>

      <View className="mt-4 flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">Precisão</Text>
          <Text className="mt-1 text-lg font-bold text-[#11181C] dark:text-[#ECEDEE] sm:text-xl">
            {accuracy}%
          </Text>
        </View>
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">Tempo médio por card</Text>
          <Text className="mt-1 text-lg font-bold text-[#11181C] dark:text-[#ECEDEE] sm:text-xl">
            {averageDurationLabel}
          </Text>
        </View>
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">Sequência</Text>
          <Text className="mt-1 text-lg font-bold text-[#11181C] dark:text-[#ECEDEE] sm:text-xl">
            {effectiveStreak} dias
          </Text>
        </View>
      </View>

      <View className="mt-5 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
        <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">
          Progresso por nível (janela de 30 cards: 80% libera • 100% conclui)
        </Text>
        {(['INICIANTE', 'JUNIOR', 'PLENO', 'SENIOR'] as SeniorityLevel[]).map((level) => {
          const item = progress?.levelProgress?.[level];
          return (
            <View
              key={level}
              className={`mt-3 rounded-xl border p-3 ${
                item?.completed
                  ? 'border-[#22C55E]'
                  : item?.unlocked
                    ? 'border-[#2563EB]'
                    : 'border-[#F59E0B]'
              }`}>
              <Text className="text-sm font-semibold text-[#11181C] dark:text-[#ECEDEE]">{levelLabelByCode[level]}</Text>
              <Text className="mt-1 text-xs text-[#687076] dark:text-[#9BA1A6]">
                Acertos: {item?.correctPercent ?? 0}% • Estudado: {item?.studiedPercent ?? 0}%
                {item?.completed ? ' • Concluído' : item?.unlocked ? ' • Liberado' : ' • Em estudo'}
              </Text>

              <View className="mt-2 rounded-lg bg-[#F8FAFC] p-2.5 dark:bg-[#1E2228]">
                <Text className="text-xs font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                  Categorias estudadas
                </Text>

                {(item?.categories ?? []).length === 0 ? (
                  <Text className="mt-1 text-xs text-[#687076] dark:text-[#9BA1A6]">
                    Sem categorias estudadas neste nível ainda.
                  </Text>
                ) : (
                  (item?.categories ?? []).map((categoryItem) => (
                    <View
                      key={`${level}-${categoryItem.category}`}
                      className="mt-2 rounded-md border border-[#E6E8EB] px-2.5 py-2 dark:border-[#30363D]">
                      <Text className="text-xs font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                        {categoryItem.category}
                      </Text>
                      <Text className="mt-1 text-[11px] text-[#687076] dark:text-[#9BA1A6]">
                        Cards: {categoryItem.cards} • Acertos: {categoryItem.correctPercent}% • Tempo médio por card:{' '}
                        {formatSecondsToMMSS(categoryItem.averageDurationSeconds)}
                      </Text>
                    </View>
                  ))
                )}
              </View>
            </View>
          );
        })}
      </View>

      <View className="mt-5 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
        <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">Recompensas</Text>
        {(progress?.rewardProgress?.badges ?? []).map((badge) => (
          <Text key={badge} className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            • {badge}
          </Text>
        ))}
        {(progress?.rewardProgress?.badges ?? []).length === 0 ? (
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            Continue estudando para desbloquear badges.
          </Text>
        ) : null}
      </View>

      {user ? (
        <Pressable
          onPress={() => {
            if (!resetting) {
              void onResetProgress();
            }
          }}
          className="mt-5 rounded-xl border border-[#EF4444] px-4 py-3">
          <Text className="text-center font-semibold text-[#EF4444]">
            {resetting ? 'Resetando...' : 'Resetar Processo'}
          </Text>
        </Pressable>
      ) : null}
    </ScrollView>
  );
}
