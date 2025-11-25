import { SportBadgeData } from '@/screens/profileScreen/typesProfileScreen';

export interface ProfileHeroSectionProps {
  avatarUrl: string | null;
  initials: string;
  showBackButton: boolean;
  onBackPress?: () => void;
  coverImageUrl?: string | null;
  primarySport?: SportBadgeData | null;
  isUserActive?: boolean;
  hideAvatar?: boolean;
  /**
   * Progresso de completude do perfil (0-100)
   * @default 0
   */
  completionProgress?: number;
}
