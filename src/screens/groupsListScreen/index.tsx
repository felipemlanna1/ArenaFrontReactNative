import React, { useState, useCallback, useMemo } from 'react';
import { View, Keyboard } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { GestureDetector } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fab } from '@/components/ui/fab';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { GroupCard } from '@/components/ui/groupCard';
import { AnimatedListItem } from '@/components/ui/animatedListItem';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useGroupsFilters } from '@/contexts/GroupsFiltersContext';
import { useSwipeableFilters } from '@/hooks/useSwipeableFilters';
import { GroupsListScreenProps } from './typesGroupsListScreen';
import { useGroupsListScreen } from './useGroupsListScreen';
import { styles } from './stylesGroupsListScreen';
import { FilterBar } from './components/FilterBar';
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

  const groupTabs: GroupTab[] = ['myGroups', 'recommendations'];

  const { composedGesture } = useSwipeableFilters({
    filters: groupTabs,
    activeFilter: activeTab,
    onChange: setActiveTab,
  });

  const { activeFilters, searchTerm, setSearchTerm, clearFilters } =
    useGroupsFilters();

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

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSwitchToRecommendations = useCallback(() => {
    setActiveTab('recommendations');
  }, []);

  const handleFilterPress = useCallback(() => {
    navigation.navigate('FilterScreen', { source: 'groups' });
  }, [navigation]);

  const filterCount = useMemo(() => {
    let count = 0;
    if (activeFilters.city) count++;
    if (activeFilters.state) count++;
    if (activeFilters.sportIds && activeFilters.sportIds.length > 0) count++;
    return count;
  }, [activeFilters.city, activeFilters.state, activeFilters.sportIds]);

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

  const hasActiveFilters = filterCount > 0 || searchTerm.length > 0;

  const renderSeparator = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

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

  const { data, isLoading, hasMore, onLoadMore } = getTabData();

  return (
    <AppLayout
      showHeader={true}
      headerVariant="mainWithBack"
      headerShowLogo={true}
      headerShowBackButton={true}
      headerOnBackPress={handleBackPress}
    >
      <GestureDetector gesture={composedGesture}>
        <View style={styles.content}>
          <GroupsTabBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            myGroupsCount={myGroups.length}
            recommendationsCount={recommendations.length}
          />

          <FilterBar
            searchQuery={searchTerm}
            onSearchChange={setSearchTerm}
            onFilterPress={handleFilterPress}
            filterCount={filterCount}
          />

          {isLoading && data.length === 0 ? (
            <View style={styles.loadingContainer}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : (
            <View style={styles.listWrapper}>
              <FlashList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={renderSeparator}
                onEndReached={hasMore ? onLoadMore : undefined}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={renderEmpty}
                ListFooterComponent={renderFooter}
                onScrollBeginDrag={Keyboard.dismiss}
                showsVerticalScrollIndicator={false}
              />
            </View>
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
      </GestureDetector>
    </AppLayout>
  );
};
