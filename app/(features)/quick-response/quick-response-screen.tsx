import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  useColorScheme, 
  Animated,
  Dimensions,
  StyleSheet
} from 'react-native';
import { router } from 'expo-router';
import { useTabContentPadding, useTopContentPadding } from '@/hooks/use-tab-content-padding';
import { PanelCard } from '@/components/quiz/panel-card';
import { QUIZ_COLORS } from '@/constants/quiz-ui';

import SupportData from '../coding-practice/Data/suportetecnico.json';
import { 
  QuickResponseData, 
  QuickResponseCategory, 
  QuickResponseExercise,
  QuickResponseOption
} from './quick-response.types';

const { width } = Dimensions.get('window');
const data = SupportData as unknown as QuickResponseData;

export function QuickResponseScreen() {
  const isDark = useColorScheme() === 'dark';
  const topPadding = useTopContentPadding();
  const bottomPadding = useTabContentPadding();

  const [selectedCategory, setSelectedCategory] = useState<QuickResponseCategory | null>(null);
  const [activeExercise, setActiveExercise] = useState<QuickResponseExercise | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; optionId: string } | null>(null);
  const [answeredExercises, setAnsweredExercises] = useState<Set<string>>(new Set());

  const bg = isDark ? '#0D0F10' : '#F8FAFC';
  const textPrimary = isDark ? '#ECEDEE' : '#11181C';
  const textMuted = isDark ? '#9BA1A6' : '#687076';
  const surfaceColor = isDark ? '#1A1D21' : '#FFFFFF';
  const borderColor = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)';

  const handleSelectCategory = (cat: QuickResponseCategory) => {
    setSelectedCategory(cat);
  };

  const handleSelectExercise = (ex: QuickResponseExercise) => {
    setActiveExercise(ex);
    setFeedback(null);
  };

  const handleSelectOption = (option: QuickResponseOption) => {
    if (feedback) return; // Prevent double clicking

    setFeedback({
      isCorrect: option.correct,
      message: option.feedback,
      optionId: option.id
    });

    if (option.correct) {
      setAnsweredExercises(prev => new Set([...prev, activeExercise!.id]));
    }
  };

  const handleNext = () => {
    if (!selectedCategory || !activeExercise) return;
    
    const currentIndex = selectedCategory.exercises.findIndex(e => e.id === activeExercise.id);
    if (currentIndex < selectedCategory.exercises.length - 1) {
      setActiveExercise(selectedCategory.exercises[currentIndex + 1]);
      setFeedback(null);
    } else {
      setActiveExercise(null);
      setFeedback(null);
    }
  };

  const renderCategoryList = () => (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        paddingTop: topPadding + 20, 
        paddingBottom: bottomPadding + 40,
        paddingHorizontal: 20
      }}
    >
      <View style={{ marginBottom: 32 }}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={{ 
            width: 40, height: 40, borderRadius: 20, 
            backgroundColor: surfaceColor, alignItems: 'center', 
            justifyContent: 'center', marginBottom: 16,
            borderWidth: 1, borderColor: borderColor
          }}
        >
          <MaterialIcons name="arrow-back" size={20} color={textPrimary} />
        </TouchableOpacity>
        <Text style={{ fontSize: 28, fontWeight: '800', color: textPrimary, letterSpacing: -0.5 }}>
          {data.game}
        </Text>
        <Text style={{ fontSize: 15, color: textMuted, marginTop: 4, lineHeight: 22 }}>
          Encare incidentes reais de TI e prove que você é um especialista em suporte e infraestrutura.
        </Text>
      </View>

      <View style={{ gap: 16 }}>
        {data.categories.map((cat) => {
          const completedCount = cat.exercises.filter(ex => answeredExercises.has(ex.id)).length;
          const progress = completedCount / cat.exercises.length;

          return (
            <TouchableOpacity 
              key={cat.id} 
              activeOpacity={0.8}
              onPress={() => handleSelectCategory(cat)}
            >
              <PanelCard style={{ 
                backgroundColor: surfaceColor, 
                borderRadius: 24, 
                padding: 20,
                borderWidth: 1,
                borderColor: cat.color + '20'
              }}>
                <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                  <View style={{ 
                    width: 56, height: 56, borderRadius: 18, 
                    backgroundColor: cat.color + '15', 
                    alignItems: 'center', justifyContent: 'center',
                    borderWidth: 1, borderColor: cat.color + '30'
                  }}>
                    <MaterialCommunityIcons 
                      name={cat.id === 'suporte_tecnico' ? 'account-wrench' : cat.id === 'noc' ? 'lan' : 'shield-alert'} 
                      size={28} 
                      color={cat.color} 
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: textPrimary }}>{cat.name}</Text>
                    <Text style={{ fontSize: 13, color: textMuted, marginTop: 2 }} numberOfLines={2}>
                      {cat.description}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 12 }}>
                      <View style={{ flex: 1, height: 4, backgroundColor: isDark ? '#2D3139' : '#E2E8F0', borderRadius: 2 }}>
                        <View style={{ width: `${progress * 100}%`, height: '100%', backgroundColor: cat.color, borderRadius: 2 }} />
                      </View>
                      <Text style={{ fontSize: 11, fontWeight: '700', color: textMuted }}>
                        {completedCount}/{cat.exercises.length}
                      </Text>
                    </View>
                  </View>
                  <MaterialIcons name="chevron-right" size={24} color={textMuted} />
                </View>
              </PanelCard>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );

  const renderExerciseList = () => (
    <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        paddingTop: topPadding + 20, 
        paddingBottom: bottomPadding + 40,
        paddingHorizontal: 20
      }}
    >
      <View style={{ marginBottom: 24 }}>
        <TouchableOpacity 
          onPress={() => setSelectedCategory(null)}
          style={{ 
            width: 40, height: 40, borderRadius: 20, 
            backgroundColor: surfaceColor, alignItems: 'center', 
            justifyContent: 'center', marginBottom: 16,
            borderWidth: 1, borderColor: borderColor
          }}
        >
          <MaterialIcons name="arrow-back" size={20} color={textPrimary} />
        </TouchableOpacity>
        <Text style={{ fontSize: 12, fontWeight: '800', color: selectedCategory?.color, textTransform: 'uppercase', letterSpacing: 1 }}>
          {selectedCategory?.name}
        </Text>
        <Text style={{ fontSize: 24, fontWeight: '800', color: textPrimary, marginTop: 4, letterSpacing: -0.5 }}>
          Selecione um Incidente
        </Text>
      </View>

      <View style={{ gap: 12 }}>
        {selectedCategory?.exercises.map((ex, index) => {
          const isAnswered = answeredExercises.has(ex.id);
          return (
            <TouchableOpacity 
              key={ex.id}
              activeOpacity={0.8}
              onPress={() => handleSelectExercise(ex)}
            >
              <PanelCard style={{ 
                backgroundColor: isAnswered ? (isDark ? '#141818' : '#F0FDF4') : surfaceColor, 
                borderRadius: 20, 
                padding: 16,
                borderWidth: 1,
                borderColor: isAnswered ? 'rgba(34,197,94,0.2)' : borderColor
              }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ 
                    width: 36, height: 36, borderRadius: 12, 
                    backgroundColor: isAnswered ? 'rgba(34,197,94,0.15)' : (isDark ? '#2D3139' : '#F1F5F9'),
                    alignItems: 'center', justifyContent: 'center'
                  }}>
                    {isAnswered ? (
                      <MaterialIcons name="check" size={20} color="#22C55E" />
                    ) : (
                      <Text style={{ fontWeight: '800', color: textMuted }}>{index + 1}</Text>
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 15, fontWeight: '600', color: textPrimary }} numberOfLines={1}>
                      {ex.alert}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
                      <View style={{ 
                        paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, 
                        backgroundColor: ex.level === 'fácil' ? '#22C55E20' : ex.level === 'médio' ? '#F59E0B20' : '#EF444420'
                      }}>
                        <Text style={{ 
                          fontSize: 10, fontWeight: '800', 
                          color: ex.level === 'fácil' ? '#22C55E' : ex.level === 'médio' ? '#F59E0B' : '#EF4444' 
                        }}>
                          {ex.level.toUpperCase()}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <MaterialIcons name="play-arrow" size={20} color={textMuted} />
                </View>
              </PanelCard>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );

  const renderActiveExercise = () => {
    if (!activeExercise) return null;

    return (
      <View style={{ flex: 1, backgroundColor: bg }}>
        <View style={{ 
          paddingTop: topPadding + 10, 
          paddingHorizontal: 20, 
          paddingBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: borderColor,
          backgroundColor: surfaceColor
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <TouchableOpacity 
              onPress={() => { setActiveExercise(null); setFeedback(null); }}
              style={{ padding: 8, marginLeft: -8 }}
            >
              <MaterialIcons name="close" size={24} color={textPrimary} />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <MaterialCommunityIcons name="fire-extinguisher" size={18} color="#F43F5E" />
              <Text style={{ fontWeight: '800', color: textPrimary, fontSize: 14 }}>
                INCIDENTE #{activeExercise.id.split('_')[1]}
              </Text>
            </View>
            <View style={{ width: 24 }} />
          </View>
          
          <View style={{ 
            backgroundColor: isDark ? '#2D161B' : '#FFF1F2', 
            borderRadius: 16, 
            padding: 20,
            borderWidth: 1,
            borderColor: '#F43F5E30'
          }}>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12 }}>
              <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#F43F5E', alignItems: 'center', justifyContent: 'center' }}>
                <MaterialIcons name="notifications-active" size={22} color="#FFFFFF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#F43F5E', fontSize: 11, fontWeight: '800', letterSpacing: 1, marginBottom: 2 }}>
                   ALERTA DE SISTEMA
                </Text>
                <Text style={{ color: isDark ? '#FFD1D9' : '#9F1239', fontSize: 14, fontWeight: '700' }}>
                  Ação imediata requerida
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 16, color: isDark ? '#ECEDEE' : '#11181C', lineHeight: 24, fontWeight: '600' }}>
              "{activeExercise.alert}"
            </Text>
          </View>
        </View>

        <ScrollView 
          contentContainerStyle={{ padding: 20, paddingBottom: bottomPadding + 100 }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={{ fontSize: 12, fontWeight: '800', color: textMuted, letterSpacing: 1, marginBottom: 16, textTransform: 'uppercase' }}>
            Como você deseja proceder?
          </Text>

          <View style={{ gap: 12 }}>
            {activeExercise.options.map((option) => {
              const isSelected = feedback?.optionId === option.id;
              const isCorrect = feedback?.isCorrect && isSelected;
              const isWrong = !feedback?.isCorrect && isSelected;

              return (
                <TouchableOpacity 
                  key={option.id}
                  activeOpacity={0.7}
                  onPress={() => handleSelectOption(option)}
                  disabled={feedback !== null}
                  style={{
                    backgroundColor: isSelected 
                      ? (isCorrect ? '#22C55E20' : '#EF444420') 
                      : (isDark ? '#1A1D21' : '#FFFFFF'),
                    borderRadius: 20,
                    padding: 20,
                    borderWidth: 2,
                    borderColor: isSelected 
                      ? (isCorrect ? '#22C55E' : '#EF4444') 
                      : borderColor,
                  }}
                >
                  <View style={{ flexDirection: 'row', gap: 16 }}>
                    <View style={{ 
                      width: 28, height: 28, borderRadius: 14, 
                      backgroundColor: isSelected 
                        ? (isCorrect ? '#22C55E' : '#EF4444') 
                        : (isDark ? '#2D3139' : '#F1F5F9'),
                      alignItems: 'center', justifyContent: 'center',
                      marginTop: 2
                    }}>
                      <Text style={{ 
                        fontWeight: '800', 
                        color: isSelected ? '#FFFFFF' : textMuted,
                        fontSize: 14
                      }}>
                        {option.id.toUpperCase()}
                      </Text>
                    </View>
                    <Text style={{ 
                      flex: 1, fontSize: 15, lineHeight: 22, 
                      color: textPrimary, fontWeight: '600' 
                    }}>
                      {option.text}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {feedback && (
          <View style={{ 
            position: 'absolute', 
            bottom: 0, left: 0, right: 0, 
            backgroundColor: feedback.isCorrect ? (isDark ? '#064E3B' : '#ECFDF5') : (isDark ? '#450A0A' : '#FEF2F2'),
            padding: 24,
            paddingBottom: bottomPadding + 20,
            borderTopWidth: 1,
            borderTopColor: feedback.isCorrect ? '#22C55E40' : '#EF444440',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -10 },
            shadowOpacity: 0.2,
            shadowRadius: 15,
            elevation: 20
          }}>
            <View style={{ flexDirection: 'row', gap: 12, marginBottom: 12, alignItems: 'center' }}>
              <View style={{ 
                width: 32, height: 32, borderRadius: 16, 
                backgroundColor: feedback.isCorrect ? '#22C55E' : '#EF4444', 
                alignItems: 'center', justifyContent: 'center' 
              }}>
                <MaterialIcons name={feedback.isCorrect ? "check" : "close"} size={20} color="#FFFFFF" />
              </View>
              <Text style={{ 
                fontSize: 18, fontWeight: '800', 
                color: feedback.isCorrect ? (isDark ? '#6EE7B7' : '#065F46') : (isDark ? '#F87171' : '#991B1B')
              }}>
                {feedback.isCorrect ? 'Problema Resolvido!' : 'Resposta Incorreta'}
              </Text>
            </View>
            <Text style={{ 
              fontSize: 15, lineHeight: 22, marginBottom: 20,
              color: feedback.isCorrect ? (isDark ? '#A7F3D0' : '#047857') : (isDark ? '#FECACA' : '#B91C1C')
            }}>
              {feedback.message}
            </Text>
            
            <TouchableOpacity 
              onPress={feedback.isCorrect ? handleNext : () => setFeedback(null)}
              style={{ 
                backgroundColor: feedback.isCorrect ? '#22C55E' : '#EF4444',
                paddingVertical: 14,
                borderRadius: 14,
                alignItems: 'center'
              }}
            >
              <Text style={{ color: '#FFFFFF', fontWeight: '800', fontSize: 16 }}>
                {feedback.isCorrect ? 'CONTINUAR' : 'TENTAR NOVAMENTE'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      {!selectedCategory ? renderCategoryList() : (!activeExercise ? renderExerciseList() : renderActiveExercise())}
    </View>
  );
}

const styles = StyleSheet.create({
  // Adicione estilos aqui se necessário
});
