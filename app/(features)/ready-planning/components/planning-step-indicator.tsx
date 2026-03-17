import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Text, View } from 'react-native';

type Step = 1 | 2 | 3 | 4;

type PlanningStepIndicatorProps = {
  current: Step;
  labels: string[];
};

export function PlanningStepIndicator({ current, labels }: PlanningStepIndicatorProps) {
  const steps = labels.map((label, index) => ({ n: (index + 1) as Step, label }));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
      {steps.map((step, index) => {
        const done = current > step.n;
        const active = current === step.n;
        return (
          <View key={step.n} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ alignItems: 'center', gap: 4 }}>
              <View
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: done ? '#22C55E' : active ? '#3F51B5' : '#1E2328',
                  borderWidth: done || active ? 0 : 1,
                  borderColor: '#30363D',
                }}>
                {done ? (
                  <MaterialIcons name="check" size={16} color="#fff" />
                ) : (
                  <Text style={{ color: active ? '#fff' : '#6B7280', fontSize: 13, fontWeight: '700' }}>{step.n}</Text>
                )}
              </View>
              <Text style={{ color: active ? '#ECEDEE' : '#6B7280', fontSize: 11, fontWeight: active ? '600' : '400' }}>
                {step.label}
              </Text>
            </View>
            {index < steps.length - 1 && (
              <View
                style={{
                  width: 48,
                  height: 2,
                  marginHorizontal: 8,
                  marginBottom: 18,
                  backgroundColor: done ? '#22C55E' : '#1E2328',
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}
