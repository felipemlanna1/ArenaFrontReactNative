import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/ui/appHeader';
import { OTPInput } from '@/components/ui/otp-input';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { ArenaColors } from '@/constants';
import { VERIFY_CODE_TEXTS } from '@/constants/texts';
import { useVerifyCodeScreen } from './useVerifyCodeScreen';
import { styles } from './stylesVerifyCodeScreen';
import { VerifyCodeScreenProps } from './typesVerifyCodeScreen';

export const VerifyCodeScreen: React.FC<VerifyCodeScreenProps> = ({
  navigation,
  route,
}) => {
  const hook = useVerifyCodeScreen(navigation, route);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppHeader
        variant="secondaryCentered"
        title={VERIFY_CODE_TEXTS.TITLE}
        showBackButton
        onBackPress={hook.handleBack}
        testID="verify-code-header"
      />
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={60}
      >
        <View style={styles.subtitleContainer}>
          <Text variant="bodySecondary" style={styles.subtitle}>
            {VERIFY_CODE_TEXTS.SUBTITLE}
          </Text>
          <Text variant="bodyPrimary" style={styles.email}>
            {hook.email}
          </Text>
        </View>

        <View style={styles.otpContainer}>
          <OTPInput
            value={hook.formData.code}
            onChange={hook.handleCodeChange}
            error={hook.errors.code}
            disabled={hook.isLoading || hook.timer.isExpired}
            testID="verify-code-otp-input"
          />
        </View>

        {!hook.timer.isExpired && (
          <View style={styles.timerContainer}>
            <Ionicons
              name="time-outline"
              size={20}
              color={ArenaColors.neutral.medium}
              style={styles.timerIcon}
            />
            <Text variant="bodySecondary">
              {VERIFY_CODE_TEXTS.TIMER_TEXT}:{' '}
            </Text>
            <Text variant="bodyPrimary">{hook.timer.formattedTime}</Text>
          </View>
        )}

        {hook.timer.isExpired && (
          <Text variant="bodyError" style={styles.resendCooldown}>
            {VERIFY_CODE_TEXTS.CODE_EXPIRED}
          </Text>
        )}

        <View style={styles.actionsContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={() => hook.handleVerify()}
            loading={hook.isLoading}
            disabled={
              hook.isLoading ||
              hook.formData.code.length !== 6 ||
              hook.timer.isExpired
            }
            testID="verify-code-submit-button"
          >
            {VERIFY_CODE_TEXTS.VERIFY_BUTTON}
          </Button>

          <Button
            variant="secondary"
            size="md"
            onPress={hook.handleResend}
            loading={hook.isResending}
            disabled={!hook.canResend || hook.isResending || hook.isLoading}
            testID="verify-code-resend-button"
          >
            {VERIFY_CODE_TEXTS.RESEND_BUTTON}
          </Button>
        </View>
      </ArenaKeyboardAwareScrollView>
    </SafeAreaView>
  );
};
