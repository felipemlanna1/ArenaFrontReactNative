export interface ActiveFiltersBarProps {
  city?: string;
  state?: string;
  sportIds?: string[];
  sportNames?: { id: string; name: string }[];
  onClearLocation: () => void;
  onRemoveSport: (sportId: string) => void;
  onClearAll: () => void;
  testID?: string;
}
