import React from 'react';
import { View } from 'react-native';
import { Checkbox } from '@/components/ui/checkbox';
import { Link } from '@/components/ui/link';
import { LoginOptionsProps } from './typesLoginOptions';
import { styles } from './stylesLoginOptions';

export const LoginOptions: React.FC<LoginOptionsProps> = React.memo(
  ({ rememberMe, isLoading, onRememberMeToggle, onForgotPassword }) => {
    return (
      <View style={styles.container}>
        <Checkbox
          checked={rememberMe}
          onPress={onRememberMeToggle}
          size="sm"
          variant="primary"
          disabled={isLoading}
          label="Lembrar-me"
          testID="remember-me-checkbox"
        />

        <Link
          onPress={onForgotPassword}
          variant="secondary"
          size="sm"
          disabled={isLoading}
          style={styles.forgotPasswordButton}
          testID="forgot-password-link"
        >
          Esqueci minha senha
        </Link>
      </View>
    );
  }
);
