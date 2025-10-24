import React, { useCallback } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Label } from '../label';
import { SportsLoading } from '../sportsLoading';
import { SelectionModal } from '../selectionModal';
import { ArenaColors } from '@/constants';
import { CityDropdownProps } from './typesCityDropdown';
import { useCityDropdown } from './useCityDropdown';
import { styles } from './stylesCityDropdown';

export const CityDropdown: React.FC<CityDropdownProps> = ({
  stateUF,
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  placeholder = 'Selecione a cidade',
  testID,
  containerStyle,
}) => {
  const {
    isOpen,
    isLoading,
    loadError,
    openModal,
    closeModal,
    selectCity,
    searchQuery,
    setSearchQuery,
    filteredCities,
  } = useCityDropdown({ stateUF, value, onChange, disabled });

  const isDisabled = disabled || !stateUF || isLoading;

  const effectivePlaceholder = !stateUF
    ? 'Selecione um estado primeiro'
    : placeholder;

  const renderCityItem = useCallback(
    (city: string) => {
      const isSelected = city === value;
      return (
        <Pressable
          onPress={() => selectCity(city)}
          style={({ pressed }) => [
            styles.cityItem,
            pressed && styles.cityItemPressed,
            isSelected && styles.cityItemSelected,
          ]}
          testID={testID ? `${testID}-city-${city}` : undefined}
          accessibilityRole="radio"
          accessibilityLabel={city}
          accessibilityState={{ selected: isSelected }}
        >
          <Text variant="bodyPrimary">{city}</Text>
        </Pressable>
      );
    },
    [value, selectCity, testID]
  );

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {label && (
        <View style={styles.labelContainer}>
          <Label
            variant="form"
            required={required}
            disabled={isDisabled}
            testID={testID ? `${testID}-label` : undefined}
          >
            {label}
          </Label>
        </View>
      )}

      <TouchableOpacity
        onPress={openModal}
        disabled={isDisabled}
        style={[
          styles.inputContainer,
          error && styles.inputContainerError,
          isDisabled && styles.inputContainerDisabled,
        ]}
        testID={testID ? `${testID}-trigger` : undefined}
        accessibilityRole="button"
        accessibilityLabel={label || effectivePlaceholder}
        accessibilityHint="Toque para selecionar uma cidade"
        accessibilityState={{ disabled: isDisabled }}
      >
        <Text
          variant={value ? 'bodyPrimary' : 'bodyMuted'}
          style={styles.placeholder}
        >
          {value || effectivePlaceholder}
        </Text>
        <View style={styles.iconContainer}>
          {isLoading ? (
            <SportsLoading size="xs" animationSpeed="fast" />
          ) : (
            <Ionicons
              name="chevron-down"
              size={20}
              color={ArenaColors.neutral.medium}
            />
          )}
        </View>
      </TouchableOpacity>

      {error && typeof error === 'string' && (
        <Text variant="bodyError" style={styles.errorText}>
          {error}
        </Text>
      )}

      <SelectionModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Selecione a Cidade"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Buscar cidade..."
        items={filteredCities}
        renderItem={renderCityItem}
        keyExtractor={city => city}
        emptyMessage="Nenhuma cidade encontrada"
        errorMessage={loadError}
        isLoading={false}
        testID={testID}
      />
    </View>
  );
};

export type { CityDropdownProps } from './typesCityDropdown';
