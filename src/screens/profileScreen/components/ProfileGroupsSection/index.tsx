import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { UserCard } from '@/components/userCard';
import { Group } from '@/services/groups/typesGroups';
import { User } from '@/services/users/typesUsers';
import { groupsApi } from '@/services/groups/groupsApi';
import { ProfileGroupsSectionProps } from './typesProfileGroupsSection';
import { styles } from './stylesProfileGroupsSection';

const mapGroupToUserCard = (group: Group): User => {
  const nameParts = group.name.trim().split(' ');
  const firstName = nameParts[0] || group.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  const usernameText =
    group.description?.slice(0, 80) ||
    `${group.memberCount} ${group.memberCount === 1 ? 'membro' : 'membros'}`;

  return {
    id: group.id,
    firstName,
    lastName,
    username: usernameText,
    email: '',
    profilePicture: group.avatar || null,
    city: group.city || null,
    state: group.state || null,
    sports: group.sports || [],
    isEmailVerified: false,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
  } as User;
};

export const ProfileGroupsSection: React.FC<ProfileGroupsSectionProps> = ({
  userId,
  isOwnProfile,
}) => {
  const navigation = useNavigation();
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

  const handleGroupPress = useCallback(
    (groupId: string) => {
      navigation.navigate('GroupDetails', { groupId });
    },
    [navigation]
  );

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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.groupsScrollContent}
        style={styles.groupsScrollContainer}
      >
        {safeGroups.map(group => (
          <View key={group.id} style={styles.groupCardWrapper}>
            <UserCard
              user={mapGroupToUserCard(group)}
              variant="friend"
              onPress={() => handleGroupPress(group.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};
