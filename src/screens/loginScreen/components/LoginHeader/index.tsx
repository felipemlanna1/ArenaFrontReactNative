import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { LoginHeaderProps } from './typesLoginHeader';
import { useLoginHeader } from './useLoginHeader';
import { styles } from './stylesLoginHeader';

export const LoginHeader: React.FC<LoginHeaderProps> = React.memo(() => {
  const { title, subtitle } = useLoginHeader();

  return (
    <View style={styles.container} testID="login-header">
      <View style={styles.logoContainer}>
        <OptimizedImage
          source={require('@/assets/images/logos/L1.svg')}
          style={styles.logo}
          contentFit="contain"
          priority="high"
          showLoading={false}
        />
      </View>

      <View style={styles.textContainer}>
        <Text
          variant="headingSecondary"
          style={styles.title}
          testID="login-header-title"
        >
          {title}
        </Text>

        <Text
          variant="captionSecondary"
          style={styles.subtitle}
          testID="login-header-subtitle"
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
});
