import { Event } from '@/services/events/typesEvents';

export interface EventCardProps {
  event: Event;
  onPress: (eventId: string) => void;
  onShare: (eventId: string) => void;
  testID?: string;
}
