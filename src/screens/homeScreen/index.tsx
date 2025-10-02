import React, { useState, useCallback } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AppLayout } from '@/components/AppLayout';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { SortModal } from './components/SortModal';
import { useHomeEvents } from './hooks/useHomeEvents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useHomeScreen } from './useHomeScreen';
import { ArenaColors } from '@/constants';
import { Event, EventsFilter } from '@/services/events/typesEvents';
import { styles } from './stylesHomeScreen';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { handleLogout } = useHomeScreen(navigation);
  const [searchValue, setSearchValue] = useState('');
  const [appliedFilters, setAppliedFilters] = useState<Partial<EventsFilter>>(
    {}
  );
  const [showSortModal, setShowSortModal] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  const {
    events,
    isLoading,
    isRefreshing,
    isLoadingMore,
    error,
    hasMore,
    refreshEvents,
    loadMoreEvents,
    handleShare,
    currentFilters,
  } = useHomeEvents({
    searchTerm: searchValue,
    externalFilters: appliedFilters,
  });

  const handleSortPress = useCallback(() => {
    setShowSortModal(true);
  }, []);

  const handleApplySort = useCallback(
    async (
      sortBy: 'date' | 'distance' | 'price' | 'name',
      sortOrder: 'asc' | 'desc'
    ) => {
      setIsSorting(true);
      setAppliedFilters(prev => ({
        ...prev,
        sortBy,
        sortOrder,
      }));

      setTimeout(() => {
        setIsSorting(false);
      }, 800);
    },
    []
  );

  const handleFilterPress = useCallback(() => {
    navigation.navigate('FilterScreen', {
      currentFilters: currentFilters,
      onApplyFilters: (filters: EventsFilter) => {
        setIsSorting(true);
        setAppliedFilters(filters);

        setTimeout(() => {
          setIsSorting(false);
        }, 800);
      },
    });
  }, [navigation, currentFilters]);

  const handleEventPress = (eventId: string) => {
    navigation.navigate('Home');
  };

  const handleActionPress = (eventId: string) => {
    void eventId;
  };

  const renderItem = ({ item }: { item: Event }) => (
    <EventCard
      event={item}
      onPress={handleEventPress}
      onShare={handleShare}
      onActionPress={handleActionPress}
    />
  );

  const renderEmpty = () => {
    if (isLoading) return null;

    return (
      <View style={styles.emptyContainer}>
        <Text variant="headingPrimary" style={styles.emptyTitle}>
          Nenhum evento encontrado
        </Text>
        <Text variant="bodySecondary" style={styles.emptyText}>
          {searchValue
            ? 'Tente buscar por outro termo'
            : 'Não há eventos disponíveis no momento'}
        </Text>
      </View>
    );
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.footer}>
        <SportsLoading size="sm" animationSpeed="fast" />
      </View>
    );
  };

  return (
    <AppLayout onLogout={handleLogout}>
      <View style={styles.filterBarContainer}>
        <FilterBar
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          onSortPress={handleSortPress}
          onFilterPress={handleFilterPress}
        />
      </View>

      {(isLoading && events.length === 0) || isSorting ? (
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      ) : (
        <FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.content}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshEvents}
              tintColor={ArenaColors.brand.primary}
              colors={[ArenaColors.brand.primary]}
            />
          }
          onEndReached={hasMore ? loadMoreEvents : undefined}
          onEndReachedThreshold={0.5}
          ListEmptyComponent={renderEmpty}
          ListFooterComponent={renderFooter}
        />
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
          sortBy:
            (currentFilters.sortBy as 'date' | 'distance' | 'price' | 'name') ||
            'date',
          sortOrder: currentFilters.sortOrder || 'asc',
        }}
        onClose={() => setShowSortModal(false)}
        onApply={handleApplySort}
      />
    </AppLayout>
  );
};
