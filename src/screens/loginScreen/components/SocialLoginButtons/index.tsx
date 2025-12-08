import React from 'react';
import { View, Platform } from 'react-native';
import { Divider } from './components/Divider';
import { GoogleLoginButton } from './components/GoogleLoginButton';
import { AppleLoginButton } from './components/AppleLoginButton';
import { RegisterButton } from './components/RegisterButton';
import { SocialLoginButtonsProps } from './typesSocialLoginButtons';
import { styles } from './stylesSocialLoginButtons';

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = React.memo(
  ({ isLoading, onGoogleLogin, onAppleLogin, onRegister }) => {
    return (
      <View style={styles.container}>
        <Divider text="ou" />
        <GoogleLoginButton isLoading={isLoading} onPress={onGoogleLogin} />
        {Platform.OS === 'ios' && (
          <AppleLoginButton isLoading={isLoading} onPress={onAppleLogin} />
        )}
        <RegisterButton isLoading={isLoading} onPress={onRegister} />
      </View>
    );
  }
);
