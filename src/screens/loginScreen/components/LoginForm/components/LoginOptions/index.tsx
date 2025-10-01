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
          size="md"
          variant="primary"
          disabled={isLoading}
          label="Lembrar-me"
          testID="remember-me-checkbox"
        />

        <View style={styles.forgotPasswordLink}>
          <Link
            onPress={onForgotPassword}
            disabled={isLoading}
            variant="bodyPrimary"
            testID="forgot-password-link"
          >
            Esqueci minha senha
          </Link>
        </View>
      </View>
    );
  }
);
