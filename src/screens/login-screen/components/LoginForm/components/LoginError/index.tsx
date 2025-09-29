import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { LoginErrorProps } from './typesLoginError';
import { styles } from './stylesLoginError';

export const LoginError: React.FC<LoginErrorProps> = React.memo(({ error }) => {
  if (!error) return null;

  return (
    <View style={styles.container}>
      <Text variant="captionSecondary" style={styles.errorText}>
        {error}
      </Text>
    </View>
  );
});
