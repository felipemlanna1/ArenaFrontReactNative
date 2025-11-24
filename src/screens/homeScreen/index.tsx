import React, { useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Fab } from '@/components/ui/fab';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { AppLayout } from '@/components/AppLayout';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { SortModal } from './components/SortModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import {
  RootStackParamList,
  TabParamList,
  HomeStackParamList,
} from '@/navigation/typesNavigation';
import { useHomeScreen } from './useHomeScreen';
import { Event } from '@/services/events/typesEvents';
import { ArenaColors, ArenaCopy, formatCopy } from '@/constants';
import { haptic } from '@/utils/haptics';
import { useToast } from '@/contexts/ToastContext';
import { styles } from './stylesHomeScreen';

type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<HomeStackParamList, 'Home'>,
  CompositeNavigationProp<
    BottomTabNavigationProp<TabParamList>,
    NativeStackNavigationProp<RootStackParamList>
  >
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { showToast } = useToast();
  const {
    events,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    searchTerm,
    handleLogout,
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
  } = useHomeScreen(navigation as never);

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

  const handleRefresh = useCallback(async () => {
    haptic.light();
    try {
      await refreshEvents();
      haptic.success();
      showToast('Eventos atualizados', 'success');
    } catch {
      haptic.error();
      showToast('Erro ao atualizar eventos', 'error');
    }
  }, [refreshEvents, showToast]);

  const keyExtractor = useCallback((item: Event) => {
    return item.id;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Event; index: number }) => {
      return (
        <EventCard
          event={item}
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
    },
    [handleDetailsPress, handleManagePress, handleShare, eventActions]
  );

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.footer}>
        <SkeletonCard />
      </View>
    );
  }, [isLoadingMore]);

  const shouldShowLoading = isLoading && events.length === 0;
  const shouldShowEmptyState = !isLoading && events.length === 0;

  return (
    <AppLayout onLogout={handleLogout}>
      <View style={styles.content}>
        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onSortPress={handleSortPress}
          onFilterPress={handleFilterPress}
        />

        {shouldShowLoading ? (
          <View style={styles.loadingContainer}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : shouldShowEmptyState ? (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="trophy-outline"
              size={64}
              color={ArenaColors.neutral.medium}
              style={styles.emptyIcon}
            />
            <Text variant="headingPrimary" style={styles.emptyTitle}>
              {searchTerm
                ? 'Nenhum evento encontrado'
                : ArenaCopy.emptyStates.noEvents.title}
            </Text>
            <Text variant="bodySecondary" style={styles.emptyText}>
              {searchTerm
                ? 'Tente buscar por outro termo ou ajuste os filtros'
                : ArenaCopy.emptyStates.noEvents.description}
            </Text>

            {!searchTerm && (
              <>
                <View style={styles.emptyActionsContainer}>
                  <Button
                    variant="primary"
                    size="lg"
                    onPress={handleCreateEventPress}
                    fullWidth
                    testID="empty-create-event-button"
                  >
                    {ArenaCopy.emptyStates.noEvents.primaryAction}
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onPress={handleFilterPress}
                    fullWidth
                    testID="empty-filter-button"
                  >
                    {ArenaCopy.emptyStates.noEvents.secondaryAction}
                  </Button>
                </View>

                <Text
                  variant="captionSecondary"
                  style={styles.emptySocialProof}
                >
                  {formatCopy(ArenaCopy.emptyStates.noEvents.socialProof, {
                    count: '10.234',
                  })}
                </Text>
              </>
            )}
          </View>
        ) : (
          <View style={styles.listWrapper}>
            <FlatList
              data={events}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              style={styles.list}
              contentContainerStyle={styles.listContainer}
              onEndReached={hasMore ? loadMoreEvents : undefined}
              onEndReachedThreshold={0.5}
              ListFooterComponent={renderFooter}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={21}
              removeClippedSubviews={false}
              refreshControl={
                <RefreshControl
                  refreshing={isRefreshing}
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

        <Fab
          onPress={handleCreateEventPress}
          icon={
            <Ionicons name="add" size={24} color={ArenaColors.neutral.light} />
          }
          testID="create-event-fab"
        />
      </View>
    </AppLayout>
  );
};
