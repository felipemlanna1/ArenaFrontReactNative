import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
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

  const statCards: StatCardData[] = [
    {
      id: 'events',
      label: customLabels?.events ?? 'Eventos',
      value: (stats.totalEvents ?? 0).toString(),
    },
    {
      id: 'created',
      label: customLabels?.created ?? 'Criados',
      value: (stats.createdEvents ?? 0).toString(),
    },
    {
      id: 'groups',
      label: customLabels?.groups ?? 'Grupos',
      value: (stats.totalGroups ?? 0).toString(),
    },
    {
      id: 'friends',
      label: customLabels?.friends ?? 'Amigos',
      value: (stats.totalFriends ?? 0).toString(),
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant="titlePrimary" style={styles.sectionTitle}>
        Estatísticas
      </Text>
      <View style={styles.statsGrid}>
        {statCards.map((card, index) => (
          <React.Fragment key={card.id}>
            {index > 0 && <View style={styles.statDivider} />}
            <View style={styles.statCard}>
              <Text variant="displayPrimary" style={styles.statValue}>
                {card.value}
              </Text>
              <Text variant="captionSecondary" style={styles.statLabel}>
                {card.label}
              </Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
};
