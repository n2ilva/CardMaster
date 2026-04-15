import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Animated } from 'react-native';

type StudyCompletionOverlayProps = {
  visible: boolean;
  correctCount: number;
  totalCards: number;
  backgroundOpacity: Animated.Value;
  iconScale: Animated.Value;
  textOpacity: Animated.Value;
  ringScale: Animated.Value;
  ringOpacity: Animated.Value;
  title?: string;
  subtitle?: string;
};

export function StudyCompletionOverlay({
  visible,
  correctCount,
  totalCards,
  backgroundOpacity,
  iconScale,
  textOpacity,
  ringScale,
  ringOpacity,
  title = 'Lição concluída!',
  subtitle,
}: StudyCompletionOverlayProps) {
  if (!visible) return null;

  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.85)',
        opacity: backgroundOpacity,
      }}>
      <Animated.View
        style={{
          position: 'absolute',
          width: 180,
          height: 180,
          borderRadius: 90,
          borderWidth: 3,
          borderColor: '#F59E0B',
          opacity: ringOpacity,
          transform: [{ scale: ringScale }],
        }}
      />
      <Animated.View style={{ alignItems: 'center', transform: [{ scale: iconScale }] }}>
        <Animated.View
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            backgroundColor: 'rgba(245,158,11,0.2)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <MaterialIcons name="emoji-events" size={72} color="#F59E0B" />
        </Animated.View>
      </Animated.View>
      <Animated.Text style={{ color: '#ECEDEE', fontSize: 22, fontWeight: '700', marginTop: 20, letterSpacing: 0.5, opacity: textOpacity }}>
        {title}
      </Animated.Text>
      <Animated.Text style={{ color: '#9BA1A6', fontSize: 14, marginTop: 8, opacity: textOpacity }}>
        {subtitle ?? `${correctCount} / ${totalCards} corretas`}
      </Animated.Text>
    </Animated.View>
  );
}
