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
  const [outgoingRequestIds, setOutgoingRequestIds] = useState<Set<string>>(
    new Set()
  );

  const fetchOutgoingRequests = useCallback(async () => {
    try {
      const outgoing = await friendshipsApi.getOutgoingRequests();
      const ids = new Set(outgoing.map(f => f.addressee?.id).filter(Boolean));
      setOutgoingRequestIds(ids as Set<string>);
    } catch {
      setOutgoingRequestIds(new Set());
    }
  }, []);

  const fetchFriendshipStatus = useCallback(async () => {
    if (!userId) return;

    try {
      setIsInitialLoading(true);
      await fetchOutgoingRequests();
      const response = await friendshipsApi.getFriendshipStatus(userId);
      console.log('[FriendshipActions] Friendship status response:', {
        userId,
        currentUserId: currentUser?.id,
        response,
      });
      setFriendshipData(response as FriendshipData);
    } catch {
      setFriendshipData({ status: null });
    } finally {
      setIsInitialLoading(false);
    }
  }, [userId, currentUser, fetchOutgoingRequests]);

  useEffect(() => {
    fetchFriendshipStatus();
  }, [fetchFriendshipStatus]);

  const getActionType = useCallback((): FriendshipActionType => {
    if (isInitialLoading) return 'loading';
    if (!friendshipData || friendshipData.status === null) return 'none';

    if (friendshipData.status === 'PENDING') {
      if ('requesterId' in friendshipData && 'addresseeId' in friendshipData) {
        console.log('[FriendshipActions] Comparing IDs with full data:', {
          requesterId: friendshipData.requesterId,
          addresseeId: friendshipData.addresseeId,
          currentUserId: currentUser?.id,
          requesterMatch: friendshipData.requesterId === currentUser?.id,
          addresseeMatch: friendshipData.addresseeId === currentUser?.id,
        });

        if (friendshipData.requesterId === currentUser?.id) {
          console.log('[FriendshipActions] Returning pending_sent (from API)');
          return 'pending_sent';
        }
        if (friendshipData.addresseeId === currentUser?.id) {
          console.log('[FriendshipActions] Returning pending_received (from API)');
          return 'pending_received';
        }
      } else {
        console.log('[FriendshipActions] No requesterId/addresseeId, using fallback:', {
          userId,
          isInOutgoing: outgoingRequestIds.has(userId),
          outgoingIds: Array.from(outgoingRequestIds),
        });

        if (outgoingRequestIds.has(userId)) {
          console.log('[FriendshipActions] Returning pending_sent (from outgoing list)');
          return 'pending_sent';
        } else {
          console.log('[FriendshipActions] Returning pending_received (not in outgoing list)');
          return 'pending_received';
        }
      }
    }

    if (friendshipData.status === 'ACCEPTED') return 'accepted';

    return 'none';
  }, [friendshipData, currentUser, isInitialLoading, userId, outgoingRequestIds]);

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
    if (!friendshipData || friendshipData.status === null) return;
    if (!('id' in friendshipData)) return;

    try {
      setIsLoading(true);
      await friendshipsApi.cancelFriendRequest(friendshipData.id);
      showToast('Solicitação cancelada', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao cancelar solicitação', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [friendshipData, fetchFriendshipStatus, onStatusChange, showToast]);

  const handleAcceptRequest = useCallback(async () => {
    if (!friendshipData || friendshipData.status === null) return;
    if (!('id' in friendshipData)) return;

    try {
      setIsLoading(true);
      await friendshipsApi.acceptFriendRequest(friendshipData.id);
      showToast('Solicitação aceita', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao aceitar solicitação', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [friendshipData, fetchFriendshipStatus, onStatusChange, showToast]);

  const handleRejectRequest = useCallback(async () => {
    if (!friendshipData || friendshipData.status === null) return;
    if (!('id' in friendshipData)) return;

    try {
      setIsLoading(true);
      await friendshipsApi.rejectFriendRequest(friendshipData.id);
      showToast('Solicitação recusada', 'success');
      await fetchFriendshipStatus();
      onStatusChange?.();
    } catch {
      showToast('Erro ao recusar solicitação', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [friendshipData, fetchFriendshipStatus, onStatusChange, showToast]);

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
