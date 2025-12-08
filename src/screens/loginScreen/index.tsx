import React from 'react';
import { View } from 'react-native';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { Symbol } from '@/components/ui/symbol';
import { LoginBackground } from './components/LoginBackground';
import { LoginHeader } from './components/LoginHeader';
import { LoginForm } from './components/LoginForm';
import { LoginActions } from './components/LoginActions';
import { SocialLoginButtons } from './components/SocialLoginButtons';
import { useLoginScreen } from './useLoginScreen';
import { styles } from './stylesLoginScreen';
import { LoginScreenProps } from './typesLoginScreen';

export const LoginScreen: React.FC<LoginScreenProps> = React.memo(
  ({ navigation }) => {
    const loginHook = useLoginScreen(navigation);

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
      onRegister: loginHook.handleRegister,
    };

    return (
      <View style={styles.container}>
        <View style={styles.topSymbol}>
          <Symbol size="md" variant="variant1" testID="login-arena-symbol" />
        </View>
        <LoginBackground>
          <ArenaKeyboardAwareScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bottomOffset={60}
          >
            <LoginHeader />
            <LoginForm {...formProps} />
            <LoginActions {...actionProps} />
            <SocialLoginButtons {...socialProps} />
          </ArenaKeyboardAwareScrollView>
        </LoginBackground>
      </View>
    );
  }
);
