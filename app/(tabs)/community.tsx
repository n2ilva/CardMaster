import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import { ensureUserProfile, fetchUserProgress, fetchUsersByLevel, getScoreLevel, type ScoreLevel, type UserProfile } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';

const scoreLevelEmojis: Record<string, string> = {
  Bronze: '🥉',
  Prata: '🥈',
  Ouro: '🥇',
  Diamante: '💎',
};

const scoreLevelColors: Record<string, string> = {
  Bronze: '#CD7F32',
  Prata: '#C0C0C0',
  Ouro: '#FFD700',
  Diamante: '#00CED1',
};

export default function CommunityScreen() {
  const bottomPadding = useTabContentPadding();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [userScoreLevel, setUserScoreLevel] = useState<ScoreLevel>('Bronze');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  const loadCommunity = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('[Community] Carregando comunidade para usuário:', user.id);
      
      // Garante que o usuário tem um perfil na comunidade
      if (user.name) {
        await ensureUserProfile(user.id, user.name);
      }
      
      // Busca o progresso do usuário atual para calcular o scoreLevel
      const progress = await fetchUserProgress(user.id);
      console.log('[Community] Progresso do usuário:', progress);
      const scoreLevel = getScoreLevel(progress.totalScore);
      console.log('[Community] Nível de medalha calculado:', scoreLevel);
      setUserScoreLevel(scoreLevel);

      // Busca todos os usuários com o mesmo nível de medalha
      const communityUsers = await fetchUsersByLevel(scoreLevel, 100);
      console.log('[Community] Usuários encontrados:', communityUsers.length);
      setUsers(communityUsers);

      // Encontra a posição do usuário atual no ranking
      const currentPosition = communityUsers.findIndex(u => u.userId === user.id);
      console.log('[Community] Posição do usuário:', currentPosition);
      if (currentPosition !== -1) {
        setCurrentUserRank(currentPosition + 1);
      } else {
        console.warn('[Community] Usuário não encontrado no ranking!');
      }
    } catch (error) {
      console.error('Erro ao carregar comunidade:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      void loadCommunity();
    }, [loadCommunity])
  );

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-[#151718]">
        <ActivityIndicator size="large" color="#3F51B5" />
      </View>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-5 pt-14 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: bottomPadding }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Comunidade</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Ranking de usuários <Text className="font-bold">{userScoreLevel}</Text> {scoreLevelEmojis[userScoreLevel]}
      </Text>

      {/* Ranking Info */}
      {currentUserRank && (
        <View className="mt-5 rounded-2xl bg-[#F59E0B] p-4">
          <Text className="text-sm text-white/80">Sua posição no ranking</Text>
          <Text className="mt-1 text-3xl font-bold text-white">#{currentUserRank}</Text>
          <Text className="mt-1 text-sm text-white/70">de {users.length} usuários</Text>
        </View>
      )}

      {/* Users List */}
      <View className="mt-5 gap-3">
        {users.length === 0 ? (
          <Text className="mt-4 text-center text-[#687076] dark:text-[#9BA1A6]">
            Nenhum usuário encontrado neste nível.
          </Text>
        ) : (
          users.map((userProfile, index) => {
            const isCurrentUser = userProfile.userId === user?.id;
            return (
              <View
                key={userProfile.userId}
                className={`flex-row items-center gap-3 rounded-xl border p-3 ${
                  isCurrentUser
                    ? 'border-[#F59E0B] bg-[#F59E0B]/15'
                    : 'border-[#E6E8EB] dark:border-[#30363D]'
                }`}>
                {/* Rank */}
                <View className={`h-10 w-10 items-center justify-center rounded-full ${
                  isCurrentUser ? 'bg-[#F59E0B]' : 'bg-[#3F51B5]'
                }`}>
                  <Text className="text-sm font-bold text-white">#{index + 1}</Text>
                </View>

                {/* User Info */}
                <View className="flex-1">
                  <Text className={`text-sm font-semibold ${
                    isCurrentUser
                      ? 'text-[#D97706] dark:text-[#FBBF24]'
                      : 'text-[#11181C] dark:text-[#ECEDEE]'
                  }`}>
                    {userProfile.name}
                    {isCurrentUser && (
                      <Text className="ml-2 text-xs text-[#D97706] dark:text-[#FBBF24]"> (você)</Text>
                    )}
                  </Text>
                  <View className="mt-1 flex-row gap-2">
                    <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                      {userProfile.totalQuestionsAnswered} questões
                    </Text>
                    <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">•</Text>
                    <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">
                      {userProfile.overallAccuracy}% acertos
                    </Text>
                  </View>
                </View>

                {/* Score & Medal */}
                <View className="items-end gap-2">
                  <View className="flex-row items-center gap-2">
                    <Text className={`text-lg font-bold ${isCurrentUser ? 'text-[#D97706] dark:text-[#FBBF24]' : 'text-[#3F51B5]'}`}>
                      {userProfile.score}
                    </Text>
                    <Text className="text-2xl">
                      {scoreLevelEmojis[userProfile.scoreLevel]}
                    </Text>
                  </View>
                  <Text className="text-xs text-[#687076] dark:text-[#9BA1A6]">pontos</Text>
                </View>
              </View>
            );
          })
        )}
      </View>

      {/* Score Explanation */}
      <View className="mt-8 rounded-2xl border border-[#E6E8EB] p-4 dark:border-[#30363D]">
        <Text className="text-sm font-semibold text-[#11181C] dark:text-[#ECEDEE]">
          Como funciona o scoring?
        </Text>
        <Text className="mt-2 text-xs leading-5 text-[#687076] dark:text-[#9BA1A6]">
          {`• Base: 1 ponto por questão respondida\n`}
          {`• Acurácia: Até 50% de bônus por taxa de acerto\n`}
          {`• Velocidade: Até 25% de bônus por responder rápido (ideal: 20s por questão)`}
        </Text>
      </View>
    </ScrollView>
  );
}
