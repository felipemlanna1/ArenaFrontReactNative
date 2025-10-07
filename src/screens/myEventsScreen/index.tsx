import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useMyEventsScreen } from './useMyEventsScreen';
import { MyEventsScreenProps } from './typesMyEventsScreen';
import { styles } from './stylesMyEventsScreen';

export const MyEventsScreen: React.FC<MyEventsScreenProps> = ({
  testID = 'my-events-screen',
}) => {
  const { isLoading } = useMyEventsScreen();

  if (isLoading) {
    return (
      <AppLayout>
        <View style={styles.container}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout testID={testID}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons
            name="calendar-outline"
            size={64}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="headingPrimary" style={styles.title}>
            Meus Eventos
          </Text>
          <Text variant="bodySecondary" style={styles.subtitle}>
            Eventos que você criou ou está participando
          </Text>
        </View>
      </View>
    </AppLayout>
  );
};
