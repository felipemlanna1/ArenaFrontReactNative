import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { GroupDetailsInfoSectionProps } from './typesGroupDetailsInfoSection';
import { styles } from './stylesGroupDetailsInfoSection';
import { getSportIcon } from '@/config/sportIcons';

const formatGroupCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);
  const month = date.toLocaleDateString('pt-BR', { month: 'long' });
  const year = date.getFullYear();
  return `${month} de ${year}`;
};

export const GroupDetailsInfoSection: React.FC<
  GroupDetailsInfoSectionProps
> = ({ name, city, state, sports, createdAt, description, bannerSlot }) => {
  const location = [city, state].filter(Boolean).join(', ');

  return (
    <View style={styles.container}>
      <Text variant="headingPrimary" style={styles.nameText}>
        {name}
      </Text>

      {location && (
        <View style={styles.locationRow}>
          <Ionicons
            name="location-outline"
            size={16}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="bodySecondary" style={styles.locationText}>
            {location}
          </Text>
        </View>
      )}

      <Text variant="captionSecondary" style={styles.createdAtText}>
        Criado em {formatGroupCreatedAt(createdAt)}
      </Text>

      {description && (
        <Text variant="bodySecondary" style={styles.descriptionText}>
          {description}
        </Text>
      )}

      {bannerSlot}

      <View style={styles.sportsSection}>
        <Text variant="titlePrimary" style={styles.sportsTitle}>
          Esportes do Grupo
        </Text>

        {sports.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sportsContent}
            style={styles.sportsScrollContainer}
          >
            {sports.map((sport, index) => (
              <View
                key={sport.id}
                style={[
                  styles.sportCard,
                  index === 0 && styles.sportCardPrimary,
                ]}
              >
                <View style={styles.sportCardHeader}>
                  <OptimizedImage
                    source={getSportIcon(sport.icon)}
                    style={styles.sportIconImage}
                    contentFit="contain"
                    priority="normal"
                  />
                  {index === 0 && (
                    <View style={styles.primaryBadge}>
                      <Ionicons
                        name="star"
                        size={12}
                        color={ArenaColors.brand.primary}
                      />
                    </View>
                  )}
                </View>
                <View style={styles.sportCardContent}>
                  <Text variant="labelPrimary" style={styles.sportName}>
                    {sport.name}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons
              name="basketball-outline"
              size={32}
              color={ArenaColors.neutral.medium}
            />
            <Text variant="bodySecondary" style={styles.emptyText}>
              Nenhum esporte adicionado
            </Text>
            <Text variant="captionSecondary" style={styles.emptyHint}>
              Este grupo ainda não tem esportes associados
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
