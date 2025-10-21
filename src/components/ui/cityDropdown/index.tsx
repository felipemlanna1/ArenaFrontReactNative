import React from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  ScrollView,
  Pressable,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Label } from '../label';
import { Input } from '../input';
import { SportsLoading } from '../sportsLoading';
import { ArenaColors } from '@/constants';
import { CityDropdownProps } from './typesCityDropdown';
import { useCityDropdown } from './useCityDropdown';
import { styles } from './stylesCityDropdown';

interface EmptyStateProps {
  error?: string | null;
  searchQuery: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ error, searchQuery }) => {
  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={ArenaColors.semantic.error}
          />
        </View>
        <Text variant="bodySecondary">{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons
          name="search-outline"
          size={48}
          color={ArenaColors.neutral.medium}
        />
      </View>
      <Text variant="bodySecondary">
        {searchQuery ? 'Nenhuma cidade encontrada' : 'Nenhuma cidade disponível'}
      </Text>
    </View>
  );
};

interface ModalHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  closeModal: () => void;
  testID?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  searchQuery,
  setSearchQuery,
  closeModal,
  testID,
}) => (
  <View style={styles.modalHeader}>
    <View style={styles.headerTop}>
      <Text variant="titlePrimary">Selecione a Cidade</Text>
      <TouchableOpacity
        onPress={closeModal}
        style={styles.closeButton}
        testID={testID ? `${testID}-close` : undefined}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <Ionicons name="close" size={24} color={ArenaColors.neutral.light} />
      </TouchableOpacity>
    </View>
    <View style={styles.searchContainer}>
      <Input
        type="search"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Buscar cidade..."
        autoFocus
        testID={testID ? `${testID}-search` : undefined}
      />
    </View>
  </View>
);

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

  const displayValue = value || placeholder;
  const effectivePlaceholder = !stateUF
    ? 'Selecione um estado primeiro'
    : placeholder;

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
          variant={value ? 'bodyPrimary' : 'placeholderPrimary'}
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
        <Text variant="errorSecondary" style={styles.errorText}>
          {error}
        </Text>
      )}

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={closeModal}
        testID={testID ? `${testID}-modal` : undefined}
      >
        <View style={styles.modalOverlay}>
          <Pressable style={styles.modalOverlay} onPress={closeModal}>
            <Pressable
              style={styles.modalContent}
              onPress={e => e.stopPropagation()}
            >
              <ModalHeader
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                closeModal={closeModal}
                testID={testID}
              />

              {loadError || filteredCities.length === 0 ? (
                <EmptyState error={loadError} searchQuery={searchQuery} />
              ) : (
                <ScrollView style={styles.citiesList}>
                  {filteredCities.map(city => {
                    const isSelected = city === value;
                    return (
                      <Pressable
                        key={city}
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
                  })}
                </ScrollView>
              )}
            </Pressable>
          </Pressable>
        </View>
      </Modal>
    </View>
  );
};

export type { CityDropdownProps } from './typesCityDropdown';
