import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useRef } from 'react';
import { Animated, Platform, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';

type MasterTestButtonProps = {
  track: string;
  style?: StyleProp<ViewStyle>;
};

export function MasterTestButton({ track, style }: MasterTestButtonProps) {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  return (
    <Pressable
      onPress={() => router.push(`/study?track=${encodeURIComponent(track)}&mode=master-test`)}
      onHoverIn={() => {
        Animated.spring(scaleAnim, { toValue: 1.02, useNativeDriver: true, tension: 300, friction: 10 }).start();
      }}
      onHoverOut={() => {
        Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, tension: 300, friction: 10 }).start();
      }}
      style={style}>
      {({ hovered, pressed }) => (
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <View
            style={{
              borderRadius: 14,
              borderWidth: 2,
              borderColor: hovered ? '#FFD700' : '#D4A437',
              backgroundColor: pressed ? '#2A2000' : hovered ? '#1F1800' : '#151000',
              paddingVertical: 14,
              paddingHorizontal: 18,
              overflow: 'hidden',
              ...(Platform.OS === 'web' && {
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }),
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <View
                style={{
                  backgroundColor: hovered ? 'rgba(255, 215, 0, 0.25)' : 'rgba(255, 215, 0, 0.15)',
                  borderRadius: 10,
                  padding: 8,
                  ...(Platform.OS === 'web' && { transition: 'background-color 0.2s ease' }),
                }}>
                <MaterialIcons name="emoji-events" size={24} color="#FFD700" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#FFD700', fontWeight: '800', fontSize: 15, letterSpacing: 1.5 }}>TESTE MASTER</Text>
                <Text
                  style={{
                    color: hovered ? '#FFD700' : '#B8860B',
                    fontSize: 11,
                    marginTop: 2,
                    fontWeight: '500',
                    ...(Platform.OS === 'web' && { transition: 'color 0.2s ease' }),
                  }}>
                  20 questões aleatórias do tema
                </Text>
              </View>
              <MaterialIcons name="arrow-forward" size={20} color={hovered ? '#FFD700' : '#D4A437'} />
            </View>
          </View>
        </Animated.View>
      )}
    </Pressable>
  );
}
