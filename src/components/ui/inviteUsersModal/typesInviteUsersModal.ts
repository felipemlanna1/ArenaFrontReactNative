export interface InviteUsersModalProps {
  visible: boolean;
  onClose: () => void;
  onInvite?: (userIds: string[]) => Promise<void>;
  title?: string;
  maxSelections?: number;
  availableSlots?: number;
  entityType: 'group' | 'event';
  entityId: string;
}
