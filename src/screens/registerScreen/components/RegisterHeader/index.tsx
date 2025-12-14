import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { styles } from './stylesRegisterHeader';
import { RegisterHeaderProps } from './typesRegisterHeader';

export const RegisterHeader: React.FC<RegisterHeaderProps> = React.memo(() => {
  return (
    <View style={styles.container}>
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
        <Text variant="headingSecondary" style={styles.title}>
          Crie sua conta
        </Text>
        <Text variant="captionSecondary" style={styles.subtitle}>
          E faça parte de uma comunidade de atletas
        </Text>
      </View>
    </View>
  );
});
