import React, { useCallback, useEffect, useMemo } from 'react';

import {
  View,
  FlatList,
  ListRenderItem,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { GestureDetector } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { EmptyState } from '@/components/ui/emptyState';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useTabBarHeight } from '@/hooks/useTabBarHeight';
import { useSwipeableFilters } from '@/hooks/useSwipeableFilters';
import { TabParamList, RootStackParamList } from '@/navigation/typesNavigation';
import { EventCard } from '@/screens/exploreScreen/components/EventCard';
import { Event } from '@/services/events/typesEvents';
import { EventFilter } from './components/EventFilter';
import { CalendarView } from './components/CalendarView';
import { CollapsibleCalendarHeader } from './components/CollapsibleCalendarHeader';
import { useEventsScreen } from './useEventsScreen';
import { EventsScreenProps, EventFilterType } from './typesEventsScreen';
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
    events,
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

  const tabBarHeight = useTabBarHeight();

  const eventFilters: EventFilterType[] = [
    'upcoming',
    'organizing',
    'participating',
    'invited',
  ];

  const { panGesture } = useSwipeableFilters({
    filters: eventFilters,
    activeFilter: eventFilter,
    onChange: setEventFilter,
  });

  const listContentStyle = useMemo(
    () => [styles.listContent, { paddingBottom: tabBarHeight }],
    [tabBarHeight]
  );

  const selectedDateListStyle = useMemo(
    () => [styles.selectedDateList, { paddingBottom: tabBarHeight }],
    [tabBarHeight]
  );

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

  const renderItem: ListRenderItem<Event> = useCallback(
    ({ item: event }) => {
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

  const tabNavigation = useNavigation<BottomTabNavigationProp<TabParamList>>();
  const rootNavigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleDiscoverEvents = useCallback(() => {
    tabNavigation.navigate('ExploreTab');
  }, [tabNavigation]);

  const handleCreateEvent = useCallback(() => {
    rootNavigation.navigate('CreateEvent');
  }, [rootNavigation]);

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

  const keyExtractor = useCallback((item: Event) => item.id, []);

  const renderListView = useCallback(() => {
    return (
      <GestureDetector gesture={panGesture}>
        <View style={styles.gestureContainer}>
          <EventFilter
            value={eventFilter}
            filterCounts={filterCounts}
            onChange={setEventFilter}
          />
          {isLoading && events.length === 0 ? (
            <View style={styles.loadingContainer}>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </View>
          ) : (
            <FlatList
              data={events}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={listContentStyle}
              onEndReached={hasMore ? loadMoreEvents : undefined}
              onEndReachedThreshold={0.5}
              ListEmptyComponent={renderEmpty}
              ListFooterComponent={renderFooter}
              showsVerticalScrollIndicator={false}
            />
          )}
        </View>
      </GestureDetector>
    );
  }, [
    panGesture,
    eventFilter,
    filterCounts,
    setEventFilter,
    isLoading,
    events,
    renderItem,
    keyExtractor,
    hasMore,
    loadMoreEvents,
    renderEmpty,
    renderFooter,
    listContentStyle,
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
          contentContainerStyle={selectedDateListStyle}
          ListEmptyComponent={() => (
            <EmptyState
              icon="calendar-outline"
              title="Nada agendado para esta data"
              message="Que tal criar um evento? Reúna seus amigos e marque um jogo incrível!"
              actionLabel="Criar Evento"
              onActionPress={handleCreateEvent}
              secondaryActionLabel="Descobrir Eventos"
              onSecondaryActionPress={handleDiscoverEvents}
              testID="calendar-empty-state"
            />
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
    selectedDateListStyle,
    handleCreateEvent,
    handleDiscoverEvents,
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          {viewMode === 'list' ? renderListView() : renderCalendarView()}
        </View>
      </TouchableWithoutFeedback>
    </AppLayout>
  );
};
