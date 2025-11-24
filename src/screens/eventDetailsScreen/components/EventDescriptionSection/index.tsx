import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity, LayoutAnimation, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesEventDescriptionSection';

interface EventDescriptionSectionProps {
  description?: string;
}

const MAX_COLLAPSED_LENGTH = 120;

export const EventDescriptionSection: React.FC<
  EventDescriptionSectionProps
> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const shouldShowToggle = description && description.length > MAX_COLLAPSED_LENGTH;

  const handleToggle = useCallback(() => {
    if (Platform.OS !== 'web') {
      LayoutAnimation.configureNext(
        LayoutAnimation.create(
          300,
          LayoutAnimation.Types.easeInEaseOut,
          LayoutAnimation.Properties.opacity
        )
      );
    }
    setIsExpanded(prev => !prev);
  }, []);

  if (!description) return null;

  return (
    <View style={styles.container}>
      <Text variant="titleSecondary" style={styles.sectionTitle}>
        Descrição
      </Text>

      <View style={styles.descriptionContainer}>
        <Text
          variant="bodyPrimary"
          style={[styles.text, { lineHeight: 24 }]}
          numberOfLines={isExpanded || !shouldShowToggle ? undefined : 3}
        >
          {description}
        </Text>

        {shouldShowToggle && !isExpanded && (
          <LinearGradient
            colors={['rgba(27, 29, 41, 0)', 'rgba(27, 29, 41, 1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.fadeOverlay}
            pointerEvents="none"
          />
        )}
      </View>

      {shouldShowToggle && (
        <TouchableOpacity
          onPress={handleToggle}
          style={styles.toggleButton}
          activeOpacity={0.7}
        >
          <Text variant="bodyPrimary" style={styles.toggleText}>
            {isExpanded ? 'Ver Menos' : 'Ver Mais'}
          </Text>
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={16}
            color={ArenaColors.brand.primary}
            style={{
              transform: [{ rotate: isExpanded ? '0deg' : '0deg' }],
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
