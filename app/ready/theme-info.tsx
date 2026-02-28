import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Track } from '@/data/flashcards';
import { apiRequest } from '@/lib/api';

type CategoryInsight = {
  category: string;
  track: Track;
  summary: string;
  applications: string[];
  basicExample: string;
};

export default function ReadyThemeInfoScreen() {
  const { track, category } = useLocalSearchParams<{ track: Track; category: string }>();
  const contextLabel = `Tema: ${track ?? ''} · Categoria: ${category ?? ''}`.toLocaleUpperCase('pt-BR');
  const [insight, setInsight] = useState<CategoryInsight | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadInsight() {
      if (!track || !category) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const payload = await apiRequest<CategoryInsight>(
          `/ready-themes/insight?track=${track}&category=${encodeURIComponent(category)}`,
        );

        setInsight(payload);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Erro ao carregar resumo da categoria.');
      } finally {
        setLoading(false);
      }
    }

    void loadInsight();
  }, [track, category]);

  return (
    <ScrollView className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]" showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Pesquisa de categoria</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">{contextLabel}</Text>

      <View className="mt-5 gap-3 pb-8">
        {loading ? <Text className="text-[#687076] dark:text-[#9BA1A6]">Carregando...</Text> : null}
        {error ? <Text className="text-[#C92A2A]">{error}</Text> : null}

        {insight ? (
          <>
            <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
              <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">O que é</Text>
              <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">{insight.summary}</Text>
            </View>

            <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
              <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">Como é aplicada</Text>
              <View className="mt-2 gap-2">
                {insight.applications.map((item) => (
                  <Text key={item} className="text-[#687076] dark:text-[#9BA1A6]">
                    • {item}
                  </Text>
                ))}
              </View>
            </View>

            <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
              <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">Exemplo básico</Text>
              <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">{insight.basicExample}</Text>
            </View>
          </>
        ) : null}
      </View>
    </ScrollView>
  );
}
