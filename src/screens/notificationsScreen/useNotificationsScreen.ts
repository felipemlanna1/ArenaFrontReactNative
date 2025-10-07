import { useState } from 'react';
import { UseNotificationsScreenReturn } from './typesNotificationsScreen';

export const useNotificationsScreen = (): UseNotificationsScreenReturn => {
  const [isLoading] = useState(false);
  const [unreadCount] = useState(3);

  return {
    isLoading,
    unreadCount,
  };
};
