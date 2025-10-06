import { Event } from '@/services/events/typesEvents';

export interface EventCardProps {
  event: Event;
  onDetailsPress: (eventId: string) => void;
  onManagePress: (eventId: string) => void;
  onShare: (eventId: string) => void;
  onJoinEvent: (eventId: string) => Promise<void>;
  onRequestJoin: (eventId: string) => Promise<void>;
  onCancelParticipation: (eventId: string) => Promise<void>;
  onUndoRequest: (eventId: string) => Promise<void>;
  onAcceptInvitation: (eventId: string, invitationId?: string) => Promise<void>;
  onRejectInvitation: (eventId: string, invitationId?: string) => Promise<void>;
  isActionLoading?: boolean;
  currentActionEventId?: string | null;
  testID?: string;
}
