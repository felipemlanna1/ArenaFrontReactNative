import { Event } from '@/services/events/typesEvents';

export interface EventOrganizerCardProps {
  event: Event;
  isOwner: boolean;
  onPress?: () => void;
}
