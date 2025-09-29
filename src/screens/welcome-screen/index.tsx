import React from 'react';
import { View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { ArenaColors } from '@/constants';
import { useWelcomeScreen } from './useWelcomeScreen';
import { styles } from './stylesWelcomeScreen';

export const WelcomeScreen: React.FC = () => {
  const {
    handleGetStarted,
    handleLogin,
    isDev,
    titleLines,
    subtitle,
    startButtonTitle,
    createAccountButtonTitle,
  } = useWelcomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E', '#16213E']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Logo variant="variant1" size="lg" testID="welcome-logo" />
          </View>

          <View style={styles.playerImageContainer}>
            <Image
              source={require('@/assets/players/jogadorDeTenis.png')}
              style={styles.playerImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.backgroundOverlay} pointerEvents="none" />

          <LinearGradient
            colors={['transparent', `${ArenaColors.neutral.darkest}99`]}
            style={styles.radialOverlay}
            start={{ x: 0.5, y: 0.3 }}
            end={{ x: 0.5, y: 1.0 }}
            pointerEvents="none"
          />

          <LinearGradient
            colors={['transparent', `${ArenaColors.neutral.darkest}CC`]}
            locations={[0.7, 1.0]}
            style={styles.bottomOverlay}
            pointerEvents="none"
          />

          <View style={styles.bottomContent}>
            <View style={styles.titleContainer}>
              {titleLines.map(
                (
                  line:
                    | string
                    | number
                    | bigint
                    | boolean
                    | React.ReactElement<
                        unknown,
                        string | React.JSXElementConstructor<unknown>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | Promise<
                        | string
                        | number
                        | bigint
                        | boolean
                        | React.ReactPortal
                        | React.ReactElement<
                            unknown,
                            string | React.JSXElementConstructor<unknown>
                          >
                        | Iterable<React.ReactNode>
                        | null
                        | undefined
                      >
                    | null
                    | undefined,
                  index: React.Key | null | undefined
                ) => (
                  <Text
                    key={index}
                    variant="displayAccent"
                    testID={`welcome-title-${index}`}
                  >
                    {line}
                  </Text>
                )
              )}
            </View>
            <Text
              variant="bodyMuted"
              testID="welcome-subtitle"
              style={styles.subtitle}
            >
              {subtitle}
            </Text>

            <View style={styles.buttonContainer}>
              <Button
                variant="primary"
                size="md"
                onPress={handleGetStarted}
                testID="welcome-get-started"
                disableAnimations
                fullWidth
              >
                {startButtonTitle}
              </Button>

              <Button
                variant="secondary"
                size="md"
                onPress={handleLogin}
                testID="welcome-create-account"
                disableAnimations
                fullWidth
              >
                {createAccountButtonTitle}
              </Button>

              {isDev && (
                <Button
                  variant="ghost"
                  size="xs"
                  onPress={handleLogin}
                  testID="dev-docs-button-discrete"
                  disableAnimations
                >
                  LIB COMPONENTES
                </Button>
              )}
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};
