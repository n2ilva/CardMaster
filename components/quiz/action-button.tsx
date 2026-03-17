import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';

import { QUIZ_COLORS, QUIZ_RADII } from '@/constants/quiz-ui';

type ActionButtonPalette = {
  backgroundColor: string;
  pressedBackgroundColor: string;
  borderColor: string;
  textColor: string;
};

type ActionButtonVariant = 'primary' | 'primary-solid' | 'secondary' | 'ghost' | 'success-outline' | 'danger-outline';
type ActionButtonSize = 'xs' | 'sm' | 'md';

const VARIANT_STYLES: Record<
  ActionButtonVariant,
  ActionButtonPalette
> = {
  primary: {
    backgroundColor: '#151C3A',
    pressedBackgroundColor: '#1E2A5E',
    borderColor: QUIZ_COLORS.primary,
    textColor: QUIZ_COLORS.primarySoft,
  },
  'primary-solid': {
    backgroundColor: QUIZ_COLORS.primary,
    pressedBackgroundColor: QUIZ_COLORS.primaryPressed,
    borderColor: QUIZ_COLORS.primary,
    textColor: '#FFFFFF',
  },
  secondary: {
    backgroundColor: QUIZ_COLORS.surfaceAlt,
    pressedBackgroundColor: QUIZ_COLORS.surfaceHover,
    borderColor: QUIZ_COLORS.borderMuted,
    textColor: QUIZ_COLORS.textMuted,
  },
  ghost: {
    backgroundColor: 'transparent',
    pressedBackgroundColor: QUIZ_COLORS.surfaceHover,
    borderColor: 'transparent',
    textColor: QUIZ_COLORS.textFaint,
  },
  'success-outline': {
    backgroundColor: 'transparent',
    pressedBackgroundColor: QUIZ_COLORS.surfaceHover,
    borderColor: '#22C55E40',
    textColor: QUIZ_COLORS.success,
  },
  'danger-outline': {
    backgroundColor: 'rgba(239,68,68,0.08)',
    pressedBackgroundColor: 'rgba(239,68,68,0.12)',
    borderColor: 'rgba(239,68,68,0.4)',
    textColor: QUIZ_COLORS.danger,
  },
};

const SIZE_STYLES: Record<
  ActionButtonSize,
  {
    iconSize: number;
    fontSize: number;
    paddingHorizontal: number;
    paddingVertical: number;
    minHeight: number;
  }
> = {
  xs: {
    iconSize: 14,
    fontSize: 11,
    paddingHorizontal: 9,
    paddingVertical: 7,
    minHeight: 32,
  },
  sm: {
    iconSize: 15,
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minHeight: 36,
  },
  md: {
    iconSize: 16,
    fontSize: 14,
    paddingHorizontal: 16,
    paddingVertical: 10,
    minHeight: 40,
  },
};

type QuizActionButtonProps = {
  label: string;
  icon: React.ComponentProps<typeof MaterialIcons>['name'];
  onPress: () => void;
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  trailingIcon?: React.ComponentProps<typeof MaterialIcons>['name'];
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
  colors?: Partial<ActionButtonPalette>;
};

export function QuizActionButton({
  label,
  icon,
  onPress,
  variant = 'primary',
  size = 'md',
  trailingIcon,
  disabled = false,
  fullWidth = false,
  style,
  colors,
}: QuizActionButtonProps) {
  const palette = { ...VARIANT_STYLES[variant], ...colors };
  const metrics = SIZE_STYLES[size];

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: 'rgba(255,255,255,0.08)' }}
      style={[
        {
          width: fullWidth ? '100%' : undefined,
          alignSelf: fullWidth ? 'stretch' : 'auto',
          opacity: disabled ? 0.7 : 1,
        },
        style,
      ]}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            borderRadius: QUIZ_RADII.md,
            borderWidth: 1.5,
            borderColor: palette.borderColor,
            backgroundColor: pressed ? palette.pressedBackgroundColor : palette.backgroundColor,
            paddingHorizontal: metrics.paddingHorizontal,
            paddingVertical: metrics.paddingVertical,
            minHeight: metrics.minHeight,
            width: '100%',
          }}>
          <MaterialIcons name={icon} size={metrics.iconSize} color={palette.textColor} />
          <Text style={{ color: palette.textColor, fontSize: metrics.fontSize, fontWeight: '700' }}>
            {label}
          </Text>
          {trailingIcon ? (
            <MaterialIcons name={trailingIcon} size={metrics.iconSize + 2} color={palette.textColor} />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}