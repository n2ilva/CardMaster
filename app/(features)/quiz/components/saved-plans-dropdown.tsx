import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Dimensions, Modal, Platform, Pressable, Text, View } from 'react-native';

export type SavedPlanSummary = {
  id: string;
  track: string;
  trackLabel: string;
  level: string;
  language?: string;
  progressPercent: number;
  completedTopics: number;
  totalTopics: number;
};

type SavedPlansDropdownProps = {
  plans: SavedPlanSummary[];
  onSelect: (plan: { track: string; level: string; language?: string }) => void;
  onRemove: (id: string) => void;
  visible: boolean;
  onClose: () => void;
  anchorY: number;
  anchorX: number;
  anchorWidth: number;
};

export function SavedPlansDropdown({
  plans,
  onSelect,
  onRemove,
  visible,
  onClose,
  anchorY,
  anchorX,
  anchorWidth,
}: SavedPlansDropdownProps) {
  if (!visible || plans.length === 0) return null;

  const windowWidth = Dimensions.get('window').width;
  const dropdownRight = windowWidth - (anchorX + anchorWidth);
  const isAndroid = Platform.OS === 'android';
  const androidDropdownWidth = Math.min(windowWidth - 48, 312);

  return (
    <Modal transparent animationType="fade" visible={visible} onRequestClose={onClose}>
      <Pressable style={{ flex: 1 }} onPress={onClose}>
        <View
          style={{
            position: 'absolute',
            top: anchorY + 4,
            right: isAndroid ? undefined : dropdownRight,
            left: isAndroid ? 16 : undefined,
            alignSelf: isAndroid ? 'center' : undefined,
            minWidth: isAndroid ? undefined : Math.max(anchorWidth, 220),
            width: isAndroid ? androidDropdownWidth : undefined,
            maxWidth: 320,
            backgroundColor: '#1A1D21',
            borderRadius: 14,
            borderWidth: 1,
            borderColor: '#30363D',
            padding: isAndroid ? 14 : 8,
            shadowColor: '#000',
            shadowOpacity: 0.4,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 8 },
            elevation: 10,
            overflow: 'hidden',
          }}>
          <View style={{ paddingHorizontal: isAndroid ? 14 : 10, paddingTop: isAndroid ? 10 : 8, paddingBottom: isAndroid ? 12 : 8 }}>
            <Text style={{ color: '#6B7280', fontSize: 11, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 }}>
              Planos salvos
            </Text>
          </View>
          {plans.map((plan) => {
            return (
              <View
                key={plan.id}
                style={{
                  borderRadius: 12,
                  marginBottom: 6,
                  backgroundColor: '#15181D',
                  borderWidth: 1,
                  borderColor: '#252A31',
                  minHeight: isAndroid ? 94 : 0,
                  padding: isAndroid ? 6 : 0,
                  overflow: 'hidden',
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'stretch', minWidth: 0, flex: 1, borderRadius: 8, overflow: 'hidden' }}>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Pressable
                      onPress={() => {
                        onSelect(plan);
                        onClose();
                      }}
                      style={({ pressed }) => ({
                        justifyContent: 'center',
                        paddingHorizontal: isAndroid ? 18 : 16,
                        paddingVertical: isAndroid ? 16 : 14,
                        backgroundColor: pressed ? '#252830' : 'transparent',
                        borderRadius: isAndroid ? 8 : 0,
                      })}>
                      <View style={{ minWidth: 0, justifyContent: 'center', paddingRight: isAndroid ? 8 : 2 }}>
                        <Text style={{ color: '#ECEDEE', fontSize: 13, fontWeight: '600', textAlign: 'left' }}>
                          {plan.trackLabel}
                        </Text>
                        <View
                          style={{
                            flexDirection: isAndroid ? 'column' : 'row',
                            alignItems: isAndroid ? 'flex-start' : 'center',
                            justifyContent: 'space-between',
                            gap: isAndroid ? 4 : 10,
                            marginTop: 8,
                          }}>
                          <Text style={{ color: '#6B7280', fontSize: 11, textAlign: 'left' }}>{plan.level}</Text>
                          <Text style={{ color: '#22C55E', fontSize: 11, fontWeight: '700', textAlign: 'right' }}>{plan.progressPercent}% estudado</Text>
                        </View>

                        <View style={{ marginTop: 12, paddingRight: isAndroid ? 2 : 0 }}>
                          <View style={{ height: 6, borderRadius: 999, backgroundColor: '#252A31', overflow: 'hidden' }}>
                            <View
                              style={{
                                width: `${Math.min(100, Math.max(0, plan.progressPercent))}%`,
                                height: '100%',
                                borderRadius: 999,
                                backgroundColor: '#22C55E',
                              }}
                            />
                          </View>
                          <Text style={{ color: '#7C8593', fontSize: 10, marginTop: 8 }}>
                            {plan.completedTopics}/{plan.totalTopics} tópicos concluídos
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  </View>
                  <View
                    style={{
                      alignSelf: 'stretch',
                      width: isAndroid ? 56 : 48,
                      marginLeft: isAndroid ? 6 : 0,
                      borderLeftWidth: 1,
                      borderLeftColor: '#252A31',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Pressable
                      onPress={() => onRemove(plan.id)}
                      style={({ pressed }) => ({
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: pressed ? 'rgba(239,68,68,0.08)' : 'transparent',
                        opacity: pressed ? 0.5 : 1,
                        borderRadius: isAndroid ? 8 : 0,
                      })}>
                      <MaterialIcons name="delete-outline" size={16} color="#EF4444" />
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      </Pressable>
    </Modal>
  );
}
