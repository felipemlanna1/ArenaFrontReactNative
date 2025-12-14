import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { RegisterBackground } from './components/RegisterBackground';
import { RegisterHeader } from './components/RegisterHeader';
import { RegisterForm } from './components/RegisterForm';
import { RegisterActions } from './components/RegisterActions';
import { RegisterTerms } from './components/RegisterTerms';
import { RegisterFooter } from './components/RegisterFooter';
import { useRegisterScreen } from './useRegisterScreen';
import { styles } from './stylesRegisterScreen';
import { RegisterScreenProps } from './typesRegisterScreen';
import { ArenaSpacing } from '@/constants';

export const RegisterScreen: React.FC<RegisterScreenProps> = React.memo(
  ({ navigation }) => {
    const registerHook = useRegisterScreen(navigation);
    const insets = useSafeAreaInsets();

    const formProps = {
      formData: registerHook.formData,
      errors: registerHook.errors,
      isLoading: registerHook.isLoading,
      onFullNameChange: registerHook.handleFullNameChange,
      onFullNameBlur: registerHook.handleFullNameBlur,
      onUsernameChange: registerHook.handleUsernameChange,
      onUsernameBlur: registerHook.handleUsernameBlur,
      onEmailChange: registerHook.handleEmailChange,
      onEmailBlur: registerHook.handleEmailBlur,
      onPasswordChange: registerHook.handlePasswordChange,
      onPasswordBlur: registerHook.handlePasswordBlur,
      onConfirmPasswordChange: registerHook.handleConfirmPasswordChange,
      onConfirmPasswordBlur: registerHook.handleConfirmPasswordBlur,
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
        <RegisterBackground>
          <ArenaKeyboardAwareScrollView
            contentContainerStyle={[
              styles.scrollContent,
              { paddingBottom: ArenaSpacing['6xl'] + (insets.bottom || 0) },
            ]}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bottomOffset={60}
          >
            <RegisterHeader />
            <RegisterForm {...formProps} />
            <RegisterTerms />
            <RegisterActions {...actionProps} />
            <RegisterFooter {...footerProps} />
          </ArenaKeyboardAwareScrollView>
        </RegisterBackground>
      </View>
    );
  }
);
