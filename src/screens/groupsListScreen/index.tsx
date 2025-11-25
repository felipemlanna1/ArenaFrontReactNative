import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Fab } from '@/components/ui/fab';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { GroupCard } from '@/components/ui/groupCard';
import { AnimatedListItem } from '@/components/ui/animatedListItem';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useGroupsFilters } from '@/contexts/GroupsFiltersContext';
import { GroupsListScreenProps } from './typesGroupsListScreen';
import { useGroupsListScreen } from './useGroupsListScreen';
import { styles } from './stylesGroupsListScreen';
import { GroupsBackground } from './components/GroupsBackground';
import { GroupsFilterBar } from './components/GroupsFilterBar';
import { GroupsTabBar, GroupTab } from './components/GroupsTabBar';
import {
  MyGroupsSection,
  GroupRecommendationsSection,
} from './components/GroupsSections';
import { Group } from '@/services/groups/typesGroups';

export const GroupsListScreen: React.FC<GroupsListScreenProps> = ({
  navigation,
}) => {
  const [activeTab, setActiveTab] = useState<GroupTab>('myGroups');

  const {
    activeFilters,
    searchTerm,
    setSearchTerm,
    updateFilter,
    clearFilters,
    activeFiltersCount,
  } = useGroupsFilters();

  const {
    myGroups,
    recommendations,
    isLoadingMyGroups,
    isLoadingRecommendations,
    loadingGroupId,
    hasMoreRecommendations,
    isLoadingMoreRecommendations,
    handleLoadMoreRecommendations,
    handleJoinGroup,
    handleLeaveGroup,
  } = useGroupsListScreen();

  const handleGroupPress = useCallback(
    (groupId: string) => {
      navigation.navigate('GroupDetails', { groupId });
    },
    [navigation]
  );

  const handleCreateGroup = useCallback(() => {
    navigation.navigate('CreateGroup');
  }, [navigation]);

  const handleSwitchToRecommendations = useCallback(() => {
    setActiveTab('recommendations');
  }, []);

  const handleCityChange = useCallback(
    (city: string) => {
      updateFilter('city', city);
    },
    [updateFilter]
  );

  const handleStateChange = useCallback(
    (state: string) => {
      updateFilter('state', state);
    },
    [updateFilter]
  );

  const handleSportChange = useCallback(
    (sportId: string | undefined) => {
      updateFilter('sportIds', sportId ? [sportId] : undefined);
    },
    [updateFilter]
  );

  const getTabData = useCallback(() => {
    switch (activeTab) {
      case 'myGroups':
        return {
          data: myGroups,
          isLoading: isLoadingMyGroups,
          isLoadingMore: false,
          hasMore: false,
          onLoadMore: undefined,
        };
      case 'recommendations':
        return {
          data: recommendations,
          isLoading: isLoadingRecommendations,
          isLoadingMore: isLoadingMoreRecommendations,
          hasMore: hasMoreRecommendations,
          onLoadMore: handleLoadMoreRecommendations,
        };
    }
  }, [
    activeTab,
    myGroups,
    recommendations,
    isLoadingMyGroups,
    isLoadingRecommendations,
    isLoadingMoreRecommendations,
    hasMoreRecommendations,
    handleLoadMoreRecommendations,
  ]);

  const renderItem: ListRenderItem<Group> = useCallback(
    ({ item, index }) => {
      return (
        <AnimatedListItem index={index ?? 0}>
          <GroupCard
            group={item}
            onDetailsPress={handleGroupPress}
            onManagePress={handleGroupPress}
            onJoinGroup={
              activeTab === 'myGroups' ? async () => {} : handleJoinGroup
            }
            onLeaveGroup={
              activeTab === 'myGroups' ? handleLeaveGroup : async () => {}
            }
            isActionLoading={loadingGroupId === item.id}
            currentActionGroupId={loadingGroupId}
            testID={`group-card-${item.id}`}
          />
        </AnimatedListItem>
      );
    },
    [
      activeTab,
      handleGroupPress,
      handleJoinGroup,
      handleLeaveGroup,
      loadingGroupId,
    ]
  );

  const hasActiveFilters = activeFiltersCount > 0 || searchTerm.length > 0;

  const renderFooter = useCallback(() => {
    const { isLoadingMore } = getTabData();
    if (!isLoadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <SkeletonCard />
      </View>
    );
  }, [getTabData]);

  const renderEmpty = useCallback(() => {
    const { isLoading } = getTabData();
    if (isLoading) return null;

    switch (activeTab) {
      case 'myGroups':
        return (
          <MyGroupsSection
            groups={[]}
            isLoading={false}
            loadingGroupId={null}
            onNavigateToGroup={handleGroupPress}
            onManageGroup={handleGroupPress}
            onLeaveGroup={handleLeaveGroup}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onSwitchToRecommendations={handleSwitchToRecommendations}
          />
        );
      case 'recommendations':
        return (
          <GroupRecommendationsSection
            groups={[]}
            isLoading={false}
            loadingGroupId={null}
            onNavigateToGroup={handleGroupPress}
            onManageGroup={handleGroupPress}
            onJoinGroup={handleJoinGroup}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearFilters}
            onCreateGroup={handleCreateGroup}
          />
        );
    }
  }, [
    activeTab,
    getTabData,
    handleGroupPress,
    handleJoinGroup,
    handleLeaveGroup,
    hasActiveFilters,
    clearFilters,
    handleSwitchToRecommendations,
    handleCreateGroup,
  ]);

  const selectedSportId = activeFilters.sportIds?.[0];
  const { data, isLoading, hasMore, onLoadMore } = getTabData();

  return (
    <AppLayout>
      <GroupsBackground>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text variant="headingPrimary" style={styles.title}>
              Grupos
            </Text>
          </View>

          <GroupsFilterBar
            searchQuery={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCity={activeFilters.city || ''}
            onCityChange={handleCityChange}
            selectedState={activeFilters.state || ''}
            onStateChange={handleStateChange}
            selectedSportId={selectedSportId}
            onSportChange={handleSportChange}
            onClearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
          />

          <GroupsTabBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            myGroupsCount={myGroups.length}
            recommendationsCount={recommendations.length}
          />

          {isLoading && data.length === 0 ? (
            <View style={styles.loadingContainer}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : (
            <FlashList
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.listContent}
              onEndReached={hasMore ? onLoadMore : undefined}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={renderEmpty}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
            />
          )}

          <View style={styles.fab}>
            <Fab
              icon={
                <Ionicons
                  name="add"
                  size={24}
                  color={ArenaColors.neutral.light}
                />
              }
              onPress={handleCreateGroup}
              variant="primary"
              size="md"
            />
          </View>
        </View>
      </GroupsBackground>
    </AppLayout>
  );
};
