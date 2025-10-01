import React from 'react';
import { View, Linking } from 'react-native';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { REGISTER_TEXTS } from '@/constants/texts';
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
      <View style={styles.textRow}>
        <Text variant="bodySecondary" style={styles.text}>
          {REGISTER_TEXTS.TERMS_PREFIX}{' '}
        </Text>
        <Link
          onPress={handleTermsPress}
          variant="bodySecondary"
          underline
          testID="terms-link"
          style={styles.link}
        >
          {REGISTER_TEXTS.TERMS_LINK}
        </Link>
        <Text variant="bodySecondary" style={styles.text}>
          {' '}
          {REGISTER_TEXTS.TERMS_SEPARATOR}{' '}
        </Text>
        <Link
          onPress={handlePrivacyPress}
          variant="bodySecondary"
          underline
          testID="privacy-link"
          style={styles.link}
        >
          {REGISTER_TEXTS.PRIVACY_LINK}
        </Link>
        <Text variant="bodySecondary" style={styles.text}>
          {' '}
          {REGISTER_TEXTS.TERMS_SUFFIX}
        </Text>
      </View>
    </View>
  );
});
