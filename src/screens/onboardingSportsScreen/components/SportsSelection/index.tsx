import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { CheckboxGroup } from '@/components/ui/checkboxGroup';
import { Sport } from '@/types/sport';
import { SportSelection as SportSelectionType } from '../../typesOnboardingSportsScreen';
import { ArenaColors } from '@/constants';
import { styles } from './stylesSportsSelection';

interface SportsSelectionProps {
  availableSports: Sport[];
  selectedSports: SportSelectionType[];
  onSelectSport: (sportId: string) => void;
  onRemoveSport: (sportId: string) => void;
  isLoading: boolean;
}

export const SportsSelection: React.FC<SportsSelectionProps> = ({
  availableSports,
  selectedSports,
  onSelectSport,
  onRemoveSport,
  isLoading,
}) => {
  const options = availableSports.map(sport => ({
    value: sport.id,
    label: sport.name,
  }));

  const selectedIds = selectedSports.map(s => s.sportId);

  const handleChange = (values: string | string[]) => {
    const valuesArray = Array.isArray(values) ? values : [values];
    const newSport = valuesArray.find(v => !selectedIds.includes(v));
    if (newSport) {
      onSelectSport(newSport);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={ArenaColors.brand.primary} />
        <Text
          variant="bodyPrimary"
          style={{ textAlign: 'center', marginTop: 16 }}
        >
          Carregando esportes...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titlePrimary" style={styles.title}>
        Quais esportes voc� pratica?
      </Text>
      <Text variant="bodySecondary" style={styles.subtitle}>
        Selecione seus esportes favoritos
      </Text>

      <CheckboxGroup
        variant="card"
        columns={3}
        multiSelect={true}
        options={options}
        value={selectedIds}
        onChange={handleChange}
      />

      {selectedSports.length > 0 && (
        <View style={styles.selectedList}>
          <Text variant="captionSecondary" style={styles.selectedTitle}>
            Selecionados ({selectedSports.length})
          </Text>
          <View style={styles.chipContainer}>
            {selectedSports.map(sport => (
              <View key={sport.sportId} style={styles.chip}>
                <Text variant="bodyPrimary" style={styles.chipText}>
                  {sport.sportName} - {sport.level}
                </Text>
                <TouchableOpacity
                  onPress={() => onRemoveSport(sport.sportId)}
                  style={styles.removeButton}
                >
                  <Text variant="bodyPrimary" style={styles.chipText}>
                    �
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
