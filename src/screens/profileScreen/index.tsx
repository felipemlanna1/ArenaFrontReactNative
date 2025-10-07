import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useProfileScreen } from './useProfileScreen';
import { ProfileScreenProps } from './typesProfileScreen';
import { styles } from './stylesProfileScreen';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  testID = 'profile-screen',
}) => {
  const { isLoading, handleLogout } = useProfileScreen();

  if (isLoading) {
    return (
      <AppLayout onLogout={handleLogout}>
        <View style={styles.container}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout onLogout={handleLogout} testID={testID}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons
            name="person-outline"
            size={64}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="headingPrimary" style={styles.title}>
            Meu Perfil
          </Text>
          <Text variant="bodySecondary" style={styles.subtitle}>
            Gerencie suas informações e configurações
          </Text>
        </View>
      </View>
    </AppLayout>
  );
};
