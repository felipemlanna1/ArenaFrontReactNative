import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { RoleBadgeProps } from './typesRoleBadge';
import { roleConfigs, sizeConfigs, styles } from './stylesRoleBadge';

export const RoleBadge: React.FC<RoleBadgeProps> = ({
  role,
  size = 'sm',
  showIcon = true,
  style,
  testID = 'role-badge',
}) => {
  const roleConfig = roleConfigs[role];
  const sizeConfig = sizeConfigs[size];

  const containerStyle = {
    ...styles.container,
    backgroundColor: roleConfig.backgroundColor,
    borderColor: roleConfig.borderColor,
    paddingVertical: sizeConfig.paddingVertical,
    paddingHorizontal: sizeConfig.paddingHorizontal,
    borderRadius: sizeConfig.borderRadius,
  };

  const textStyle = {
    color: roleConfig.textColor,
  };

  return (
    <View style={[containerStyle, style]} testID={testID}>
      {showIcon && (
        <View style={styles.iconContainer}>
          <Ionicons
            name={roleConfig.icon as keyof typeof Ionicons.glyphMap}
            size={sizeConfig.iconSize}
            color={roleConfig.textColor}
          />
        </View>
      )}
      <Text variant="captionSecondary" style={textStyle}>
        {roleConfig.label}
      </Text>
    </View>
  );
};
