import { SportBadgeData } from '@/screens/profileScreen/typesProfileScreen';

export interface ProfileInfoSectionProps {
  fullName: string;
  username: string;
  age?: number | null;
  gender?: string | null;
  city?: string | null;
  state?: string | null;
  sports?: SportBadgeData[];
  isEmailVerified?: boolean;
  memberSince?: string;
}
