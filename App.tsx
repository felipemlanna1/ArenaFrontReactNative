import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Font from 'expo-font';
import { Image } from 'expo-image';
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

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    async function loadAssets() {
      try {
        await Promise.all([
          Font.loadAsync({
            'BebasNeue-Regular': require('./assets/fonts/BebasNeue-Regular.ttf'),
            'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
            'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
            'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
            'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
          }),
          Image.prefetch([
            require('./src/assets/iconSports/futebol.webp'),
            require('./src/assets/iconSports/basquete.webp'),
            require('./src/assets/iconSports/voleibol.webp'),
            require('./src/assets/iconSports/tenis.webp'),
            require('./src/assets/iconSports/corrida.webp'),
            require('./src/assets/players/jogadorDeTenis.webp'),
          ]),
        ]);
        setFontsLoaded(true);
      } catch {
        setFontsLoaded(true);
      }
    }

    loadAssets();
  }, []);

  if (!fontsLoaded || showSplash) {
    return (
      <AnimatedSplashScreen
        onAnimationComplete={() => setShowSplash(false)}
      />
    );
  }

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}
