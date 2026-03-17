import { Pressable, Text, View } from 'react-native';

import { QUIZ_COLORS, QUIZ_RADII } from '@/constants/quiz-ui';

type AnswerOptionStatus = 'idle' | 'correct' | 'incorrect' | 'dimmed';

type AnswerOptionProps = {
  letter: string;
  label: string;
  status: AnswerOptionStatus;
  onPress: () => void;
  disabled?: boolean;
  isDark?: boolean;
};

function getPalette(status: AnswerOptionStatus, isDark: boolean) {
  const idleBorder = isDark ? QUIZ_COLORS.borderMuted : '#E6E8EB';
  const idleBackground = isDark ? '#1F232A' : '#FFFFFF';
  const textColor = isDark ? QUIZ_COLORS.textPrimary : '#11181C';

  switch (status) {
    case 'correct':
      return {
        borderColor: QUIZ_COLORS.success,
        backgroundColor: 'rgba(34,197,94,0.10)',
        letterBackgroundColor: QUIZ_COLORS.success,
        textColor,
        opacity: 1,
      };
    case 'incorrect':
      return {
        borderColor: QUIZ_COLORS.danger,
        backgroundColor: 'rgba(239,68,68,0.10)',
        letterBackgroundColor: QUIZ_COLORS.danger,
        textColor,
        opacity: 1,
      };
    case 'dimmed':
      return {
        borderColor: idleBorder,
        backgroundColor: idleBackground,
        letterBackgroundColor: QUIZ_COLORS.textMuted,
        textColor,
        opacity: 0.5,
      };
    default:
      return {
        borderColor: idleBorder,
        backgroundColor: idleBackground,
        letterBackgroundColor: QUIZ_COLORS.primary,
        textColor,
        opacity: 1,
      };
  }
}

export function AnswerOption({
  letter,
  label,
  status,
  onPress,
  disabled = false,
  isDark = true,
}: AnswerOptionProps) {
  const palette = getPalette(status, isDark);

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      android_ripple={{ color: 'rgba(255,255,255,0.08)' }}
      style={{
        width: '100%',
        opacity: palette.opacity,
      }}>
      <View
        style={{
          width: '100%',
          minHeight: 68,
          borderRadius: QUIZ_RADII.lg,
          borderWidth: 2,
          borderColor: palette.borderColor,
          backgroundColor: palette.backgroundColor,
          paddingHorizontal: 16,
          paddingVertical: 14,
          flexDirection: 'row',
          alignItems: 'flex-start',
          shadowColor: '#000000',
          shadowOpacity: 0.18,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 3 },
          elevation: 2,
        }}>
        <View
          style={{
            flexShrink: 0,
            width: 36,
            height: 36,
            borderRadius: QUIZ_RADII.pill,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: palette.letterBackgroundColor,
            marginRight: 12,
            marginTop: 2,
          }}>
          <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>{letter}</Text>
        </View>
        <View style={{ flex: 1, minWidth: 0, justifyContent: 'flex-start', paddingTop: 2 }}>
          <Text
            style={{
              color: palette.textColor,
              fontSize: 14,
              lineHeight: 20,
              textAlign: 'left',
            }}>
            {label}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}