import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors } from '@/constants';

export const LogoutIcon: React.FC<{ size: number; color: string }> = ({
  size,
}) => {
  return (
    <Ionicons
      name="log-out-outline"
      size={size}
      color={ArenaColors.semantic.error}
    />
  );
};
