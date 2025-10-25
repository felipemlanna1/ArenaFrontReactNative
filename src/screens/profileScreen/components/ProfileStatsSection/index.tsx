import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaColors } from '@/constants';
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
      iconName: 'trophy',
    },
    {
      id: 'created',
      label: 'Criados',
      value: (stats.createdEvents ?? 0).toString(),
      iconName: 'calendar',
    },
    {
      id: 'groups',
      label: 'Grupos',
      value: (stats.totalGroups ?? 0).toString(),
      iconName: 'people',
    },
    {
      id: 'friends',
      label: 'Amigos',
      value: (stats.totalFriends ?? 0).toString(),
      iconName: 'people-outline',
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant="titlePrimary" style={styles.sectionTitle}>
        Estatísticas
      </Text>
      <View style={styles.statsGrid}>
        {statCards.map(card => (
          <View key={card.id} style={styles.statCard}>
            <View style={styles.statCardHeader}>
              <Ionicons
                name={card.iconName as keyof typeof Ionicons.glyphMap}
                size={20}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="captionSecondary" style={styles.statLabel}>
                {card.label}
              </Text>
            </View>
            <Text variant="titlePrimary" style={styles.statValue}>
              {card.value}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};
