import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { EventCard } from '@/screens/homeScreen/components/EventCard';
import { EventFilter } from './components/EventFilter';
import { CalendarView } from './components/CalendarView';
import { EventSectionHeader } from '@/screens/myEventsScreen/components/EventSectionHeader';
import { TimeCategory } from '@/screens/myEventsScreen/typesMyEventsScreen';
import { useEventsScreen } from './useEventsScreen';
import { EventsScreenProps, GroupedEventItem } from './typesEventsScreen';
import { styles } from './stylesEventsScreen';

const FILTER_LABELS: Record<string, string> = {
  upcoming: 'Próximos eventos',
  organizing: 'Eventos que você organiza',
  participating: 'Eventos que você participa',
  invited: 'Convites pendentes',
};

export const EventsScreen: React.FC<EventsScreenProps> = ({
  testID = 'events-screen',
}) => {
  const {
    viewMode,
    setViewMode,
    eventFilter,
    setEventFilter,
    filterCounts,
    groupedEvents,
    isLoading,
    isLoadingMore,
    hasMore,
    selectedDate,
    setSelectedDate,
    markedDates,
    eventsForSelectedDate,
    loadMoreEvents,
    refreshEvents,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  } = useEventsScreen();

  const renderItem: ListRenderItem<GroupedEventItem> = useCallback(
    ({ item }) => {
      if (item.type === 'header') {
        return (
          <EventSectionHeader
            label={item.label ?? ''}
            category={(item.category ?? 'upcoming') as TimeCategory}
            count={item.count ?? 0}
          />
        );
      }

      if (!item.event) return null;

      const event = item.event;

      return (
        <View style={styles.eventCardContainer}>
          <EventCard
            event={event}
            onDetailsPress={handleDetailsPress}
            onManagePress={handleManagePress}
            onShare={() => handleShare(event)}
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
        <SkeletonCard />
      </View>
    );
  }, [isLoadingMore]);

  const keyExtractor = useCallback((item: GroupedEventItem, index: number) => {
    if (item.type === 'header') {
      return `header-${item.category}`;
    }
    return `event-${item.event?.id || index}`;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <View style={styles.header}>
        <Text variant="headingPrimary" style={styles.headerTitle}>
          Eventos
        </Text>
        <View style={styles.viewToggle}>
          <Pressable
            style={[
              styles.toggleButton,
              viewMode === 'list' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('list')}
            testID={`${testID}-toggle-list`}
          >
            <Ionicons
              name="list"
              size={24}
              color={
                viewMode === 'list'
                  ? ArenaColors.neutral.light
                  : ArenaColors.neutral.medium
              }
            />
          </Pressable>
          <Pressable
            style={[
              styles.toggleButton,
              viewMode === 'calendar' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('calendar')}
            testID={`${testID}-toggle-calendar`}
          >
            <Ionicons
              name="calendar"
              size={24}
              color={
                viewMode === 'calendar'
                  ? ArenaColors.neutral.light
                  : ArenaColors.neutral.medium
              }
            />
          </Pressable>
        </View>
      </View>
    );
  }, [viewMode, setViewMode, testID]);

  const renderListView = useCallback(() => {
    return (
      <>
        <View style={styles.filtersContainer}>
          <EventFilter
            value={eventFilter}
            filterCounts={filterCounts}
            onChange={setEventFilter}
          />
        </View>
        {isLoading && groupedEvents.length === 0 ? (
          <View style={styles.emptyContainer}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
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
      </>
    );
  }, [
    eventFilter,
    filterCounts,
    setEventFilter,
    isLoading,
    groupedEvents,
    renderItem,
    keyExtractor,
    hasMore,
    loadMoreEvents,
    renderEmpty,
    renderFooter,
  ]);

  const renderCalendarView = useCallback(() => {
    return (
      <View style={styles.calendarContainer}>
        <CalendarView
          markedDates={markedDates}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <View style={styles.selectedDateHeader}>
          <Text variant="titlePrimary">
            {selectedDate.toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </Text>
          <Text variant="bodySecondary">
            {eventsForSelectedDate.length} evento(s)
          </Text>
        </View>

        <FlatList
          data={eventsForSelectedDate}
          renderItem={({ item }) => (
            <View style={styles.eventCardContainer}>
              <EventCard
                event={item}
                onDetailsPress={handleDetailsPress}
                onManagePress={handleManagePress}
                onShare={(eventId) => handleShare(item)}
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
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.selectedDateList}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="calendar-outline"
                size={64}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="bodySecondary">
                Nenhum evento nesta data
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }, [
    markedDates,
    selectedDate,
    setSelectedDate,
    eventsForSelectedDate,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  ]);

  return (
    <AppLayout testID={testID}>
      <View style={{ flex: 1 }}>
        {renderHeader()}
        {viewMode === 'list' ? renderListView() : renderCalendarView()}

        <View style={styles.fabContainer}>
          <Button
            variant="primary"
            size="lg"
            iconOnly
            onPress={() => {}}
            testID={`${testID}-create-fab`}
          >
            <Ionicons
              name="add"
              size={28}
              color={ArenaColors.neutral.light}
            />
          </Button>
        </View>
      </View>
    </AppLayout>
  );
};
