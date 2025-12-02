import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/contexts/AuthContext';
import { AlertProvider } from './src/contexts/AlertContext';
import { NotificationsProvider } from './src/contexts/NotificationsContext';
import { UnreadNotificationsProvider } from './src/contexts/UnreadNotificationsContext';
import { InvitesProvider } from './src/contexts/InvitesContext';
import { PendingFeedbackProvider } from './src/contexts/PendingFeedbackContext';
import { HomeFiltersProvider } from './src/contexts/HomeFiltersContext';
import { ToastProvider } from './src/contexts/ToastContext';
import { SportsProvider } from './src/contexts/SportsContext';
import { GroupsProvider } from './src/contexts/GroupsContext';
import { GroupsFiltersProvider } from './src/contexts/GroupsFiltersContext';
import { FriendsFiltersProvider } from './src/contexts/FriendsFiltersContext';
import { AnimatedSplashScreen } from './src/components/animatedSplashScreen';
import { usePreloadAssets } from './src/hooks/usePreloadAssets';
import { styles } from './stylesApp';

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
    <GestureHandlerRootView style={styles.rootContainer}>
      <SafeAreaProvider>
        <KeyboardProvider>
          <SportsProvider>
            <AuthProvider>
              <PendingFeedbackProvider>
                <InvitesProvider>
                  <NotificationsProvider>
                    <AlertProvider>
                      <UnreadNotificationsProvider>
                        <ToastProvider>
                          <GroupsProvider>
                            <GroupsFiltersProvider>
                              <FriendsFiltersProvider>
                                <HomeFiltersProvider>
                                  <AppNavigator />
                                </HomeFiltersProvider>
                              </FriendsFiltersProvider>
                            </GroupsFiltersProvider>
                          </GroupsProvider>
                        </ToastProvider>
                      </UnreadNotificationsProvider>
                    </AlertProvider>
                  </NotificationsProvider>
                </InvitesProvider>
              </PendingFeedbackProvider>
            </AuthProvider>
          </SportsProvider>
        </KeyboardProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
