import { useState, useCallback, useEffect } from 'react';
import { friendshipsApi } from '@/services/friendships/friendshipsApi';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/contexts/ToastContext';
import { FriendshipData, FriendshipActionType } from './typesFriendshipActions';

interface UseFriendshipActionsReturn {
  actionType: FriendshipActionType;
  isLoading: boolean;
  handleSendRequest: () => Promise<void>;
  handleCancelRequest: () => Promise<void>;
  handleAcceptRequest: () => Promise<void>;
  handleRejectRequest: () => Promise<void>;
  handleRemoveFriend: () => Promise<void>;
}

export const useFriendshipActions = (
  userId: string,
  onStatusChange?: () => void
): UseFriendshipActionsReturn => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const [friendshipData, setFriendshipData] = useState<FriendshipData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const fetchFriendshipStatus = useCallback(async () => {
    if (!userId) return;

    try {
      setIsInitialLoading(true);
      const response = await friendshipsApi.getFriendshipStatus(userId);
      setFriendshipData(response as FriendshipData);
    } catch {
      setFriendshipData({ status: null });
    } finally {
      setIsInitialLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchFriendshipStatus();
  }, [fetchFriendshipStatus]);

  const getActionType = useCallback((): FriendshipActionType => {
    if (isInitialLoading) return 'loading';
    if (!friendshipData || friendshipData.status === null) return 'none';

    if (friendshipData.status === 'PENDING') {
      return friendshipData.requesterId === currentUser?.id
        ? 'pending_sent'
        : 'pending_received';
    }

    if (friendshipData.status === 'ACCEPTED') return 'accepted';

    return 'none';
  }, [friendshipData, currentUser, isInitialLoading]);

  const handleSendRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      await friendshipsApi.sendFriendRequest({ addresseeId: userId });
      showToast('Solicitação enviada com sucesso', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao enviar solicitação de amizade', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchFriendshipStatus, onStatusChange, showToast]);

  const handleCancelRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      await friendshipsApi.cancelFriendRequest(userId);
      showToast('Solicitação cancelada', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao cancelar solicitação', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchFriendshipStatus, onStatusChange, showToast]);

  const handleAcceptRequest = useCallback(async () => {
    if (!friendshipData) return;

    try {
      setIsLoading(true);
      await friendshipsApi.acceptFriendRequest(userId);
      showToast('Solicitação aceita', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao aceitar solicitação', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [
    userId,
    friendshipData,
    fetchFriendshipStatus,
    onStatusChange,
    showToast,
  ]);

  const handleRejectRequest = useCallback(async () => {
    try {
      setIsLoading(true);
      await friendshipsApi.rejectFriendRequest(userId);
      showToast('Solicitação recusada', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao recusar solicitação', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchFriendshipStatus, onStatusChange, showToast]);

  const handleRemoveFriend = useCallback(async () => {
    try {
      setIsLoading(true);
      await friendshipsApi.removeFriend(userId);
      showToast('Amizade removida', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao remover amizade', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [userId, fetchFriendshipStatus, onStatusChange, showToast]);

  return {
    actionType: getActionType(),
    isLoading,
    handleSendRequest,
    handleCancelRequest,
    handleAcceptRequest,
    handleRejectRequest,
    handleRemoveFriend,
  };
};
