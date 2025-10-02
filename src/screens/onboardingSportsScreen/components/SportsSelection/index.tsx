import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Text } from '@/components/ui/text';
import { Badge } from '@/components/ui/badge';
import { SportCard } from '@/screens/onboardingSportsScreen/components/SportCard';
import { Sport } from '@/types/sport';
import { SportSelection as SportSelectionType } from '@/screens/onboardingSportsScreen/typesOnboardingSportsScreen';
import { ArenaColors } from '@/constants';
import { translateSkillLevel } from '@/utils/i18n/skillLevels';
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
        <Text variant="bodyPrimary" style={styles.loadingText}>
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
              <Badge
                key={sport.sportId}
                variant="primary"
                removable
                onRemove={() => onRemoveSport(sport.sportId)}
                testID={`badge-${sport.sportId}`}
              >
                {`${sport.sportName} - ${translateSkillLevel(sport.level)}`}
              </Badge>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
