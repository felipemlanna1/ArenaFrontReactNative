import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { AlertProvider } from './src/contexts/AlertContext';
import { UnreadNotificationsProvider } from './src/contexts/UnreadNotificationsContext';
import { HomeFiltersProvider } from './src/contexts/HomeFiltersContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { SportsProvider } from './src/contexts/SportsContext';
import { GroupsProvider } from './src/contexts/GroupsContext';
import { GroupsFiltersProvider } from './src/contexts/GroupsFiltersContext';
import { AnimatedSplashScreen } from './src/components/animatedSplashScreen';
import { usePreloadAssets } from './src/hooks/usePreloadAssets';

export default function App() {
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const { preloadAssets } = usePreloadAssets();

  useEffect(() => {
    async function loadAssets() {
      try {
        await preloadAssets();
        setAssetsLoaded(true);
      } catch {
        setAssetsLoaded(true);
      }
    }

    loadAssets();
  }, [preloadAssets]);

  if (!assetsLoaded || showSplash) {
    return (
      <AnimatedSplashScreen onAnimationComplete={() => setShowSplash(false)} />
    );
  }

  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <SportsProvider>
          <AuthProvider>
            <AlertProvider>
              <UnreadNotificationsProvider>
                <ToastProvider>
                  <GroupsProvider>
                    <GroupsFiltersProvider>
                      <HomeFiltersProvider>
                        <AppNavigator />
                      </HomeFiltersProvider>
                    </GroupsFiltersProvider>
                  </GroupsProvider>
                </ToastProvider>
              </UnreadNotificationsProvider>
            </AlertProvider>
          </AuthProvider>
        </SportsProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
