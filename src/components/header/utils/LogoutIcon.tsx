import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export const LogoutIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => {
  return <Ionicons name="log-out-outline" size={size} color={color} />;
};
