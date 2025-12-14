import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { LoginBackground } from './components/LoginBackground';
import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';
import { LoginActions } from './components/LoginActions';
import { SocialLoginButtons } from './components/SocialLoginButtons';
import { RegisterButton } from './components/SocialLoginButtons/components/RegisterButton';
import { useLoginScreen } from './useLoginScreen';
import { styles } from './stylesLoginScreen';
import { LoginScreenProps } from './typesLoginScreen';
import { ArenaSpacing } from '@/constants';

export const LoginScreen: React.FC<LoginScreenProps> = React.memo(
  ({ navigation }) => {
    const loginHook = useLoginScreen(navigation);
    const insets = useSafeAreaInsets();

    const formProps = {
      email: loginHook.formData.email,
      password: loginHook.formData.password,
      rememberMe: loginHook.rememberMe,
      errors: loginHook.errors,
      isLoading: loginHook.isLoading,
      onEmailChange: loginHook.handleEmailChange,
      onEmailBlur: loginHook.handleEmailBlur,
      onPasswordChange: loginHook.handlePasswordChange,
      onRememberMeToggle: loginHook.handleRememberMeToggle,
      onForgotPassword: loginHook.handleForgotPassword,
    };

    const actionProps = {
      isFormValid: loginHook.isFormValid,
      isLoading: loginHook.isLoading,
      onSubmit: loginHook.handleSubmit,
    };

    const socialProps = {
      isLoading: loginHook.isLoading,
      onGoogleLogin: loginHook.handleGoogleLogin,
      onAppleLogin: loginHook.handleAppleLogin,
    };

    return (
      <View style={styles.container}>
        <LoginBackground>
          <ArenaKeyboardAwareScrollView
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: ArenaSpacing['6xl'] + (insets.bottom || 0) },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bottomOffset={60}
          >
            <LoginHeader />
            <LoginForm {...formProps} />
            <LoginActions {...actionProps} />
            <SocialLoginButtons {...socialProps} />
          </ArenaKeyboardAwareScrollView>

          <View
            style={[
              styles.registerButtonContainer,
              { bottom: ArenaSpacing.xs + (insets.bottom || 0) },
            ]}
          >
            <RegisterButton
              isLoading={loginHook.isLoading}
              onPress={loginHook.handleRegister}
            />
          </View>
        </LoginBackground>
      </View>
    );
  }
);
