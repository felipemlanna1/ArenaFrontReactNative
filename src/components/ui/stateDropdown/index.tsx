import React, { useCallback } from 'react';
import { View, TouchableOpacity, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Label } from '../label';
import { SelectionModal } from '../selectionModal';
import { ArenaColors } from '@/constants';
import { StateDropdownProps, BrazilianState } from './typesStateDropdown';
import { useStateDropdown } from './useStateDropdown';
import { styles } from './stylesStateDropdown';

export const StateDropdown: React.FC<StateDropdownProps> = ({
  value,
  onChange,
  label,
  error,
  required = false,
  disabled = false,
  placeholder = 'Selecione o estado',
  testID,
  containerStyle,
}) => {
  const {
    isOpen,
    selectedState,
    filteredStates,
    searchQuery,
    setSearchQuery,
    openModal,
    closeModal,
    selectState,
  } = useStateDropdown({ value, onChange, disabled });

  const renderStateItem = useCallback(
    (state: BrazilianState) => {
      const isSelected = state.uf === value;
      return (
        <Pressable
          onPress={() => selectState(state.uf)}
          style={({ pressed }) => [
            styles.stateItem,
            pressed && styles.stateItemPressed,
            isSelected && styles.stateItemSelected,
          ]}
          testID={testID ? `${testID}-state-${state.uf}` : undefined}
          accessibilityRole="radio"
          accessibilityLabel={`${state.name} - ${state.uf}`}
          accessibilityState={{ selected: isSelected }}
        >
          <View style={styles.stateInfo}>
            <Text variant="bodyPrimary">{state.name}</Text>
            <Text variant="captionSecondary">{state.uf}</Text>
          </View>
          {isSelected && (
            <View style={styles.checkIcon}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={ArenaColors.brand.primary}
              />
            </View>
          )}
        </Pressable>
      );
    },
    [value, selectState, testID]
  );

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {label && (
        <View style={styles.labelContainer}>
          <Label
            variant="form"
            required={required}
            disabled={disabled}
            testID={testID ? `${testID}-label` : undefined}
          >
            {label}
          </Label>
        </View>
      )}

      <TouchableOpacity
        onPress={openModal}
        disabled={disabled}
        style={[
          styles.inputContainer,
          error && styles.inputContainerError,
          disabled && styles.inputContainerDisabled,
        ]}
        testID={testID ? `${testID}-trigger` : undefined}
        accessibilityRole="button"
        accessibilityLabel={label || placeholder}
        accessibilityHint="Toque para selecionar um estado"
        accessibilityState={{ disabled }}
      >
        <Text
          variant={selectedState ? 'bodyPrimary' : 'bodyMuted'}
          style={styles.placeholder}
        >
          {selectedState
            ? `${selectedState.name} - ${selectedState.uf}`
            : placeholder}
        </Text>
        <View style={styles.iconContainer}>
          <Ionicons
            name="chevron-down"
            size={20}
            color={ArenaColors.neutral.medium}
          />
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
        title="Selecione o Estado"
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Buscar estado..."
        items={filteredStates}
        renderItem={renderStateItem}
        keyExtractor={state => state.uf}
        emptyMessage="Nenhum estado encontrado"
        testID={testID}
      />
    </View>
  );
};

export type { StateDropdownProps } from './typesStateDropdown';
