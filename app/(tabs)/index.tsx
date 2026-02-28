import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { tracks } from '@/data/flashcards';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type ReadySummary = {
  counts: {
    DESENVOLVIMENTO: number;
    INFRAESTRUTURA: number;
    CLOUD: number;
    MACHINE_LEARNING: number;
  };
  total: number;
};

export default function HomeScreen() {
  const tabBarHeight = useBottomTabBarHeight();
  const { user, logout } = useAuth();
  const [summary, setSummary] = useState<ReadySummary | null>(null);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    async function loadSummary() {
      try {
        const payload = await apiRequest<ReadySummary>('/ready-cards/summary');
        setSummary(payload);
      } catch {
        setSummary(null);
      }
    }

    void loadSummary();
  }, []);

  const developmentCount = summary?.counts.DESENVOLVIMENTO ?? 0;
  const infraCount = summary?.counts.INFRAESTRUTURA ?? 0;
  const cloudCount = summary?.counts.CLOUD ?? 0;
  const mlCount = summary?.counts.MACHINE_LEARNING ?? 0;
  const totalCards = summary?.total ?? 0;

  async function onLogout() {
    try {
      setLoggingOut(true);
      await logout();
      router.replace('/login');
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}>
      <Text className="text-3xl font-bold text-[#11181C] dark:text-[#ECEDEE]">CardMaster</Text>
      <Text className="mt-2 text-base text-[#687076] dark:text-[#9BA1A6]">
        {user ? `Bem-vindo, ${user.name}.` : 'Bem-vindo.'} Evolua todos os dias com estudos práticos por tema.
      </Text>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs uppercase tracking-wide text-[#687076] dark:text-[#9BA1A6]">Total de cards</Text>
          <Text className="mt-1 text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">{totalCards}</Text>
        </View>
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs uppercase tracking-wide text-[#687076] dark:text-[#9BA1A6]">Temas ativos</Text>
          <Text className="mt-1 text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">4</Text>
        </View>
      </View>

      <View className="mt-3 gap-3">
        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">
            Sessão CardMaster
          </Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            Desenvolvimento ({developmentCount}), Infraestrutura ({infraCount}), Cloud ({cloudCount}) e
            Machine Learning ({mlCount}).
          </Text>
        </View>

        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">
            Revisão inteligente
          </Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            Escolha tema e nível para revisar com foco. O progresso é sincronizado com sua conta.
          </Text>
        </View>

        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">
            Plano de evolução
          </Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            Mantenha consistência: mais acertos e mais domínio por tema.
          </Text>
        </View>
      </View>

      <View className="mt-6 gap-3">
        <Link href="/(tabs)/ready" asChild>
          <Text className="rounded-xl bg-[#3F51B5] px-4 py-3 text-center font-semibold text-white">
            Começar no CardMaster
          </Text>
        </Link>
        <Pressable
          onPress={() => {
            if (!loggingOut) {
              void onLogout();
            }
          }}
          className="rounded-xl border border-[#3F51B5] px-4 py-3">
          <Text className="text-center font-semibold text-[#3F51B5]">
            {loggingOut ? 'Saindo...' : 'Logout'}
          </Text>
        </Pressable>
      </View>

      <Text className="mt-5 text-xs text-[#687076] dark:text-[#9BA1A6]">
        Temas base: {tracks.DESENVOLVIMENTO.length} em Desenvolvimento,{' '}
        {tracks.INFRAESTRUTURA.length} em Infra, {tracks.CLOUD.length} em Cloud e{' '}
        {tracks.MACHINE_LEARNING.length} em Machine Learning.
      </Text>
    </ScrollView>
  );
}
