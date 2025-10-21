import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Entypo } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { ProfileInfoSectionProps } from './typesProfileInfoSection';
import { styles } from './stylesProfileInfoSection';
import { getSportIcon } from '@/config/sportIcons';

const getLevelIcon = (level?: string): keyof typeof Entypo.glyphMap => {
  const icons = {
    BEGINNER: 'progress-empty' as const,
    INTERMEDIATE: 'progress-one' as const,
    ADVANCED: 'progress-two' as const,
    PROFESSIONAL: 'progress-full' as const,
  };
  return icons[level as keyof typeof icons] || 'progress-empty';
};

export const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  fullName,
  username,
  age,
  gender,
  sports,
  isEmailVerified,
  memberSince,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameWithBadgeRow}>
        <Text variant="headingPrimary" style={styles.nameText}>
          {fullName}
        </Text>
        {isEmailVerified && (
          <Ionicons
            name="checkmark-circle"
            size={20}
            color={ArenaColors.semantic.success}
          />
        )}
      </View>

      <Text variant="bodySecondary" style={styles.usernameText}>
        @{username}
      </Text>

      <Text variant="captionSecondary" style={styles.memberSinceText}>
        Membro desde {memberSince}
      </Text>

      {(age !== null || gender !== null) && (
        <View style={styles.detailsRow}>
          {age !== null && (
            <View style={styles.detailItem}>
              <Ionicons
                name="calendar-outline"
                size={16}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionSecondary">{age} anos</Text>
            </View>
          )}

          {gender !== null && (
            <View style={styles.detailItem}>
              <Ionicons
                name="person-outline"
                size={16}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionSecondary">{gender}</Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.sportsSection}>
        <Text variant="titlePrimary" style={styles.sportsTitle}>
          Esportes Praticados
        </Text>

        {sports.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.sportsContent}
            style={styles.sportsScrollContainer}
          >
            {sports.map(sport => (
              <View
                key={sport.id}
                style={[
                  styles.sportCard,
                  sport.isPrimary && styles.sportCardPrimary,
                ]}
              >
                <View style={styles.sportCardHeader}>
                  <OptimizedImage
                    source={getSportIcon(sport.icon)}
                    style={styles.sportIconImage}
                    contentFit="contain"
                    priority="normal"
                  />
                  {sport.isPrimary && (
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
                  {sport.skillLevel && (
                    <Entypo
                      name={getLevelIcon(sport.skillLevel)}
                      size={20}
                      color={ArenaColors.brand.primary}
                    />
                  )}
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
              Adicione seus esportes favoritos para conectar com outros atletas
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
