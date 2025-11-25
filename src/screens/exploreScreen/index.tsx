import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useExploreScreen } from './useExploreScreen';
import { ExploreScreenProps } from './typesExploreScreen';
import { ExploreFilter } from './components/ExploreFilter';
import { styles } from './stylesExploreScreen';

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  testID = 'explore-screen',
}) => {
  const { isLoading, activeFilter, filterCounts, handleFilterChange } =
    useExploreScreen();

  if (isLoading) {
    return (
      <AppLayout>
        <View style={styles.container}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout testID={testID}>
      <ExploreFilter
        value={activeFilter}
        filterCounts={filterCounts}
        onChange={handleFilterChange}
      />
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons
            name="search-outline"
            size={64}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="headingPrimary" style={styles.title}>
            Explorar{' '}
            {activeFilter === 'friends'
              ? 'Amigos'
              : activeFilter === 'groups'
                ? 'Grupos'
                : 'Eventos'}
          </Text>
          <Text variant="bodySecondary" style={styles.subtitle}>
            Descubra novos{' '}
            {activeFilter === 'friends'
              ? 'amigos'
              : activeFilter === 'groups'
                ? 'grupos'
                : 'eventos'}{' '}
            próximos de você
          </Text>
        </View>
      </View>
    </AppLayout>
  );
};
