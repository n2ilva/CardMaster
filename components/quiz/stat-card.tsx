import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { QUIZ_COLORS, QUIZ_RADII } from '@/constants/quiz-ui';

type QuizStatCardProps = {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ComponentProps<typeof MaterialIcons>['name'];
  emoji?: string;
  accentColor: string;
  backgroundColor?: string;
  borderColor?: string;
  valueColor?: string;
  labelColor?: string;
  subtitleColor?: string;
  iconBackgroundColor?: string;
  align?: 'left' | 'center';
  size?: 'default' | 'compact';
  style?: StyleProp<ViewStyle>;
};

export function QuizStatCard({
  label,
  value,
  subtitle,
  icon,
  emoji,
  accentColor,
  backgroundColor = QUIZ_COLORS.surfaceStrong,
  borderColor = QUIZ_COLORS.borderSubtle,
  valueColor,
  labelColor,
  subtitleColor,
  iconBackgroundColor,
  align = 'left',
  size = 'default',
  style,
}: QuizStatCardProps) {
  const centered = align === 'center';
  const compact = size === 'compact';

  return (
    <View
      style={[
        {
          borderRadius: 18,
          padding: compact ? 14 : 20,
          backgroundColor,
          borderWidth: 1,
          borderColor,
          alignItems: centered ? 'center' : 'flex-start',
          justifyContent: centered ? 'center' : 'flex-start',
        },
        style,
      ]}>
      {icon || emoji ? (
        <View
          style={{
            width: compact ? 32 : 40,
            height: compact ? 32 : 40,
            borderRadius: QUIZ_RADII.md,
            backgroundColor: iconBackgroundColor ?? `${accentColor}26`,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: compact ? 10 : 14,
          }}>
          {icon ? <MaterialIcons name={icon} size={compact ? 16 : 20} color={accentColor} /> : <Text style={{ fontSize: compact ? 16 : 20 }}>{emoji}</Text>}
        </View>
      ) : null}
      <Text
        style={{
          color: labelColor ?? QUIZ_COLORS.textMuted,
          fontSize: compact ? 10 : 12,
          textTransform: 'uppercase',
          letterSpacing: compact ? 0.6 : 1,
          textAlign: centered ? 'center' : 'left',
        }}>
        {label}
      </Text>
      <Text
        style={{
          color: valueColor ?? QUIZ_COLORS.textPrimary,
          fontSize: compact ? 22 : 30,
          fontWeight: '800',
          marginTop: compact ? 6 : 8,
          textAlign: centered ? 'center' : 'left',
        }}>
        {value}
      </Text>
      {subtitle ? (
        <Text
          style={{
            color: subtitleColor ?? QUIZ_COLORS.textFaint,
            fontSize: compact ? 10 : 12,
            marginTop: compact ? 3 : 4,
            textAlign: centered ? 'center' : 'left',
          }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}