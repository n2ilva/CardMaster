import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { useTabContentPadding } from '@/hooks/use-tab-content-padding';
import { fetchUsersByLevel, type UserProfile, type UserLevel } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';
import { fetchUserProgress } from '@/lib/api';

export default function CommunityScreen() {
  const bottomPadding = useTabContentPadding();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [userLevel, setUserLevel] = useState<UserLevel>('Fácil');
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);

  const loadCommunity = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Busca o nível do usuário atual
      const progress = await fetchUserProgress(user.id);
      setUserLevel(progress.level);

      // Busca todos os usuários com o mesmo nível
      const communityUsers = await fetchUsersByLevel(progress.level, 100);
      setUsers(communityUsers);

      // Encontra a posição do usuário atual no ranking
      const currentPosition = communityUsers.findIndex(u => u.userId === user.id);
      if (currentPosition !== -1) {
        setCurrentUserRank(currentPosition + 1);
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
        Ranking de usuários no nível <Text className="font-bold">{userLevel}</Text>
      </Text>

      {/* Ranking Info */}
      {currentUserRank && (
        <View className="mt-5 rounded-2xl bg-gradient-to-r from-[#3F51B5] to-[#5C6BC0] p-4">
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
                    ? 'border-[#3F51B5] bg-[#3F51B5]/10'
                    : 'border-[#E6E8EB] dark:border-[#30363D]'
                }`}>
                {/* Rank */}
                <View className="h-10 w-10 items-center justify-center rounded-full bg-[#3F51B5]">
                  <Text className="text-sm font-bold text-white">#{index + 1}</Text>
                </View>

                {/* User Info */}
                <View className="flex-1">
                  <Text className="text-sm font-semibold text-[#11181C] dark:text-[#ECEDEE]">
                    {userProfile.name}
                    {isCurrentUser && (
                      <Text className="ml-2 text-xs text-[#3F51B5]"> (você)</Text>
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

                {/* Score */}
                <View className="items-end">
                  <Text className="text-lg font-bold text-[#3F51B5]">
                    {userProfile.score}
                  </Text>
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
