import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { UserCard } from '@/components/userCard';
import { ArenaColors, ArenaSpacing } from '@/constants';
import { Group } from '@/services/groups/typesGroups';
import { mapGroupToUserCard } from '../utils/groupToUserAdapter';

const styles = StyleSheet.create({
  groupsList: {
    gap: ArenaSpacing.md,
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
});

const EmptyState: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
}> = ({ icon, message }) => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIcon}>
      <Ionicons name={icon} size={48} color={ArenaColors.neutral.medium} />
    </View>
    <Text variant="bodySecondary">{message}</Text>
  </View>
);

const LoadingState: React.FC = () => (
  <View style={styles.loadingContainer}>
    <SportsLoading size="md" animationSpeed="normal" />
  </View>
);

interface MyGroupsSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => Promise<void>;
}

export const MyGroupsSection: React.FC<MyGroupsSectionProps> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onLeaveGroup,
}) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    return (
      <EmptyState
        icon="people-circle-outline"
        message="Você ainda não participa de nenhum grupo"
      />
    );
  }
  return (
    <View style={styles.groupsList}>
      {groups.map(group => (
        <UserCard
          key={group.id}
          user={mapGroupToUserCard(group)}
          variant="friend"
          onPress={() => onNavigateToGroup(group.id)}
          onRemove={() => onLeaveGroup(group.id)}
          isLoading={loadingGroupId === group.id}
          testID={`group-card-${group.id}`}
        />
      ))}
    </View>
  );
};

interface PendingGroupsSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onCancelRequest: (groupId: string) => Promise<void>;
}

export const PendingGroupsSection: React.FC<PendingGroupsSectionProps> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onCancelRequest,
}) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    return (
      <EmptyState icon="time-outline" message="Nenhuma solicitação pendente" />
    );
  }
  return (
    <View style={styles.groupsList}>
      {groups.map(group => (
        <UserCard
          key={group.id}
          user={mapGroupToUserCard(group)}
          variant="outgoing"
          onPress={() => onNavigateToGroup(group.id)}
          onCancel={() => onCancelRequest(group.id)}
          isLoading={loadingGroupId === group.id}
          testID={`pending-group-card-${group.id}`}
        />
      ))}
    </View>
  );
};

interface GroupRecommendationsSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onJoinGroup: (groupId: string) => Promise<void>;
}

export const GroupRecommendationsSection: React.FC<
  GroupRecommendationsSectionProps
> = ({ groups, isLoading, loadingGroupId, onNavigateToGroup, onJoinGroup }) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    return (
      <EmptyState
        icon="sparkles-outline"
        message="Nenhuma recomendação disponível no momento"
      />
    );
  }
  return (
    <View style={styles.groupsList}>
      {groups.map(group => (
        <UserCard
          key={group.id}
          user={mapGroupToUserCard(group)}
          variant="recommendation"
          onPress={() => onNavigateToGroup(group.id)}
          onAddFriend={() => onJoinGroup(group.id)}
          isLoading={loadingGroupId === group.id}
          testID={`recommendation-group-card-${group.id}`}
        />
      ))}
    </View>
  );
};
