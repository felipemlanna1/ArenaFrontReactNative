import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Fab } from '@/components/ui/fab';
import { SportsLoading } from '@/components/ui/sportsLoading';
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
import { ArenaColors } from '@/constants';
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
  const {
    events,
    isLoading,
    isLoadingMore,
    error,
    hasMore,
    searchTerm,
    handleLogout,
    setSearchTerm,
    handleSortPress,
    handleFilterPress,
    handleApplySort,
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
        <SportsLoading size="sm" animationSpeed="fast" />
      </View>
    );
  }, [isLoadingMore]);

  const shouldShowLoading = isLoading && events.length === 0;
  const shouldShowEmptyState = !isLoading && events.length === 0;

  return (
    <AppLayout onLogout={handleLogout}>
      <View style={styles.content} testID="home-screen">
        <View style={styles.filterBarContainer}>
          <FilterBar
            searchValue={searchTerm}
            onSearchChange={setSearchTerm}
            onSortPress={handleSortPress}
            onFilterPress={handleFilterPress}
          />
        </View>

        {shouldShowLoading ? (
          <View style={styles.loadingContainer}>
            <SportsLoading size="lg" animationSpeed="normal" />
          </View>
        ) : shouldShowEmptyState ? (
          <View style={styles.emptyContainer}>
            <Text variant="headingPrimary" style={styles.emptyTitle}>
              Nenhum evento encontrado
            </Text>
            <Text variant="bodySecondary" style={styles.emptyText}>
              {searchTerm
                ? 'Tente buscar por outro termo'
                : 'Não há eventos disponíveis no momento'}
            </Text>
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
          onPress={() => navigation.navigate('CreateEvent')}
          icon={
            <Ionicons name="add" size={24} color={ArenaColors.neutral.light} />
          }
          testID="create-event-fab"
        />
      </View>
    </AppLayout>
  );
};
