import { ScrollView, Text } from 'react-native';

import { ReadyCardForm } from '@/components/ready-card-form';

export default function CreateCardsScreen() {
  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 24 }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Novo CARD</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Cadastre novas questões para alimentar a base CardMaster, com ou sem origem em prova.
      </Text>

      <ReadyCardForm />
    </ScrollView>
  );
}
