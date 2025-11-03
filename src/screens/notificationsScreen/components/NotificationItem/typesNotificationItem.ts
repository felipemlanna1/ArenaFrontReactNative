import { Notification } from '@/services/notifications/typesNotifications';

export interface NotificationItemProps {
  notification: Notification;
  onPress: (notification: Notification) => void;
  onDelete?: (notificationId: string) => void;
  testID?: string;
}
