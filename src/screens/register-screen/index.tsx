import React from 'react';
import { View } from 'react-native';
import { Symbol } from '@/components/ui/symbol';
import { RegisterBackground } from './components/RegisterBackground';
import { LoginLayout } from '../login-screen/components/LoginLayout';
import { RegisterHeader } from './components/RegisterHeader';
import { RegisterForm } from './components/RegisterForm';
import { RegisterActions } from './components/RegisterActions';
import { RegisterTerms } from './components/RegisterTerms';
import { RegisterFooter } from './components/RegisterFooter';
import { useRegisterScreen } from './useRegisterScreen';
import { styles } from './stylesRegisterScreen';
import { RegisterScreenProps } from './typesRegisterScreen';

export const RegisterScreen: React.FC<RegisterScreenProps> = React.memo(
  ({ navigation }) => {
    const registerHook = useRegisterScreen(navigation);

    const formProps = {
      formData: registerHook.formData,
      errors: registerHook.errors,
      isLoading: registerHook.isLoading,
      onFirstNameChange: registerHook.handleFirstNameChange,
      onLastNameChange: registerHook.handleLastNameChange,
      onUsernameChange: registerHook.handleUsernameChange,
      onEmailChange: registerHook.handleEmailChange,
      onPasswordChange: registerHook.handlePasswordChange,
      onConfirmPasswordChange: registerHook.handleConfirmPasswordChange,
    };

    const actionProps = {
      isFormValid: registerHook.isFormValid,
      isLoading: registerHook.isLoading,
      onSubmit: registerHook.handleSubmit,
    };

    const footerProps = {
      onLoginPress: registerHook.handleLoginPress,
    };

    return (
      <View style={styles.container}>
        <View style={styles.topSymbol}>
          <Symbol size="md" variant="variant1" testID="register-arena-symbol" />
        </View>
        <RegisterBackground>
          <LoginLayout>
            <RegisterHeader />
            <RegisterForm {...formProps} />
            <RegisterActions {...actionProps} />
            <RegisterTerms />
            <RegisterFooter {...footerProps} />
          </LoginLayout>
        </RegisterBackground>
      </View>
    );
  }
);
