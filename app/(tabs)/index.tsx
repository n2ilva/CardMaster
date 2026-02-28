import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type TrackEntry = {
  key: string;
  label: string;
  count: number;
};

type ReadySummary = {
  tracks: TrackEntry[];
  activeTracksCount: number;
  total: number;
};

export default function HomeScreen() {
  const bottomPadding = useTabContentPadding();
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

  const totalCards = summary?.total ?? 0;
  const activeTracksCount = summary?.activeTracksCount ?? 0;
  const trackEntries = summary?.tracks ?? [];

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
      contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Text className="text-3xl font-bold text-[#11181C] dark:text-[#ECEDEE]">CardMaster</Text>
      <Text className="mt-2 text-base text-[#687076] dark:text-[#9BA1A6]">
        {user ? (
          <>
            Bem-vindo, <Text className="font-bold text-[#11181C] dark:text-[#ECEDEE]">{user.name}</Text>.
          </>
        ) : (
          'Bem-vindo.'
        )}{' '}
        Seu app de estudos para evolução contínua com questões por temas, níveis progressivos e revisão
        guiada.
      </Text>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs uppercase tracking-wide text-[#687076] dark:text-[#9BA1A6]">Total de cards</Text>
          <Text className="mt-1 text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">{totalCards}</Text>
        </View>
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs uppercase tracking-wide text-[#687076] dark:text-[#9BA1A6]">Temas ativos</Text>
          <Text className="mt-1 text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">{activeTracksCount}</Text>
        </View>
      </View>

      <View className="mt-3 gap-3">
        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">Temas de estudos</Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            {trackEntries.length > 0
              ? trackEntries.map((t, i) => {
                  const sep = i === trackEntries.length - 1 ? '.' : i === trackEntries.length - 2 ? ' e ' : ', ';
                  return `${t.label} (${t.count})${sep}`;
                }).join('')
              : 'Carregando...'}
          </Text>
        </View>

        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">Como estudar aqui</Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            1) Escolha tema e categoria. 2) Selecione qualquer nível (Iniciante, Júnior, Pleno ou Sênior).
            3) Faça uma sequência de 30 cards no nível escolhido. Com 80%+ de acerto, você é considerado
            naquele nível. Você também pode criar seus próprios cards personalizados!
          </Text>
        </View>

        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">Recursos do app</Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            • Explicação contextual por resposta{`\n`}• Tipo da pergunta no card (Lógica, Arquitetura,
            Segurança...){`\n`}• Progresso por nível na janela de 30 tentativas (80% libera, 100%
            conclui){`\n`}• Tempo médio por tentativa e sequência de estudos
          </Text>
        </View>


      </View>

      <View className="mt-6 gap-3">
        <Link href="/(tabs)/ready" asChild>
          <Text className="overflow-hidden rounded-2xl bg-[#22C55E] px-5 py-4 text-center text-lg font-bold tracking-wide text-white shadow-lg">
            BORA ESTUDAR!
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
    </ScrollView>
  );
}
