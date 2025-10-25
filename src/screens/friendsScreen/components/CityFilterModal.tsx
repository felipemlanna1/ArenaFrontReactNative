import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { FilterModal } from '@/components/ui/filterModal';
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';
import { ArenaSpacing } from '@/constants';
import { StyleSheet } from 'react-native';

interface CityFilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedCity: string;
  selectedState: string;
  onCityChange: (city: string) => void;
  onStateChange: (state: string) => void;
}

export const CityFilterModal: React.FC<CityFilterModalProps> = ({
  visible,
  onClose,
  selectedCity,
  selectedState,
  onCityChange,
  onStateChange,
}) => {
  const [tempSelectedState, setTempSelectedState] = useState(selectedState);
  const [tempSelectedCity, setTempSelectedCity] = useState(selectedCity);

  useEffect(() => {
    if (visible) {
      setTempSelectedState(selectedState);
      setTempSelectedCity(selectedCity);
    }
  }, [visible, selectedState, selectedCity]);

  const handleStateChange = (state: string) => {
    setTempSelectedState(state);
    if (!state) {
      setTempSelectedCity('');
    }
  };

  const handleCityChange = (city: string) => {
    setTempSelectedCity(city);
  };

  const handleApply = () => {
    onStateChange(tempSelectedState);
    onCityChange(tempSelectedCity);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedState(selectedState);
    setTempSelectedCity(selectedCity);
    onClose();
  };

  return (
    <FilterModal
      visible={visible}
      onClose={onClose}
      onApply={handleApply}
      onCancel={handleCancel}
      title="Filtrar por Localização"
      height="85%"
      testID="city-filter-modal"
    >
      <View style={styles.dropdownsContainer}>
        <StateDropdown
          value={tempSelectedState}
          onChange={handleStateChange}
          label="Estado"
        />

        {tempSelectedState && (
          <CityDropdown
            value={tempSelectedCity}
            onChange={handleCityChange}
            stateUF={tempSelectedState}
            label="Cidade"
          />
        )}
      </View>
    </FilterModal>
  );
};

const styles = StyleSheet.create({
  dropdownsContainer: {
    gap: ArenaSpacing.lg,
  },
});
