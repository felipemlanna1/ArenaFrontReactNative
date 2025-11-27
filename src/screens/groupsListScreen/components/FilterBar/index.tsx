import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArenaColors } from '@/constants';
import { styles } from './stylesFilterBar';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterPress: () => void;
  filterCount: number;
  testID?: string;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  onFilterPress,
  filterCount,
  testID = 'groups-filter-bar',
}) => {
  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Input
            value={searchQuery}
            onChangeText={onSearchChange}
            placeholder="Buscar por nome ou esporte"
            type="search"
            size="sm"
            clearable
            leftIcon={({ size, color }) => (
              <Ionicons name="search-outline" size={size} color={color} />
            )}
            testID={`${testID}-search-input`}
            fullWidth
          />
        </View>

        <View style={styles.buttonsContainer}>
          <View style={styles.filterButtonWrapper}>
            <Button
              variant="ghost"
              size="xs"
              iconOnly
              onPress={onFilterPress}
              testID={`${testID}-filter-button`}
            >
              <View style={styles.actionButton}>
                <Ionicons
                  name="options-outline"
                  size={20}
                  color={ArenaColors.text.inverse}
                />
              </View>
            </Button>
            {filterCount > 0 && (
              <View style={styles.filterBadge}>
                <Text variant="labelPrimary" style={styles.filterBadgeText}>
                  {filterCount}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
