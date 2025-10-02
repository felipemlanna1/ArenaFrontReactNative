import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { getSportIcon } from '@/config/sportIcons';
import { logger } from '@/utils/logger';
import { CardPressable } from './CardPressable';
import { styles } from './stylesSportCard';

interface SportCardProps {
  sportId: string;
  sportName: string;
  sportIcon: string;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const SportCard: React.FC<SportCardProps> = React.memo(
  ({ sportName, sportIcon, isSelected, onPress, disabled = false }) => {
    const iconSource = getSportIcon(sportIcon);

    logger.debug('SportCard rendering', {
      sportName,
      sportIcon,
      isSelected,
      iconSource: typeof iconSource,
    });

    return (
      <CardPressable
        style={[styles.container, isSelected && styles.selectedContainer]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${sportName}${isSelected ? ', selecionado' : ''}`}
        accessibilityState={{ selected: isSelected }}
      >
        <View
          style={[styles.iconContainer, !isSelected && styles.iconUnselected]}
        >
          <Image
            source={iconSource}
            style={styles.icon}
            resizeMode="contain"
            onError={error =>
              logger.error('SportCard image load error', { sportName, error })
            }
            onLoad={() => logger.debug('SportCard image loaded', { sportName })}
          />
        </View>
        <Text
          variant="bodyPrimary"
          style={[styles.label, ...(isSelected ? [styles.labelSelected] : [])]}
          numberOfLines={2}
        >
          {sportName}
        </Text>
      </CardPressable>
    );
  }
);
