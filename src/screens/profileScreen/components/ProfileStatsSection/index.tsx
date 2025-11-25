import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AnimatedCounter } from '@/components/ui/animatedCounter';
import {
  ProfileStatsSectionProps,
  StatCardData,
} from './typesProfileStatsSection';
import { styles } from './stylesProfileStatsSection';

export const ProfileStatsSection: React.FC<ProfileStatsSectionProps> = ({
  stats,
  isLoading,
  customLabels,
}) => {
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Estatísticas
        </Text>
        <View style={styles.loadingContainer}>
          <SportsLoading size="md" animationSpeed="normal" />
        </View>
      </View>
    );
  }

  if (!stats) {
    return (
      <View style={styles.container}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Estatísticas
        </Text>
        <View style={styles.loadingContainer}>
          <Text variant="bodySecondary">
            Estatísticas não disponíveis no momento
          </Text>
        </View>
      </View>
    );
  }

  const activityStats: StatCardData[] = [
    {
      id: 'events',
      label: customLabels?.events ?? 'Eventos',
      value: stats.totalEvents ?? 0,
    },
    {
      id: 'created',
      label: customLabels?.created ?? 'Criados',
      value: stats.createdEvents ?? 0,
    },
  ];

  const socialStats: StatCardData[] = [
    {
      id: 'friends',
      label: customLabels?.friends ?? 'Amigos',
      value: stats.totalFriends ?? 0,
    },
    {
      id: 'groups',
      label: customLabels?.groups ?? 'Equipes',
      value: stats.totalGroups ?? 0,
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant="titlePrimary" style={styles.sectionTitle}>
        Estatísticas
      </Text>
      <View style={styles.statsContainer}>
        <View style={styles.statsGroup}>
          <Text variant="labelPrimary" style={styles.groupLabel}>
            ATIVIDADE
          </Text>
          <View style={styles.statsRow}>
            {activityStats.map(card => (
              <View key={card.id} style={styles.statCard}>
                <AnimatedCounter
                  value={card.value}
                  duration={1000}
                  variant="displayPrimary"
                  style={styles.statValue}
                />
                <Text variant="captionSecondary" style={styles.statLabel}>
                  {card.label}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.statsGroup}>
          <Text variant="labelPrimary" style={styles.groupLabel}>
            SOCIAL
          </Text>
          <View style={styles.statsRow}>
            {socialStats.map(card => (
              <View key={card.id} style={styles.statCard}>
                <AnimatedCounter
                  value={card.value}
                  duration={1000}
                  variant="displayPrimary"
                  style={styles.statValue}
                />
                <Text variant="captionSecondary" style={styles.statLabel}>
                  {card.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
