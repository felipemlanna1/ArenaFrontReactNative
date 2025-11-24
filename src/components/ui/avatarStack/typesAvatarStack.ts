import { ImageSourcePropType } from 'react-native';

export interface Participant {
  id: string;
  userId: string;
  name: string;
  profileImage?: string | null;
  isOrganizer?: boolean;
  mutualFriendsCount?: number;
  level?: number;
}

export interface AvatarStackProps {
  participants: Participant[];
  maxVisible?: number;
  avatarSize?: number;
  overlap?: number;
  onPress?: () => void;
  showLabel?: boolean;
  labelText?: string;
  isLoading?: boolean;
  testID?: string;
}

export interface AvatarProps {
  source: ImageSourcePropType | null;
  name: string;
  size: number;
  overlap: number;
  isOrganizer?: boolean;
  onPress?: () => void;
  testID?: string;
}

export interface OverflowBadgeProps {
  count: number;
  size: number;
  onPress?: () => void;
  testID?: string;
}
