import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';
import { styles } from './stylesCenterCreateButton';

export interface CenterCreateButtonProps {
  onPress: () => void;
  testID?: string;
}

export const CenterCreateButton: React.FC<CenterCreateButtonProps> = ({
  onPress,
  testID = 'center-create-button',
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
      testID={testID}
    >
      <Ionicons name="add" size={32} color={ArenaColors.neutral.light} />
    </TouchableOpacity>
  );
};
