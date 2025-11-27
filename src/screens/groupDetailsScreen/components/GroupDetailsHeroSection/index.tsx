import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { getSportIcon } from '@/config/sportIcons';
import { GroupDetailsHeroSectionProps } from './typesGroupDetailsHeroSection';
import { styles } from './stylesGroupDetailsHeroSection';

export const GroupDetailsHeroSection: React.FC<
  GroupDetailsHeroSectionProps
> = ({ coverImageUrl, primarySport, isPublic }) => {
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
      ) : (
        <View
          style={[
            styles.placeholderContainer,
            {
              backgroundColor: primarySport?.color || ArenaColors.brand.primary,
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
      )}

      <LinearGradient
        colors={['transparent', 'rgba(27, 29, 41, 0.9)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientOverlay}
      />

      {!isPublic && (
        <View style={styles.privacyBadge}>
          <Ionicons
            name="lock-closed"
            size={16}
            color={ArenaColors.neutral.light}
          />
          <Text variant="captionSecondary" style={styles.privacyBadgeText}>
            Grupo Privado
          </Text>
        </View>
      )}
    </View>
  );
};
