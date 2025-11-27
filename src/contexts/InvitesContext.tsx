import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
  useRef,
} from 'react';
import { friendshipsApi } from '@/services/friendships/friendshipsApi';
import { groupsApi } from '@/services/groups/groupsApi';
import { useAuth } from './AuthContext';

interface InvitesCount {
  friendRequests: number;
  groupInvites: number;
  total: number;
}

interface InvitesContextValue {
  counts: InvitesCount;
  isLoading: boolean;
  refetch: () => Promise<void>;
}

const InvitesContext = createContext<InvitesContextValue | undefined>(
  undefined
);

interface InvitesProviderProps {
  children: ReactNode;
}

export const InvitesProvider: React.FC<InvitesProviderProps> = ({
  children,
}) => {
  const [counts, setCounts] = useState<InvitesCount>({
    friendRequests: 0,
    groupInvites: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const shouldStopPollingRef = useRef(false);

  const fetchInvitesCounts = useCallback(async () => {
    if (!isAuthenticated || shouldStopPollingRef.current) {
      setCounts({ friendRequests: 0, groupInvites: 0, total: 0 });
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const [friendRequests, groupInvites] = await Promise.all([
        friendshipsApi
          .getIncomingRequests()
          .then(requests => requests.length)
          .catch(() => 0),
        groupsApi
          .getPendingGroupInvites()
          .then(invites => invites.length)
          .catch(() => 0),
      ]);

      const newCounts: InvitesCount = {
        friendRequests,
        groupInvites,
        total: friendRequests + groupInvites,
      };

      setCounts(newCounts);
    } catch (error) {
      const isUnauthorized =
        (error &&
          (error as { response?: { status?: number } })?.response?.status ===
            401) ||
        (error as { status?: number })?.status === 401 ||
        (error as Error)?.message?.includes('Unauthorized');

      if (isUnauthorized) {
        shouldStopPollingRef.current = true;
        setCounts({ friendRequests: 0, groupInvites: 0, total: 0 });
      } else {
        setCounts({ friendRequests: 0, groupInvites: 0, total: 0 });
      }
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      shouldStopPollingRef.current = false;
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchInvitesCounts();
    }
  }, [fetchInvitesCounts, isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const interval = setInterval(() => {
      fetchInvitesCounts();
    }, 30000);

    return () => clearInterval(interval);
  }, [fetchInvitesCounts, isAuthenticated]);

  const value: InvitesContextValue = {
    counts,
    isLoading,
    refetch: fetchInvitesCounts,
  };

  return (
    <InvitesContext.Provider value={value}>{children}</InvitesContext.Provider>
  );
};

export const useInvites = (): InvitesContextValue => {
  const context = useContext(InvitesContext);
  if (!context) {
    throw new Error('useInvites must be used within InvitesProvider');
  }
  return context;
};
