import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import { notificationsApi } from '@/services/notifications/notificationsApi';
import { useAuth } from './AuthContext';

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
  const { isAuthenticated } = useAuth();
  const shouldStopPollingRef = useRef(false);

  const fetchUnreadCount = useCallback(async () => {
    // Don't fetch if not authenticated or polling is stopped
    if (!isAuthenticated || shouldStopPollingRef.current) {
      setUnreadCount(0);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await notificationsApi.getUnreadCount();

      // Handle different response formats
      if (response === null || response === undefined) {
        // Silently handle null/undefined responses (likely connection issues)
        setUnreadCount(0);
      } else if (typeof response === 'number') {
        setUnreadCount(response);
      } else if (response && typeof response.count === 'number') {
        setUnreadCount(response.count);
      } else {
        // Only warn if we got an unexpected non-null response
        console.warn('[UnreadNotifications] Unexpected response format:', response);
        setUnreadCount(0);
      }
    } catch (error) {
      // Stop polling if unauthorized (401)
      const isUnauthorized = error &&
        (error as any)?.response?.status === 401 ||
        (error as any)?.status === 401 ||
        (error as Error)?.message?.includes('Unauthorized');

      if (isUnauthorized) {
        shouldStopPollingRef.current = true;
        setUnreadCount(0);
      } else {
        console.error('Error fetching unread count:', error);
        setUnreadCount(0);
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  const decrementCount = useCallback((amount: number = 1) => {
    setUnreadCount((prev) => Math.max(0, prev - amount));
  }, []);

  const resetCount = useCallback(() => {
    setUnreadCount(0);
  }, []);

  // Reset polling flag when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      shouldStopPollingRef.current = false;
    }
  }, [isAuthenticated]);

  // Initial fetch
  useEffect(() => {
    if (isAuthenticated) {
      fetchUnreadCount();
    }
  }, [fetchUnreadCount, isAuthenticated]);

  // Poll every 30 seconds (only when authenticated)
  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const interval = setInterval(() => {
      fetchUnreadCount();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchUnreadCount, isAuthenticated]);

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
