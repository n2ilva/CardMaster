import { Text, View } from 'react-native';

import { InteractiveCard } from '@/components/quiz/interactive-card';
import { SCORE_LEVEL_COLORS, SCORE_LEVEL_EMOJIS } from '@/constants/score-levels';
import { type UserProfile } from '@/lib/api';

type CommunityUserCardProps = {
  userProfile: UserProfile;
  index: number;
  isCurrentUser: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  compact?: boolean;
};

export function CommunityUserCard({
  userProfile,
  index,
  isCurrentUser,
  isExpanded,
  onToggle,
  compact = false,
}: CommunityUserCardProps) {
  const levelColor = SCORE_LEVEL_COLORS[userProfile.scoreLevel] ?? '#6B7280';
  const highlightTextColor = isCurrentUser ? '#FBBF24' : compact ? '#A5B4FC' : '#ECEDEE';
  const baseCardBackground = compact ? '#151718' : '#0D0F10';

  return (
    <InteractiveCard
      accentColor={isCurrentUser ? '#F59E0B' : '#3F51B5'}
      onPress={onToggle}
      outerRadius={compact ? 12 : 14}
      innerRadius={compact ? 10 : 12}
      innerPadding={0}
      innerStyle={{ backgroundColor: baseCardBackground }}>
      {() => (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, padding: compact ? 12 : 14 }}>
            <View
              style={{
                width: compact ? 40 : 38,
                height: compact ? 40 : 38,
                borderRadius: compact ? 20 : 10,
                backgroundColor: isCurrentUser ? 'rgba(245,158,11,0.18)' : compact ? '#3F51B5' : 'rgba(63,81,181,0.2)',
                borderWidth: isCurrentUser ? 1 : 0,
                borderColor: isCurrentUser ? 'rgba(251,191,36,0.45)' : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
              <Text style={{ color: isCurrentUser ? '#FBBF24' : compact ? '#FFFFFF' : '#A5B4FC', fontSize: 13, fontWeight: '700' }}>
                #{index + 1}
              </Text>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ color: isCurrentUser ? '#FBBF24' : '#ECEDEE', fontSize: 14, fontWeight: '600' }}>
                {userProfile.name}
                {isCurrentUser ? ' (você)' : ''}
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: compact ? 4 : 8, marginTop: 3 }}>
                <Text style={{ color: compact ? '#9BA1A6' : '#6B7280', fontSize: compact ? 11 : 12 }}>
                  {userProfile.totalQuestionsAnswered} questões
                </Text>
                <Text style={{ color: compact ? '#9BA1A6' : '#6B7280', fontSize: compact ? 11 : 12 }}>•</Text>
                <Text style={{ color: compact ? '#9BA1A6' : '#6B7280', fontSize: compact ? 11 : 12 }}>
                  {userProfile.overallAccuracy}% acertos
                </Text>
                {userProfile.streak > 0 && (
                  <>
                    <Text style={{ color: compact ? '#9BA1A6' : '#6B7280', fontSize: compact ? 11 : 12 }}>•</Text>
                    <Text style={{ color: '#F59E0B', fontSize: compact ? 11 : 12, fontWeight: '600' }}>
                      🔥 {userProfile.streak} {userProfile.streak === 1 ? 'dia' : 'dias'}
                    </Text>
                  </>
                )}
              </View>
            </View>

            <View style={{ alignItems: 'flex-end', gap: compact ? 2 : 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ color: highlightTextColor, fontSize: 16, fontWeight: '700' }}>{userProfile.score}</Text>
                <Text style={{ fontSize: 20 }}>{SCORE_LEVEL_EMOJIS[userProfile.scoreLevel]}</Text>
              </View>
              <Text style={{ color: levelColor, fontSize: compact ? 10 : 11 }}>{userProfile.scoreLevel}</Text>
            </View>
          </View>

          {isExpanded && (
            <View style={{ borderTopWidth: 1, borderTopColor: compact ? '#30363D' : '#1E2328', marginHorizontal: compact ? 12 : 14, marginBottom: compact ? 12 : 14, paddingTop: compact ? 10 : 12 }}>
              {userProfile.topCategory ? (
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: compact ? 10 : 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: '#9BA1A6', fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                      Tema mais estudado
                    </Text>
                    <Text style={{ color: '#ECEDEE', fontSize: 13, fontWeight: '700' }}>{userProfile.topCategory}</Text>
                    {userProfile.topCategoryTrack ? (
                      <Text style={{ color: '#6B7280', fontSize: 11, marginTop: 2 }}>{userProfile.topCategoryTrack}</Text>
                    ) : null}
                  </View>
                  <View style={{ alignItems: 'center', gap: 2 }}>
                    <Text style={{ color: '#9BA1A6', fontSize: 10 }}>Acerto</Text>
                    <Text
                      style={{
                        color:
                          (userProfile.topCategoryAccuracy ?? 0) >= 80
                            ? '#22C55E'
                            : (userProfile.topCategoryAccuracy ?? 0) >= 50
                              ? '#F59E0B'
                              : '#EF4444',
                        fontSize: 16,
                        fontWeight: '800',
                      }}>
                      {userProfile.topCategoryAccuracy ?? 0}%
                    </Text>
                  </View>
                  <View style={{ width: 1, height: 36, backgroundColor: compact ? '#30363D' : '#1E2328' }} />
                  <View style={{ alignItems: 'center', gap: 2 }}>
                    <Text style={{ color: '#9BA1A6', fontSize: 10 }}>Tempo/questão</Text>
                    <Text style={{ color: '#A5B4FC', fontSize: 13, fontWeight: '700' }}>
                      {userProfile.topCategoryAvgTimeMs ? `${(userProfile.topCategoryAvgTimeMs / 1000).toFixed(1)}s` : '—'}
                    </Text>
                  </View>
                </View>
              ) : (
                <Text style={{ color: '#6B7280', fontSize: 12, textAlign: 'center' }}>Sem dados de categorias disponíveis.</Text>
              )}
            </View>
          )}
        </>
      )}
    </InteractiveCard>
  );
}
