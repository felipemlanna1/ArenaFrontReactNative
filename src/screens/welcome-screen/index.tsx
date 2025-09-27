// Arena Welcome Screen - Componente principal
import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/Text';
import { useWelcomeScreen } from './useWelcomeScreen';
import { WelcomeScreenProps } from './typesWelcomeScreen';
import { styles } from './stylesWelcomeScreen';

export const WelcomeScreen: React.FC<WelcomeScreenProps> = () => {
  const { isLoading, error, actions } = useWelcomeScreen();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" backgroundColor={ArenaColors.neutral.darkest} />

      <View style={styles.content}>
        {/* Logo e Tagline */}
        <View style={styles.logoContainer}>
          <Text variant="displayAccent">ARENA</Text>
          <Text variant="captionSecondary">O futuro do esporte</Text>
        </View>

        {/* Mensagem de Boas-vindas */}
        <View style={styles.welcomeContainer}>
          <Text variant="headingPrimary">Bem-vindo</Text>
          <Text variant="bodySecondary" style={styles.welcomeDescription}>
            Conecte-se com atletas, descubra eventos esportivos e leve sua
            performance para o próximo nível. A Arena é onde campeões nascem.
          </Text>
        </View>

        {/* Botões de Ação */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.getStartedButton,
              isLoading && styles.getStartedButtonDisabled,
            ]}
            onPress={actions.handleGetStarted}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator
                size="small"
                color={ArenaColors.neutral.light}
              />
            ) : (
              <Text variant="labelPrimary">
                COMEÇAR
              </Text>
            )}
          </TouchableOpacity>

          {/* Botão para ver componentes */}
          <TouchableOpacity
            style={[styles.secondaryButton]}
            onPress={actions.handleShowComponents}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Text variant="labelSecondary">
              VER COMPONENTES
            </Text>
          </TouchableOpacity>
        </View>

        {/* Mensagem de Erro (se houver) */}
        {error && <Text variant="bodyError">Erro: {error}</Text>}
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text variant="captionMuted">
          Arena v1.0.0 - Desenvolvido com React Native
        </Text>
      </View>

      {/* Loading Overlay */}
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ArenaColors.brand.primary} />
          <Text variant="bodyPrimary">Carregando...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};
