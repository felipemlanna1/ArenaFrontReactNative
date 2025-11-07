import { useState, useCallback, useEffect, useRef } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import { groupsApi } from '@/services/groups/groupsApi';
import { eventsApi } from '@/services/events/eventsApi';
import { useAlert } from '@/contexts/AlertContext';
import { getLoadInvitableUsersErrorMessage } from '@/utils/inviteErrors';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  profileImageUrl?: string;
  city?: string;
  state?: string;
  favoriteSports?: { id: string; name: string }[];
}

interface UseInviteUsersModalProps {
  visible: boolean;
  entityType: 'group' | 'event';
  entityId: string;
}

export const useInviteUsersModal = ({
  visible,
  entityType,
  entityId,
}: UseInviteUsersModalProps) => {
  const { showError } = useAlert();
  const isInitializedRef = useRef(false);

  const [selectedTab, setSelectedTab] = useState<
    'friends' | 'recommendations' | 'invited'
  >('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string>();
  const [selectedState, setSelectedState] = useState<string>();
  const [selectedSportId, setSelectedSportId] = useState<string>();
  const [friends, setFriends] = useState<User[]>([]);
  const [recommendations, setRecommendations] = useState<User[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(false);
  const [isInviting, setIsInviting] = useState(false);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);
  const [hasMoreRecommendations, setHasMoreRecommendations] = useState(true);
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const fetchInvitableUsers = useCallback(async () => {
    if (!visible || !entityId) return;

    setIsLoadingFriends(true);
    setIsLoadingRecommendations(true);

    try {
      let response;
      if (entityType === 'group') {
        response = await groupsApi.getInvitableUsers(entityId, {
          query: debouncedSearchQuery,
          limit: 50,
        });
      } else {
        response = await eventsApi.getInvitableUsers(entityId, {
          query: debouncedSearchQuery,
          limit: 50,
        });
      }

      if (response.data) {
        setFriends(response.data.friends || []);
        setRecommendations(response.data.others || []);
        setInvitedUsers(response.data.invited || []);
        setHasMoreFriends(false);
        setHasMoreRecommendations(false);
      }
    } catch (error) {
      showError(getLoadInvitableUsersErrorMessage(error));
    } finally {
      setIsLoadingFriends(false);
      setIsLoadingRecommendations(false);
    }
  }, [visible, entityId, entityType, debouncedSearchQuery, showError]);

  const loadMoreFriends = useCallback(async () => {
    if (!hasMoreFriends || isLoadingFriends) return;
    setHasMoreFriends(false);
  }, [hasMoreFriends, isLoadingFriends]);

  const loadMoreRecommendations = useCallback(async () => {
    if (!hasMoreRecommendations || isLoadingRecommendations) return;
    setHasMoreRecommendations(false);
  }, [hasMoreRecommendations, isLoadingRecommendations]);

  const toggleUserSelection = useCallback((userId: string) => {
    setSelectedUserIds(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      }
      return [...prev, userId];
    });
  }, []);

  const selectAllFriends = useCallback(() => {
    const friendIds = friends.map(f => f.id);
    setSelectedUserIds(prev => {
      const nonFriendSelections = prev.filter(id => !friendIds.includes(id));
      return [...nonFriendSelections, ...friendIds];
    });
  }, [friends]);

  const clearSelection = useCallback(() => {
    setSelectedUserIds([]);
  }, []);

  const markUsersAsInvited = useCallback(
    (invitedIds: string[]) => {
      const invitedFriends = friends.filter(f => invitedIds.includes(f.id));
      const invitedRecommendations = recommendations.filter(r =>
        invitedIds.includes(r.id)
      );
      const newlyInvited = [...invitedFriends, ...invitedRecommendations];

      setInvitedUsers(prev => [...prev, ...newlyInvited]);

      setFriends(prev => prev.filter(f => !invitedIds.includes(f.id)));
      setRecommendations(prev => prev.filter(r => !invitedIds.includes(r.id)));

      setSelectedUserIds([]);
    },
    [friends, recommendations]
  );

  const removeInvitedUser = useCallback(
    (userId: string) => {
      const removedUser = invitedUsers.find(u => u.id === userId);
      if (removedUser) {
        setInvitedUsers(prev => prev.filter(u => u.id !== userId));
        setFriends(prev => [...prev, removedUser]);
      }
    },
    [invitedUsers]
  );

  const clearFilters = useCallback(() => {
    setSelectedCity(undefined);
    setSelectedState(undefined);
    setSelectedSportId(undefined);
  }, []);

  const getFilteredUsers = useCallback(() => {
    let currentList: User[] = [];

    if (selectedTab === 'friends') {
      currentList = friends;
    } else if (selectedTab === 'recommendations') {
      currentList = recommendations;
    } else if (selectedTab === 'invited') {
      currentList = invitedUsers;
    }

    if (selectedTab === 'recommendations') {
      let filtered = currentList;

      if (selectedCity) {
        filtered = filtered.filter(u => u.city === selectedCity);
      }

      if (selectedSportId) {
        filtered = filtered.filter(u =>
          u.favoriteSports?.some(s => s.id === selectedSportId)
        );
      }

      return filtered;
    }

    return currentList;
  }, [
    selectedTab,
    friends,
    recommendations,
    invitedUsers,
    selectedCity,
    selectedSportId,
  ]);

  useEffect(() => {
    if (visible && !isInitializedRef.current) {
      isInitializedRef.current = true;
      setSelectedTab('friends');
      setSelectedUserIds([]);
      setSearchQuery('');
      setSelectedCity(undefined);
      setSelectedState(undefined);
      setSelectedSportId(undefined);
    }

    if (!visible) {
      isInitializedRef.current = false;
    }
  }, [visible]);

  useEffect(() => {
    if (visible && entityId) {
      fetchInvitableUsers();
    }
  }, [visible, entityId, fetchInvitableUsers]);

  return {
    selectedTab,
    setSelectedTab,
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    selectedState,
    setSelectedState,
    selectedSportId,
    setSelectedSportId,
    clearFilters,
    friends,
    recommendations,
    invitedUsers,
    selectedUserIds,
    getFilteredUsers,
    toggleUserSelection,
    selectAllFriends,
    clearSelection,
    markUsersAsInvited,
    removeInvitedUser,
    isLoadingFriends,
    isLoadingRecommendations,
    isInviting,
    setIsInviting,
    loadMoreFriends,
    loadMoreRecommendations,
    hasMoreFriends,
    hasMoreRecommendations,
  };
};
