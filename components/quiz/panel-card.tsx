import { View, type StyleProp, type ViewStyle } from 'react-native';

import { QUIZ_COLORS, QUIZ_RADII, QUIZ_SPACING } from '@/constants/quiz-ui';

type PanelCardProps = {
  children: React.ReactNode;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function PanelCard({ children, compact = false, style }: PanelCardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: QUIZ_COLORS.surfaceStrong,
          borderRadius: compact ? QUIZ_RADII.lg : QUIZ_RADII.xl,
          padding: compact ? QUIZ_SPACING.panelCompact : QUIZ_SPACING.panel,
          borderWidth: 1,
          borderColor: QUIZ_COLORS.borderSubtle,
        },
        style,
      ]}>
      {children}
    </View>
  );
}