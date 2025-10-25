import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { GroupCard } from '@/components/ui/groupCard';
import { ArenaColors, ArenaSpacing } from '@/constants';
import { StyleSheet } from 'react-native';
import { Group } from '@/services/groups/typesGroups';

const styles = StyleSheet.create({
  groupsList: {
    gap: ArenaSpacing.sm,
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

interface GroupsSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => Promise<void>;
}

export const GroupsSection: React.FC<GroupsSectionProps> = ({
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
        <GroupCard
          key={group.id}
          group={group}
          variant="compact"
          onPress={onNavigateToGroup}
          onLeavePress={onLeaveGroup}
          isActionLoading={loadingGroupId === group.id}
          currentActionGroupId={loadingGroupId}
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
        <GroupCard
          key={group.id}
          group={group}
          variant="compact"
          onPress={onNavigateToGroup}
          onLeavePress={onCancelRequest}
          isActionLoading={loadingGroupId === group.id}
          currentActionGroupId={loadingGroupId}
          testID={`pending-group-card-${group.id}`}
        />
      ))}
    </View>
  );
};

interface RecommendationsGroupsSectionProps {
  groups: Group[];
  isLoading: boolean;
  loadingGroupId: string | null;
  onNavigateToGroup: (groupId: string) => void;
  onJoinGroup: (groupId: string) => Promise<void>;
}

export const RecommendationsGroupsSection: React.FC<
  RecommendationsGroupsSectionProps
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
        <GroupCard
          key={group.id}
          group={group}
          variant="compact"
          onPress={onNavigateToGroup}
          onJoinPress={onJoinGroup}
          isActionLoading={loadingGroupId === group.id}
          currentActionGroupId={loadingGroupId}
          testID={`recommendation-group-card-${group.id}`}
        />
      ))}
    </View>
  );
};
