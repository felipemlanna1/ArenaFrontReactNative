import { Event } from '@/services/events/typesEvents';
import { EventDetailsStatus } from '@/screens/eventDetailsScreen/typesEventDetailsScreen';

export interface EventInfoGridProps {
  event: Event;
  status: EventDetailsStatus;
}
