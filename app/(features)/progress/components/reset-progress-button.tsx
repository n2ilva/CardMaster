import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Pressable, Text, View } from 'react-native';

import { QuizActionButton } from '@/components/quiz/action-button';

type ResetProgressButtonProps = {
  onPress: () => void;
  resetting: boolean;
  compact?: boolean;
};

export function ResetProgressButton({ onPress, resetting, compact = false }: ResetProgressButtonProps) {
  if (compact) {
    return (
      <Pressable onPress={onPress} disabled={resetting} style={{ alignSelf: 'flex-end', maxWidth: '100%' }}>
        {({ pressed }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              paddingHorizontal: 8,
              paddingVertical: 6,
              minHeight: 28,
              borderRadius: 10,
              borderWidth: 1,
              borderColor: 'rgba(239,68,68,0.32)',
              backgroundColor: pressed ? 'rgba(239,68,68,0.12)' : 'rgba(239,68,68,0.06)',
              opacity: resetting ? 0.65 : 1,
            }}>
            <MaterialIcons name="delete-outline" size={13} color="#EF4444" />
            <Text style={{ color: '#EF4444', fontSize: 11, fontWeight: '700' }}>
              {resetting ? 'Resetando...' : 'Resetar progresso'}
            </Text>
          </View>
        )}
      </Pressable>
    );
  }

  return (
    <QuizActionButton
      label={resetting ? 'Resetando...' : 'Resetar progresso'}
      icon="delete-outline"
      onPress={onPress}
      disabled={resetting}
      variant="danger-outline"
      size="md"
      style={{ alignSelf: 'stretch', width: '100%' }}
    />
  );
}
