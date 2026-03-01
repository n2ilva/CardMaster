import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { auth, db } from '@/lib/firebase';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function firebaseUserToAuthUser(firebaseUser: User, displayName?: string): AuthUser {
  return {
    id: firebaseUser.uid,
    name: displayName ?? firebaseUser.displayName ?? 'Usuário',
    email: firebaseUser.email ?? '',
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          const data = userDoc.data();
          setUser({
            id: firebaseUser.uid,
            name: data?.name ?? firebaseUser.displayName ?? 'Usuário',
            email: firebaseUser.email ?? '',
          });
        } catch {
          setUser(firebaseUserToAuthUser(firebaseUser));
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      login: async (email, password) => {
        await signInWithEmailAndPassword(auth, email, password);
      },
      register: async (name, email, password) => {
        const credential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(credential.user, { displayName: name });

        await setDoc(doc(db, 'users', credential.user.uid), {
          name,
          email,
          createdAt: serverTimestamp(),
        });

        setUser({
          id: credential.user.uid,
          name,
          email,
        });
      },
      resetPassword: async (email) => {
        await sendPasswordResetEmail(auth, email);
      },
      logout: async () => {
        await signOut(auth);
        setUser(null);
      },
    }),
    [isLoading, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return context;
}
