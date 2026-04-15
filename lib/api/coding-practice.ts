import { collection, doc, getDocs, serverTimestamp, setDoc, query, where, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { CodingPracticeResult } from './types';

export async function fetchCodingPracticeProgress(uid: string): Promise<Record<string, { completed: boolean; bestTime: number }>> {
  const colRef = collection(db, 'users', uid, 'codingPracticeResults');
  const snapshot = await getDocs(colRef);
  
  const results: Record<string, { completed: boolean; bestTime: number }> = {};
  snapshot.docs.forEach(d => {
    const data = d.data() as CodingPracticeResult;
    results[d.id] = {
      completed: data.completed,
      bestTime: data.bestTime,
    };
  });
  
  return results;
}

export async function saveCodingPracticeResult(uid: string, exerciseId: string, timeSeconds: number): Promise<void> {
  const docRef = doc(db, 'users', uid, 'codingPracticeResults', exerciseId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const existing = docSnap.data() as CodingPracticeResult;
    if (timeSeconds < existing.bestTime || !existing.completed) {
      await setDoc(docRef, {
        exerciseId,
        completed: true,
        bestTime: Math.min(existing.bestTime, timeSeconds),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    }
  } else {
    await setDoc(docRef, {
      exerciseId,
      completed: true,
      bestTime: timeSeconds,
      updatedAt: serverTimestamp(),
    });
  }
}
