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
      <Text variant="captionSecondary" style={styles.text}>
        {REGISTER_TEXTS.TERMS_PREFIX}{' '}
        <Link
          onPress={handleTermsPress}
          variant="captionSecondary"
          underline
          testID="terms-link"
        >
          {REGISTER_TEXTS.TERMS_LINK}
        </Link>{' '}
        {REGISTER_TEXTS.TERMS_SEPARATOR}{' '}
        <Link
          onPress={handlePrivacyPress}
          variant="captionSecondary"
          underline
          testID="privacy-link"
        >
          {REGISTER_TEXTS.PRIVACY_LINK}
        </Link>{' '}
        {REGISTER_TEXTS.TERMS_SUFFIX}
      </Text>
    </View>
  );
});
