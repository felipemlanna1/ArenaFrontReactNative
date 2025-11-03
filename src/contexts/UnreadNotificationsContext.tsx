import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from 'react';
import { notificationsApi } from '@/services/notifications/notificationsApi';

interface UnreadNotificationsContextValue {
  unreadCount: number;
  isLoading: boolean;
  refetch: () => Promise<void>;
  decrementCount: (amount?: number) => void;
  resetCount: () => void;
}

const UnreadNotificationsContext = createContext<
  UnreadNotificationsContextValue | undefined
>(undefined);

interface UnreadNotificationsProviderProps {
  children: ReactNode;
}

export const UnreadNotificationsProvider: React.FC<
  UnreadNotificationsProviderProps
> = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUnreadCount = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await notificationsApi.getUnreadCount();

      // httpService doesn't wrap count response, check both formats
      if (typeof response === 'number') {
        setUnreadCount(response);
      } else if (response && typeof response.count === 'number') {
        setUnreadCount(response.count);
      } else {
        console.warn('Unexpected response format for unread count:', response);
        setUnreadCount(0);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
      setUnreadCount(0);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const decrementCount = useCallback((amount: number = 1) => {
    setUnreadCount((prev) => Math.max(0, prev - amount));
  }, []);

  const resetCount = useCallback(() => {
    setUnreadCount(0);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

  // Poll every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  const value: UnreadNotificationsContextValue = {
    unreadCount,
    isLoading,
    refetch: fetchUnreadCount,
    decrementCount,
    resetCount,
  };

  return (
    <UnreadNotificationsContext.Provider value={value}>
      {children}
    </UnreadNotificationsContext.Provider>
  );
};

export const useUnreadNotificationsContext = ():
  | UnreadNotificationsContextValue => {
  const context = useContext(UnreadNotificationsContext);
  if (!context) {
    throw new Error(
      'useUnreadNotificationsContext must be used within UnreadNotificationsProvider'
    );
  }
  return context;
};
