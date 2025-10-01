import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';

interface GoogleIconProps {
  size?: number;
  color?: string;
  testID?: string;
}

export const GoogleIcon: React.FC<GoogleIconProps> = ({
  size = 24,
  color = ArenaColors.neutral.darkest,
  testID = 'google-icon',
}) => {
  return <AntDesign name="google" size={size} color={color} testID={testID} />;
};
