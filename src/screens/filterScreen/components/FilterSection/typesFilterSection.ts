import { ReactNode } from 'react';

export interface FilterSectionProps {
  title: string;
  children: ReactNode;
  count?: number;
  testID?: string;
}
