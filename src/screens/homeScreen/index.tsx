import React, { useState } from 'react';
import {
  View,
  Animated,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { FilterBar } from './components/FilterBar';
import { EventCard } from './components/EventCard';
import { useFilterBarScroll } from './components/FilterBar/useFilterBarScroll';
import { useHomeEvents } from './hooks/useHomeEvents';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useHomeScreen } from './useHomeScreen';
import { ArenaColors } from '@/constants';
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
  const { handleLogout } = useHomeScreen(navigation);
  const { handleScroll, filterBarTranslateY } = useFilterBarScroll();
  const [searchValue, setSearchValue] = useState('');

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
  } = useHomeEvents({ searchTerm: searchValue });

  const handleSortPress = () => {};

  const handleFilterPress = () => {};

  const handleEventPress = (eventId: string) => {
    navigation.navigate('Home');
  };

  const renderItem = ({ item }: { item: Event }) => (
    <EventCard event={item} onPress={handleEventPress} onShare={handleShare} />
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
        <ActivityIndicator size="small" color={ArenaColors.brand.primary} />
      </View>
    );
  };

  return (
    <AppLayout onLogout={handleLogout}>
      <View style={styles.filterBarWrapper}>
        <Animated.View
          style={[{ transform: [{ translateY: filterBarTranslateY }] }]}
        >
          <FilterBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSortPress={handleSortPress}
            onFilterPress={handleFilterPress}
          />
        </Animated.View>
      </View>

      {isLoading && events.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ArenaColors.brand.primary} />
        </View>
      ) : (
        <Animated.FlatList
          data={events}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={styles.content}
          contentContainerStyle={styles.listContainer}
          onScroll={handleScroll}
          scrollEventThrottle={16}
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
    </AppLayout>
  );
};
