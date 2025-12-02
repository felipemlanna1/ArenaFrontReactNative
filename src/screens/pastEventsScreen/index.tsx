import React, { useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaColors } from '@/constants';
import { usePastEventsScreen } from './usePastEventsScreen';
import { PastEventCard } from './components/PastEventCard';
import type { EnrichedPastEvent } from './typesPastEventsScreen';
import { styles } from './stylesPastEventsScreen';

export const PastEventsScreen: React.FC = () => {
  const {
    enrichedEvents,
    isLoading,
    isRefreshing,
    error,
    refetch,
    navigateToEventDetails,
    navigateToFeedback,
    keyExtractor,
    getItemLayout,
  } = usePastEventsScreen();

  const renderItem = useCallback(
    ({ item }: { item: EnrichedPastEvent }) => (
      <PastEventCard
        event={item}
        onDetailsPress={navigateToEventDetails}
        onFeedbackPress={navigateToFeedback}
      />
    ),
    [navigateToEventDetails, navigateToFeedback]
  );

  const renderEmpty = useCallback(
    () => (
      <View style={styles.errorContainer}>
        <Ionicons
          name="calendar-outline"
          size={64}
          color={ArenaColors.neutral.medium}
        />
        <Text variant="titleSecondary">Nenhum evento passado</Text>
        <Text variant="bodySecondary">
          Você ainda não participou de eventos
        </Text>
      </View>
    ),
    []
  );

  if (isLoading && enrichedEvents.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <SportsLoading size="lg" animationSpeed="normal" />
      </View>
    );
  }

  if (error && enrichedEvents.length === 0) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons
          name="cloud-offline-outline"
          size={64}
          color={ArenaColors.semantic.error}
        />
        <Text variant="titleSecondary">Erro ao carregar eventos</Text>
        <Text variant="bodySecondary">{error.message}</Text>
        <Button variant="primary" size="md" onPress={refetch}>
          Tentar Novamente
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={enrichedEvents}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        getItemLayout={getItemLayout}
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refetch}
            tintColor={ArenaColors.brand.primary}
          />
        }
      />
    </View>
  );
};
