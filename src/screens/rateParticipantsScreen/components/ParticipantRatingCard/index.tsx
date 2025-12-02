import React from 'react';
import { View } from 'react-native';
import { Card } from '@/components/ui/card';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { StarRating } from '@/components/ui/starRating';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';
import { ParticipantRatingCardProps } from './typesParticipantRatingCard';
import { styles } from './stylesParticipantRatingCard';

export const ParticipantRatingCard: React.FC<ParticipantRatingCardProps> = ({
  participant,
  technicalRating,
  participationRating,
  onTechnicalChange,
  onParticipationChange,
  isAlreadyRated,
  testID,
}) => {
  const cardStyles = [
    styles.cardContent,
    isAlreadyRated ? styles.cardDisabled : undefined,
  ].filter((style): style is NonNullable<typeof style> => Boolean(style));

  return (
    <Card variant="default" style={cardStyles} testID={testID}>
      <View style={styles.header}>
        {participant.avatar ? (
          <OptimizedImage
            source={{ uri: participant.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
        ) : (
          <View style={styles.avatar} />
        )}

        <View style={styles.nameContainer}>
          <Text variant="titleSecondary">{participant.name}</Text>

          {participant.rating !== undefined && participant.rating > 0 && (
            <View style={styles.overallRating}>
              <Ionicons
                name="star"
                size={14}
                color={ArenaColors.semantic.warning}
              />
              <Text variant="captionSecondary">
                {participant.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        {isAlreadyRated && (
          <Badge
            variant="success"
            size="sm"
            iconName="checkmark-circle"
            testID={`${testID}-badge`}
          >
            Avaliado
          </Badge>
        )}
      </View>

      <View style={styles.divider} />

      <View style={styles.ratingSection}>
        <Label variant="inline">Habilidade Técnica</Label>
        <StarRating
          value={technicalRating}
          onValueChange={onTechnicalChange}
          size="md"
          readonly={isAlreadyRated}
          showLabel
          testID={`${testID}-technical-rating`}
        />
      </View>

      <View style={styles.ratingSection}>
        <Label variant="inline">Participação</Label>
        <StarRating
          value={participationRating}
          onValueChange={onParticipationChange}
          size="md"
          readonly={isAlreadyRated}
          showLabel
          testID={`${testID}-participation-rating`}
        />
      </View>
    </Card>
  );
};
