import React from 'react';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportCard } from '../SportCard';
import { Sport } from '@/types/sport';
import { SportSelection as SportSelectionType } from '../../typesOnboardingSportsScreen';
import { ArenaColors } from '@/constants';
import { translateSkillLevel } from '../../utils/skillLevelTranslations';
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
  const selectedIds = selectedSports.map(s => s.sportId);

  const handleToggleSport = (sportId: string) => {
    if (selectedIds.includes(sportId)) {
      onRemoveSport(sportId);
    } else {
      onSelectSport(sportId);
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
      <View style={styles.headerContainer}>
        <Text variant="displayAccent" style={styles.title}>
          Quais esportes você pratica?
        </Text>
        <Text variant="bodySecondary" style={styles.subtitle}>
          Selecione seus esportes favoritos
        </Text>
      </View>

      <View style={styles.gridContainer}>
        {availableSports.map(sport => (
          <SportCard
            key={sport.id}
            sportId={sport.id}
            sportName={sport.name}
            sportIcon={sport.icon}
            isSelected={selectedIds.includes(sport.id)}
            onPress={() => handleToggleSport(sport.id)}
          />
        ))}
      </View>

      {selectedSports.length > 0 && (
        <View style={styles.selectedList}>
          <Text variant="captionSecondary" style={styles.selectedTitle}>
            Selecionados ({selectedSports.length})
          </Text>
          <View style={styles.chipContainer}>
            {selectedSports.map(sport => (
              <View key={sport.sportId} style={styles.chip}>
                <Text variant="bodyPrimary" style={styles.chipText}>
                  {sport.sportName} - {translateSkillLevel(sport.level)}
                </Text>
                <TouchableOpacity
                  onPress={() => onRemoveSport(sport.sportId)}
                  style={styles.removeButton}
                >
                  <Text variant="bodyPrimary" style={styles.chipText}>
                    ×
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
