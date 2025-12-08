import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { AppHeader } from '@/components/ui/header';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { ArenaColors } from '@/constants';
import { useVerifyEmailScreen } from './useVerifyEmailScreen';
import { styles } from './stylesVerifyEmailScreen';

export const VerifyEmailScreen: React.FC = () => {
  const {
    code,
    setCode,
    isLoading,
    isResending,
    error,
    timer,
    canResend,
    handleVerifyEmail,
    handleResendCode,
  } = useVerifyEmailScreen();

  const formatTimer = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <AppHeader variant="secondaryCentered" title="Verificar Email" />
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader variant="secondaryCentered" title="Verificar Email" />
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={60}
      >
        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="mail-outline"
              size={64}
              color={ArenaColors.brand.primary}
            />
          </View>

          <View style={styles.titleContainer}>
            <Text variant="titlePrimary" style={{ textAlign: 'center' }}>
              Verificar Email
            </Text>
            <Text variant="bodySecondary" style={{ textAlign: 'center' }}>
              Digite o código de 6 dígitos enviado para seu email
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.codeInputContainer}>
            <Input
              value={code}
              onChangeText={(text) => setCode(text.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              keyboardType="number-pad"
              maxLength={6}
              style={styles.codeInput}
              autoFocus
            />
          </View>

          {timer > 0 && (
            <View style={styles.timerContainer}>
              <Ionicons
                name="time-outline"
                size={16}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionSecondary">
                Código expira em {formatTimer(timer)}
              </Text>
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Ionicons
                name="alert-circle"
                size={20}
                color={ArenaColors.semantic.error}
              />
              <Text variant="errorPrimary" style={{ flex: 1 }}>
                {error}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={handleVerifyEmail}
            disabled={code.length !== 6 || isLoading}
          >
            Verificar Email
          </Button>

          <View style={styles.resendContainer}>
            <Text variant="bodySecondary">Não recebeu o código?</Text>
            <Button
              variant="link"
              size="md"
              onPress={handleResendCode}
              disabled={!canResend || isResending}
            >
              {isResending ? 'Reenviando...' : 'Reenviar código'}
            </Button>
          </View>
        </View>

        <View style={styles.instructionsContainer}>
          <Text variant="captionSecondary" style={{ textAlign: 'center' }}>
            Verifique sua caixa de entrada e spam. O código é válido por 24
            horas.
          </Text>
        </View>
      </ArenaKeyboardAwareScrollView>
    </View>
  );
};
