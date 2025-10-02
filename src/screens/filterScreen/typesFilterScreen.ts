import {
  EventStatus,
  EventPrivacy,
  SkillLevel,
  EventsFilter,
} from '@/services/events/typesEvents';

export type EventType = 'CASUAL' | 'COMPETITIVE' | 'TRAINING' | 'TOURNAMENT';

export interface FilterScreenState {
  sportIds: string[];
  skillLevels: SkillLevel[];
  privacy: EventPrivacy[];
  status: EventStatus[];
  eventTypes: EventType[];
  priceMin: number | null;
  priceMax: number | null;
  isFree: boolean;
  hasAvailableSpots: boolean;
  startDateFrom: Date | null;
  startDateTo: Date | null;
  city: string;
  state: string;
  sortBy: 'startDate' | 'distance' | 'price' | 'createdAt';
  sortOrder: 'asc' | 'desc';
}

export interface FilterCount {
  total: number;
  byCategory: {
    sports: number;
    skill: number;
    price: number;
    date: number;
    location: number;
    other: number;
  };
}

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface FilterScreenProps {
  currentFilters?: Partial<EventsFilter>;
  onApplyFilters: (filters: EventsFilter) => void;
}

export interface UseFilterScreenReturn {
  filters: FilterScreenState;
  updateFilter: <K extends keyof FilterScreenState>(
    key: K,
    value: FilterScreenState[K]
  ) => void;
  toggleArrayFilter: <K extends keyof FilterScreenState>(
    key: K,
    value: string
  ) => void;
  clearFilters: () => void;
  applyFilters: () => Promise<void>;
  filterCount: FilterCount;
  isApplying: boolean;
}
