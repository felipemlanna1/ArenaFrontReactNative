import React, { useCallback } from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { AccordionSection } from '@/components/accordionSection';
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
    return (
      <>
        {isLoadingMore && (
          <View style={styles.loadingFooter}>
            <SkeletonCard />
          </View>
        )}
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
  }, [isLoadingMore, pastEvents, handleDetailsPress, handleShare]);

  const keyExtractor = useCallback((item: GroupedEventItem, index: number) => {
    if (item.type === 'header') {
      return `header-${item.category}`;
    }
    return `event-${item.event.id}-${index}`;
  }, []);

  return (
    <AppLayout testID={testID}>
      <View style={styles.container}>
        <EventTypeFilter
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
      </View>
    </AppLayout>
  );
};
