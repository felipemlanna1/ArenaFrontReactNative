import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { EmptyState } from '@/components/ui/emptyState';
import { AccordionSection } from '@/components/accordionSection';
import { AppLayout } from '@/components/AppLayout';
import { TabParamList } from '@/navigation/typesNavigation';
import { EventCard } from '@/screens/exploreScreen/components/EventCard';
import { EventTypeFilter } from './components/EventTypeFilter';
import { EventSectionHeader } from './components/EventSectionHeader';
import { useMyEventsScreen } from './useMyEventsScreen';
import { MyEventsScreenProps, GroupedEventItem } from './typesMyEventsScreen';
import { styles } from './stylesMyEventsScreen';

export const MyEventsScreen: React.FC<MyEventsScreenProps> = ({
  testID = 'my-events-screen',
}) => {
  const {
    groupedEvents,
    pastEvents,
    isLoading,
    isLoadingMore,
    hasMore,
    eventFilter,
    filterCounts,
    setEventFilter,
    loadMoreEvents,
    handleDetailsPress,
    handleManagePress,
    handleShare,
    eventActions,
  } = useMyEventsScreen();

  const renderItem: ListRenderItem<GroupedEventItem> = useCallback(
    ({ item }) => {
      if (item.type === 'header') {
        return (
          <EventSectionHeader
            label={item.label}
            category={item.category}
            count={item.count}
          />
        );
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
        testID="my-events-empty-state"
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
    return `event-${item.event.id}-${index}`;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <>
        <EventTypeFilter
          value={eventFilter}
          filterCounts={filterCounts}
          onChange={setEventFilter}
        />
        {pastEvents.length > 0 && (
          <AccordionSection
            title="Eventos Passados"
            count={pastEvents.length}
            defaultExpanded={false}
          >
            {pastEvents.map(event => (
              <View key={event.id} style={styles.eventCardContainer}>
                <EventCard
                  event={event}
                  onDetailsPress={handleDetailsPress}
                  onManagePress={undefined}
                  onShare={handleShare}
                  onJoinEvent={undefined}
                  onRequestJoin={undefined}
                  onCancelParticipation={undefined}
                  onUndoRequest={undefined}
                  onAcceptInvitation={undefined}
                  onRejectInvitation={undefined}
                  isActionLoading={false}
                  currentActionEventId={null}
                />
              </View>
            ))}
          </AccordionSection>
        )}
      </>
    );
  }, [
    eventFilter,
    filterCounts,
    setEventFilter,
    pastEvents,
    handleDetailsPress,
    handleShare,
  ]);

  return (
    <AppLayout testID={testID}>
      <View style={styles.container}>
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
            ListHeaderComponent={renderHeader}
            stickyHeaderIndices={[0]}
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
