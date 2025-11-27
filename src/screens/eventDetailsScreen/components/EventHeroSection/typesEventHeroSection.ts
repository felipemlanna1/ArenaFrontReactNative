import { Event } from '@/services/events/typesEvents';

export interface EventHeroSectionProps {
  event: Event;
  userStatus?: 'confirmed' | 'pending' | 'rejected' | null;
}
