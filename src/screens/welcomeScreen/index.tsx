import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';

import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { useWelcomeScreen } from './useWelcomeScreen';
import { styles } from './stylesWelcomeScreen';

export const WelcomeScreen: React.FC = () => {
  const {
    handleGetStarted,
    handleCreateAccount,
    handleGoToShowcase,
    isDev,
    titleLines,
    subtitle,
    startButtonTitle,
    createAccountButtonTitle,
  } = useWelcomeScreen();

  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <OptimizedImage
        source={require('@/assets/players/bgWelcome.jpg')}
        style={styles.backgroundImage}
        contentFit="cover"
        contentPosition="center"
        priority="high"
        showLoading={false}
      />

      <LinearGradient
        colors={['#000000', 'rgba(0, 0, 0, 0.509615)', 'rgba(0, 0, 0, 0)']}
        locations={[0, 0.75, 1]}
        style={styles.gradientOverlay}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <OptimizedImage
            source={require('@/assets/images/logos/L1.svg')}
            style={styles.logo}
            contentFit="contain"
            priority="high"
            showLoading={false}
          />
        </View>

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
                  style={styles.titleText}
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
            <View style={styles.buttonRow}>
              <View style={styles.buttonHalf}>
                <Button
                  variant="secondary"
                  size="md"
                  onPress={handleGetStarted}
                  testID="welcome-get-started"
                  disableAnimations
                  rounded
                  fullWidth
                >
                  {startButtonTitle}
                </Button>
              </View>

              <View style={styles.buttonHalf}>
                <Button
                  variant="outline-light"
                  size="md"
                  onPress={handleCreateAccount}
                  testID="welcome-create-account"
                  disableAnimations
                  rounded
                  fullWidth
                >
                  {createAccountButtonTitle}
                </Button>
              </View>
            </View>

            {isDev && (
              <Button
                variant="ghost"
                size="xs"
                onPress={handleGoToShowcase}
                testID="dev-docs-button-discrete"
                disableAnimations
                fullWidth
              >
                LIB COMPONENTES
              </Button>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
