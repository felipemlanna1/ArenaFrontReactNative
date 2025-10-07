import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useNotificationsScreen } from './useNotificationsScreen';
import { NotificationsScreenProps } from './typesNotificationsScreen';
import { styles } from './stylesNotificationsScreen';

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  testID = 'notifications-screen',
}) => {
  const { isLoading, unreadCount } = useNotificationsScreen();

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
            name="notifications-outline"
            size={64}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="headingPrimary" style={styles.title}>
            Notificações
          </Text>
          <Text variant="bodySecondary" style={styles.subtitle}>
            {unreadCount > 0
              ? `Você tem ${unreadCount} notificações não lidas`
              : 'Nenhuma notificação no momento'}
          </Text>
        </View>
      </View>
    </AppLayout>
  );
};
