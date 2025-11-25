import React, { useCallback, useEffect } from 'react';

import {
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { EmptyState } from '@/components/ui/emptyState';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { TabParamList } from '@/navigation/typesNavigation';
import { EventCard } from '@/screens/homeScreen/components/EventCard';
import { EventFilter } from './components/EventFilter';
import { CalendarView } from './components/CalendarView';
import { CollapsibleCalendarHeader } from './components/CollapsibleCalendarHeader';
import { EventSectionHeader } from '@/screens/myEventsScreen/components/EventSectionHeader';
import { TimeCategory } from '@/screens/myEventsScreen/typesMyEventsScreen';
import { useEventsScreen } from './useEventsScreen';
import { EventsScreenProps, GroupedEventItem } from './typesEventsScreen';
import { styles } from './stylesEventsScreen';

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
    isCalendarExpanded,
    toggleCalendarExpanded,
    loadMoreEvents,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  } = useEventsScreen();

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleToggleCalendar = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    toggleCalendarExpanded();
  }, [toggleCalendarExpanded]);

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

  const navigation = useNavigation<BottomTabNavigationProp<TabParamList>>();

  const handleDiscoverEvents = useCallback(() => {
    navigation.navigate('HomeTab');
  }, [navigation]);

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;

    return (
      <EmptyState
        icon="trophy-outline"
        title="Vamos começar algo incrível!"
        message="Nenhum evento por aqui ainda. Explore eventos da sua região ou crie o primeiro!"
        actionLabel="Descobrir Eventos"
        onActionPress={handleDiscoverEvents}
        testID="events-empty-state"
      />
    );
  }, [isLoading, handleDiscoverEvents]);

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

  const renderListView = useCallback(() => {
    return (
      <>
        <EventFilter
          value={eventFilter}
          filterCounts={filterCounts}
          onChange={setEventFilter}
        />
        {isLoading && groupedEvents.length === 0 ? (
          <View style={styles.loadingContainer}>
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
        <CollapsibleCalendarHeader
          selectedDate={selectedDate}
          eventsCount={eventsForSelectedDate.length}
          isExpanded={isCalendarExpanded}
          onToggle={handleToggleCalendar}
          testID={`${testID}-calendar-header`}
        />

        {isCalendarExpanded && (
          <CalendarView
            markedDates={markedDates}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        )}

        <FlatList
          data={eventsForSelectedDate}
          renderItem={({ item }) => (
            <View style={styles.eventCardContainer}>
              <EventCard
                event={item}
                onDetailsPress={handleDetailsPress}
                onManagePress={handleManagePress}
                onShare={() => handleShare(item)}
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
              <Text variant="bodySecondary">Nenhum evento nesta data</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }, [
    selectedDate,
    eventsForSelectedDate,
    isCalendarExpanded,
    handleToggleCalendar,
    markedDates,
    setSelectedDate,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
    testID,
  ]);

  return (
    <AppLayout
      testID={testID}
      headerVariant="main"
      headerShowLogo={true}
      headerRightComponent={
        <View style={styles.viewToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'list' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('list')}
            testID={`${testID}-toggle-list`}
            activeOpacity={0.7}
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
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              viewMode === 'calendar' && styles.toggleButtonActive,
            ]}
            onPress={() => setViewMode('calendar')}
            testID={`${testID}-toggle-calendar`}
            activeOpacity={0.7}
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
          </TouchableOpacity>
        </View>
      }
    >
      <View style={styles.container}>
        {viewMode === 'list' ? renderListView() : renderCalendarView()}
      </View>
    </AppLayout>
  );
};
