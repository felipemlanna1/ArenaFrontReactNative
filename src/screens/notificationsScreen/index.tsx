import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useNotificationsScreen } from './useNotificationsScreen';
import { NotificationsScreenProps } from './typesNotificationsScreen';
import { NotificationItem } from './components/NotificationItem';
import { Notification } from '@/services/notifications/typesNotifications';
import { styles } from './stylesNotificationsScreen';

export const NotificationsScreen: React.FC<NotificationsScreenProps> = ({
  navigation,
  testID = 'notifications-screen',
}) => {
  const {
    notifications,
    isLoading,
    isLoadingMore,
    unreadCount,
    handleLoadMore,
    handleNotificationPress,
    handleMarkAllAsRead,
  } = useNotificationsScreen();

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const renderItem: ListRenderItem<Notification> = useCallback(
    ({ item }) => (
      <NotificationItem notification={item} onPress={handleNotificationPress} />
    ),
    [handleNotificationPress]
  );

  const renderEmptyState = useCallback(() => {
    if (isLoading) {
      return null;
    }

    return (
      <View style={styles.emptyState}>
        <Ionicons
          name="notifications-outline"
          size={64}
          color={ArenaColors.neutral.medium}
        />
        <Text variant="headingPrimary" style={styles.emptyTitle}>
          Nenhuma notificação
        </Text>
        <Text variant="bodySecondary" style={styles.emptySubtitle}>
          Você não possui notificações no momento
        </Text>
      </View>
    );
  }, [isLoading]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) {
      return null;
    }

    return (
      <View style={styles.footer}>
        <SportsLoading size="sm" animationSpeed="fast" />
      </View>
    );
  }, [isLoadingMore]);

  const renderHeader = useCallback(() => {
    if (notifications.length === 0 || unreadCount === 0) {
      return null;
    }

    return (
      <View style={styles.header}>
        <Text variant="bodySecondary">
          {unreadCount} notificaç{unreadCount === 1 ? 'ão' : 'ões'} não{' '}
          {unreadCount === 1 ? 'lida' : 'lidas'}
        </Text>
        <Button variant="ghost" size="sm" onPress={handleMarkAllAsRead}>
          Marcar todas como lidas
        </Button>
      </View>
    );
  }, [notifications.length, unreadCount, handleMarkAllAsRead]);

  if (isLoading) {
    return (
      <AppLayout onBack={handleBack}>
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout testID={testID} onBack={handleBack}>
      <View style={styles.container}>
        <FlatList
          data={notifications}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmptyState}
          ListFooterComponent={renderFooter}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </AppLayout>
  );
};
