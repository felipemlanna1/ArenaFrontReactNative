import { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useGroups } from '@/contexts/GroupsContext';
import { useGroupsFilters } from '@/contexts/GroupsFiltersContext';
import { groupsApi } from '@/services/groups/groupsApi';
import { Group } from '@/services/groups/typesGroups';

export const useGroupsListScreen = () => {
  const {
    myGroups: myGroupsContext,
    isLoading: isLoadingContext,
    refetch: refetchContext,
  } = useGroups();
  const { activeFilters, searchTerm } = useGroupsFilters();

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingGroupId, setLoadingGroupId] = useState<string | null>(null);

  const [recommendationsPage, setRecommendationsPage] = useState(1);

  const [recommendations, setRecommendations] = useState<Group[]>([]);

  const [isLoadingRecommendations, setIsLoadingRecommendations] =
    useState(true);

  const [hasMoreRecommendations, setHasMoreRecommendations] = useState(false);

  const [isLoadingMoreRecommendations, setIsLoadingMoreRecommendations] =
    useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const filteredMyGroups =
    myGroupsContext?.filter(group =>
      group.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) || [];

  const fetchRecommendations = useCallback(
    async (page: number = 1) => {
      try {
        if (page === 1) {
          setIsLoadingRecommendations(true);
          setRecommendationsPage(1);
        } else {
          setIsLoadingMoreRecommendations(true);
        }

        const response = await groupsApi.getRecommendations({
          search: debouncedSearchTerm || undefined,
          city: activeFilters.city,
          state: activeFilters.state,
          sportId: activeFilters.sportIds?.[0],
          page,
          limit: 20,
        });

        if (page === 1) {
          setRecommendations(response.data);
        } else {
          setRecommendations(prev => [...prev, ...response.data]);
        }

        setRecommendationsPage(page);
        setHasMoreRecommendations(page < response.totalPages);
      } catch {
        if (page === 1) {
          setRecommendations([]);
        }
      } finally {
        setIsLoadingRecommendations(false);
        setIsLoadingMoreRecommendations(false);
      }
    },
    [debouncedSearchTerm, activeFilters]
  );

  useFocusEffect(
    useCallback(() => {
      Promise.all([refetchContext(), fetchRecommendations(1)]);
    }, [refetchContext, fetchRecommendations])
  );

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await Promise.all([refetchContext(), fetchRecommendations(1)]);
    } finally {
      setRefreshing(false);
    }
  }, [refetchContext, fetchRecommendations]);

  const handleLoadMoreRecommendations = useCallback(() => {
    if (!hasMoreRecommendations || isLoadingMoreRecommendations) return;
    fetchRecommendations(recommendationsPage + 1);
  }, [
    hasMoreRecommendations,
    isLoadingMoreRecommendations,
    recommendationsPage,
    fetchRecommendations,
  ]);

  const handleJoinGroup = useCallback(
    async (groupId: string) => {
      setLoadingGroupId(groupId);

      try {
        const joinedGroup = recommendations.find(g => g.id === groupId);
        if (joinedGroup) {
          setRecommendations(prev => prev.filter(g => g.id !== groupId));
        }

        await groupsApi.requestJoin(groupId);

        await Promise.all([refetchContext(), fetchRecommendations(1)]);
      } catch (error) {
        await Promise.all([refetchContext(), fetchRecommendations(1)]);
      } finally {
        setLoadingGroupId(null);
      }
    },
    [recommendations, refetchContext, fetchRecommendations]
  );

  const handleLeaveGroup = useCallback(
    async (groupId: string) => {
      setLoadingGroupId(groupId);
      try {
        await groupsApi.leaveGroup(groupId);
        await refetchContext();
      } finally {
        setLoadingGroupId(null);
      }
    },
    [refetchContext]
  );

  return {
    myGroups: filteredMyGroups,
    recommendations,
    isLoadingMyGroups: isLoadingContext,
    isLoadingRecommendations,
    refreshing,
    handleRefresh,
    loadingGroupId,
    hasMoreRecommendations,
    isLoadingMoreRecommendations,
    handleLoadMoreRecommendations,
    handleJoinGroup,
    handleLeaveGroup,
  };
};
