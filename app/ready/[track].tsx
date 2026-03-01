import { Link, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { trackCategories, trackLabels } from '@/data/tracks';
import { type CategoryStats, fetchCategoryStats } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

export default function ReadyTrackCategoriesScreen() {
  const { track } = useLocalSearchParams<{ track: string }>();
  const { user } = useAuth();
  const label = trackLabels[track ?? ''] ?? track ?? '';
  const categories = trackCategories[track ?? ''] ?? [];

  const [searchTerm, setSearchTerm] = useState('');
  const [statsMap, setStatsMap] = useState<Record<string, CategoryStats>>({});
  const [loadingStats, setLoadingStats] = useState(true);

  const loadStats = useCallback(async () => {
    if (!user) {
      setLoadingStats(false);
      return;
    }
    try {
      setLoadingStats(true);
      const results = await Promise.all(
        categories.map(async (cat) => {
          const stats = await fetchCategoryStats(user.id, cat);
          return [cat, stats] as const;
        }),
      );
      setStatsMap(Object.fromEntries(results));
    } catch {
      // silently fail
    } finally {
      setLoadingStats(false);
    }
  }, [categories, user]);

  useEffect(() => {
    void loadStats();
  }, [loadStats]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return categories;
    return categories.filter((c) => c.toLowerCase().includes(term));
  }, [categories, searchTerm]);

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">{label}</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        {categories.length} categorias disponíveis para estudo.
      </Text>

      <TextInput
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder="Pesquisar categoria"
        placeholderTextColor="#9BA1A6"
        autoCapitalize="none"
        autoCorrect={false}
        className="mt-4 rounded-xl border border-[#E6E8EB] bg-white px-3 py-2 text-[#11181C] dark:border-[#30363D] dark:bg-[#1C1F24] dark:text-[#ECEDEE]"
      />

      {loadingStats ? (
        <View className="mt-10 items-center">
          <ActivityIndicator size="large" color="#3F51B5" />
        </View>
      ) : (
        <View className="mt-5 gap-3 pb-8">
          {filtered.length === 0 ? (
            <Text className="text-[#687076] dark:text-[#9BA1A6]">Nenhuma categoria encontrada.</Text>
          ) : (
            filtered.map((cat) => {
              const stats = statsMap[cat];
              const studied = stats?.cardsStudied ?? 0;
              const accuracy = stats?.accuracyPercent ?? 0;

              return (
                <View
                  key={cat}
                  className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
                  <Text className="text-base font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                    {cat}
                  </Text>

                  <View className="mt-2 flex-row items-center gap-4">
                    <View className="flex-row items-center gap-1">
                      <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">Acertos:</Text>
                      <Text className="text-xs font-bold text-[#11181C] dark:text-[#ECEDEE]">
                        {studied > 0 ? `${accuracy}%` : '—'}
                      </Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">Cards estudados:</Text>
                      <Text className="text-xs font-bold text-[#11181C] dark:text-[#ECEDEE]">
                        {studied}
                      </Text>
                    </View>
                  </View>

                  {/* Accuracy bar */}
                  <View className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[#E6E8EB] dark:bg-[#2A2F36]">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${studied > 0 ? accuracy : 0}%`,
                        backgroundColor: accuracy >= 80 ? '#22C55E' : accuracy >= 50 ? '#F59E0B' : '#EF4444',
                      }}
                    />
                  </View>

                  <Link
                    href={`/ready/study?track=${encodeURIComponent(track ?? '')}&category=${encodeURIComponent(cat)}`}
                    asChild>
                    <Pressable className="mt-3 rounded-xl bg-[#3F51B5] px-4 py-2.5 active:opacity-70">
                      <Text className="text-center text-sm font-semibold text-white">Começar</Text>
                    </Pressable>
                  </Link>
                </View>
              );
            })
          )}
        </View>
      )}
    </ScrollView>
  );
}

