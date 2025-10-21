import { UserData } from '@/services/http';

export interface EventInviteModalProps {
  visible: boolean;
  eventId: string;
  onClose: () => void;
  onInvitesSent: () => void;
}

export interface UseEventInviteModalProps {
  eventId: string;
  visible: boolean;
  onInvitesSent: () => void;
}

export interface UseEventInviteModalReturn {
  friends: UserData[];
  others: UserData[];
  selectedUserIds: Set<string>;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  toggleSelection: (userId: string) => void;
  sendInvites: () => Promise<void>;
  canSendInvites: boolean;
}
