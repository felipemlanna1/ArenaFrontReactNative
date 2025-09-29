import React, { useMemo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Input } from '../input';
import { SearchInputProps } from './typesSearchInput';
import { useSearchInput, SearchIcon, ClearIcon } from './useSearchInput';
import { styles } from './stylesSearchInput';

export const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onClear,
  debounceMs = 300,
  showSearchIcon = true,
  showClearButton = true,
  searchIconPosition = 'left',
  autoSearch = true,
  minSearchLength = 1,
  searchTestID,
  clearTestID,
  placeholder = 'Search...',
  ...inputProps
}) => {
  const searchLogic = useSearchInput({
    value: inputProps.value,
    onSearch,
    onClear,
    debounceMs,
    autoSearch,
    minSearchLength,
    onChangeText: inputProps.onChangeText,
  });

  const searchIconComponent = useMemo(() => {
    if (!showSearchIcon) return undefined;

    return ({ size, color }: { size: number; color: string }) => (
      <TouchableOpacity
        onPress={searchLogic.handleSearch}
        disabled={inputProps.disabled || !searchLogic.canSearch}
        testID={searchTestID}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        style={[styles.searchIcon, inputProps.disabled && { opacity: 0.5 }]}
      >
        <SearchIcon
          size={size}
          color={color}
          isSearching={searchLogic.isSearching}
          disabled={inputProps.disabled || !searchLogic.canSearch}
        />
      </TouchableOpacity>
    );
  }, [
    showSearchIcon,
    searchLogic.handleSearch,
    searchLogic.canSearch,
    searchLogic.isSearching,
    inputProps.disabled,
    searchTestID,
  ]);

  const clearIconComponent = useMemo(() => {
    if (!showClearButton || !searchLogic.shouldShowClear) return undefined;

    return ({ size, color }: { size: number; color: string }) => (
      <TouchableOpacity
        onPress={searchLogic.handleClear}
        disabled={inputProps.disabled}
        testID={clearTestID}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        style={[styles.clearButton, inputProps.disabled && { opacity: 0.5 }]}
      >
        <ClearIcon size={size} color={color} disabled={inputProps.disabled} />
      </TouchableOpacity>
    );
  }, [
    showClearButton,
    searchLogic.shouldShowClear,
    searchLogic.handleClear,
    inputProps.disabled,
    clearTestID,
  ]);

  const leftIcon =
    searchIconPosition === 'left' ? searchIconComponent : undefined;
  const rightIcon = useMemo(() => {
    if (searchIconPosition === 'right') {
      return searchIconComponent;
    }
    return clearIconComponent;
  }, [searchIconPosition, searchIconComponent, clearIconComponent]);

  return (
    <Input
      {...inputProps}
      placeholder={placeholder}
      onChangeText={searchLogic.handleChangeText}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      keyboardType="default"
      autoCapitalize="none"
      autoCorrect={false}
      returnKeyType="search"
      onSubmitEditing={searchLogic.handleSearch}
      clearButtonMode="never"
    />
  );
};

export type { SearchInputProps } from './typesSearchInput';
export { useSearchInput } from './useSearchInput';
