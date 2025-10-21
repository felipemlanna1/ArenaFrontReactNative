import { useCallback } from 'react';
import { EventFilterType } from '@/screens/myEventsScreen/typesMyEventsScreen';
import { UseEventTypeFilterReturn } from './typesEventTypeFilter';

interface UseEventTypeFilterParams {
  onChange: (value: EventFilterType) => void;
}

export const useEventTypeFilter = ({
  onChange,
}: UseEventTypeFilterParams): UseEventTypeFilterReturn => {
  const handlePress = useCallback(
    (value: EventFilterType) => {
      onChange(value);
    },
    [onChange]
  );

  return {
    handlePress,
  };
};
