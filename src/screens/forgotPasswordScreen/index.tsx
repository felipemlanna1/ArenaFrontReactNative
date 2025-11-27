import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/ui/appHeader';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { FORGOT_PASSWORD_TEXTS } from '@/constants/texts';
import { useForgotPasswordScreen } from './useForgotPasswordScreen';
import { styles } from './stylesForgotPasswordScreen';
import { ForgotPasswordScreenProps } from './typesForgotPasswordScreen';

export const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const hook = useForgotPasswordScreen(navigation);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        variant="secondaryCentered"
        title={FORGOT_PASSWORD_TEXTS.TITLE}
        showBackButton
        onBackPress={hook.handleBackPress}
        testID="forgot-password-header"
      />
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={60}
      >
        <View style={styles.subtitleContainer}>
          <Text variant="bodySecondary" style={styles.subtitle}>
            {FORGOT_PASSWORD_TEXTS.SUBTITLE}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label={FORGOT_PASSWORD_TEXTS.EMAIL_LABEL}
            placeholder={FORGOT_PASSWORD_TEXTS.EMAIL_PLACEHOLDER}
            value={hook.formData.email}
            onChangeText={hook.handleEmailChange}
            onBlur={hook.handleEmailBlur}
            error={hook.errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoFocus
            testID="forgot-password-email-input"
          />
        </View>

        <View style={styles.actionsContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={hook.handleSubmit}
            loading={hook.isLoading}
            disabled={hook.isLoading || !hook.formData.email.trim()}
            testID="forgot-password-submit-button"
          >
            {FORGOT_PASSWORD_TEXTS.SEND_BUTTON}
          </Button>

          <Button
            variant="ghost"
            size="md"
            onPress={hook.handleBackPress}
            disabled={hook.isLoading}
            testID="forgot-password-back-button"
          >
            {FORGOT_PASSWORD_TEXTS.BACK_TO_LOGIN}
          </Button>
        </View>
      </ArenaKeyboardAwareScrollView>
    </SafeAreaView>
  );
};
