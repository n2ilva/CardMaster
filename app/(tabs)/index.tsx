import { Link, router } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { getDatabaseStats } from '@/data/cards/generator';
import { trackLabels } from '@/data/tracks';
import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import { useAuth } from '@/providers/auth-provider';

export default function HomeScreen() {
  const bottomPadding = useTabContentPadding();
  const { user, logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);
  
  const stats = useMemo(() => getDatabaseStats(), []);
  const themes = useMemo(() => Object.values(trackLabels), []);

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
        Seu app de estudos para evolução contínua com questões por temas e revisão guiada.
      </Text>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs uppercase tracking-wide text-[#687076] dark:text-[#9BA1A6]">Total de cards</Text>
          <Text className="mt-1 text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">{stats.totalCards}</Text>
        </View>
        <View className="flex-1 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-xs uppercase tracking-wide text-[#687076] dark:text-[#9BA1A6]">Temas ativos</Text>
          <Text className="mt-1 text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">{stats.activeTracks}</Text>
        </View>
      </View>

      <View className="mt-3 gap-3">
        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">Temas de estudos</Text>
          <View className="mt-3 flex-row flex-wrap gap-2">
            {themes.map((theme, index) => (
              <View key={index} className="w-[48%]">
                <Text className="text-sm text-[#687076] dark:text-[#9BA1A6]">• {theme}</Text>
              </View>
            ))}
          </View>
        </View>

        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">Como estudar aqui</Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            Na aba Cards, escolha um tema e categoria que deseja estudar. Selecione o nível de dificuldade (Fácil, Médio ou Difícil) e comece a responder as questões. Cada card traz uma explicação detalhada e exemplo prático para fixar o aprendizado.
          </Text>
        </View>

        <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
          <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">Recursos do app</Text>
          <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
            • Explicações detalhadas e exemplos práticos{`\n`}• 4 níveis de evolução (Iniciante → Expert){`\n`}• Temporizador por questão em tempo real{`\n`}• Continuação automática de lições interrompidas{`\n`}• Acompanhamento de progresso por categoria{`\n`}• Porcentagem de estudo e estatísticas detalhadas
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

