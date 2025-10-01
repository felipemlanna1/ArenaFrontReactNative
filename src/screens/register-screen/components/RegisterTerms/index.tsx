import React from 'react';
import { View, Linking } from 'react-native';
import { Text } from '@/components/text';
import { Link } from '@/components/ui/link';
import { styles } from './stylesRegisterTerms';

export const RegisterTerms: React.FC = React.memo(() => {
  const handleTermsPress = React.useCallback(() => {
    Linking.openURL('https://arena.com/termos-de-uso');
  }, []);

  const handlePrivacyPress = React.useCallback(() => {
    Linking.openURL('https://arena.com/politica-de-privacidade');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Ao me cadastrar, eu aceito os{' '}
        <Link
          onPress={handleTermsPress}
          variant="primary"
          size="sm"
          underline
          testID="terms-link"
        >
          Termos de Uso
        </Link>
        {' e '}
        <Link
          onPress={handlePrivacyPress}
          variant="primary"
          size="sm"
          underline
          testID="privacy-link"
        >
          Política de Privacidade
        </Link>
        {' da Arena'}
      </Text>
    </View>
  );
});
