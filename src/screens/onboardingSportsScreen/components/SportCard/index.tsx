import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Card } from '@/components/ui/card';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { getSportIcon } from '@/config/sportIcons';
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

    return (
      <Card
        style={[
          styles.container,
          ...(isSelected ? [styles.selectedContainer] : []),
        ]}
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={`${sportName}${isSelected ? ', selecionado' : ''}`}
        accessibilityState={{ selected: isSelected }}
      >
        <View
          style={[
            styles.iconContainer,
            ...(!isSelected ? [styles.iconUnselected] : []),
          ]}
        >
          <OptimizedImage
            source={iconSource}
            style={styles.icon}
            contentFit="contain"
            priority="high"
            showLoading={false}
          />
        </View>
        <Text
          variant="bodyPrimary"
          style={[
            styles.label,
            ...(isSelected ? [styles.labelSelected] : [styles.labelUnselected]),
          ]}
          numberOfLines={2}
        >
          {sportName}
        </Text>
      </Card>
    );
  }
);
