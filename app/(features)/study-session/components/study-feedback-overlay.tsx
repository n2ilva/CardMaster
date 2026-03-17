import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Animated } from 'react-native';

type StudyFeedbackOverlayProps = {
  feedbackType: 'correct' | 'wrong' | null;
  iconOpacity: Animated.Value;
  iconScale: Animated.Value;
};

export function StudyFeedbackOverlay({ feedbackType, iconOpacity, iconScale }: StudyFeedbackOverlayProps) {
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
        opacity: iconOpacity,
      }}>
      <Animated.View
        style={{
          transform: [{ scale: iconScale }],
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: feedbackType === 'correct' ? 'rgba(34,197,94,0.18)' : 'rgba(239,68,68,0.18)',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name={feedbackType === 'correct' ? 'check-circle' : 'cancel'}
          size={88}
          color={feedbackType === 'correct' ? '#22C55E' : '#EF4444'}
        />
      </Animated.View>
    </Animated.View>
  );
}
