import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { styles } from './stylesNotificationBadge';
import type { NotificationBadgeProps } from './typesNotificationBadge';

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  count = 0,
  showCount = false,
  size = 'sm',
  testID = 'notification-badge',
}) => {
  if (count === 0) return null;

  const badgeStyle = [
    styles.badge,
    size === 'sm' ? styles.badgeSm : styles.badgeMd,
  ];

  if (!showCount || size === 'sm') {
    return <View style={badgeStyle} testID={testID} />;
  }

  return (
    <View style={badgeStyle} testID={testID}>
      <Text variant="labelPrimary">
        {count > 99 ? '99+' : count.toString()}
      </Text>
    </View>
  );
};
