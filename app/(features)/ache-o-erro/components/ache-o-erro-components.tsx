import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Animated, Modal, Pressable, ScrollView, Text, TouchableOpacity, View, useColorScheme, useWindowDimensions, Platform } from 'react-native';
import { DraxView } from 'react-native-drax';
import { DEBUG_COLORS, LEVEL_CONFIG } from '@/app/(features)/ache-o-erro/ache-o-erro.constants';
import { DebugExercise, PlacedToken, Token, Level, LanguageInfo } from '@/app/(features)/ache-o-erro/ache-o-erro.types';

// ─────────────────────────────────────────────
// Language Selector
// ─────────────────────────────────────────────
type LanguageSelectorProps = {
  languages: LanguageInfo[];
  selected: LanguageInfo;
  onSelect: (lang: LanguageInfo) => void;
};

export function LanguageSelector({ languages, selected, onSelect }: LanguageSelectorProps) {
  const { width } = useWindowDimensions();
  const showText = width >= 640;

  return (
    <View style={{ flexDirection: 'row', gap: 4, paddingHorizontal: 16, paddingVertical: 6 }}>
      {languages.map((lang) => {
        const active = lang.id === selected.id;
        return (
          <TouchableOpacity
            key={lang.id}
            onPress={() => onSelect(lang)}
            activeOpacity={0.7}
            style={{
              flex: 1,
              paddingVertical: 8,
              borderRadius: 10,
              borderWidth: 1.5,
              borderColor: active ? lang.color : '#2D3139',
              backgroundColor: active ? `${lang.color}15` : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <MaterialCommunityIcons
              name={lang.icon as any}
              size={showText ? 24 : 28}
              color={active ? lang.color : '#9BA1A6'}
            />
            {showText && (
              <Text
                style={{
                  color: active ? lang.color : '#4B5563',
                  fontSize: 11,
                  fontWeight: active ? '800' : '600',
                  textTransform: 'uppercase',
                  letterSpacing: 1,
                }}
              >
                {lang.label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─────────────────────────────────────────────
// Level Card
// ─────────────────────────────────────────────
type LevelCardProps = {
  level: Level;
  count: number;
  completedCount: number;
  onPress: () => void;
};

export function LevelCard({ level, count, completedCount, onPress }: LevelCardProps) {
  const config = LEVEL_CONFIG[level];
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        flexBasis: '47%',
        flexGrow: 1,
        backgroundColor: isDark ? '#1C1F24' : '#FFFFFF',
        borderRadius: 16,
        borderWidth: 1.5,
        borderColor: `${config.color}20`,
        paddingVertical: 16,
        paddingHorizontal: 12,
        alignItems: 'center',
        gap: 8,
        shadowColor: config.color,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 2,
      }}
    >
      <View style={{ 
        width: 48, 
        height: 48, 
        borderRadius: 16, 
        backgroundColor: `${config.color}15`, 
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: `${config.color}30`
      }}>
        <MaterialIcons name={config.icon as any} size={28} color={config.color} />
      </View>
      
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: isDark ? '#ECEDEE' : '#11181C', fontSize: 15, fontWeight: '800', textAlign: 'center' }}>
          {config.label}
        </Text>
        <Text style={{ color: DEBUG_COLORS.textMuted, fontSize: 12, marginTop: 4 }}>
          {completedCount} / {count} concluídos
        </Text>
      </View>
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Exercise Card
// ─────────────────────────────────────────────
type ExerciseCardProps = {
  exercise: DebugExercise;
  onPress: () => void;
  completed?: boolean;
};

export function ExerciseCard({ exercise, onPress, completed }: ExerciseCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const config = LEVEL_CONFIG[exercise.level];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        backgroundColor: isDark ? '#1C1F24' : '#FFFFFF',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: completed ? `${DEBUG_COLORS.success}44` : '#30363D',
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
      }}
    >
      <View style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: completed ? `${DEBUG_COLORS.success}15` : `${config.color}15`,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <MaterialIcons 
          name={completed ? "check-circle" : "bug-report"} 
          size={24} 
          color={completed ? DEBUG_COLORS.success : config.color} 
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: isDark ? '#ECEDEE' : '#11181C', fontSize: 16, fontWeight: '700' }}>
          {exercise.title}
        </Text>
        <Text style={{ color: DEBUG_COLORS.textMuted, fontSize: 13, marginTop: 2 }} numberOfLines={1}>
          {exercise.description}
        </Text>
      </View>

      <MaterialIcons name="chevron-right" size={24} color={DEBUG_COLORS.textMuted} />
    </TouchableOpacity>
  );
}

// ─────────────────────────────────────────────
// Debug Token
// ─────────────────────────────────────────────
type DebugTokenProps = {
  token: Token;
  instanceId: string;
  onPress?: () => void;
  variant: 'pool' | 'code';
  receptive?: boolean;
  onReceiveDragDrop?: (event: any) => void;
};

export function DebugToken({ 
  token, 
  instanceId, 
  onPress, 
  variant, 
  receptive, 
  onReceiveDragDrop 
}: DebugTokenProps) {
  const isPool = variant === 'pool';
  
  return (
    <DraxView
      dragPayload={isPool ? `pool_${instanceId}` : `code_${instanceId}`}
      receptive={receptive}
      onReceiveDragDrop={onReceiveDragDrop}
      draggingStyle={{ opacity: 0.5 }}
      dragReleasedStyle={{ opacity: 1 }}
      hoverDraggingStyle={{ opacity: 0.8 }}
      receivingStyle={{
        borderColor: '#10B981',
        borderWidth: 1.5,
        borderRadius: 5,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
      }}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={{
          paddingHorizontal: 4,
          paddingVertical: 3,
          borderRadius: 5,
          backgroundColor: isPool ? '#252930' : '#1E2128',
          borderWidth: 1,
          borderColor: isPool ? '#3A3F47' : '#4B5563',
          borderBottomWidth: 1.5,
          margin: 1,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#D1D5DB', fontSize: 13, fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace', fontWeight: '700' }}>
          {token.value}
        </Text>
      </TouchableOpacity>
    </DraxView>
  );
}

// ─────────────────────────────────────────────
// Validation FAB
// ─────────────────────────────────────────────
export function ValidateFAB({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={{
        position: 'absolute',
        bottom: 24,
        right: 24,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: disabled ? '#374151' : DEBUG_COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      }}
    >
      <MaterialIcons name="check" size={32} color="#FFFFFF" />
    </TouchableOpacity>
  );
}
