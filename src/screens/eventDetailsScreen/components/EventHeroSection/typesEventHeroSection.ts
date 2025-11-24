import { Event } from '@/services/events/typesEvents';

export interface EventHeroSectionProps {
  event: Event;
  isOwner: boolean;
  onBackPress: () => void;
  onSharePress: () => void;
  onEditPress?: () => void;
  userStatus?: 'confirmed' | 'pending' | 'rejected' | null;
}
