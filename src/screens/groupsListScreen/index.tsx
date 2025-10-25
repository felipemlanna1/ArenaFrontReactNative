import React, { useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Fab } from '@/components/ui/fab';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useGroupsFilters } from '@/contexts/GroupsFiltersContext';
import { GroupsListScreenProps } from './typesGroupsListScreen';
import { useGroupsListScreen } from './useGroupsListScreen';
import { styles } from './stylesGroupsListScreen';
import { GroupsFilterBar } from './components/GroupsFilterBar';
import { MyGroupsAccordionSection } from './components/MyGroupsAccordionSection';
import { RecommendationsAccordionSection } from './components/RecommendationsAccordionSection';

export const GroupsListScreen: React.FC<GroupsListScreenProps> = ({
  navigation,
}) => {
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
    refreshing,
    handleRefresh,
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

  const selectedSportId = activeFilters.sportIds?.[0];
  const hasActiveFilters = activeFiltersCount > 0 || searchTerm.length > 0;

  return (
    <AppLayout>
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

        <ScrollView
          style={styles.content}
          refreshControl={
            <ArenaRefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
          testID="groups-screen-scroll"
        >
          <View style={styles.accordionsContainer}>
            <MyGroupsAccordionSection
              groups={myGroups}
              isLoading={isLoadingMyGroups}
              loadingGroupId={loadingGroupId}
              onNavigateToGroup={handleGroupPress}
              onLeaveGroup={handleLeaveGroup}
            />

            <RecommendationsAccordionSection
              groups={recommendations}
              isLoading={isLoadingRecommendations}
              isLoadingMore={isLoadingMoreRecommendations}
              hasMore={hasMoreRecommendations}
              loadingGroupId={loadingGroupId}
              onNavigateToGroup={handleGroupPress}
              onJoinGroup={handleJoinGroup}
              onLoadMore={handleLoadMoreRecommendations}
            />
          </View>
        </ScrollView>

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
    </AppLayout>
  );
};
