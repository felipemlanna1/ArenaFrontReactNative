import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { styles } from './stylesRegisterHeader';
import { RegisterHeaderProps } from './typesRegisterHeader';

export const RegisterHeader: React.FC<RegisterHeaderProps> = React.memo(() => {
  return (
    <View style={styles.container}>
      <Text variant="displayPrimary" style={styles.title}>
        Criar conta
      </Text>
      <Text variant="bodySecondary" style={styles.subtitle}>
        Preencha os dados para começar
      </Text>
    </View>
  );
});
