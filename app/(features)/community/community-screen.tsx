import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { PanelCard } from '@/components/quiz/panel-card';
import { QuizStatCard } from '@/components/quiz/stat-card';
import { SCORE_LEVEL_COLORS, SCORE_LEVEL_EMOJIS, SCORE_LEVEL_RANGES, SCORE_LEVELS } from '@/constants/score-levels';
import { QUIZ_COLORS } from '@/constants/quiz-ui';
import { useLayoutMode } from '@/hooks/use-layout-mode';
import { useTabContentPadding, useTopContentPadding } from '@/hooks/use-tab-content-padding';
import { ensureUserProfile, fetchUserProgress, fetchUsersByLevel, getScoreLevel, type ScoreLevel, type UserProfile } from '@/lib/api';
import { useAuth } from '@/providers/auth-provider';
import { useData } from '@/providers/data-provider';

import { CommunityUserCard } from './components/community-user-card';

export function CommunityScreen() {
  const bottomPadding = useTabContentPadding();
  const topPadding = useTopContentPadding();
  const { user } = useAuth();
  const { userProgress: cachedProgress } = useData();
  const layoutMode = useLayoutMode();

  const cachedScoreLevel = cachedProgress ? getScoreLevel(cachedProgress.totalScore) : 'Bronze';
  const [loading, setLoading] = useState(true);
  const [userScoreLevel, setUserScoreLevel] = useState<ScoreLevel>(cachedScoreLevel);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [currentUserRank, setCurrentUserRank] = useState<number | null>(null);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const isFirstLoad = useRef(true);

  const loadCommunity = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      if (user.name) {
        await ensureUserProfile(user.id, user.name);
      }

      let scoreLevel: ScoreLevel;
      if (isFirstLoad.current && cachedProgress) {
        scoreLevel = getScoreLevel(cachedProgress.totalScore);
        isFirstLoad.current = false;
      } else {
        const progress = await fetchUserProgress(user.id);
        scoreLevel = getScoreLevel(progress.totalScore);
        isFirstLoad.current = false;
      }

      setUserScoreLevel(scoreLevel);

      const communityUsers = await fetchUsersByLevel(scoreLevel, 100);
      setUsers(communityUsers);

      const currentPosition = communityUsers.findIndex((communityUser) => communityUser.userId === user.id);
      if (currentPosition !== -1) {
        setCurrentUserRank(currentPosition + 1);
      }
    } catch (error) {
      console.error('Erro ao carregar comunidade:', error);
    } finally {
      setLoading(false);
    }
  }, [cachedProgress, user]);

  useFocusEffect(
    useCallback(() => {
      void loadCommunity();
    }, [loadCommunity]),
  );

  if (layoutMode === 'desktop') {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#111316' }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 32, paddingTop: 32, paddingBottom: bottomPadding }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 28, gap: 16 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: '#ECEDEE', fontSize: 26, fontWeight: '700' }}>Comunidade</Text>
            <Text style={{ color: '#687076', fontSize: 14, marginTop: 4 }}>
              Ranking de usuários
              {loading ? '...' : (
                <Text style={{ fontWeight: '700', color: SCORE_LEVEL_COLORS[userScoreLevel] }}>
                  {' '}
                  {userScoreLevel} {SCORE_LEVEL_EMOJIS[userScoreLevel]}
                </Text>
              )}
            </Text>
          </View>
          {currentUserRank && (
            <QuizStatCard label="Sua posição" value={`#${currentUserRank}`} subtitle={`de ${users.length} usuários`} accentColor="#FFFFFF" backgroundColor={QUIZ_COLORS.warning} borderColor={QUIZ_COLORS.warning} valueColor="#FFFFFF" labelColor="rgba(255,255,255,0.8)" subtitleColor="rgba(255,255,255,0.7)" align="center" style={{ minWidth: 156 }} />
          )}
        </View>

        <View style={{ maxWidth: 960, width: '100%', alignSelf: 'center' }}>
          {loading ? (
            <View style={{ alignItems: 'center', marginTop: 80 }}>
              <ActivityIndicator size="large" color="#A5B4FC" />
            </View>
          ) : (
            <>
              <View style={{ flexDirection: 'row', gap: 16, marginBottom: 24 }}>
                <PanelCard style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <Text style={{ fontSize: 20 }}>🏆</Text>
                    <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 15, fontWeight: '600' }}>Como funciona?</Text>
                  </View>
                  <View style={{ gap: 10 }}>
                    {[
                      { icon: '📌', text: 'Base: 1 ponto por questão respondida' },
                      { icon: '🎯', text: 'Acurácia: Até 50% de bônus por taxa de acerto' },
                      { icon: '⚡', text: 'Velocidade: Até 25% de bônus por responder rápido' },
                    ].map((item, index) => (
                      <View key={index} style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 15 }}>{item.icon}</Text>
                        <Text style={{ color: QUIZ_COLORS.textMuted, fontSize: 12, lineHeight: 18, flex: 1 }}>{item.text}</Text>
                      </View>
                    ))}
                  </View>
                </PanelCard>

                <PanelCard style={{ flex: 1 }}>
                  <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 15, fontWeight: '600', marginBottom: 14 }}>Medalhas</Text>
                  <View style={{ gap: 8 }}>
                    {SCORE_LEVELS.map((level) => (
                      <View key={level} style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 6, backgroundColor: QUIZ_COLORS.surfaceRaised, borderRadius: 8, paddingHorizontal: 10 }}>
                        <Text style={{ fontSize: 16 }}>{SCORE_LEVEL_EMOJIS[level]}</Text>
                        <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 12, fontWeight: '600', flex: 1 }}>{level}</Text>
                        <Text style={{ color: SCORE_LEVEL_COLORS[level], fontSize: 11 }}>{SCORE_LEVEL_RANGES[level]}</Text>
                      </View>
                    ))}
                  </View>
                </PanelCard>
              </View>

              <View style={{ gap: 8 }}>
                {users.length === 0 ? (
                  <Text style={{ color: '#687076', textAlign: 'center', marginTop: 40 }}>Nenhum usuário encontrado neste nível.</Text>
                ) : (
                  users.map((userProfile, index) => (
                    <CommunityUserCard
                      key={userProfile.userId}
                      userProfile={userProfile}
                      index={index}
                      isCurrentUser={userProfile.userId === user?.id}
                      isExpanded={expandedUserId === userProfile.userId}
                      onToggle={() => setExpandedUserId(expandedUserId === userProfile.userId ? null : userProfile.userId)}
                    />
                  ))
                )}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView
      className="flex-1 bg-white px-5 dark:bg-[#151718]"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: topPadding, paddingBottom: bottomPadding }}>
      <Text className="text-2xl font-bold text-[#11181C] dark:text-[#ECEDEE]">Comunidade</Text>
      <Text className="mt-2 text-[#687076] dark:text-[#9BA1A6]">
        Ranking de usuários {loading ? '...' : <Text className="font-bold">{userScoreLevel}</Text>} {loading ? '' : SCORE_LEVEL_EMOJIS[userScoreLevel]}
      </Text>

      {loading ? (
        <View className="mt-20 items-center">
          <ActivityIndicator size="large" color="#3F51B5" />
        </View>
      ) : (
        <>
          {currentUserRank && (
            <QuizStatCard label="Sua posição no ranking" value={`#${currentUserRank}`} subtitle={`de ${users.length} usuários`} accentColor="#FFFFFF" backgroundColor={QUIZ_COLORS.warning} borderColor={QUIZ_COLORS.warning} valueColor="#FFFFFF" labelColor="rgba(255,255,255,0.8)" subtitleColor="rgba(255,255,255,0.7)" style={{ marginTop: 20 }} />
          )}

          <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
            <PanelCard compact style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                <Text style={{ fontSize: 16 }}>🏆</Text>
                <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 13, fontWeight: '600' }}>Como funciona?</Text>
              </View>
              <View style={{ gap: 7 }}>
                {[
                  { icon: '📌', text: '1 ponto por questão' },
                  { icon: '🎯', text: 'Bônus por acerto' },
                  { icon: '⚡', text: 'Bônus por velocidade' },
                ].map((item, index) => (
                  <View key={index} style={{ flexDirection: 'row', gap: 6, alignItems: 'flex-start' }}>
                    <Text style={{ fontSize: 12 }}>{item.icon}</Text>
                    <Text style={{ color: QUIZ_COLORS.textMuted, fontSize: 11, lineHeight: 16, flex: 1 }}>{item.text}</Text>
                  </View>
                ))}
              </View>
            </PanelCard>

            <PanelCard compact style={{ flex: 1 }}>
              <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 13, fontWeight: '600', marginBottom: 10 }}>Medalhas</Text>
              <View style={{ gap: 6 }}>
                {SCORE_LEVELS.map((level) => (
                  <View key={level} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 14 }}>{SCORE_LEVEL_EMOJIS[level]}</Text>
                    <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 11, fontWeight: '600', flex: 1 }}>{level}</Text>
                    <Text style={{ color: SCORE_LEVEL_COLORS[level], fontSize: 10 }}>{SCORE_LEVEL_RANGES[level]}</Text>
                  </View>
                ))}
              </View>
            </PanelCard>
          </View>

          <View className="mt-5 gap-3">
            {users.length === 0 ? (
              <Text className="mt-4 text-center text-[#687076] dark:text-[#9BA1A6]">Nenhum usuário encontrado neste nível.</Text>
            ) : (
              users.map((userProfile, index) => (
                <CommunityUserCard
                  key={userProfile.userId}
                  userProfile={userProfile}
                  index={index}
                  isCurrentUser={userProfile.userId === user?.id}
                  isExpanded={expandedUserId === userProfile.userId}
                  onToggle={() => setExpandedUserId(expandedUserId === userProfile.userId ? null : userProfile.userId)}
                  compact
                />
              ))
            )}
          </View>
        </>
      )}
    </ScrollView>
  );
}
