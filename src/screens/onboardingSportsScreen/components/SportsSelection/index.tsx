import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { SportCard } from '@/screens/onboardingSportsScreen/components/SportCard';
import { Sport } from '@/types/sport';
import { SportSelection as SportSelectionType } from '@/screens/onboardingSportsScreen/typesOnboardingSportsScreen';
import { translateSkillLevel } from '@/utils/i18n/skillLevels';
import { styles } from './stylesSportsSelection';

interface SportsSelectionProps {
  availableSports: Sport[];
  selectedSports: SportSelectionType[];
  onSelectSport: (sportId: string) => void;
  onRemoveSport: (sportId: string) => void;
  primarySportId?: string | null;
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SportsSelection: React.FC<SportsSelectionProps> = ({
  availableSports,
  selectedSports,
  onSelectSport,
  onRemoveSport,
  primarySportId,
  isLoading,
  searchQuery,
  onSearchChange,
}) => {
  const selectedIds = selectedSports.map(s => s.sportId);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <SportsLoading size="lg" animationSpeed="normal" />
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
          Selecione um ou mais esportes
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <Input
          type="search"
          placeholder="Buscar..."
          value={searchQuery}
          onChangeText={onSearchChange}
          clearable
          testID="sports-search-input"
        />
      </View>

      <View style={styles.gridContainer}>
        {availableSports.map(sport => {
          const selectedSport = selectedSports.find(
            s => s.sportId === sport.id
          );
          return (
            <SportCard
              key={sport.id}
              sportId={sport.id}
              sportName={sport.name}
              sportIcon={sport.icon}
              isSelected={selectedIds.includes(sport.id)}
              onPress={() => onSelectSport(sport.id)}
              level={selectedSport?.level}
              isPrimary={sport.id === primarySportId}
            />
          );
        })}
      </View>

      {selectedSports.length > 0 && (
        <View style={styles.selectedList}>
          <Text variant="captionSecondary" style={styles.selectedTitle}>
            Selecionados ({selectedSports.length})
          </Text>
          <View style={styles.chipContainer}>
            {selectedSports.map(sport => {
              const isPrimary = sport.sportId === primarySportId;
              return (
                <Badge
                  key={sport.sportId}
                  variant="primary"
                  removable
                  onRemove={() => onRemoveSport(sport.sportId)}
                  iconName={isPrimary ? 'star' : undefined}
                  testID={`badge-${sport.sportId}`}
                >
                  {`${sport.sportName} • ${translateSkillLevel(sport.level)}`}
                </Badge>
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
};
