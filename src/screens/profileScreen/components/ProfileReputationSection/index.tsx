import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AnimatedCounter } from '@/components/ui/animatedCounter';
import { ArenaColors } from '@/constants';
import { useReputationData } from './hooks/useReputationData';
import { ProfileReputationSectionProps } from './typesProfileReputationSection';
import { styles } from './stylesProfileReputationSection';

export const ProfileReputationSection: React.FC<
  ProfileReputationSectionProps
> = ({ userId, isOwnProfile, testID = 'profile-reputation-section' }) => {
  const { aggregate, isLoading } = useReputationData(userId);

  if (isLoading) {
    return (
      <View style={styles.container} testID={testID}>
        <Text variant="labelPrimary">REPUTAÇÃO</Text>
        <View style={styles.loadingContainer}>
          <SportsLoading size="md" animationSpeed="normal" />
        </View>
      </View>
    );
  }

  if (!aggregate || aggregate.totalRatingsReceived < 5) {
    return (
      <View style={styles.container} testID={testID}>
        <Text variant="labelPrimary">REPUTAÇÃO</Text>
        <View style={styles.emptyState}>
          <Text variant="displayPrimary">—</Text>
          <Text variant="captionSecondary">
            {isOwnProfile
              ? `${aggregate?.totalRatingsReceived || 0}/5 avaliações (mínimo 5)`
              : 'Mínimo 5 avaliações necessárias'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container} testID={testID}>
      <Text variant="labelPrimary">REPUTAÇÃO</Text>

      <View style={styles.mainRating}>
        <Ionicons name="star" size={24} color={ArenaColors.semantic.warning} />
        <AnimatedCounter
          value={aggregate.overallAverageRating}
          duration={1000}
          variant="displayPrimary"
          decimals={1}
          style={styles.ratingValue}
        />
        <Text variant="captionSecondary">/ 5.0</Text>
      </View>

      <View style={styles.breakdown}>
        <View style={styles.breakdownItem}>
          <Text variant="labelSecondary">Habilidade</Text>
          <Text variant="bodyPrimary">
            {aggregate.technicalSkillAverage.toFixed(1)}
          </Text>
        </View>
        <View style={styles.breakdownItem}>
          <Text variant="labelSecondary">Participação</Text>
          <Text variant="bodyPrimary">
            {aggregate.participationAverage.toFixed(1)}
          </Text>
        </View>
      </View>

      <Text variant="captionSecondary" style={styles.count}>
        Baseado em {aggregate.totalRatingsReceived}{' '}
        {aggregate.totalRatingsReceived === 1 ? 'avaliação' : 'avaliações'}
      </Text>
    </View>
  );
};
