import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, usePathname, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuth } from '@/providers/auth-provider';

export const unstable_settings = {
  anchor: '(tabs)',
};

function RootNavigator() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const onLoginRoute = pathname === '/login';

    if (!user && !onLoginRoute) {
      router.replace('/login');
      return;
    }

    if (user && onLoginRoute) {
      router.replace('/(tabs)');
    }
  }, [isLoading, pathname, router, user]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ gestureEnabled: true, fullScreenGestureEnabled: true }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen
          name="ready/[track]"
          options={{
            title: 'Categorias',
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen
          name="ready/study"
          options={{
            title: 'Estudo',
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen
          name="ready/theme-info"
          options={{
            title: 'Pesquisa',
            headerBackTitle: 'Voltar',
          }}
        />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}
