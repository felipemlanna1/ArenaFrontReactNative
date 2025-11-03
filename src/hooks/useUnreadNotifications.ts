import { useUnreadNotificationsContext } from '@/contexts/UnreadNotificationsContext';

interface UseUnreadNotificationsReturn {
  unreadCount: number;
  isLoading: boolean;
  refetch: () => Promise<void>;
  decrementCount: (amount?: number) => void;
  resetCount: () => void;
}

export const useUnreadNotifications = (): UseUnreadNotificationsReturn => {
  const context = useUnreadNotificationsContext();
  return context;
};
