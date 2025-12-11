import { ParticipantToRate } from '@/services/feedback/typesFeedback';
import { SkillLevel } from '@/components/ui/skillLevelRating/typesSkillLevelRating';

export interface ParticipantRatingCardProps {
  participant: ParticipantToRate;
  technicalRating: SkillLevel | null;
  participationRating: number;
  onTechnicalChange: (value: SkillLevel) => void;
  onParticipationChange: (value: number) => void;
  isAlreadyRated: boolean;
  testID?: string;
}
