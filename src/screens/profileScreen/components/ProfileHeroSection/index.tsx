import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { CompletionRing } from '@/components/ui/completionRing';
import { ActiveBadge } from '@/components/ui/activeBadge';
import { ArenaColors } from '@/constants';
import { getSportIcon } from '@/config/sportIcons';
import { ProfileHeroSectionProps } from './typesProfileHeroSection';
import { styles } from './stylesProfileHeroSection';

export const ProfileHeroSection: React.FC<ProfileHeroSectionProps> = ({
  avatarUrl,
  initials,
  coverImageUrl,
  primarySport,
  isUserActive = false,
  hideAvatar = false,
  completionProgress = 0,
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

      {!hideAvatar && (
        <>
          <View style={styles.completionRingContainer}>
            <CompletionRing
              size={128}
              strokeWidth={4}
              progress={completionProgress}
            >
              <View
                style={[
                  styles.avatarContainer,
                  isUserActive && { borderColor: ArenaColors.brand.primary },
                ]}
              >
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
            </CompletionRing>
          </View>
          <ActiveBadge isActive={isUserActive} style={styles.activeBadge} />
        </>
      )}
    </View>
  );
};
