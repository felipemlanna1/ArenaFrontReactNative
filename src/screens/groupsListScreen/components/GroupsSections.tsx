import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { GroupCard } from '@/components/ui/groupCard';
import { EmptyState } from '@/components/ui/emptyState';
import { ArenaSpacing } from '@/constants';
import { Group } from '@/services/groups/typesGroups';

const styles = StyleSheet.create({
  groupsList: {
    gap: ArenaSpacing.md,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
});

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
  onManageGroup: (groupId: string) => void;
  onLeaveGroup: (groupId: string) => Promise<void>;
}

export const MyGroupsSection: React.FC<MyGroupsSectionProps> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onManageGroup,
  onLeaveGroup,
}) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    return (
      <EmptyState
        icon="people-circle-outline"
        title="Nenhum grupo ainda"
        message="Você ainda não participa de nenhum grupo. Explore as recomendações ou crie o seu próprio!"
      />
    );
  }
  return (
    <View style={styles.groupsList}>
      {groups.map(group => (
        <GroupCard
          key={group.id}
          group={group}
          onDetailsPress={onNavigateToGroup}
          onManagePress={onManageGroup}
          onJoinGroup={async () => {}}
          onLeaveGroup={onLeaveGroup}
          isActionLoading={loadingGroupId === group.id}
          currentActionGroupId={loadingGroupId}
          testID={`my-group-card-${group.id}`}
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
  onManageGroup: (groupId: string) => void;
  onCancelRequest: (groupId: string) => Promise<void>;
}

export const PendingGroupsSection: React.FC<PendingGroupsSectionProps> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onManageGroup,
  onCancelRequest,
}) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    return (
      <EmptyState
        icon="time-outline"
        title="Tudo em dia"
        message="Você não tem solicitações pendentes no momento"
      />
    );
  }
  return (
    <View style={styles.groupsList}>
      {groups.map(group => (
        <GroupCard
          key={group.id}
          group={group}
          onDetailsPress={onNavigateToGroup}
          onManagePress={onManageGroup}
          onJoinGroup={async () => {}}
          onLeaveGroup={onCancelRequest}
          isActionLoading={loadingGroupId === group.id}
          currentActionGroupId={loadingGroupId}
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
  onManageGroup: (groupId: string) => void;
  onJoinGroup: (groupId: string) => Promise<void>;
}

export const GroupRecommendationsSection: React.FC<
  GroupRecommendationsSectionProps
> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onManageGroup,
  onJoinGroup,
}) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    return (
      <EmptyState
        icon="sparkles-outline"
        title="Nenhuma recomendação"
        message="Não encontramos grupos para recomendar no momento. Tente ajustar seus filtros ou crie um novo grupo!"
      />
    );
  }
  return (
    <View style={styles.groupsList}>
      {groups.map(group => (
        <GroupCard
          key={group.id}
          group={group}
          onDetailsPress={onNavigateToGroup}
          onManagePress={onManageGroup}
          onJoinGroup={onJoinGroup}
          onLeaveGroup={async () => {}}
          isActionLoading={loadingGroupId === group.id}
          currentActionGroupId={loadingGroupId}
          testID={`recommendation-group-card-${group.id}`}
        />
      ))}
    </View>
  );
};
