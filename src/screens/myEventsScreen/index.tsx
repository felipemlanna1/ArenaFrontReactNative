import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { EventCard } from '@/screens/homeScreen/components/EventCard';
import { EventTypeFilter } from './components/EventTypeFilter';
import { EventSectionHeader } from './components/EventSectionHeader';
import { useMyEventsScreen } from './useMyEventsScreen';
import { MyEventsScreenProps, GroupedEventItem } from './typesMyEventsScreen';
import { styles } from './stylesMyEventsScreen';

const FILTER_LABELS: Record<string, string> = {
  all: 'Todos os eventos',
  organizing: 'Eventos que você organiza',
  participating: 'Eventos que você participa',
  invited: 'Convites pendentes',
};

export const MyEventsScreen: React.FC<MyEventsScreenProps> = ({
  testID = 'my-events-screen',
}) => {
  const {
    groupedEvents,
    isLoading,
    isRefreshing,
    isLoadingMore,
    hasMore,
    eventFilter,
    setEventFilter,
    refetch,
    loadMoreEvents,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  } = useMyEventsScreen();

  const renderItem: ListRenderItem<GroupedEventItem> = useCallback(
    ({ item }) => {
      if (item.type === 'header') {
        return <EventSectionHeader label={item.label} />;
      }

      return (
        <View style={styles.eventCardContainer}>
          <EventCard
            event={item.event}
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
        </View>
      );
    },
    [handleDetailsPress, handleManagePress, handleShare, eventActions]
  );

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="calendar-outline"
          size={64}
          color={ArenaColors.neutral.medium}
        />
        <Text variant="headingPrimary">Nenhum evento encontrado</Text>
        <Text variant="bodySecondary">{FILTER_LABELS[eventFilter]}</Text>
      </View>
    );
  }, [isLoading, eventFilter]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <SportsLoading size="sm" animationSpeed="fast" />
      </View>
    );
  }, [isLoadingMore]);

  const keyExtractor = useCallback((item: GroupedEventItem, index: number) => {
    if (item.type === 'header') {
      return `header-${item.category}`;
    }
    return `event-${item.event.id}-${index}`;
  }, []);

  return (
    <AppLayout testID={testID}>
      <View style={styles.container}>
        <EventTypeFilter value={eventFilter} onChange={setEventFilter} />

        {isLoading && groupedEvents.length === 0 ? (
          <View style={styles.loadingContainer}>
            <SportsLoading size="lg" animationSpeed="normal" />
          </View>
        ) : (
          <FlatList
            data={groupedEvents}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            contentContainerStyle={styles.listContent}
            onEndReached={hasMore ? loadMoreEvents : undefined}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </AppLayout>
  );
};
