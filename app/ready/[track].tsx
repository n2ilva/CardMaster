import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { SeniorityLevel, Track } from '@/data/flashcards';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type CategoryItem = {
  category: string;
  studiedPercent: number;
  levels: Record<
    SeniorityLevel,
    {
      unlocked: boolean;
      completed: boolean;
      correctPercent: number;
    }
  >;
};

const levels: SeniorityLevel[] = ['INICIANTE', 'JUNIOR', 'PLENO', 'SENIOR'];

export default function ReadyTrackCategoriesScreen() {
  const { token } = useAuth();
  const { track } = useLocalSearchParams<{ track: Track }>();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<Record<string, SeniorityLevel>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategories() {
      if (!track || !token) {
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const payload = await apiRequest<CategoryItem[]>(`/ready-cards/categories-progress?track=${track}`, {
          token,
        });
        setCategories(payload);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Erro ao carregar categorias.');
      } finally {
        setLoading(false);
      }
    }

    void loadCategories();
  }, [token, track]);

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Categorias</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Tema selecionado: {track}. Escolha categoria, nível e inicie direto.
      </Text>

      <View className="mt-5 gap-3 pb-8">
        {loading ? <Text className="text-[#687076] dark:text-[#9BA1A6]">Carregando...</Text> : null}
        {error ? <Text className="text-[#C92A2A]">{error}</Text> : null}
        {categories.map((item) => {
          const selectedLevel = selectedLevels[item.category] ?? 'INICIANTE';

          return (
            <View key={item.category} className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
              <View className="flex-row items-start justify-between gap-3">
                <Text className="flex-1 text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                  {item.category}
                </Text>
                <View className="rounded-full bg-[#EEF2F5] px-2.5 py-1 dark:bg-[#2A2F36]">
                  <Text className="text-xs font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                    {item.studiedPercent}% estudado
                  </Text>
                </View>
              </View>

              <View className="mt-3 flex-row flex-wrap gap-2">
                {levels.map((level) => (
                  <Pressable
                    key={`${item.category}-${level}`}
                    onPress={() => {
                      setSelectedLevels((previous) => ({ ...previous, [item.category]: level }));
                    }}
                    className={`rounded-full px-3 py-1.5 ${
                      selectedLevel === level
                        ? 'bg-[#3F51B5]'
                        : item.levels[level].completed
                          ? 'border border-[#22C55E] bg-[#EEF2F5] dark:bg-[#2A2F36]'
                          : item.levels[level].unlocked
                            ? 'border border-[#2563EB] bg-[#EFF6FF] dark:bg-[#1E293B]'
                          : 'border border-[#F59E0B] bg-[#EEF2F5] dark:bg-[#2A2F36]'
                    }`}>
                    <Text
                      className={`text-xs font-semibold ${
                        selectedLevel === level ? 'text-white' : 'text-[#11181C] dark:text-[#ECEDEE]'
                      }`}>
                      {level}
                    </Text>
                  </Pressable>
                ))}
              </View>

              <Link
                href={`/ready/study?track=${track}&category=${encodeURIComponent(item.category)}&level=${selectedLevel}`}
                asChild>
                <Pressable className="mt-4 rounded-xl bg-[#3F51B5] px-4 py-3">
                  <Text className="text-center text-sm font-semibold text-white">Começar</Text>
                </Pressable>
              </Link>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
