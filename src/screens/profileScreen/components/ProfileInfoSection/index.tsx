import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportCard } from '@/components/ui/sportCard';
import { ArenaColors } from '@/constants';
import { ProfileInfoSectionProps } from './typesProfileInfoSection';
import { styles } from './stylesProfileInfoSection';

export const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  fullName,
  username,
  age,
  gender,
  city,
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

      {(age !== null || gender !== null || city !== null) && (
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

          {city !== null && (
            <View style={styles.detailItem}>
              <Ionicons
                name="location-outline"
                size={16}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionSecondary">{city}</Text>
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
              <SportCard
                key={sport.id}
                sportId={sport.id}
                sportName={sport.name}
                sportIcon={sport.icon}
                skillLevel={sport.skillLevel as any}
                isPrimary={sport.isPrimary}
                isSelected={true}
                testID={`sport-card-${sport.id}`}
              />
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
