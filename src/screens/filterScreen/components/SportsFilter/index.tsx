import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';
import { SportsFilterProps } from './typesSportsFilter';
import { useSportsFilter } from './useSportsFilter';
import { styles } from './stylesSportsFilter';

export const SportsFilter: React.FC<SportsFilterProps> = ({
  selectedSportIds,
  onSportsChange,
  testID = 'sports-filter',
}) => {
  const { sports, isLoading, error, toggleSport } = useSportsFilter({
    selectedSportIds,
    onSportsChange,
  });

  if (isLoading) {
    return (
      <View style={styles.loadingContainer} testID={`${testID}-loading`}>
        <SportsLoading size="sm" animationSpeed="fast" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer} testID={`${testID}-error`}>
        <Text variant="bodySecondary">{error.message}</Text>
      </View>
    );
  }

  if (sports.length === 0) {
    return (
      <View testID={`${testID}-empty`}>
        <Text variant="bodySecondary" style={styles.emptyText}>
          Nenhum esporte disponível
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      <MultiSelectSports
        sports={sports}
        selectedSportIds={selectedSportIds}
        onToggleSport={toggleSport}
        testID={testID}
      />
    </View>
  );
};
