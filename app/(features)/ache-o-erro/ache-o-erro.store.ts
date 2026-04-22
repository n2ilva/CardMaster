import AsyncStorage from '@react-native-async-storage/async-storage';
import { DebugExercise, Level } from '@/app/(features)/ache-o-erro/ache-o-erro.types';
import javascriptData from '@/data/ache-o-erro/javascript.json';
import javaData from '@/data/ache-o-erro/java.json';
import pythonData from '@/data/ache-o-erro/python.json';
import csharpData from '@/data/ache-o-erro/c-sharp.json';

const STORAGE_KEY = 'debug-practice-progress';
export type ExerciseProgress = {
  completed: boolean;
  bestTime: number; // in seconds
  bestMoves?: number;
};

export type GlobalProgress = Record<string, ExerciseProgress>;

export const DebugPracticeStore = {
  async getAllExercises(): Promise<DebugExercise[]> {
    const exercises: DebugExercise[] = [];
    
    const dataSources = [
      { data: javascriptData, key: 'javascript' },
      { data: javaData, key: 'java' },
      { data: pythonData, key: 'python' },
      { data: csharpData, key: 'csharp' },
    ];

    dataSources.forEach(({ data, key }) => {
      const langData = (data as any)[key];
      if (langData && langData.levels) {
        const levels = langData.levels;
        (Object.keys(levels) as Level[]).forEach(levelKey => {
          const levelData = levels[levelKey];
          levelData.questions.forEach((q: any) => {
            exercises.push({
              ...q,
              level: levelKey,
              language: key
            });
          });
        });
      }
    });

    return exercises;
  },

  async getProgress(uid?: string): Promise<GlobalProgress> {
    let localData: GlobalProgress = {};
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) localData = JSON.parse(data);
    } catch (e) {
      console.error('Error loading local progress', e);
    }

    // For now, only local progress for this new game
    // Sync with Firebase could be added later like in coding-practice
    
    return localData;
  },

  async saveResult(exerciseId: string, timeSeconds: number, moves: number, uid?: string): Promise<void> {
    try {
      const progress = await this.getProgress();
      const existing = progress[exerciseId];

      const isNewBestTime = !existing || timeSeconds < existing.bestTime;
      const isNewBestMoves = !existing || moves < (existing.bestMoves ?? Infinity);

      if (isNewBestTime || isNewBestMoves || !existing?.completed) {
        progress[exerciseId] = {
          completed: true,
          bestTime: existing ? Math.min(existing.bestTime, timeSeconds) : timeSeconds,
          bestMoves: existing ? Math.min(existing.bestMoves ?? Infinity, moves) : moves,
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
      }
      
      // Save to Firebase could be implemented here as well
    } catch (e) {
      console.error('Error saving debug practice result', e);
    }
  },

  async resetProgress(): Promise<void> {
    await AsyncStorage.removeItem(STORAGE_KEY);
  }
};
