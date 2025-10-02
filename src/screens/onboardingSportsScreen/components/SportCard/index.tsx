import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Text } from '@/components/ui/text';
import { getSportIcon } from '../../utils/sportIcons';
import { styles } from './stylesSportCard';

interface SportCardProps {
  sportId: string;
  sportName: string;
  sportIcon: string;
  isSelected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

export const SportCard: React.FC<SportCardProps> = ({
  sportName,
  sportIcon,
  isSelected,
  onPress,
  disabled = false,
}) => {
  const iconSource = getSportIcon(sportIcon);

  console.log('[SportCard] Rendering:', {
    sportName,
    sportIcon,
    isSelected,
    iconSource: typeof iconSource,
  });

  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selectedContainer]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, !isSelected && styles.iconUnselected]}>
        <Image 
          source={iconSource} 
          style={styles.icon} 
          resizeMode="contain"
          onError={(error) => console.error('[SportCard] Image load error:', sportName, error)}
          onLoad={() => console.log('[SportCard] Image loaded:', sportName)}
        />
      </View>
      <Text
        variant="bodyPrimary"
        style={[styles.label, isSelected && styles.labelSelected]}
        numberOfLines={2}
      >
        {sportName}
      </Text>
    </TouchableOpacity>
  );
};
