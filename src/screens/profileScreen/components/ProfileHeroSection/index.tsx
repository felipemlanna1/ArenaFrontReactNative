import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { getSportIcon } from '@/config/sportIcons';
import { ProfileHeroSectionProps } from './typesProfileHeroSection';
import { styles } from './stylesProfileHeroSection';

export const ProfileHeroSection: React.FC<ProfileHeroSectionProps> = ({
  avatarUrl,
  initials,
  showBackButton,
  onBackPress,
  coverImageUrl,
  primarySport,
}) => {
  const iconSource = primarySport?.icon
    ? getSportIcon(primarySport.icon)
    : null;

  return (
    <View style={styles.container}>
      {coverImageUrl ? (
        <OptimizedImage
          source={{ uri: coverImageUrl }}
          style={styles.coverImage}
          contentFit="cover"
          priority="high"
        />
      ) : primarySport ? (
        <View
          style={[
            styles.placeholderContainer,
            {
              backgroundColor: primarySport.color || ArenaColors.brand.primary,
            },
          ]}
        >
          {iconSource && (
            <OptimizedImage
              source={iconSource}
              style={styles.placeholderIcon}
              contentFit="contain"
              priority="high"
              showLoading={false}
            />
          )}
        </View>
      ) : (
        <LinearGradient
          colors={[
            ArenaColors.neutral.dark,
            ArenaColors.neutral.darkIntermediate,
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.gradient}
        />
      )}

      {showBackButton && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBackPress}
          testID="back-button"
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={ArenaColors.neutral.light}
          />
        </TouchableOpacity>
      )}

      <View style={styles.avatarContainer}>
        {avatarUrl ? (
          <OptimizedImage
            source={{ uri: avatarUrl }}
            style={styles.avatarImage}
            contentFit="cover"
            priority="high"
          />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text variant="displayPrimary" style={styles.initialsText}>
              {initials}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};
