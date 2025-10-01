import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { Link } from '@/components/ui/link';
import { styles } from './stylesRegisterFooter';
import { RegisterFooterProps } from './typesRegisterFooter';

export const RegisterFooter: React.FC<RegisterFooterProps> = React.memo(
  ({ onLoginPress }) => {
    return (
      <View style={styles.container}>
        <Text variant="bodySecondary" style={styles.loginText}>
          Já tem uma conta?{' '}
          <Link
            onPress={onLoginPress}
            variant="primary"
            size="md"
            testID="register-login-link"
          >
            Entrar
          </Link>
        </Text>
      </View>
    );
  }
);
