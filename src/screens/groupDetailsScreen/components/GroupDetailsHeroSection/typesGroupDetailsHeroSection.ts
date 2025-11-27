import { Sport } from '@/services/groups/typesGroups';

export interface GroupDetailsHeroSectionProps {
  coverImageUrl?: string | null;
  primarySport?: Sport | null;
  isPublic: boolean;
}
