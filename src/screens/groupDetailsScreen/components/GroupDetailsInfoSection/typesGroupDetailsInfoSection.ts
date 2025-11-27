import { ReactNode } from 'react';
import { Sport } from '@/services/groups/typesGroups';

export interface GroupDetailsInfoSectionProps {
  name: string;
  city?: string;
  state?: string;
  sports: Sport[];
  createdAt: string;
  description?: string;
  bannerSlot?: ReactNode;
}
