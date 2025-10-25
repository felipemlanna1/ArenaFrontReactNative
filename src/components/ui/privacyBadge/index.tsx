import React, { useMemo } from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ArenaColors } from '@/constants';
import { styles } from './stylesPrivacyBadge';
import { PrivacyBadgeProps, PrivacyConfig } from './typesPrivacyBadge';

export const PrivacyBadge: React.FC<PrivacyBadgeProps> = ({
  privacy,
  size = 'md',
  showIcon = true,
  showLabel = true,
  groupName,
  style,
  textStyle,
  testID,
}) => {
  const config = useMemo((): PrivacyConfig => {
    switch (privacy) {
      case 'PUBLIC':
        return {
          label: 'Público',
          iconName: 'globe-outline',
          backgroundColor: ArenaColors.semantic.successSubtle,
          textColor: ArenaColors.semantic.success,
          borderColor: ArenaColors.semantic.success,
        };

      case 'GROUP_ONLY':
        return {
          label: groupName ? `Grupo: ${groupName}` : 'Grupo',
          iconName: 'people-outline',
          backgroundColor: ArenaColors.brand.primarySubtle,
          textColor: ArenaColors.brand.primary,
          borderColor: ArenaColors.brand.primary,
        };

      case 'APPROVAL_REQUIRED':
        return {
          label: 'Aprovação',
          iconName: 'checkmark-done-outline',
          backgroundColor: ArenaColors.semantic.warningSubtle,
          textColor: ArenaColors.semantic.warning,
          borderColor: ArenaColors.semantic.warning,
        };

      case 'INVITE_ONLY':
        return {
          label: 'Privado',
          iconName: 'mail-outline',
          backgroundColor: ArenaColors.semantic.errorSubtle,
          textColor: ArenaColors.semantic.error,
          borderColor: ArenaColors.semantic.error,
        };

      default:
        return {
          label: 'Público',
          iconName: 'globe-outline',
          backgroundColor: ArenaColors.semantic.successSubtle,
          textColor: ArenaColors.semantic.success,
          borderColor: ArenaColors.semantic.success,
        };
    }
  }, [privacy, groupName]);

  const iconSize = useMemo(() => {
    switch (size) {
      case 'sm':
        return 12;
      case 'md':
        return 14;
      case 'lg':
        return 16;
      default:
        return 14;
    }
  }, [size]);

  const containerStyles = [
    styles.container,
    size === 'sm' && styles.containerSm,
    size === 'md' && styles.containerMd,
    size === 'lg' && styles.containerLg,
    {
      backgroundColor: config.backgroundColor,
      borderColor: config.borderColor,
    },
    style,
  ];

  return (
    <View style={containerStyles} testID={testID}>
      {showIcon && (
        <Ionicons
          name={config.iconName as keyof typeof Ionicons.glyphMap}
          size={iconSize}
          color={config.textColor}
        />
      )}
      {showLabel && (
        <Text
          variant="captionSecondary"
          style={[
            { color: config.textColor },
            ...(textStyle ? [textStyle] : []),
          ]}
        >
          {config.label}
        </Text>
      )}
    </View>
  );
};
