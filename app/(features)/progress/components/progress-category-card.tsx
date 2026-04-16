import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, View, useColorScheme } from 'react-native';

import { TRACK_STYLE_FALLBACK, trackStyles } from '@/constants/track-styles';
import { QUIZ_COLORS, QUIZ_RADII } from '@/constants/quiz-ui';
import { trackLabels } from '@/data/tracks';
import { formatDuration, type CategoryProgress } from '@/lib/api';

type ProgressCategoryCardProps = {
  categoryProgress: CategoryProgress;
};

const PROGRESS_CARD_MIN_HEIGHT = 162;
const PROGRESS_CARD_STATUS_AREA_HEIGHT = 34;

export function ProgressCategoryCard({ categoryProgress }: ProgressCategoryCardProps) {
  const router = useRouter();
  const accuracy = categoryProgress.accuracyPercent;
  const accentColor = accuracy === 100 ? '#22C55E' : accuracy >= 80 ? '#10B981' : accuracy >= 50 ? '#F59E0B' : '#EF4444';
  const trackStyle = trackStyles[categoryProgress.track] ?? TRACK_STYLE_FALLBACK;
  const trackLabel = trackLabels[categoryProgress.track] ?? categoryProgress.track;

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

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
      onPress={() =>
        router.push(
          `/study?track=${encodeURIComponent(categoryProgress.track)}&category=${encodeURIComponent(categoryProgress.category)}`,
        )
      }
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
        minHeight: PROGRESS_CARD_MIN_HEIGHT + 12,
        shadowColor: isHovered ? accentColor : '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isHovered ? 0.08 : 0.03,
        shadowRadius: 12,
        elevation: 2,
      }}>
      
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 16 }}>
          <View style={{ backgroundColor: `${trackStyle.color}22`, borderRadius: 12, padding: 8 }}>
            <MaterialIcons name={trackStyle.icon} size={16} color={trackStyle.color} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: textSecondary, fontSize: 10, textTransform: 'uppercase', letterSpacing: 0.8 }} numberOfLines={1}>
              {trackLabel}
            </Text>
            <Text style={{ color: textPrimary, fontSize: 14, fontWeight: '800', marginTop: 2, lineHeight: 18, letterSpacing: -0.3 }} numberOfLines={2}>
              {categoryProgress.category}
            </Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Text style={{ color: accentColor, fontSize: 20, fontWeight: '800', lineHeight: 22 }}>
                {accuracy}%
              </Text>
              <MaterialIcons
                name={categoryProgress.hasInProgressLesson ? 'play-arrow' : 'chevron-right'}
                size={20}
                color={hovered ? accentColor : textSecondary}
              />
            </View>
            <Text style={{ color: textSecondary, fontSize: 10, marginTop: 1 }}>
              {categoryProgress.hasInProgressLesson ? 'continuar' : 'acertos'}
            </Text>
          </View>
        </View>

        <View style={{ height: 6, backgroundColor: isDark ? '#2D3139' : '#F1F5F9', borderRadius: 4, overflow: 'hidden', marginBottom: 10 }}>
          <View style={{ height: '100%', borderRadius: 4, width: `${categoryProgress.studyPercent}%`, backgroundColor: accentColor, opacity: 0.8 }} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: textSecondary, fontSize: 11 }}>
            {categoryProgress.studyPercent}% estudado · {categoryProgress.uniqueQuestionsAnswered}{' '}
            {categoryProgress.uniqueQuestionsAnswered === 1 ? 'questão' : 'questões'}
          </Text>
          <Text style={{ color: textSecondary, fontSize: 11 }}>
            {formatDuration(categoryProgress.avgTimePerQuestionMs)}/q
          </Text>
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ minHeight: PROGRESS_CARD_STATUS_AREA_HEIGHT, justifyContent: 'flex-end', gap: 8, paddingTop: 12 }}>
          {categoryProgress.hasInProgressLesson ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#F59E0B22', borderWidth: 1, borderColor: '#F59E0B44', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 }}>
              <MaterialIcons name="schedule" size={12} color="#F59E0B" />
              <Text style={{ color: '#F59E0B', fontSize: 11, fontWeight: '700' }}>
                Em andamento · {categoryProgress.inProgressAnswered}{' '}
                {categoryProgress.inProgressAnswered === 1 ? 'resposta' : 'respostas'}
              </Text>
            </View>
          ) : null}

          {accuracy < 50 ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#EF444422', borderWidth: 1, borderColor: '#EF444444', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6 }}>
              <MaterialIcons name="warning" size={12} color="#EF4444" />
              <Text style={{ color: '#EF4444', fontSize: 11, fontWeight: '700' }}>
                Taxa baixa — revise este tema
              </Text>
            </View>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
