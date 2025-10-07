import { useState } from 'react';
import { UseExploreScreenReturn } from './typesExploreScreen';

export const useExploreScreen = (): UseExploreScreenReturn => {
  const [isLoading] = useState(false);

  return {
    isLoading,
  };
};
