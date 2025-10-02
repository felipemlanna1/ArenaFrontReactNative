import React from 'react';
import { RefreshControl as RNRefreshControl } from 'react-native';
import { ArenaColors } from '@/constants';

interface ArenaRefreshControlProps {
  refreshing: boolean;
  onRefresh: () => void;
  tintColor?: string;
}

export const ArenaRefreshControl: React.FC<ArenaRefreshControlProps> = ({
  refreshing,
  onRefresh,
  tintColor = ArenaColors.brand.primary,
}) => {
  return (
    <RNRefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor={tintColor}
      colors={[tintColor]}
      progressBackgroundColor={ArenaColors.neutral.dark}
      progressViewOffset={-10}
    />
  );
};
