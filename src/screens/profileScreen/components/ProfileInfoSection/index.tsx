import React from 'react';
import { View, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportCard } from '@/components/ui/sportCard';
import { ArenaColors } from '@/constants';
import { SkillLevel } from '@/types/sport';
import { ProfileInfoSectionProps } from './typesProfileInfoSection';
import { styles } from './stylesProfileInfoSection';

export const ProfileInfoSection: React.FC<ProfileInfoSectionProps> = ({
  fullName,
  username,
  age,
  gender,
  city,
  state,
  sports = [],
  isEmailVerified = false,
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

      {memberSince && (
        <Text variant="captionSecondary" style={styles.memberSinceText}>
          Membro desde {memberSince}
        </Text>
      )}

      {(age !== null || gender !== null || (city && state)) && (
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

          {city && state && (
            <View style={styles.detailItem}>
              <Ionicons
                name="location-outline"
                size={16}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionSecondary">
                {city}, {state}
              </Text>
            </View>
          )}
        </View>
      )}

      {sports.length > 0 && (
        <View style={styles.sportsSection}>
          <Text variant="titlePrimary" style={styles.sportsTitle}>
            Esportes Praticados
          </Text>

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
                skillLevel={sport.skillLevel as SkillLevel}
                isPrimary={sport.isPrimary}
                isSelected={true}
                testID={`sport-card-${sport.id}`}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
