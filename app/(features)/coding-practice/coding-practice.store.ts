import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchCodingPracticeProgress, saveCodingPracticeResult } from '@/lib/api/coding-practice';

const STORAGE_KEY = 'coding-practice-progress';

export type ExerciseProgress = {
  completed: boolean;
  bestTime: number; // in seconds
};

export type GlobalProgress = Record<string, ExerciseProgress>;

export const CodingPracticeStore = {
  async getProgress(uid?: string): Promise<GlobalProgress> {
    // 1. Load local first
    let localData: GlobalProgress = {};
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) localData = JSON.parse(data);
    } catch (e) {
      console.error('Error loading local progress', e);
    }

    // 2. If user is logged in, sync with Firebase
    if (uid) {
      try {
        const remoteData = await fetchCodingPracticeProgress(uid);
        // Merge - remote takes precedence for completion, but we can keep best of both?
        // Usually remote is the source of truth
        const merged = { ...localData, ...remoteData };
        
        // Update local with merged data
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return merged;
      } catch (e) {
        console.error('Error fetching remote progress', e);
      }
    }

    return localData;
  },

  async saveResult(exerciseId: string, timeSeconds: number, uid?: string): Promise<void> {
    try {
      // Save locally
      const progress = await this.getProgress();
      const existing = progress[exerciseId];

      if (!existing || timeSeconds < existing.bestTime || !existing.completed) {
        progress[exerciseId] = {
          completed: true,
          bestTime: existing ? Math.min(existing.bestTime, timeSeconds) : timeSeconds,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      }

      // Save to Firebase
      if (uid) {
        await saveCodingPracticeResult(uid, exerciseId, timeSeconds);
      }
    } catch (e) {
      console.error('Error saving coding practice result', e);
    }
  },

  async resetProgress(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
};
