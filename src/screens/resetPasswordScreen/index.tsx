import React from 'react';
import { View, Animated } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AppHeader } from '@/components/ui/appHeader';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { ArenaColors } from '@/constants';
import { RESET_PASSWORD_TEXTS } from '@/constants/texts';
import { useResetPasswordScreen } from './useResetPasswordScreen';
import { styles } from './stylesResetPasswordScreen';
import { ResetPasswordScreenProps } from './typesResetPasswordScreen';

const PasswordVisibilityIcon: React.FC<{
  visible: boolean;
  onPress: () => void;
}> = ({ visible, onPress }) => (
  <Ionicons
    name={visible ? 'eye-off-outline' : 'eye-outline'}
    size={24}
    color={ArenaColors.neutral.medium}
    onPress={onPress}
  />
);

export const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({
  navigation,
  route,
}) => {
  const hook = useResetPasswordScreen(navigation, route);

  const getStrengthBarStyle = () => {
    switch (hook.passwordStrength) {
      case 'weak':
        return styles.strengthBarWeak;
      case 'medium':
        return styles.strengthBarMedium;
      case 'good':
        return styles.strengthBarGood;
      case 'strong':
        return styles.strengthBarStrong;
      default:
        return styles.strengthBarWeak;
    }
  };

  const getStrengthText = () => {
    switch (hook.passwordStrength) {
      case 'weak':
        return RESET_PASSWORD_TEXTS.STRENGTH.WEAK;
      case 'medium':
        return RESET_PASSWORD_TEXTS.STRENGTH.MEDIUM;
      case 'good':
        return RESET_PASSWORD_TEXTS.STRENGTH.GOOD;
      case 'strong':
        return RESET_PASSWORD_TEXTS.STRENGTH.STRONG;
      default:
        return '';
    }
  };

  if (hook.isSuccess) {
    return (
      <View style={styles.container}>
        <View style={styles.scrollContent}>
          <View style={styles.header}>
            <Ionicons
              name="checkmark-circle"
              size={64}
              color={ArenaColors.semantic.success}
              style={styles.successIcon}
            />
            <Text variant="headingPrimary" style={styles.title}>
              {RESET_PASSWORD_TEXTS.SUCCESS_MESSAGE}
            </Text>
            <Text variant="bodySecondary" style={styles.subtitle}>
              {RESET_PASSWORD_TEXTS.REDIRECTING}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        variant="secondaryCentered"
        title={RESET_PASSWORD_TEXTS.TITLE}
        showBackButton
        onBackPress={hook.handleBackToLogin}
        testID="reset-password-header"
      />
      <ArenaKeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bottomOffset={60}
      >
        <View style={styles.subtitleContainer}>
          <Text variant="bodySecondary" style={styles.subtitle}>
            {RESET_PASSWORD_TEXTS.SUBTITLE}
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Input
            label={RESET_PASSWORD_TEXTS.PASSWORD_LABEL}
            placeholder={RESET_PASSWORD_TEXTS.PASSWORD_PLACEHOLDER}
            value={hook.formData.password}
            onChangeText={hook.handlePasswordChange}
            onBlur={hook.handlePasswordBlur}
            error={hook.errors.password}
            secureTextEntry={!hook.showPassword}
            rightIcon={() => (
              <PasswordVisibilityIcon
                visible={hook.showPassword}
                onPress={hook.toggleShowPassword}
              />
            )}
            autoComplete="new-password"
            testID="reset-password-password-input"
          />

          <Input
            label={RESET_PASSWORD_TEXTS.CONFIRM_PASSWORD_LABEL}
            placeholder={RESET_PASSWORD_TEXTS.CONFIRM_PASSWORD_PLACEHOLDER}
            value={hook.formData.confirmPassword}
            onChangeText={hook.handleConfirmPasswordChange}
            onBlur={hook.handleConfirmPasswordBlur}
            error={hook.errors.confirmPassword}
            secureTextEntry={!hook.showConfirmPassword}
            rightIcon={() => (
              <PasswordVisibilityIcon
                visible={hook.showConfirmPassword}
                onPress={hook.toggleShowConfirmPassword}
              />
            )}
            autoComplete="new-password"
            testID="reset-password-confirm-password-input"
          />
        </View>

        {hook.formData.password.length > 0 && (
          <>
            <View style={styles.strengthContainer}>
              <Text variant="labelPrimary" style={styles.strengthLabel}>
                Força da senha: {getStrengthText()}
              </Text>
              <View style={styles.strengthBarContainer}>
                <Animated.View
                  style={[
                    styles.strengthBar,
                    getStrengthBarStyle(),
                    { width: `${hook.passwordStrengthPercentage}%` },
                  ]}
                />
              </View>
            </View>

            <View style={styles.requirementsContainer}>
              <Text variant="labelPrimary" style={styles.requirementsTitle}>
                {RESET_PASSWORD_TEXTS.REQUIREMENTS_TITLE}
              </Text>
              <View style={styles.requirementsList}>
                {hook.passwordRequirements.map(req => (
                  <View key={req.id} style={styles.requirementItem}>
                    <Ionicons
                      name={req.isValid ? 'checkmark-circle' : 'close-circle'}
                      size={20}
                      color={
                        req.isValid
                          ? ArenaColors.semantic.success
                          : ArenaColors.neutral.medium
                      }
                    />
                    <Text
                      variant={req.isValid ? 'bodyPrimary' : 'bodySecondary'}
                    >
                      {req.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </>
        )}

        <View style={styles.actionsContainer}>
          <Button
            variant="primary"
            size="lg"
            onPress={hook.handleSubmit}
            loading={hook.isLoading}
            disabled={
              hook.isLoading ||
              !hook.formData.password ||
              !hook.formData.confirmPassword ||
              hook.passwordStrengthPercentage < 100
            }
            testID="reset-password-submit-button"
          >
            {RESET_PASSWORD_TEXTS.RESET_BUTTON}
          </Button>

          <Button
            variant="ghost"
            size="md"
            onPress={hook.handleBackToLogin}
            disabled={hook.isLoading}
            testID="reset-password-back-button"
          >
            {RESET_PASSWORD_TEXTS.BACK_TO_LOGIN}
          </Button>
        </View>
      </ArenaKeyboardAwareScrollView>
    </View>
  );
};
