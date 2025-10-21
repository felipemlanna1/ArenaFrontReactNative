import { EventFilterType } from '@/screens/myEventsScreen/typesMyEventsScreen';

export interface FilterOption {
  value: EventFilterType;
  label: string;
}

export interface EventTypeFilterProps {
  value: EventFilterType;
  onChange: (value: EventFilterType) => void;
  testID?: string;
}

export interface UseEventTypeFilterReturn {
  handlePress: (value: EventFilterType) => void;
}
