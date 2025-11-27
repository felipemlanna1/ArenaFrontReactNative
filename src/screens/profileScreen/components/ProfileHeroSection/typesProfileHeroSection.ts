import { SportBadgeData } from '@/screens/profileScreen/typesProfileScreen';

export interface ProfileHeroSectionProps {
  avatarUrl: string | null;
  initials: string;
  coverImageUrl?: string | null;
  primarySport?: SportBadgeData | null;
  isUserActive?: boolean;
  hideAvatar?: boolean;
  completionProgress?: number;
}
