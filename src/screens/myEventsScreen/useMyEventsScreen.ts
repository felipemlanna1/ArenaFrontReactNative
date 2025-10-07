import { useState } from 'react';
import { UseMyEventsScreenReturn } from './typesMyEventsScreen';

export const useMyEventsScreen = (): UseMyEventsScreenReturn => {
  const [isLoading] = useState(false);

  return {
    isLoading,
  };
};
