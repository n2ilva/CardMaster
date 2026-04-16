import React, { type ReactNode, useState } from 'react';
import { Pressable, Text, View, useColorScheme, type StyleProp, type ViewStyle } from 'react-native';

import { QUIZ_COLORS, QUIZ_RADII } from '@/constants/quiz-ui';

function isLightColor(hex: string) {
  const c = hex.replace('#', '');
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

type SelectableCardProps = {
  title: string;
  subtitle?: string;
  accentColor: string;
  active: boolean;
  onPress: () => void;
  icon?: ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  compact?: boolean;
};

export function SelectableCard({
  title,
  subtitle,
  accentColor,
  active,
  onPress,
  icon,
  containerStyle,
  style,
  contentStyle,
  compact = false,
}: SelectableCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const isHovered = hovered || pressed;
  const light = isLightColor(accentColor);
  const activeText = light ? '#000000' : '#FFFFFF';
  const activeSubText = light ? 'rgba(0,0,0,0.65)' : 'rgba(255,255,255,0.85)';

  const bg = active ? accentColor : isDark ? (isHovered ? '#22252A' : (compact ? '#1C1F24' : '#151718')) : (isHovered ? '#F8FAFC' : '#FFFFFF');
  const borderStatic = active ? accentColor : isDark ? '#30363D' : '#E2E8F0';
  const borderHover = active ? accentColor : isDark ? `${accentColor}50` : `${accentColor}40`;
  const textPrimary = isDark ? '#ECEDEE' : '#11181C';
  const textSecondary = isDark ? '#9BA1A6' : '#64748B';

  return (
    <View style={containerStyle}>
      <Pressable
        onPress={onPress}
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        onPressIn={() => setPressed(true)}
        onPressOut={() => setPressed(false)}
        style={[{
          width: '100%',
          minHeight: compact ? 72 : 88,
          backgroundColor: bg,
          borderRadius: compact ? 16 : 20,
          borderWidth: 1.5,
          borderColor: isHovered ? borderHover : borderStatic,
          shadowColor: isHovered || active ? accentColor : '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: isHovered || active ? 0.12 : 0.03,
          shadowRadius: 12,
          elevation: isHovered || active ? 4 : 2,
          padding: compact ? 14 : 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: compact ? 12 : 14,
        }, style as any]}>
        
        {icon ? (
          <View
            style={{
              width: compact ? 36 : 44,
              height: compact ? 36 : 44,
              borderRadius: compact ? 12 : 14,
              backgroundColor: active
                ? 'rgba(0,0,0,0.25)'
                : hovered
                  ? `${accentColor}30`
                  : isDark ? `${accentColor}15` : `${accentColor}10`,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {icon}
          </View>
        ) : null}

        <View style={[{ flex: 1 }, contentStyle]}>
          <Text
            style={{
              color: active ? activeText : hovered ? textPrimary : textSecondary,
              fontSize: compact ? 15 : 16,
              fontWeight: '700',
              letterSpacing: -0.3,
            }}>
            {title}
          </Text>
          {subtitle ? (
            <Text
              style={{
                color: active ? activeSubText : hovered ? textPrimary : textSecondary,
                fontSize: compact ? 11 : 13,
                marginTop: 3,
                opacity: active ? 1 : 0.8,
              }}>
              {subtitle}
            </Text>
          ) : null}
        </View>
      </Pressable>
    </View>
  );
}