import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { LoginHeaderProps } from './typesLoginHeader';
import { useLoginHeader } from './useLoginHeader';
import { styles } from './stylesLoginHeader';

export const LoginHeader: React.FC<LoginHeaderProps> = React.memo(() => {
  const { title, subtitle } = useLoginHeader();

  return (
    <View style={styles.container} testID="login-header">
      <View style={styles.textContainer}>
        <Text
          variant="displayAccent"
          style={styles.subtitleOverride}
          testID="login-header-title"
        >
          {title}
        </Text>
        <Text
          variant="bodySecondary"
          style={styles.subtitleOverride}
          testID="login-header-subtitle"
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
});
