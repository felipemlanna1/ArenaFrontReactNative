import React, { useEffect, useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { UserCard } from '@/components/userCard';
import { Group } from '@/services/groups/typesGroups';
import { UserData } from '@/services/http';
import { groupsApi } from '@/services/groups/groupsApi';
import { ProfileGroupsSectionProps } from './typesProfileGroupsSection';
import { styles } from './stylesProfileGroupsSection';
import { RootStackParamList } from '@/navigation/typesNavigation';

const mapGroupToUserCard = (group: Group): UserData => {
  const nameParts = group.name.trim().split(' ');
  const firstName = nameParts[0] || group.name;
  const lastName = nameParts.slice(1).join(' ') || '';

  const usernameText =
    group.description?.slice(0, 80) ||
    `${group.memberCount} ${group.memberCount === 1 ? 'membro' : 'membros'}`;

  const sports = (group.sports || []).map((sport, index) => ({
    sportId: sport.id,
    sportName: sport.name,
    sportIcon: sport.icon,
    sportColor: sport.color,
    isPrimary: index === 0,
    skillLevel: 'INTERMEDIATE' as const,
  }));

  return {
    id: group.id,
    firstName,
    lastName,
    username: usernameText,
    email: '',
    profilePicture: group.avatar || null,
    city: group.city || null,
    state: group.state || null,
    sports,
    isActive: group.isActive,
    isEmailVerified: false,
    createdAt: group.createdAt,
    updatedAt: group.updatedAt,
  } as UserData;
};

export const ProfileGroupsSection: React.FC<ProfileGroupsSectionProps> = ({
  userId,
  isOwnProfile,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
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
