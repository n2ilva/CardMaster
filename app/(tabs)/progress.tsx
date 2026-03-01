import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import {
    type CategoryProgress,
    type UserLevel,
    fetchUserProgress,
    formatDuration,
} from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

const levelColors: Record<UserLevel, string> = {
  Fácil: '#22C55E',
  Médio: '#F59E0B',
  Difícil: '#EF4444',
};

export default function ProgressScreen() {
  const bottomPadding = useTabContentPadding();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState<UserLevel>('Fácil');
  const [accuracy, setAccuracy] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [categories, setCategories] = useState<CategoryProgress[]>([]);

  const loadProgress = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await fetchUserProgress(user.id);
      setLevel(data.level);
      setAccuracy(data.accuracyPercent);
      setAvgTime(data.avgTimeMs);
      setTotalLessons(data.totalLessons);
      setCategories(data.categories);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void loadProgress();
  }, [loadProgress]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-[#151718]">
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Sua evolução</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Acompanhe desempenho e o tempo médio por card respondido.
      </Text>

      {/* Level card */}
      <View className="mt-5 rounded-2xl bg-[#3F51B5] p-4">
        <Text className="text-sm text-white/80">Resumo geral</Text>
        <Text className="mt-1 text-2xl font-bold text-white">
          Nível:{' '}
          <Text style={{ color: levelColors[level] }}>{level}</Text>
        </Text>
        <Text className="mt-1 text-sm text-white/70">
          {totalLessons === 0
            ? 'Nenhuma lição concluída ainda.'
            : `${totalLessons} ${totalLessons === 1 ? 'lição concluída' : 'lições concluídas'} · ≥ 80% de acerto = nível acima`}
        </Text>
      </View>

      {/* Stats row */}
      <View className="mt-4 flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">Precisão</Text>
          <Text className="mt-1 text-lg font-bold text-[#11181C] dark:text-[#ECEDEE] sm:text-xl">
            {totalLessons > 0 ? `${accuracy}%` : '—'}
          </Text>
        </View>
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">Tempo médio por lição</Text>
          <Text className="mt-1 text-lg font-bold text-[#11181C] dark:text-[#ECEDEE] sm:text-xl">
            {totalLessons > 0 ? formatDuration(avgTime) : '--:--'}
          </Text>
        </View>
      </View>

      {/* Progress by category */}
      <View className="mt-5 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
        <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">
          Progresso por tema
        </Text>

        {categories.length === 0 ? (
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            Nenhuma categoria encontrada. Conclua lições para ver seu progresso.
          </Text>
        ) : (
          <View className="mt-3 gap-3">
            {categories.map((cat) => (
              <View
                key={cat.category}
                className="rounded-xl border border-[#E6E8EB] p-3 dark:border-[#30363D]">
                <Text className="text-sm font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                  {cat.category}
                </Text>
                <View className="mt-2 flex-row justify-between">
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                    Acertos: {cat.accuracyPercent}%
                  </Text>
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                    Tempo médio: {formatDuration(cat.avgTimeMs)}
                  </Text>
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                    {cat.totalLessons} {cat.totalLessons === 1 ? 'lição' : 'lições'}
                  </Text>
                </View>
                {/* Accuracy bar */}
                <View className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${cat.accuracyPercent}%`,
                      backgroundColor: cat.accuracyPercent >= 80 ? '#22C55E' : cat.accuracyPercent >= 50 ? '#F59E0B' : '#EF4444',
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

