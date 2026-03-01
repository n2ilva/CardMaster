import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { type ComponentProps } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { useTabContentPadding } from '@/hooks/use-tab-content-padding';

type TrackCard = {
  key: string;
  label: string;
  icon: ComponentProps<typeof MaterialIcons>['name'];
  color: string;
};

const tracks: TrackCard[] = [
  { key: 'cloud', label: 'Cloud', icon: 'cloud-queue', color: '#0EA5E9' },
  { key: 'desenvolvimento', label: 'Desenvolvimento', icon: 'terminal', color: '#3F51B5' },
  { key: 'linguagens-de-programacao', label: 'Linguagens de Programação', icon: 'code', color: '#14B8A6' },
  { key: 'machine-learning-e-ia', label: 'Machine Learning e IA', icon: 'psychology', color: '#8B5CF6' },
  { key: 'matematica', label: 'Matemática', icon: 'functions', color: '#F59E0B' },
  { key: 'portugues', label: 'Português', icon: 'menu-book', color: '#EF4444' },
  { key: 'rede-de-computadores', label: 'Rede de Computadores', icon: 'lan', color: '#10B981' },
  { key: 'seguranca-da-informacao', label: 'Segurança da Informação', icon: 'shield', color: '#EC4899' },
];

export default function ReadyCardsScreen() {
  const bottomPadding = useTabContentPadding();

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Escolha o tema</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Selecione um tema para avançar para as categorias.
      </Text>

      <View className="mt-5 gap-3">
        {tracks.map((t) => (
          <Link key={t.key} href={`/ready/${t.key}`} asChild>
            <Pressable className="flex-row items-center gap-4 rounded-2xl border border-[#E6E8EB] p-4 active:opacity-70 dark:border-[#30363D]">
              <View
                className="h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: t.color }}>
                <MaterialIcons name={t.icon} size={24} color="#FFFFFF" />
              </View>
              <Text className="flex-1 text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                {t.label}
              </Text>
              <Text className="text-lg text-[#687076] dark:text-[#9BA1A6]">›</Text>
            </Pressable>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}

