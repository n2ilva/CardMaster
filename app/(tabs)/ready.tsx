import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { Link } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { Track } from '@/data/flashcards';

const studyTracks: { key: Track; label: string; description: string }[] = [
  {
    key: 'DESENVOLVIMENTO',
    label: 'Desenvolvimento',
    description: 'Linguagens, frameworks e boas práticas de engenharia de software.',
  },
  {
    key: 'INFRAESTRUTURA',
    label: 'Infraestrutura',
    description: 'Cabeamento, redes, arquitetura de computadores e operação de ambientes.',
  },
  {
    key: 'CLOUD',
    label: 'Cloud',
    description: 'AWS, Azure e Google Cloud com foco em cenários de prova.',
  },
  {
    key: 'MACHINE_LEARNING',
    label: 'Machine Learning',
    description: 'IA aplicada, modelos modernos, MLOps/LLMOps e governança de ML.',
  },
];

export default function ReadyCardsScreen() {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: tabBarHeight + 16 }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Escolha o tipo de estudo</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Selecione um tema para avançar para as categorias CardMaster.
      </Text>

      <View className="mt-5 gap-3">
        {studyTracks.map((studyTrack) => (
          <Link key={studyTrack.key} href={`/ready/${studyTrack.key}`} asChild>
            <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
              <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                {studyTrack.label}
              </Text>
              <Text className="mt-1 text-[#687076] dark:text-[#9BA1A6]">{studyTrack.description}</Text>
            </View>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
