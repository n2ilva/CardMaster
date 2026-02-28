import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { Track } from '@/data/flashcards';
import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

type StudyTrack = { key: Track; label: string; description: string };

export default function ReadyCardsScreen() {
  const bottomPadding = useTabContentPadding();
  const { token } = useAuth();
  const [studyTracks, setStudyTracks] = useState<StudyTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTracks() {
      try {
        setLoading(true);
        setError(null);
        const payload = await apiRequest<StudyTrack[]>('/ready-cards/tracks', { token: token ?? undefined });
        setStudyTracks(payload);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar temas.');
      } finally {
        setLoading(false);
      }
    }
    void loadTracks();
  }, [token]);

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Escolha o tipo de estudo</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Selecione um tema para avançar para as categorias CardMaster.
      </Text>

      <View className="mt-5 gap-3">
        {loading ? (
          <ActivityIndicator size="large" className="mt-8" />
        ) : error ? (
          <Text className="text-[#C92A2A]">{error}</Text>
        ) : studyTracks.length === 0 ? (
          <Text className="text-[#687076] dark:text-[#9BA1A6]">Nenhum tema disponível.</Text>
        ) : (
          studyTracks.map((studyTrack) => (
            <Link key={studyTrack.key} href={`/ready/${studyTrack.key}`} asChild>
              <View className="rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
                <Text className="text-lg font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                  {studyTrack.label}
                </Text>
                <Text className="mt-1 text-[#687076] dark:text-[#9BA1A6]">{studyTrack.description}</Text>
              </View>
            </Link>
          ))
        )}
      </View>
    </ScrollView>
  );
}
