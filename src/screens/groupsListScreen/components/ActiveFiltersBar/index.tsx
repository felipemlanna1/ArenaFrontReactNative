import React, { useMemo } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Text } from '@/components/ui/text';
import { useSports } from '@/contexts/SportsContext';
import { ActiveFiltersBarProps } from './typesActiveFiltersBar';
import { styles } from './stylesActiveFiltersBar';

export const ActiveFiltersBar: React.FC<ActiveFiltersBarProps> = ({
  city,
  state,
  sportIds = [],
  onClearLocation,
  onRemoveSport,
  onClearAll,
  testID = 'active-filters-bar',
}) => {
  const { getSportsByIds } = useSports();

  const sports = useMemo(() => {
    return getSportsByIds(sportIds);
  }, [sportIds, getSportsByIds]);

  const hasFilters = (city && state) || sports.length > 0;

  if (!hasFilters) {
    return null;
  }

  return (
    <View style={styles.container} testID={testID}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {city && state && (
          <Badge
            variant="outlined"
            size="md"
            removable
            onRemove={onClearLocation}
            testID={`${testID}-location-badge`}
          >
            {`${city}, ${state}`}
          </Badge>
        )}

        {sports.map(sport => (
          <Badge
            key={sport.id}
            variant="outlined"
            size="md"
            removable
            onRemove={() => onRemoveSport(sport.id)}
            testID={`${testID}-sport-badge-${sport.id}`}
          >
            {sport.name}
          </Badge>
        ))}
      </ScrollView>

      <TouchableOpacity
        onPress={onClearAll}
        style={styles.clearButton}
        testID={`${testID}-clear-all`}
      >
        <Text variant="bodyAccent">Limpar tudo</Text>
      </TouchableOpacity>
    </View>
  );
};
