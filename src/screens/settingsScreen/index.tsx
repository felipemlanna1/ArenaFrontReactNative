import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { styles } from './stylesSettingsScreen';
import { SettingsScreenProps } from './typesSettingsScreen';

export const SettingsScreen: React.FC<SettingsScreenProps> = () => {
  return (
    <AppLayout>
      <View style={styles.container} testID="settings-screen">
        <View style={styles.iconContainer}>
          <Ionicons
            name="settings-outline"
            size={64}
            color={ArenaColors.neutral.medium}
          />
        </View>

        <Text variant="headingPrimary" style={styles.title}>
          Configurações
        </Text>

        <Text variant="bodySecondary" style={styles.message}>
          Esta tela está em desenvolvimento e estará disponível em breve.
        </Text>

        <Text variant="captionSecondary" style={styles.caption}>
          Aqui você poderá gerenciar suas preferências, notificações, privacidade
          e outras configurações do aplicativo.
        </Text>
      </View>
    </AppLayout>
  );
};
