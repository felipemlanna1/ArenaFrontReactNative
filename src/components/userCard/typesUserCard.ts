import { UserData } from '@/services/http';

export type UserCardVariant =
  | 'friend'
  | 'request'
  | 'outgoing'
  | 'recommendation';

export interface UserCardProps {
  user: UserData;
  variant: UserCardVariant;
  onPress?: () => void;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  onRemove?: () => void;
  onAddFriend?: () => void;
  isLoading?: boolean;
  testID?: string;
}

export interface UseUserCardProps {
  user: UserData;
  variant: UserCardVariant;
  onAccept?: () => void;
  onReject?: () => void;
  onCancel?: () => void;
  onRemove?: () => void;
  onAddFriend?: () => void;
  isLoading?: boolean;
}

export interface UseUserCardReturn {
  displayName: string;
  displayLocation: string | null;
  displaySports: string[];
  hasActions: boolean;
  handlePrimaryAction: () => void;
  handleSecondaryAction?: () => void;
  primaryActionLabel: string;
  secondaryActionLabel?: string;
  isPrimaryDestructive: boolean;
}
