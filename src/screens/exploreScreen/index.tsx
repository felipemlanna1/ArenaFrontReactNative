import React, { useCallback, useState, useMemo } from 'react';
import { View, RefreshControl } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { GestureDetector } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { SkeletonUserCard } from '@/components/ui/skeletonUserCard';
import { AppLayout } from '@/components/AppLayout';
import { FilterBar } from './components/FilterBar';
import { ExploreTabBar, ExploreTab } from './components/ExploreTabBar';
import { useSwipeableFilters } from '@/hooks/useSwipeableFilters';
import { EventCard } from './components/EventCard';
import { GroupCard } from '@/components/ui/groupCard';
import { UserCard } from '@/components/userCard';
import { SortModal } from './components/SortModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  RootStackParamList,
  TabParamList,
  ExploreStackParamList,
} from '@/navigation/typesNavigation';
import { useExploreScreen } from './useExploreScreen';
import { useExploreGroups } from './hooks/useExploreGroups';
import { useExploreFriends } from './hooks/useExploreFriends';
import { Event } from '@/services/events/typesEvents';
import { Group } from '@/services/groups/typesGroups';
import { ArenaColors, ArenaCopy } from '@/constants';
import { haptic } from '@/utils/haptics';
import { useToast } from '@/contexts/ToastContext';
import { useTabBarHeight } from '@/hooks/useTabBarHeight';
import { styles } from './stylesExploreScreen';

type ExploreScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<ExploreStackParamList, 'Explore'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

interface ExploreScreenProps {
  navigation: ExploreScreenNavigationProp;
}

