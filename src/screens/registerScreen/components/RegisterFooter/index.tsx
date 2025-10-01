import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { styles } from './stylesRegisterFooter';
import { RegisterFooterProps } from './typesRegisterFooter';

export const RegisterFooter: React.FC<RegisterFooterProps> = React.memo(
  ({ onLoginPress }) => {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text variant="bodySecondary" style={styles.loginText}>
            Já tem uma conta?{' '}
          </Text>
          <Link
            onPress={onLoginPress}
            variant="bodySecondary"
            testID="register-login-link"
          >
            Entrar
          </Link>
        </View>
      </View>
    );
  }
);
