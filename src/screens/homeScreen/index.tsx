import React, { useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { AppLayout } from '@/components/AppLayout';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { SortModal } from './components/SortModal';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useHomeScreen } from './useHomeScreen';
import { Event } from '@/services/events/typesEvents';
import { styles } from './stylesHomeScreen';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
  } = useHomeScreen(navigation);

  const handleEventPress = useCallback((eventId: string) => {
    navigation.navigate('Home');
  }, [navigation]);

  const handleActionPress = useCallback((eventId: string) => {
    void eventId;
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Event }) => (
      <EventCard
        event={item}
        onPress={handleEventPress}
        onShare={handleShare}
        onActionPress={handleActionPress}
      />
    ),
    [handleEventPress, handleShare, handleActionPress]
  );

  const renderEmpty = useCallback(() => {
    if (isLoading) return null;

    return (
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
    );
  }, [isLoading, searchTerm]);

  const renderFooter = useCallback(() => {
    if (!isLoadingMore) return null;

    return (
      <View style={styles.footer}>
        <SportsLoading size="sm" animationSpeed="fast" />
      </View>
    );
  }, [isLoadingMore]);

  return (
    <AppLayout onLogout={handleLogout}>
      <View style={styles.filterBarContainer}>
        <FilterBar
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
          onSortPress={handleSortPress}
          onFilterPress={handleFilterPress}
        />
      </View>

      {isLoading && events.length === 0 ? (
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
            <ArenaRefreshControl
              refreshing={isRefreshing}
              onRefresh={refreshEvents}
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
          sortBy,
          sortOrder,
        }}
        onClose={() => setShowSortModal(false)}
        onApply={handleApplySort}
      />
    </AppLayout>
  );
};
