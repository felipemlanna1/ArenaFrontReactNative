import React from 'react';
import { View, Modal, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  const handleApply = () => {
    onClose();
  };

  const handleClear = () => {
    onCityChange('');
    onStateChange('');
    onClose();
  };

  const hasCityFilter = selectedCity !== '' || selectedState !== '';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.overlay} edges={['bottom']}>
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text variant="titlePrimary">Filtrar por Localização</Text>
            <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Ionicons
                name="close"
                size={24}
                color={ArenaColors.neutral.light}
              />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
          >
            <View style={styles.dropdownsContainer}>
              <StateDropdown
                value={selectedState}
                onChange={onStateChange}
                label="Estado"
              />

              {selectedState && (
                <CityDropdown
                  value={selectedCity}
                  onChange={onCityChange}
                  stateUF={selectedState}
                  label="Cidade"
                />
              )}
            </View>
          </ScrollView>

          {/* Footer Actions */}
          <View style={styles.footer}>
            {hasCityFilter && (
              <Button variant="secondary" onPress={handleClear} size="md">
                Limpar filtro
              </Button>
            )}
            <Button variant="primary" onPress={handleApply} size="md">
              Aplicar
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  backdrop: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius.xl,
    borderTopRightRadius: ArenaBorders.radius.xl,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darkSubtleBorder,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: ArenaSpacing.lg,
  },
  dropdownsContainer: {
    gap: ArenaSpacing.lg,
  },
  footer: {
    padding: ArenaSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.darkSubtleBorder,
    gap: ArenaSpacing.sm,
  },
});