export const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<ExploreTab>('events');
  const tabBarHeight = useTabBarHeight();

  const homeTabs: ExploreTab[] = ['events', 'groups', 'friends'];

  const { composedGesture } = useSwipeableFilters({
    filters: homeTabs,
    activeFilter: activeTab,
    onChange: setActiveTab,
  });

  const {
    events,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    searchTerm,
    setSearchTerm,
    handleSortPress,
    handleFilterPress,
    handleApplySort,
    refreshEvents,
    loadMoreEvents,
    handleShare,
    showSortModal,
    setShowSortModal,
    sortBy,
    sortOrder,
    eventActions,
  } = useExploreScreen(navigation as never);

  const groupsData = useExploreGroups();
  const friendsData = useExploreFriends();

  const listContainerStyle = useMemo(
    () => [styles.listContainer, { paddingBottom: tabBarHeight }],
    [tabBarHeight]
  );

  const handleDetailsPress = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetails', { eventId });
    },
    [navigation]
  );

  const handleManagePress = useCallback(
    (eventId: string) => {
      navigation.navigate('EventDetails', { eventId });
    },
    [navigation]
  );

  const handleCreateEventPress = useCallback(() => {
    haptic.light();
    navigation.navigate('CreateEvent');
  }, [navigation]);

  const handleCreateGroupPress = useCallback(() => {
    haptic.light();
    navigation.navigate('CreateGroup' as never);
  }, [navigation]);

  const handleGroupDetailsPress = useCallback(
    (groupId: string) => {
      navigation.navigate('GroupDetails' as never, { groupId } as never);
    },
    [navigation]
  );

  const handleGroupManagePress = useCallback(
    (groupId: string) => {
      navigation.navigate('GroupDetails' as never, { groupId } as never);
    },
    [navigation]
  );

  const handleJoinGroup = useCallback(
    async (groupId: string) => {
      try {
        await groupsData.refreshGroups();
        haptic.success();
        showToast('Solicitação enviada', 'success');
      } catch {
        haptic.error();
        showToast('Erro ao solicitar entrada no grupo', 'error');
      }
    },
    [groupsData, showToast]
  );

  const handleLeaveGroup = useCallback(
    async (groupId: string) => {
      try {
        await groupsData.refreshGroups();
        haptic.success();
        showToast('Você saiu do grupo', 'success');
      } catch {
        haptic.error();
        showToast('Erro ao sair do grupo', 'error');
      }
    },
    [groupsData, showToast]
  );

  const handleUserPress = useCallback(
    (userId: string) => {
      navigation.navigate('UserProfile' as never, { userId } as never);
    },
    [navigation]
  );

  const handleAddFriend = useCallback(async () => {
    try {
      await friendsData.refreshFriends();
      haptic.success();
      showToast('Solicitação de amizade enviada', 'success');
    } catch {
      haptic.error();
      showToast('Erro ao enviar solicitação', 'error');
    }
  }, [friendsData, showToast]);

  const handleTabChange = useCallback((tab: ExploreTab) => {
    haptic.light();
    setActiveTab(tab);
  }, []);

  const getSearchPlaceholder = useCallback((): string => {
    switch (activeTab) {
      case 'events':
        return 'Buscar eventos...';
      case 'groups':
        return 'Buscar grupos...';
      case 'friends':
        return 'Buscar pessoas...';
      default:
        return 'Buscar...';
    }
  }, [activeTab]);

  const getTabData = useCallback(() => {
    switch (activeTab) {
      case 'events':
        return {
          data: events,
          isLoading,
          isRefreshing,
          isLoadingMore,
          hasMore,
          refresh: refreshEvents,
          loadMore: loadMoreEvents,
        };
      case 'groups':
        return {
          data: groupsData.groups,
          isLoading: groupsData.isLoading,
          isRefreshing: groupsData.isRefreshing,
          isLoadingMore: groupsData.isLoadingMore,
          hasMore: groupsData.hasMore,
          refresh: groupsData.refreshGroups,
          loadMore: groupsData.loadMoreGroups,
        };
      case 'friends':
        return {
          data: friendsData.friends,
          isLoading: friendsData.isLoading,
          isRefreshing: friendsData.isRefreshing,
          isLoadingMore: friendsData.isLoadingMore,
          hasMore: friendsData.hasMore,
          refresh: friendsData.refreshFriends,
          loadMore: friendsData.loadMoreFriends,
        };
      default:
        return {
          data: events,
          isLoading,
          isRefreshing,
          isLoadingMore,
          hasMore,
          refresh: refreshEvents,
          loadMore: loadMoreEvents,
        };
    }
  }, [
    activeTab,
    events,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    refreshEvents,
    loadMoreEvents,
    groupsData,
    friendsData,
  ]);

  const handleRefresh = useCallback(async () => {
    haptic.light();
    try {
      const tabData = getTabData();
      await tabData.refresh();
      haptic.success();
      const message =
        activeTab === 'events'
          ? 'Eventos atualizados'
          : activeTab === 'groups'
            ? 'Grupos atualizados'
            : 'Amigos atualizados';
      showToast(message, 'success');
    } catch {
      haptic.error();
      const message =
        activeTab === 'events'
          ? 'Erro ao atualizar eventos'
          : activeTab === 'groups'
            ? 'Erro ao atualizar grupos'
            : 'Erro ao atualizar amigos';
      showToast(message, 'error');
    }
  }, [getTabData, activeTab, showToast]);

  const keyExtractor = useCallback((item: Event | Group | { id: string }) => {
    return item.id;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Event | Group | { id: string }; index: number }) => {
      if (activeTab === 'events') {
        const event = item as Event;
        return (
          <EventCard
            event={event}
            onDetailsPress={handleDetailsPress}
            onManagePress={handleManagePress}
            onShare={handleShare}
            onJoinEvent={eventActions.handleJoinEvent}
            onRequestJoin={eventActions.handleRequestJoin}
            onCancelParticipation={eventActions.handleCancelParticipation}
            onUndoRequest={eventActions.handleUndoRequest}
            onAcceptInvitation={eventActions.handleAcceptInvitation}
            onRejectInvitation={eventActions.handleRejectInvitation}
            isActionLoading={eventActions.isActionLoading}
            currentActionEventId={eventActions.currentActionEventId}
          />
        );
      }

      if (activeTab === 'groups') {
        const group = item as Group;
        return (
          <GroupCard
            group={group}
            onDetailsPress={handleGroupDetailsPress}
            onManagePress={handleGroupManagePress}
            onJoinGroup={handleJoinGroup}
            onLeaveGroup={handleLeaveGroup}
            testID={`group-card-${group.id}`}
          />
        );
      }

      if (activeTab === 'friends') {
        const friend = item as {
          id: string;
          firstName: string;
          lastName: string;
          username: string;
          profilePicture?: string;
          city?: string;
          state?: string;
          favoriteSports?: { id: string; name: string }[];
        };
        return (
          <UserCard
            user={
              {
                id: friend.id,
                firstName: friend.firstName,
                lastName: friend.lastName,
                username: friend.username,
                profilePicture: friend.profilePicture,
                city: friend.city,
                state: friend.state,
                sports: friend.favoriteSports?.map(s => ({
                  id: s.id,
                  name: s.name,
                })),
              } as never
            }
            variant="recommendation"
            onPress={() => handleUserPress(friend.id)}
            onAddFriend={handleAddFriend}
            testID={`user-card-${friend.id}`}
          />
        );
      }

      return null;
    },
    [
      activeTab,
      handleDetailsPress,
      handleManagePress,
      handleShare,
      eventActions,
      handleGroupDetailsPress,
      handleGroupManagePress,
      handleJoinGroup,
      handleLeaveGroup,
      handleUserPress,
      handleAddFriend,
    ]
  );

  const renderFooter = useCallback(() => {
    const tabData = getTabData();
    if (!tabData.isLoadingMore) return null;

    return (
      <View style={styles.footer}>
        {activeTab === 'friends' ? <SkeletonUserCard /> : <SkeletonCard />}
      </View>
    );
  }, [getTabData, activeTab]);

  const tabData = getTabData();
  const shouldShowLoading = tabData.isLoading && tabData.data.length === 0;
  const shouldShowEmptyState = !tabData.isLoading && tabData.data.length === 0;

  const getEmptyStateConfig = () => {
    switch (activeTab) {
      case 'events':
        return {
          icon: 'trophy-outline' as const,
          title: searchTerm
            ? 'Nenhum evento encontrado'
            : ArenaCopy.emptyStates.noEvents.title,
          description: searchTerm
            ? 'Tente buscar por outro termo ou ajuste os filtros'
            : ArenaCopy.emptyStates.noEvents.description,
          primaryAction: ArenaCopy.emptyStates.noEvents.primaryAction,
          onPrimaryAction: handleCreateEventPress,
        };
      case 'groups':
        return {
          icon: 'people-circle-outline' as const,
          title: searchTerm
            ? 'Nenhum grupo encontrado'
            : 'Nenhum grupo por aqui',
          description: searchTerm
            ? 'Tente buscar por outro termo ou ajuste os filtros'
            : 'Crie um grupo ou explore grupos da sua região',
          primaryAction: 'Criar Grupo',
          onPrimaryAction: handleCreateGroupPress,
        };
      case 'friends':
        return {
          icon: 'people-outline' as const,
          title: searchTerm
            ? 'Nenhuma pessoa encontrada'
            : 'Nenhuma recomendação',
          description: searchTerm
            ? 'Tente buscar por outro termo ou ajuste os filtros'
            : 'Ajuste os filtros para encontrar pessoas',
          primaryAction: null,
          onPrimaryAction: null,
        };
    }
  };

  const emptyState = getEmptyStateConfig();

  return (
    <AppLayout headerVariant="main" headerShowLogo={true}>
      <GestureDetector gesture={composedGesture}>
        <View style={styles.content}>
          <ExploreTabBar
            activeTab={activeTab}
            onTabChange={handleTabChange}
            eventsCount={events.length}
            groupsCount={groupsData.groups.length}
            friendsCount={friendsData.friends.length}
          />

          <FilterBar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            onSortPress={handleSortPress}
            onFilterPress={handleFilterPress}
            placeholder={getSearchPlaceholder()}
          />

          {shouldShowLoading ? (
            <View style={styles.loadingContainer}>
              {activeTab === 'friends' ? (
                <>
                  <SkeletonUserCard />
                  <SkeletonUserCard />
                  <SkeletonUserCard />
                </>
              ) : (
                <>
                  <SkeletonCard />
                  <SkeletonCard />
                  <SkeletonCard />
                </>
              )}
            </View>
          ) : shouldShowEmptyState ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name={emptyState.icon}
                size={64}
                color={ArenaColors.neutral.medium}
                style={styles.emptyIcon}
              />
              <Text variant="headingPrimary" style={styles.emptyTitle}>
                {emptyState.title}
              </Text>
              <Text variant="bodySecondary" style={styles.emptyText}>
                {emptyState.description}
              </Text>

              {!searchTerm &&
                emptyState.primaryAction &&
                emptyState.onPrimaryAction && (
                  <>
                    <View style={styles.emptyActionsContainer}>
                      <Button
                        variant="primary"
                        size="lg"
                        onPress={emptyState.onPrimaryAction}
                        fullWidth
                        testID={`empty-create-${activeTab}-button`}
                      >
                        {emptyState.primaryAction}
                      </Button>
                      <Button
                        variant="ghost"
                        size="md"
                        onPress={handleFilterPress}
                        fullWidth
                        testID="empty-filter-button"
                      >
                        {activeTab === 'events'
                          ? ArenaCopy.emptyStates.noEvents.secondaryAction
                          : 'Ajustar Filtros'}
                      </Button>
                    </View>
                  </>
                )}
            </View>
          ) : (
            <View style={styles.listWrapper}>
              <FlashList
                data={tabData.data}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                contentContainerStyle={listContainerStyle}
                onEndReached={tabData.hasMore ? tabData.loadMore : undefined}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderFooter}
                refreshControl={
                  <RefreshControl
                    refreshing={tabData.isRefreshing}
                    onRefresh={handleRefresh}
                    tintColor={ArenaColors.brand.primary}
                    colors={[ArenaColors.brand.primary]}
                    progressBackgroundColor={ArenaColors.neutral.dark}
                    testID="home-refresh-control"
                  />
                }
              />
            </View>
          )}

          {error && (
            <View style={styles.errorContainer}>
              <Text variant="bodyPrimary" style={styles.errorText}>
                {error.message}
              </Text>
            </View>
          )}

          <SortModal
            visible={showSortModal}
            currentSort={{
              sortBy,
              sortOrder,
            }}
            onClose={() => setShowSortModal(false)}
            onApply={handleApplySort}
          />
        </View>
      </GestureDetector>
    </AppLayout>
  );
};
