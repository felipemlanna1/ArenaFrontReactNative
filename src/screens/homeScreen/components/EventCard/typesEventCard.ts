import { Event } from '@/services/events/typesEvents';

export interface EventCardProps {
  event: Event;
  onPress: (eventId: string) => void;
  onShare: (eventId: string) => void;
  onActionPress?: (eventId: string) => void;
  testID?: string;
}
