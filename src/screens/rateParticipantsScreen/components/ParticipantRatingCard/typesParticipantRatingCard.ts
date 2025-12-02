import { ParticipantToRate } from '@/services/feedback/typesFeedback';

export interface ParticipantRatingCardProps {
  participant: ParticipantToRate;
  technicalRating: number;
  participationRating: number;
  onTechnicalChange: (value: number) => void;
  onParticipationChange: (value: number) => void;
  isAlreadyRated: boolean;
  testID?: string;
}
