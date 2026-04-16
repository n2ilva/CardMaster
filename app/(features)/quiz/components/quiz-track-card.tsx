import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, Text, View, useColorScheme } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { type TrackIcon } from '@/constants/track-styles';

export type QuizTrackItem = {
  key: string;
  label: string;
  icon: TrackIcon;
  color: string;
};

type QuizTrackCardProps = {
  item: QuizTrackItem;
  height?: number;
  fontSize?: number;
};

export function QuizTrackCard({ item, height, fontSize = 15 }: QuizTrackCardProps) {
  const router = useRouter();
  
  const [hovered, setHovered] = React.useState(false);
  const [pressed, setPressed] = React.useState(false);
  const isHovered = hovered || pressed;
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const bg = isDark ? '#1C1F24' : '#FFFFFF';
  const borderStatic = isDark ? `${item.color}20` : `${item.color}15`;
  const borderHover = isDark ? `${item.color}60` : `${item.color}40`;
  const textPrimary = isDark ? '#ECEDEE' : '#11181C';

  return (
    <Pressable
      onPress={() => router.push(`/track/${encodeURIComponent(item.key)}`)}
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={{
        width: '100%',
        backgroundColor: bg,
        borderRadius: 20,
        borderWidth: 1.5,
        borderColor: isHovered ? borderHover : borderStatic,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        position: 'relative',
        shadowColor: item.color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: isHovered ? 0.15 : 0.05,
        shadowRadius: 12,
        elevation: isHovered ? 4 : 2,
        ...(height ? { minHeight: height } : {}),
      }}
    >
      <View style={{ 
        width: 44, 
        height: 44, 
        borderRadius: 14, 
        backgroundColor: isDark ? `${item.color}15` : `${item.color}10`, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderWidth: 1, 
        borderColor: isDark ? `${item.color}30` : `${item.color}20` 
      }}>
        <MaterialIcons name={item.icon as any} size={24} color={item.color} />
      </View>
      <View style={{ alignItems: 'center', paddingHorizontal: 4 }}>
        <Text style={{ color: textPrimary, fontSize: Math.max(13, fontSize - 2), fontWeight: '800', letterSpacing: -0.3, textAlign: 'center' }}>
          {item.label}
        </Text>
      </View>
    </Pressable>
  );
}
