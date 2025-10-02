import React from 'react';
import { View, TextInput, TouchableOpacity, Pressable, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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
  const { handleSearchClear, handleSearchFocus, handleSearchBlur, isFocused } =
    useFilterBar({
      searchValue,
      onSearchChange,
      onSortPress,
      onFilterPress,
    });

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.content}>
        <View
          style={[
            styles.searchContainer,
            isFocused && styles.searchContainerFocused,
          ]}
        >
          <Ionicons
            name="search-outline"
            size={20}
            color={ArenaColors.neutral.medium}
            style={styles.searchIcon}
          />
          <TextInput
            value={searchValue}
            onChangeText={onSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder={placeholder}
            placeholderTextColor={ArenaColors.neutral.medium}
            style={styles.searchInput}
            returnKeyType="search"
            testID={`${testID}-search-input`}
          />
          {searchValue.length > 0 && (
            <TouchableOpacity
              onPress={handleSearchClear}
              style={styles.clearButton}
              testID={`${testID}-clear-button`}
            >
              <Ionicons
                name="close-circle"
                size={18}
                color={ArenaColors.neutral.medium}
              />
            </TouchableOpacity>
          )}
        </View>

        <Pressable
          onPress={onSortPress}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          testID={`${testID}-sort-button`}
        >
          <Ionicons
            name={
              sortOrder === 'asc'
                ? 'arrow-up-outline'
                : 'arrow-down-outline'
            }
            size={20}
            color={ArenaColors.text.inverse}
          />
        </Pressable>

        <Pressable
          onPress={onFilterPress}
          style={({ pressed }) => [
            styles.actionButton,
            pressed && styles.actionButtonPressed,
          ]}
          testID={`${testID}-filter-button`}
        >
          <Ionicons
            name="options-outline"
            size={20}
            color={ArenaColors.text.inverse}
          />
          {filterCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{filterCount}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};
