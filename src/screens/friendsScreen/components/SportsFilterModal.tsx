import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { FilterModal } from '@/components/ui/filterModal';
import { MultiSelectSports } from '@/components/ui/multiSelectSports';
import { ArenaColors, ArenaSpacing } from '@/constants';
import { StyleSheet } from 'react-native';

interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
}

interface SportsFilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedSportId: string | undefined;
  onSelectSport: (sportId: string | undefined) => void;
  sports: Sport[];
  isLoading?: boolean;
}

const EmptyState: React.FC = () => (
  <View style={styles.emptyContainer}>
    <Ionicons
      name="basketball-outline"
      size={48}
      color={ArenaColors.neutral.medium}
    />
    <Text variant="bodySecondary">Nenhum esporte disponível</Text>
  </View>
);

export const SportsFilterModal: React.FC<SportsFilterModalProps> = ({
  visible,
  onClose,
  selectedSportId,
  onSelectSport,
  sports,
  isLoading = false,
}) => {
  const [tempSelectedSportId, setTempSelectedSportId] = useState<
    string | undefined
  >(selectedSportId);

  useEffect(() => {
    if (visible) {
      setTempSelectedSportId(selectedSportId);
    }
  }, [visible, selectedSportId]);

  const handleToggleSport = (sportId: string) => {
    setTempSelectedSportId(prev => (prev === sportId ? undefined : sportId));
  };

  const handleApply = () => {
    onSelectSport(tempSelectedSportId);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedSportId(selectedSportId);
    onClose();
  };

  return (
    <FilterModal
      visible={visible}
      onClose={onClose}
      onApply={handleApply}
      onCancel={handleCancel}
      title="Filtrar por Esporte"
      height="85%"
      isLoading={isLoading}
      testID="sports-filter-modal"
    >
      {sports.length === 0 ? (
        <EmptyState />
      ) : (
        <MultiSelectSports
          sports={sports}
          selectedSportIds={tempSelectedSportId ? [tempSelectedSportId] : []}
          onToggleSport={handleToggleSport}
          testID="sports-filter-modal-sports"
        />
      )}
    </FilterModal>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing.md,
  },
});
