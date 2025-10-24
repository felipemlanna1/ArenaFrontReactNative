import { useState, useCallback, useEffect, useMemo } from 'react';
import { eventsApi } from '@/services/events/eventsApi';
import { UserData } from '@/services/http';
import { useAlert } from '@/contexts/AlertContext';
import {
  UseEventInviteModalProps,
  UseEventInviteModalReturn,
} from './typesEventInviteModal';

export const useEventInviteModal = ({
  eventId,
  visible,
  onInvitesSent,
}: UseEventInviteModalProps): UseEventInviteModalReturn => {
  const { showSuccess, showError } = useAlert();

  const [friends, setFriends] = useState<UserData[]>([]);
  const [others, setOthers] = useState<UserData[]>([]);
  const [invited, setInvited] = useState<UserData[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInvitableUsers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await eventsApi.getInvitableUsers(eventId);
      setFriends((data.friends as UserData[]) || []);
      setOthers((data.others as UserData[]) || []);
      setInvited((data.invited as UserData[]) || []);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar usuários';
      setError(errorMessage);
      setFriends([]);
      setOthers([]);
      setInvited([]);
    } finally {
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    if (visible) {
      fetchInvitableUsers();
      setSelectedUserIds(new Set());
    }
  }, [visible, fetchInvitableUsers]);

  const toggleSelection = useCallback((userId: string) => {
    setSelectedUserIds(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  }, []);

  const sendInvites = useCallback(async () => {
    if (selectedUserIds.size === 0) {
      showError('Selecione pelo menos um usuário');
      return;
    }

    try {
      setIsSending(true);
      const userIds = Array.from(selectedUserIds);
      await eventsApi.sendInvitations(eventId, userIds);

      showSuccess(`${userIds.length} convite(s) enviado(s) com sucesso`);
      setSelectedUserIds(new Set());
      onInvitesSent();
    } catch (err) {
      showError(err instanceof Error ? err.message : 'Erro ao enviar convites');
    } finally {
      setIsSending(false);
    }
  }, [eventId, selectedUserIds, showSuccess, showError, onInvitesSent]);

  const canSendInvites = selectedUserIds.size > 0 && !isSending;

  const filterUsers = useCallback(
    (users: UserData[], query: string): UserData[] => {
      if (!query.trim()) {
        return users;
      }

      const lowerQuery = query.toLowerCase().trim();
      return users.filter(user => {
        const fullName =
          `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase();
        const username = (user.username || '').toLowerCase();
        return fullName.includes(lowerQuery) || username.includes(lowerQuery);
      });
    },
    []
  );

  const filteredFriends = useMemo(
    () => filterUsers(friends, searchQuery),
    [friends, searchQuery, filterUsers]
  );

  const filteredOthers = useMemo(
    () => filterUsers(others, searchQuery),
    [others, searchQuery, filterUsers]
  );

  const filteredInvited = useMemo(
    () => filterUsers(invited, searchQuery),
    [invited, searchQuery, filterUsers]
  );

  return {
    friends: filteredFriends,
    others: filteredOthers,
    invited: filteredInvited,
    selectedUserIds,
    isLoading,
    isSending,
    error,
    searchQuery,
    setSearchQuery,
    toggleSelection,
    sendInvites,
    canSendInvites,
  };
};
