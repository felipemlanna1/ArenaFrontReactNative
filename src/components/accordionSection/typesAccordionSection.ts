import { ReactNode } from 'react';

export interface AccordionSectionProps {
  title: string;
  count?: number;
  children: ReactNode;
  defaultExpanded?: boolean;
  hasMore?: boolean;
  isLoadingMore?: boolean;
  onLoadMore?: () => void;
  testID?: string;
}
