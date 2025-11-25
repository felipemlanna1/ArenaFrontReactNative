import React, { ComponentProps } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';
import { HeaderAction as HeaderActionType } from '../typesAppHeader';
import { styles } from './stylesHeaderAction';

export const HeaderAction: React.FC<HeaderActionType> = ({
  icon,
  onPress,
  disabled = false,
  testID = 'header-action',
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, disabled && styles.disabled]}
      onPress={onPress}
      disabled={disabled}
      testID={testID}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon as ComponentProps<typeof Ionicons>['name']}
        size={24}
        color={
          disabled ? ArenaColors.neutral.medium : ArenaColors.neutral.light
        }
      />
    </TouchableOpacity>
  );
};
