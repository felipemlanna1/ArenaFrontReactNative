import { TimeCategory } from '@/screens/myEventsScreen/typesMyEventsScreen';

export interface EventSectionHeaderProps {
  label: string;
  category: TimeCategory;
  count: number;
  testID?: string;
}
