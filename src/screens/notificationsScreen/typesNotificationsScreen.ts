import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { Notification } from '@/services/notifications/typesNotifications';

export type NotificationsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Notifications'
>;

export type NotificationsScreenRouteProp = RouteProp<
  RootStackParamList,
  'Notifications'
>;

export interface NotificationsScreenProps {
  navigation: NotificationsScreenNavigationProp;
  route: NotificationsScreenRouteProp;
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
