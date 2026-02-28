import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { apiRequest } from '@/lib/api';

type AuthUser = {
  id: string;
  name: string;
  email: string;
};

type AuthPayload = {
  token: string;
  user: AuthUser;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;
  progressRefreshKey: number;
  notifyProgressChanged: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const STORAGE_KEY = 'cardmaster.auth';

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [progressRefreshKey, setProgressRefreshKey] = useState(0);

  useEffect(() => {
    async function restoreSession() {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setIsLoading(false);
          return;
        }

        const parsed = JSON.parse(raw) as AuthPayload;
        setUser(parsed.user);
        setToken(parsed.token);
      } finally {
        setIsLoading(false);
      }
    }

    void restoreSession();
  }, []);

  async function persistSession(payload: AuthPayload) {
    setUser(payload.user);
    setToken(payload.token);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isLoading,
      progressRefreshKey,
      notifyProgressChanged: () => {
        setProgressRefreshKey((current) => current + 1);
      },
      login: async (email, password) => {
        const payload = await apiRequest<AuthPayload>('/auth/login', {
          method: 'POST',
          body: { email, password },
        });
        await persistSession(payload);
      },
      register: async (name, email, password) => {
        const payload = await apiRequest<AuthPayload>('/auth/register', {
          method: 'POST',
          body: { name, email, password },
        });
        await persistSession(payload);
      },
      logout: async () => {
        setUser(null);
        setToken(null);
        setProgressRefreshKey(0);
        await AsyncStorage.removeItem(STORAGE_KEY);
      },
    }),
    [isLoading, progressRefreshKey, token, user]
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
