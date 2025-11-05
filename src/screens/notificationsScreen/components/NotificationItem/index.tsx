import React, { useCallback, useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { NotificationItemProps } from './typesNotificationItem';
import { styles } from './stylesNotificationItem';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onPress,
  testID = 'notification-item',
}) => {
  const getIconName = useCallback(
    (type: string): keyof typeof Ionicons.glyphMap => {
      switch (type) {
        case 'event_invitation':
        case 'event_request_approved':
          return 'calendar';
        case 'group_invitation':
        case 'group_request_approved':
          return 'people';
        case 'friend_request':
        case 'friend_accepted':
          return 'person-add';
        case 'event_reminder':
          return 'alarm';
        case 'event_cancelled':
        case 'event_updated':
          return 'alert-circle';
        default:
          return 'notifications';
      }
    },
    []
  );

  const timeAgo = useMemo(() => {
    try {
      return formatDistanceToNow(new Date(notification.createdAt), {
        addSuffix: true,
        locale: ptBR,
      });
    } catch {
      return '';
    }
  }, [notification.createdAt]);

  const handlePress = useCallback(() => {
    onPress(notification);
  }, [notification, onPress]);

  return (
    <TouchableOpacity
      style={[styles.container, !notification.isRead && styles.unreadContainer]}
      onPress={handlePress}
      activeOpacity={0.7}
      testID={testID}
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={getIconName(notification.type)}
          size={20}
          color={ArenaColors.brand.primary}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="titleSecondary" style={styles.title}>
            {notification.title}
          </Text>
          {!notification.isRead && <View style={styles.unreadDot} />}
        </View>

        <Text variant="bodySecondary" style={styles.body}>
          {notification.body}
        </Text>

        {timeAgo && (
          <Text variant="captionSecondary" style={styles.time}>
            {timeAgo}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
