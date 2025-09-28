import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sports-loading';
import { useWelcomeScreen } from './useWelcomeScreen';
import { WelcomeScreenProps } from './typesWelcomeScreen';
import { styles } from './stylesWelcomeScreen';
export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const { isLoading, error, actions, isDev } = useWelcomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <LinearGradient
        colors={['#0F0F23', '#1A1A2E', '#16213E']}
        style={styles.content}
      >
        {/* Logo no topo */}
        <View style={styles.logoContainer}>
          <Text variant="displayPrimary" style={styles.logoText}>
            ARENA
          </Text>
          {isDev && (
            <Button
              variant="ghost"
              size="xs"
              onPress={actions.handleShowComponents}
            >
              📖
            </Button>
          )}
        </View>

        {/* Imagem do tenista no centro */}
        <View style={styles.playerImageContainer}>
          <View style={styles.playerImagePlaceholder}>
            <Text variant="displayPrimary" style={styles.playerImageEmoji}>
              🎾
            </Text>
          </View>
        </View>

        {/* Conteúdo inferior */}
        <View style={styles.bottomContent}>
          <Text variant="displayPrimary" style={styles.title}>
            Bem-vindo
          </Text>
          <Text variant="displayPrimary" style={styles.title}>
            ao Arena
          </Text>
          <Text variant="bodyPrimary" style={styles.subtitle}>
            Conecte-se com atletas, descubra eventos esportivos e leve sua
            performance para o próximo nível
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="lg"
              onPress={actions.handleGetStarted}
              disabled={isLoading}
              loading={isLoading}
              fullWidth
            >
              Entrar
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onPress={actions.handleCreateAccount}
              disabled={isLoading}
              fullWidth
            >
              Criar conta
            </Button>
          </View>

          {error && <Text variant="captionError">Erro: {error}</Text>}
        </View>

        {isLoading && (
          <View style={styles.loadingContainer}>
            <SportsLoading
              size="lg"
              animationSpeed="normal"
              testID="welcome-loading"
            />
          </View>
        )}
      </LinearGradient>
    </SafeAreaView>
  );
};
