import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';

import { DesktopSidebar } from '@/components/desktop-sidebar';
import { HapticTab } from '@/components/ui/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { LoadingScreen } from '@/components/ui/loading-screen';
import { Colors } from '@/constants/theme';
import { useLayoutMode } from '@/hooks/use-layout-mode';
import { useLogout } from '@/hooks/use-logout';
import { useData } from '@/providers/data-provider';

function DesktopTabLayout() {
  const { handleLogout } = useLogout();
  const { isPreloading, preloadProgress } = useData();

  return (
    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: '#0D0F10' }}>
      <DesktopSidebar onLogout={() => void handleLogout()} />
      <View style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        <Tabs
          screenOptions={{
            sceneStyle: { flex: 1 },
            tabBarActiveTintColor: Colors.dark.tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: { display: 'none' },
          }}>
          <Tabs.Screen name="index" options={{ title: 'Início' }} />
          <Tabs.Screen name="coding-practice" options={{ title: 'Praticar' }} />
          <Tabs.Screen name="quiz" options={{ title: 'Quiz' }} />
          <Tabs.Screen name="progress" options={{ title: 'Progresso' }} />
          <Tabs.Screen name="community" options={{ title: 'Comunidade' }} />
        </Tabs>

        {isPreloading && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: '#151718', zIndex: 10 }}>
            <LoadingScreen progress={preloadProgress} />
          </View>
        )}
      </View>
    </View>
  );
}

function CompactTabLayout() {
  const { isPreloading, preloadProgress } = useData();

  return (
    <View style={{ flex: 1, backgroundColor: '#151718' }}>
      <View style={{ flex: 1, position: 'relative' }}>
        <Tabs
          screenOptions={{
            sceneStyle: { flex: 1 },
            tabBarActiveTintColor: Colors.dark.tint,
            headerShown: false,
            tabBarButton: HapticTab,
            tabBarStyle: {
              backgroundColor: '#151718',
              borderTopColor: '#30363D',
              borderTopWidth: 1,
              ...(Platform.OS === 'web' && {
                height: 64,
                paddingBottom: 8,
                paddingTop: 6,
              }),
            },
          }}>
          <Tabs.Screen
            name="index"
            options={{
              title: 'Início',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="coding-practice"
            options={{
              title: 'Praticar',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color={color} />,
            }}
          />
          <Tabs.Screen
            name="quiz"
            options={{
              title: 'Quiz',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="progress"
            options={{
              title: 'Progresso',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar.fill" color={color} />,
            }}
          />
          <Tabs.Screen
            name="community"
            options={{
              title: 'Comunidade',
              tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.3.sequence.fill" color={color} />,
            }}
          />
        </Tabs>

        {isPreloading && (
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: (Platform.OS === 'web' ? 64 : 50), backgroundColor: '#151718', zIndex: 10 }}>
            <LoadingScreen progress={preloadProgress} />
          </View>
        )}
      </View>
    </View>
  );
}

export default function MainLayout() {
  const layoutMode = useLayoutMode();

  if (layoutMode === 'desktop') {
    return <DesktopTabLayout />;
  }

  return <CompactTabLayout />;
}
