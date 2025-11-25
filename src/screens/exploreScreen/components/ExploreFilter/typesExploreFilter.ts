export type ExploreFilterType = 'friends' | 'groups' | 'events';

export interface FilterOption {
  value: ExploreFilterType;
  label: string;
}

export interface FilterCount {
  friends: number;
  groups: number;
  events: number;
}

export interface ExploreFilterProps {
  value: ExploreFilterType;
  filterCounts: FilterCount;
  onChange: (value: ExploreFilterType) => void;
  testID?: string;
}

export interface UseExploreFilterProps {
  onChange: (value: ExploreFilterType) => void;
}

export interface UseExploreFilterReturn {
  handlePress: (value: ExploreFilterType) => void;
}
