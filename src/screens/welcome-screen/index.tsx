import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import { useWelcomeScreen } from './useWelcomeScreen';
import { WelcomeScreenProps } from './typesWelcomeScreen';
import { styles } from './stylesWelcomeScreen';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const { isLoading, error, actions } = useWelcomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={ArenaColors.neutral.darkest} />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text variant="displayAccent">ARENA</Text>
          <Text variant="captionSecondary">O futuro do esporte</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text variant="headingPrimary">Bem-vindo</Text>
          <Text variant="bodySecondary" style={styles.welcomeDescription}>
            Conecte-se com atletas, descubra eventos esportivos e leve sua
            performance para o próximo nível. A Arena é onde campeões nascem.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={actions.handleGetStarted}
            disabled={isLoading}
            loading={isLoading}
            loadingText="CARREGANDO..."
            fullWidth
            disableAnimations
          >
            COMEÇAR
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onPress={actions.handleShowComponents}
            disabled={isLoading}
            fullWidth
            disableAnimations
          >
            VER COMPONENTES
          </Button>
        </View>

        {error && <Text variant="bodyError">Erro: {error}</Text>}
      </View>

      <View style={styles.footer}>
        <Text variant="captionMuted">
          Arena v1.0.0 - Desenvolvido com React Native
        </Text>
      </View>

      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ArenaColors.brand.primary} />
          <Text variant="bodyPrimary">Carregando...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
