import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useRef, useState, type ComponentProps } from 'react';
import { Animated, Platform, Pressable, Text, View, useColorScheme } from 'react-native';
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

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const accentColor =
    uniqueStudied === 0
      ? (isDark ? '#475569' : '#94A3B8')
      : accuracy >= 80
        ? '#10B981'
        : accuracy >= 50
          ? '#F59E0B'
          : '#EF4444';

  const buttonIcon: ComponentProps<typeof MaterialIcons>['name'] = hasInProgress
    ? 'play-arrow'
    : uniqueStudied > 0
      ? 'replay'
      : 'play-arrow';

  const hasDocs = hasDocumentation(track, category);

  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isHovered = hovered || pressed;

  const bg = isDark ? (isHovered ? '#22252A' : '#1C1F24') : (isHovered ? '#F8FAFC' : '#FFFFFF');
  const borderStatic = isDark ? '#30363D' : '#E2E8F0';
  const borderHover = isDark ? `${accentColor}50` : `${accentColor}40`;
  const textPrimary = isDark ? '#ECEDEE' : '#11181C';
  const textSecondary = isDark ? '#9BA1A6' : '#64748B';

  return (
    <Pressable
      onPress={() => router.push(`/study?track=${encodeURIComponent(track)}&category=${encodeURIComponent(category)}`)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        backgroundColor: bg,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: isHovered ? borderHover : borderStatic,
        padding: 20,
        shadowColor: isHovered ? accentColor : '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isHovered ? 0.08 : 0.03,
        shadowRadius: 12,
        elevation: 2,
      }}>
      
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: CATEGORY_TYPE_LABEL[category] ? 4 : 10 }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: textPrimary, fontSize: 16, fontWeight: '800', letterSpacing: -0.3 }}>{category}</Text>
        </View>
        {dueForReview > 0 && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: '#F59E0B', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 }}>
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
            {/* Fix docs hover using docsHovered inner state... wait we use Animated here, no functional child */}
              <Animated.View style={{ transform: [{ scale: docsScaleAnim }], zIndex: 10 }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    backgroundColor: '#6366F1',
                    borderRadius: 8,
                    paddingVertical: 6,
                    paddingHorizontal: 12,
                    ...(Platform.OS === 'web' && { transition: 'all 0.2s ease' }),
                  }}>
                  <MaterialIcons name="auto-stories" size={14} color="#FFFFFF" />
                  <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '700' }}>Docs</Text>
                </View>
              </Animated.View>
          </Pressable>
        )}
        <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: isDark ? '#2D3139' : '#F1F5F9', alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcons name={buttonIcon} size={18} color={textPrimary} />
        </View>
      </View>
      {CATEGORY_TYPE_LABEL[category] && (
        <Text style={{ color: textSecondary, fontSize: 12, marginBottom: 12 }}>{CATEGORY_TYPE_LABEL[category]}</Text>
      )}

      <View style={{ flexDirection: 'row', gap: 16, marginBottom: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialIcons name="check-circle" size={14} color={isHovered ? accentColor : (isDark ? '#6B7280' : '#94A3B8')} />
          <Text style={{ color: textSecondary, fontSize: 12 }}>Acertos: </Text>
          <Text style={{ color: textPrimary, fontSize: 12, fontWeight: '700' }}>
            {uniqueStudied > 0 ? `${uniqueCorrect}/${uniqueStudied} (${accuracy}%)` : '0/0 (0%)'}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <MaterialIcons name="style" size={14} color={isDark ? '#6B7280' : '#94A3B8'} />
          <Text style={{ color: textSecondary, fontSize: 12 }}>Cards: </Text>
          <Text style={{ color: textPrimary, fontSize: 12, fontWeight: '700' }}>{`${Math.min(uniqueStudied, totalCards)}/${totalCards}`}</Text>
        </View>
      </View>

      <View style={{ height: 6, backgroundColor: isDark ? '#22252A' : '#F1F5F9', borderRadius: 4, overflow: 'hidden' }}>
        <View style={{ height: '100%', borderRadius: 4, width: `${uniqueStudied > 0 ? accuracy : 0}%`, backgroundColor: accentColor }} />
      </View>
    </Pressable>
  );
}
