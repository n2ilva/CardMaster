import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useRef, type ComponentProps } from 'react';
import { Animated, Platform, Pressable, Text, View } from 'react-native';

import { InteractiveCard } from '@/components/quiz/interactive-card';
import { QUIZ_COLORS, QUIZ_RADII } from '@/constants/quiz-ui';
import { hasDocumentation } from '@/data/documentation';
import { CATEGORY_TYPE_LABEL } from '@/data/tracks';
import { type CategoryStats } from '@/lib/api';

type ReadyCategoryCardProps = {
  category: string;
  track: string;
  stats: CategoryStats | undefined;
};

export function ReadyCategoryCard({ category, track, stats }: ReadyCategoryCardProps) {
  const router = useRouter();
  const docsScaleAnim = useRef(new Animated.Value(1)).current;
  const uniqueStudied = stats?.uniqueStudied ?? 0;
  const totalCards = stats?.totalCards ?? 0;
  const uniqueCorrect = stats?.uniqueCorrect ?? 0;
  const accuracy = stats?.accuracyPercent ?? 0;
  const dueForReview = stats?.dueForReview ?? 0;
  const hasInProgress = stats?.hasInProgressLesson ?? false;

  const accentColor =
    uniqueStudied === 0
      ? QUIZ_COLORS.textFaint
      : accuracy >= 80
        ? QUIZ_COLORS.success
        : accuracy >= 50
          ? QUIZ_COLORS.warning
          : QUIZ_COLORS.danger;

  const buttonIcon: ComponentProps<typeof MaterialIcons>['name'] = hasInProgress
    ? 'play-arrow'
    : uniqueStudied > 0
      ? 'replay'
      : 'play-arrow';

  const hasDocs = hasDocumentation(track, category);

  return (
    <InteractiveCard
      accentColor={accentColor}
      onPress={() => router.push(`/study?track=${encodeURIComponent(track)}&category=${encodeURIComponent(category)}`)}
      outerRadius={14}
      innerRadius={12}
      innerPadding={16}>
      {({ hovered }) => (
        <>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: CATEGORY_TYPE_LABEL[category] ? 4 : 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: hovered ? '#FFFFFF' : QUIZ_COLORS.textPrimary, fontSize: 15, fontWeight: '700' }}>{category}</Text>
            </View>
            {dueForReview > 0 && (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: QUIZ_COLORS.warning, borderRadius: QUIZ_RADII.pill, paddingHorizontal: 8, paddingVertical: 3 }}>
                <MaterialIcons name="schedule" size={11} color="#1A1000" />
                <Text style={{ color: '#1A1000', fontSize: 10, fontWeight: '700' }}>{dueForReview} p/ revisar</Text>
              </View>
            )}
            {hasDocs && (
              <Pressable
                onPress={(event) => {
                  event.stopPropagation();
                  router.push(`/theme-info?track=${encodeURIComponent(track)}&category=${encodeURIComponent(category)}`);
                }}
                onHoverIn={() => Animated.spring(docsScaleAnim, { toValue: 1.1, useNativeDriver: true, tension: 400, friction: 8 }).start()}
                onHoverOut={() => Animated.spring(docsScaleAnim, { toValue: 1, useNativeDriver: true, tension: 400, friction: 8 }).start()}>
                {({ hovered: docsHovered }) => (
                  <Animated.View style={{ transform: [{ scale: docsScaleAnim }], zIndex: 10 }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 4,
                        backgroundColor: docsHovered ? '#14B8A6' : '#6366F1',
                        borderRadius: QUIZ_RADII.sm,
                        paddingVertical: 6,
                        paddingHorizontal: 12,
                        ...(Platform.OS === 'web' && { transition: 'all 0.2s ease' }),
                      }}>
                      <MaterialIcons name="auto-stories" size={14} color="#FFFFFF" />
                      <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>Docs</Text>
                    </View>
                  </Animated.View>
                )}
              </Pressable>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MaterialIcons name={buttonIcon} size={18} color={hovered ? QUIZ_COLORS.accentHover : QUIZ_COLORS.textFaint} />
            </View>
          </View>
          {CATEGORY_TYPE_LABEL[category] && (
            <Text style={{ color: QUIZ_COLORS.textFaint, fontSize: 11, marginBottom: 10 }}>{CATEGORY_TYPE_LABEL[category]}</Text>
          )}

          <View style={{ flexDirection: 'row', gap: 16, marginBottom: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MaterialIcons name="check-circle" size={13} color={hovered ? '#818CF8' : accentColor} />
              <Text style={{ color: QUIZ_COLORS.textMuted, fontSize: 12 }}>Acertos: </Text>
              <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 12, fontWeight: '700' }}>
                {uniqueStudied > 0 ? `${uniqueCorrect}/${uniqueStudied} (${accuracy}%)` : '0/0 (0%)'}
              </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <MaterialIcons name="style" size={13} color={QUIZ_COLORS.textFaint} />
              <Text style={{ color: QUIZ_COLORS.textMuted, fontSize: 12 }}>Cards: </Text>
              <Text style={{ color: QUIZ_COLORS.textPrimary, fontSize: 12, fontWeight: '700' }}>{`${Math.min(uniqueStudied, totalCards)}/${totalCards}`}</Text>
            </View>
          </View>

          <View style={{ height: 4, backgroundColor: QUIZ_COLORS.surfaceAlt, borderRadius: 4, overflow: 'hidden' }}>
            <View style={{ height: '100%', borderRadius: 4, width: `${uniqueStudied > 0 ? accuracy : 0}%`, backgroundColor: accentColor }} />
          </View>
        </>
      )}
    </InteractiveCard>
  );
}
