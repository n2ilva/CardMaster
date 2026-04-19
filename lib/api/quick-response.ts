import { db } from "@/lib/firebase";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    serverTimestamp,
    setDoc,
} from "firebase/firestore";
import { updateUserProfile } from "./community";
import { invalidateUserCaches } from "./progress";

/**
 * Busca o catálogo do Quick Response / Suporte Técnico no Firestore.
 *
 * O documento `quick_response_catalog/main` contém o JSON original íntegro
 * (`game`, `version`, `categories`, ...) publicado pelo script de upload.
 */
export async function fetchQuickResponseCatalog(): Promise<Record<
  string,
  unknown
> | null> {
  const docRef = doc(db, "quick_response_catalog", "main");
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  const data = snap.data() as Record<string, unknown>;
  const { updatedAt: _updatedAt, ...rest } = data;
  return rest;
}

export async function fetchQuickResponseProgress(
  uid: string,
): Promise<Record<string, { attempts: number; withinSLA: boolean }>> {
  const colRef = collection(db, "users", uid, "quickResponseResults");
  const snapshot = await getDocs(colRef);

  const results: Record<string, { attempts: number; withinSLA: boolean }> = {};
  snapshot.docs.forEach((d) => {
    const data = d.data();
    results[d.id] = {
      attempts: data.attempts,
      withinSLA: data.withinSLA,
    };
  });

  return results;
}

export async function saveQuickResponseResult(
  uid: string,
  exerciseId: string,
  attempts: number,
  withinSLA: boolean,
): Promise<void> {
  const docRef = doc(db, "users", uid, "quickResponseResults", exerciseId);
  const docSnap = await getDoc(docRef);

  // We keep the "best" result?
  // For QuickResponse, maybe we keep the one with fewest attempts?
  // Or just update if it's the first time.
  // The user didn't specify "best", let's just save the current one if it's new or better (fewer attempts).

  if (docSnap.exists()) {
    const existing = docSnap.data();
    const newBestAttempts = Math.min(existing.attempts ?? Infinity, attempts);
    const newWithinSLA = existing.withinSLA || withinSLA; // Once SLA OK, always OK?

    await setDoc(
      docRef,
      {
        exerciseId,
        completed: true,
        attempts: newBestAttempts,
        withinSLA: newWithinSLA,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    );
  } else {
    await setDoc(docRef, {
      exerciseId,
      completed: true,
      attempts,
      withinSLA,
      updatedAt: serverTimestamp(),
    });
  }

  await invalidateUserCaches(uid);
  await updateUserProfile(uid);
}
