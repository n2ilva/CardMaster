import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, Alert, Pressable, ScrollView, Text, View } from 'react-native';

import { trackLabels } from '@/data/tracks';
import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import {
  type CategoryProgress,
  fetchUserProgress,
  formatDuration,
  resetUserProgress,
} from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type SummaryLevel = 'Iniciante' | 'Intermediário' | 'Profissional' | 'Expert';

const levelColors: Record<SummaryLevel, string> = {
  Iniciante: '#22C55E',
  Intermediário: '#14B8A6',
  Profissional: '#F59E0B',
  Expert: '#8B5CF6',
};

function getSummaryLevel(accuracyPercent: number): SummaryLevel {
  if (accuracyPercent > 80) return 'Expert';
  if (accuracyPercent > 50) return 'Profissional';
  if (accuracyPercent > 20) return 'Intermediário';
  return 'Iniciante';
}

export default function ProgressScreen() {
  const bottomPadding = useTabContentPadding();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [resetting, setResetting] = useState(false);
  const [level, setLevel] = useState<SummaryLevel>('Iniciante');
  const [accuracy, setAccuracy] = useState(0);
  const [avgTime, setAvgTime] = useState(0);
  const [totalLessons, setTotalLessons] = useState(0);
  const [categories, setCategories] = useState<CategoryProgress[]>([]);

  const loadProgress = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const data = await fetchUserProgress(user.id);
      setLevel(getSummaryLevel(data.accuracyPercent));
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

  useFocusEffect(
    useCallback(() => {
      void loadProgress();
    }, [loadProgress])
  );

  const handleReset = useCallback(() => {
    Alert.alert(
      'Resetar progresso',
      'Tem certeza? Todas as suas lições completadas e em andamento serão deletadas permanentemente.',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Resetar',
          onPress: async () => {
            if (!user) return;
            try {
              setResetting(true);
              await resetUserProgress(user.id);
              // Reload data after reset
              void loadProgress();
            } catch (error) {
              console.error('Reset error:', error);
              Alert.alert('Erro', 'Falha ao resetar progresso. Tente novamente.');
            } finally {
              setResetting(false);
            }
          },
          style: 'destructive',
        },
      ],
    );
  }, [user, loadProgress]);

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
        Veja seu avanço por tema.
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
            : `${totalLessons} ${totalLessons === 1 ? 'lição concluída' : 'lições concluídas'} · média de acerto: ${accuracy}% · tempo médio por lição: ${formatDuration(avgTime)}`}
        </Text>
      </View>

      {/* Progress by category */}
      <View className="mt-5 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
        <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">
          Progresso por tema
        </Text>

        {categories.length === 0 ? (
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            Conclua lições para exibir progresso.
          </Text>
        ) : (
          <View className="mt-3 gap-3">
            {categories.map((cat) => (
              <View
                key={`${cat.track}__${cat.category}`}
                className="rounded-xl border border-[#E6E8EB] p-3 dark:border-[#30363D]">
                <Text className="text-sm font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                  {(trackLabels[cat.track] ?? cat.track) ? `${trackLabels[cat.track] ?? cat.track} · ${cat.category}` : cat.category}
                </Text>
                <View className="mt-2 flex-row justify-between">
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                    Estudo: {cat.studyPercent}%
                  </Text>
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                    Acertos: {cat.accuracyPercent}%
                  </Text>
                </View>
                <View className="mt-1 flex-row justify-between">
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                    Tempo/questão: {formatDuration(cat.avgTimePerQuestionMs)}
                  </Text>
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                    {cat.totalLessons} {cat.totalLessons === 1 ? 'lição' : 'lições'}
                  </Text>
                </View>

                {cat.hasInProgressLesson ? (
                  <View className="mt-1 rounded-lg border border-[#F59E0B] bg-[#F59E0B]/10 px-2 py-1">
                    <Text className="text-xs font-medium text-[#B45309] dark:text-[#FBBF24]">
                      Em andamento (não concluída): {cat.inProgressAnswered} {cat.inProgressAnswered === 1 ? 'pergunta respondida' : 'perguntas respondidas'}
                    </Text>
                  </View>
                ) : null}

                {/* Study progress bar */}
                <View className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${cat.studyPercent}%`,
                      backgroundColor: '#3F51B5',
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>

      {/* Reset button */}
      {totalLessons > 0 && (
        <Pressable
          onPress={handleReset}
          disabled={resetting}
          className="mt-6 mb-4 rounded-lg border border-[#EF4444] bg-[#EF4444]/10 px-4 py-3 active:opacity-70">
          <Text className="text-center text-sm font-semibold text-[#EF4444]">
            {resetting ? 'Resetando...' : 'Resetar progresso'}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

