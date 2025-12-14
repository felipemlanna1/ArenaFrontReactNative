import React from 'react';
import { View, Platform } from 'react-native';
import { Divider } from './components/Divider';
import { GoogleLoginButton } from './components/GoogleLoginButton';
import { AppleLoginButton } from './components/AppleLoginButton';
import { SocialLoginButtonsProps } from './typesSocialLoginButtons';
import { styles } from './stylesSocialLoginButtons';

export const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = React.memo(
  ({ isLoading, onGoogleLogin, onAppleLogin }) => {
    return (
      <View style={styles.container}>
        <Divider text="ou" />

        <View style={styles.socialButtonsRow}>
          <View style={styles.socialButton}>
            <GoogleLoginButton isLoading={isLoading} onPress={onGoogleLogin} />
          </View>
          {Platform.OS === 'ios' && (
            <View style={styles.socialButton}>
              <AppleLoginButton isLoading={isLoading} onPress={onAppleLogin} />
            </View>
          )}
        </View>
      </View>
    );
  }
);
