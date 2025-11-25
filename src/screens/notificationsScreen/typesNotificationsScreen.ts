import { Notification } from '@/services/notifications/typesNotifications';

export interface NotificationsScreenProps {
  testID?: string;
}

export interface UseNotificationsScreenReturn {
  notifications: Notification[];
  isLoading: boolean;
  isRefreshing: boolean;
  isLoadingMore: boolean;
  hasMore: boolean;
  unreadCount: number;
  handleRefresh: () => Promise<void>;
  handleLoadMore: () => void;
  handleNotificationPress: (notification: Notification) => void;
  handleMarkAllAsRead: () => Promise<void>;
}
