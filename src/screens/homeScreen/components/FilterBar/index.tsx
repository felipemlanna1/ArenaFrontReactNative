import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArenaColors } from '@/constants';
import { FilterBarProps } from './typesFilterBar';
import { useFilterBar } from './useFilterBar';
import { styles } from './stylesFilterBar';

export const FilterBar: React.FC<FilterBarProps> = ({
  searchValue,
  onSearchChange,
  onSortPress,
  onFilterPress,
  sortOrder = 'desc',
  filterCount = 0,
  placeholder = 'Buscar...',
  testID = 'filter-bar',
}) => {
  const { handleSearchFocus, handleSearchBlur } = useFilterBar({
    searchValue,
    onSearchChange,
    onSortPress,
    onFilterPress,
  });

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <Input
            value={searchValue}
            onChangeText={onSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder={placeholder}
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
          <Button
            variant="ghost"
            size="xs"
            iconOnly
            onPress={onSortPress}
            testID={`${testID}-sort-button`}
          >
            <View style={styles.actionButton}>
              <Ionicons
                name={
                  sortOrder === 'asc'
                    ? 'arrow-up-outline'
                    : 'arrow-down-outline'
                }
                size={20}
                color={ArenaColors.text.inverse}
              />
            </View>
          </Button>

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
              {filterCount > 0 && (
                <View style={styles.filterBadge}>
                  <Text variant="labelPrimary" style={styles.filterBadgeText}>
                    {filterCount}
                  </Text>
                </View>
              )}
            </View>
          </Button>
        </View>
      </View>
    </View>
  );
};
