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
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onSwitchToRecommendations: () => void;
}

export const MyGroupsSection: React.FC<MyGroupsSectionProps> = ({
  groups,
  isLoading,
  loadingGroupId,
  onNavigateToGroup,
  onManageGroup,
  onLeaveGroup,
  hasActiveFilters,
  onClearFilters,
  onSwitchToRecommendations,
}) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          icon="funnel-outline"
          title="Nenhum grupo encontrado"
          message="Tente ajustar seus filtros ou limpe-os para ver todos os seus grupos."
          actionLabel="Limpar Filtros"
          onActionPress={onClearFilters}
          testID="my-groups-filtered-empty-state"
        />
      );
    }

    return (
      <EmptyState
        icon="fitness-outline"
        title="Seu squad te espera!"
        message="Participe de grupos e treine com atletas que compartilham sua paixão. Juntos vocês chegam mais longe!"
        actionLabel="Explorar Grupos"
        onActionPress={onSwitchToRecommendations}
        testID="my-groups-empty-state"
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
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onCreateGroup: () => void;
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
  hasActiveFilters,
  onClearFilters,
  onCreateGroup,
}) => {
  if (isLoading) return <LoadingState />;
  if (groups.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          icon="search-outline"
          title="Nenhum resultado"
          message="Não encontramos grupos com esses critérios. Tente expandir sua busca ou explore outras regiões."
          actionLabel="Limpar Filtros"
          onActionPress={onClearFilters}
          testID="recommendations-filtered-empty-state"
        />
      );
    }

    return (
      <EmptyState
        icon="rocket-outline"
        title="Seja o pioneiro!"
        message="Ainda não há grupos na sua região. Que tal criar o primeiro e reunir atletas que pensam como você?"
        actionLabel="Criar Grupo"
        onActionPress={onCreateGroup}
        testID="recommendations-empty-state"
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
