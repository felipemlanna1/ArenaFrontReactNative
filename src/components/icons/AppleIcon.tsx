import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';

interface AppleIconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const AppleIcon: React.FC<AppleIconProps> = ({
  size = 24,
  color = ArenaColors.neutral.darkest,
  testID = 'apple-icon',
}) => {
  return (
    <Ionicons
      name="logo-apple"
      size={size}
      color={color}
      testID={testID}
    />
  );
};