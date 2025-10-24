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
  invited: UserData[];
  selectedUserIds: Set<string>;
  isLoading: boolean;
  isSending: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  toggleSelection: (userId: string) => void;
  sendInvites: () => Promise<void>;
  canSendInvites: boolean;
}
