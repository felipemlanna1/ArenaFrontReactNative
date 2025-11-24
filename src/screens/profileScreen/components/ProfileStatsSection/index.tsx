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
      label: 'Eventos',
      value: (stats.totalEvents ?? 0).toString(),
    },
    {
      id: 'created',
      label: 'Criados',
      value: (stats.createdEvents ?? 0).toString(),
    },
    {
      id: 'groups',
      label: 'Grupos',
      value: (stats.totalGroups ?? 0).toString(),
    },
    {
      id: 'friends',
      label: 'Amigos',
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
