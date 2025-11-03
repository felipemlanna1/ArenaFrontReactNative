import { useState, useCallback, useRef } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { UseNotificationsScreenReturn } from './typesNotificationsScreen';
import { Notification } from '@/services/notifications/typesNotifications';
import { notificationsApi } from '@/services/notifications/notificationsApi';
import { useAlert } from '@/contexts/AlertContext';
import { useUnreadNotifications } from '@/hooks/useUnreadNotifications';
import { RootStackParamList } from '@/navigation/typesNavigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const PAGE_SIZE = 20;

export const useNotificationsScreen = (): UseNotificationsScreenReturn => {
  const navigation = useNavigation<NavigationProp>();
  const { showError } = useAlert();
  const { decrementCount, resetCount } = useUnreadNotifications();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

  const isLoadingRef = useRef(false);

  const loadNotifications = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoading(true);

      const [notificationsResponse, countResponse] = await Promise.all([
        notificationsApi.getUserNotifications(1, PAGE_SIZE),
        notificationsApi.getUnreadCount(),
      ]);

      // httpService extracts .data automatically, so notificationsResponse is already the array
      if (Array.isArray(notificationsResponse)) {
        setNotifications(notificationsResponse);
        setHasMore(false); // Will be set correctly when we get totalPages from response metadata
        setCurrentPage(1);
      } else if (notificationsResponse && Array.isArray(notificationsResponse.data)) {
        // Fallback for wrapped response
        setNotifications(notificationsResponse.data);
        setHasMore(1 < (notificationsResponse.totalPages || 0));
        setCurrentPage(1);
      } else {
        console.warn('Unexpected notifications response:', notificationsResponse);
        setNotifications([]);
        setHasMore(false);
      }

      // For count, httpService doesn't wrap it, so we check both formats
      if (typeof countResponse === 'number') {
        setUnreadCount(countResponse);
      } else if (countResponse && typeof countResponse.count === 'number') {
        setUnreadCount(countResponse.count);
      } else {
        console.warn('Unexpected count response:', countResponse);
        setUnreadCount(0);
      }
    } catch (error) {
      showError('Erro ao carregar notificações');
      console.error('Error loading notifications:', error);
      setNotifications([]);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, [showError]);

  const refreshNotifications = useCallback(async () => {
    if (isLoadingRef.current) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsRefreshing(true);

      const [notificationsResponse, countResponse] = await Promise.all([
        notificationsApi.getUserNotifications(1, PAGE_SIZE),
        notificationsApi.getUnreadCount(),
      ]);

      // httpService extracts .data automatically
      if (Array.isArray(notificationsResponse)) {
        setNotifications(notificationsResponse);
        setHasMore(false);
        setCurrentPage(1);
      } else if (notificationsResponse && Array.isArray(notificationsResponse.data)) {
        setNotifications(notificationsResponse.data);
        setHasMore(1 < (notificationsResponse.totalPages || 0));
        setCurrentPage(1);
      } else {
        setNotifications([]);
        setHasMore(false);
      }

      if (typeof countResponse === 'number') {
        setUnreadCount(countResponse);
      } else if (countResponse && typeof countResponse.count === 'number') {
        setUnreadCount(countResponse.count);
      } else {
        setUnreadCount(0);
      }
    } catch (error) {
      showError('Erro ao carregar notificações');
      console.error('Error refreshing notifications:', error);
    } finally {
      setIsRefreshing(false);
      isLoadingRef.current = false;
    }
  }, [showError]);

  const loadMoreNotifications = useCallback(async () => {
    if (isLoadingRef.current || !hasMore) {
      return;
    }

    try {
      isLoadingRef.current = true;
      setIsLoadingMore(true);

      const nextPage = currentPage + 1;
      const response = await notificationsApi.getUserNotifications(
        nextPage,
        PAGE_SIZE
      );

      // httpService extracts .data automatically
      if (Array.isArray(response)) {
        setNotifications((prev) => [...prev, ...response]);
        setHasMore(false);
        setCurrentPage(nextPage);
      } else if (response && Array.isArray(response.data)) {
        setNotifications((prev) => [...prev, ...response.data]);
        setHasMore(nextPage < (response.totalPages || 0));
        setCurrentPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more notifications:', error);
    } finally {
      setIsLoadingMore(false);
      isLoadingRef.current = false;
    }
  }, [currentPage, hasMore]);

  const handleNotificationPress = useCallback(
    async (notification: Notification) => {
      // Mark as read if unread
      if (!notification.isRead) {
        try {
          await notificationsApi.markAsRead(notification.id);

          // Update local state
          setNotifications((prev) =>
            prev.map((n) =>
              n.id === notification.id ? { ...n, isRead: true } : n
            )
          );
          setUnreadCount((prev) => Math.max(0, prev - 1));

          // Update global badge count
          decrementCount(1);
        } catch (error) {
          console.error('Error marking notification as read:', error);
        }
      }

      // Navigate based on entityType
      if (notification.entityType && notification.entityId) {
        switch (notification.entityType) {
          case 'event':
            navigation.navigate('EventDetails', {
              eventId: notification.entityId,
            });
            break;
          case 'group':
            navigation.navigate('GroupDetails', {
              groupId: notification.entityId,
            });
            break;
          case 'user':
            navigation.navigate('Profile', {
              userId: notification.entityId,
            });
            break;
          case 'message':
            // Stay on notifications screen
            break;
          default:
            break;
        }
      }
    },
    [navigation, decrementCount]
  );

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await notificationsApi.markAllAsRead();

      // Update local state
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);

      // Update global badge count
      resetCount();
    } catch (error) {
      showError('Erro ao marcar todas como lidas');
      console.error('Error marking all as read:', error);
    }
  }, [showError, resetCount]);

  useFocusEffect(
    useCallback(() => {
      loadNotifications();
    }, [loadNotifications])
  );

  return {
    notifications,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    unreadCount,
    handleRefresh: refreshNotifications,
    handleLoadMore: loadMoreNotifications,
    handleNotificationPress,
    handleMarkAllAsRead,
  };
};
