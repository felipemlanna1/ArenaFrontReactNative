import { ReactNode } from 'react';

export interface FilterSectionProps {
  title: string;
  children: ReactNode;
  count?: number;
  defaultExpanded?: boolean;
  testID?: string;
}
