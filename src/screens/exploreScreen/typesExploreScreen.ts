import {
  ExploreFilterType,
  FilterCount,
} from './components/ExploreFilter/typesExploreFilter';

export interface ExploreScreenProps {
  testID?: string;
}

export interface UseExploreScreenReturn {
  isLoading: boolean;
  activeFilter: ExploreFilterType;
  filterCounts: FilterCount;
  handleFilterChange: (filter: ExploreFilterType) => void;
}
