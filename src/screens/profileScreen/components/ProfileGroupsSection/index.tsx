import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { UserCard } from '@/components/userCard';
import { Group } from '@/services/groups/typesGroups';
import { UserData } from '@/services/http';
import { groupsApi } from '@/services/groups/groupsApi';
import { ArenaColors } from '@/constants';
import { ProfileGroupsSectionProps } from './typesProfileGroupsSection';
import { styles } from './stylesProfileGroupsSection';
import { RootStackParamList } from '@/navigation/typesNavigation';

const mapGroupToUserCard = (group: Group): UserData => {
  const nameParts = group.name.trim().split(' ');
  const firstName = nameParts[0] || group.name;
  const lastName = nameParts.slice(1).join(' ') || '';

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
    username: '',
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
  const [showGradient, setShowGradient] = useState(false);

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

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const { contentOffset, contentSize, layoutMeasurement } =
        event.nativeEvent;
      const isScrollable = contentSize.width > layoutMeasurement.width;
      const isNotAtEnd =
        contentOffset.x < contentSize.width - layoutMeasurement.width - 10;
      setShowGradient(isScrollable && isNotAtEnd);
    },
    []
  );

  const handleContentSizeChange = useCallback(
    (contentWidth: number, contentHeight: number) => {
      const isScrollable = contentWidth > 0;
      setShowGradient(isScrollable);
    },
    []
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
      <View style={styles.groupsScrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.groupsScrollContent}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          onContentSizeChange={handleContentSizeChange}
        >
          {safeGroups.map((group, index) => (
            <React.Fragment key={group.id}>
              <View style={styles.groupCardWrapper}>
                <UserCard
                  user={mapGroupToUserCard(group)}
                  variant="friend"
                  onPress={() => handleGroupPress(group.id)}
                  hideAvatar={true}
                  hideActions={true}
                  customNameVariant="titlePrimary"
                  customNameColor={ArenaColors.brand.primary}
                  chevronPosition="right"
                />
              </View>
              {index < safeGroups.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </ScrollView>
        {showGradient && (
          <LinearGradient
            colors={[
              'transparent',
              `${ArenaColors.neutral.darkest}CC`,
              ArenaColors.neutral.darkest,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.scrollGradient}
          />
        )}
      </View>
    </View>
  );
};
