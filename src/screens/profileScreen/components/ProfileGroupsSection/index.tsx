import React, { useEffect, useState, useCallback } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { GroupCard } from '@/components/ui/groupCard';
import { Group } from '@/services/groups/typesGroups';
import { groupsApi } from '@/services/groups/groupsApi';
import { ProfileGroupsSectionProps } from './typesProfileGroupsSection';
import { styles } from './stylesProfileGroupsSection';

export const ProfileGroupsSection: React.FC<ProfileGroupsSectionProps> = ({
  userId,
  isOwnProfile,
}) => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserGroups = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const userGroups = await groupsApi.getUserGroups(userId);
      setGroups(Array.isArray(userGroups) ? userGroups : []);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error('Erro ao carregar grupos')
      );
      setGroups([]);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserGroups();
  }, [fetchUserGroups]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Grupos
        </Text>
        <View style={styles.loadingContainer}>
          <SportsLoading size="md" animationSpeed="normal" />
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Grupos
        </Text>
        <View style={styles.emptyContainer}>
          <Text variant="bodySecondary" style={styles.emptyText}>
            Erro ao carregar grupos
          </Text>
        </View>
      </View>
    );
  }

  const safeGroups = Array.isArray(groups) ? groups : [];

  if (safeGroups.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Grupos
        </Text>
        <View style={styles.emptyContainer}>
          <Text variant="bodySecondary" style={styles.emptyText}>
            {isOwnProfile
              ? 'Você ainda não participa de nenhum grupo'
              : 'Este usuário não participa de nenhum grupo'}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titlePrimary" style={styles.sectionTitle}>
        Grupos {safeGroups.length > 0 && `(${safeGroups.length})`}
      </Text>
      <View style={styles.groupsList}>
        {safeGroups.map(group => (
          <View key={group.id} style={styles.groupCardWrapper}>
            <GroupCard group={group} variant="compact" />
          </View>
        ))}
      </View>
    </View>
  );
};
