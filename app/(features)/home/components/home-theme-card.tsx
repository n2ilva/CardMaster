import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';

import { InteractiveCard } from '@/components/quiz/interactive-card';
import { QUIZ_COLORS } from '@/constants/quiz-ui';
import { type TrackIcon } from '@/constants/track-styles';

export type HomeThemeItem = {
  key: string;
  label: string;
  icon: TrackIcon;
  color: string;
};

type HomeThemeCardProps = {
  item: HomeThemeItem;
  fontSize?: number;
};

export function HomeThemeCard({ item, fontSize = 14 }: HomeThemeCardProps) {
  const router = useRouter();

  return (
    <InteractiveCard
      accentColor={item.color}
      onPress={() => router.push(`/track/${encodeURIComponent(item.key)}`)}
      outerRadius={14}
      innerRadius={12}
      innerPadding={0}
      scaleTo={1.06}>
      <View
        style={{
          width: '100%',
          height: 60,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 4,
        }}>
        <Text
          style={{
            color: QUIZ_COLORS.textPrimary,
            fontSize,
            fontWeight: '700',
            textAlign: 'center',
            padding: 10,
          }}
          numberOfLines={2}>
          {item.label}
        </Text>
      </View>
    </InteractiveCard>
  );
}
