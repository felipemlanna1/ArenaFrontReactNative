import { EventsFilter } from '@/services/events/typesEvents';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  ComponentsShowcase: undefined;
  OnboardingSports: undefined;
  Home: undefined;
  FilterScreen: {
    currentFilters?: Partial<EventsFilter>;
    onApplyFilters: (filters: EventsFilter) => void;
  };
};
