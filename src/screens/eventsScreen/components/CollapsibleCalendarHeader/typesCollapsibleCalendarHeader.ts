export interface CollapsibleCalendarHeaderProps {
  selectedDate: Date;
  eventsCount: number;
  isExpanded: boolean;
  onToggle: () => void;
  testID?: string;
}
