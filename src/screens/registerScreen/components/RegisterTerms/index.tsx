import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { Link } from '@/components/ui/link';
import { REGISTER_TEXTS } from '@/constants/texts';
import { styles } from './stylesRegisterTerms';

export const RegisterTerms: React.FC = React.memo(() => {
  const navigation = useNavigation();

  const handleTermsPress = React.useCallback(() => {
    navigation.navigate('Terms' as never);
  }, [navigation]);

  const handlePrivacyPress = React.useCallback(() => {
    navigation.navigate('Privacy' as never);
  }, [navigation]);

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
