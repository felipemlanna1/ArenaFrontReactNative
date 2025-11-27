import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { UserCard } from '@/components/userCard';
import { EmptyState } from '@/components/ui/emptyState';
import { UserData } from '@/services/http';
import { ArenaSpacing } from '@/constants';

const styles = StyleSheet.create({
  userList: {
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

interface FriendsSectionProps {
  friends: UserData[];
  isLoading: boolean;
  loadingUserId: string | null;
  onNavigateToProfile: (userId: string) => void;
  onRemoveFriend: (userId: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onSwitchToRecommendations: () => void;
  onInviteFriends: () => void;
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({
  friends,
  isLoading,
  loadingUserId,
  onNavigateToProfile,
  onRemoveFriend,
  hasActiveFilters,
  onClearFilters,
  onSwitchToRecommendations,
  onInviteFriends,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (friends.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          icon="filter-outline"
          title="Nenhum amigo encontrado"
          message="Tente ajustar seus filtros ou limpe-os para ver todos os seus amigos."
          actionLabel="Limpar Filtros"
          onActionPress={onClearFilters}
          testID="friends-filtered-empty-state"
        />
      );
    }

    return (
      <EmptyState
        icon="people-circle-outline"
        title="Treine com amigos!"
        message="Conecte-se com atletas da sua região e compartilhem treinos, dicas e conquistas. A jornada é melhor acompanhado!"
        actionLabel="Descobrir Atletas"
        onActionPress={onSwitchToRecommendations}
        secondaryActionLabel="Convide seus amigos"
        onSecondaryActionPress={onInviteFriends}
        testID="friends-empty-state"
      />
    );
  }

  return (
    <View style={styles.userList}>
      {friends.map(friend => (
        <UserCard
          key={friend.id}
          user={friend}
          variant="friend"
          onPress={() => onNavigateToProfile(friend.id)}
          onRemove={() => onRemoveFriend(friend.id)}
          isLoading={loadingUserId === friend.id}
          testID={`friend-card-${friend.id}`}
        />
      ))}
    </View>
  );
};

interface RequestsSectionProps {
  requests: UserData[];
  isLoading: boolean;
  loadingUserId: string | null;
  onAcceptRequest: (userId: string) => void;
  onRejectRequest: (userId: string) => void;
}

export const RequestsSection: React.FC<RequestsSectionProps> = ({
  requests,
  isLoading,
  loadingUserId,
  onAcceptRequest,
  onRejectRequest,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }
  if (requests.length === 0) {
    return (
      <EmptyState
        icon="mail-outline"
        title="Tudo em dia"
        message="Você não tem solicitações de amizade recebidas no momento"
      />
    );
  }

  return (
    <View style={styles.userList}>
      {requests.map((request, index) => {
        return (
          <UserCard
            key={request.id}
            user={request}
            variant="request"
            onAccept={() => onAcceptRequest(request.id)}
            onReject={() => onRejectRequest(request.id)}
            isLoading={loadingUserId === request.id}
            testID={`request-card-${request.id}`}
          />
        );
      })}
    </View>
  );
};

interface OutgoingRequestsSectionProps {
  requests: UserData[];
  isLoading: boolean;
  loadingUserId: string | null;
  onNavigateToProfile: (userId: string) => void;
  onCancelRequest: (userId: string) => void;
  onSwitchToRecommendations: () => void;
}

export const OutgoingRequestsSection: React.FC<
  OutgoingRequestsSectionProps
> = ({
  requests,
  isLoading,
  loadingUserId,
  onNavigateToProfile,
  onCancelRequest,
  onSwitchToRecommendations,
}) => {
  if (isLoading) return <LoadingState />;
  if (requests.length === 0) {
    return (
      <EmptyState
        icon="paper-plane-outline"
        title="Nenhuma solicitação enviada"
        message="Que tal começar a expandir sua rede? Descubra atletas com interesses em comum!"
        actionLabel="Ver Recomendações"
        onActionPress={onSwitchToRecommendations}
        testID="outgoing-empty-state"
      />
    );
  }
  return (
    <View style={styles.userList}>
      {requests.map(request => (
        <UserCard
          key={request.id}
          user={request}
          variant="outgoing"
          onPress={() => onNavigateToProfile(request.id)}
          onCancel={() => onCancelRequest(request.id)}
          isLoading={loadingUserId === request.id}
          testID={`outgoing-card-${request.id}`}
        />
      ))}
    </View>
  );
};

interface RecommendationsSectionProps {
  recommendations: UserData[];
  isLoading: boolean;
  loadingUserId: string | null;
  onNavigateToProfile: (userId: string) => void;
  onSendRequest: (userId: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onEditProfile: () => void;
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  isLoading,
  loadingUserId,
  onNavigateToProfile,
  onSendRequest,
  hasActiveFilters,
  onClearFilters,
  onEditProfile,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }
  if (recommendations.length === 0) {
    if (hasActiveFilters) {
      return (
        <EmptyState
          icon="search-outline"
          title="Nenhum resultado"
          message="Não encontramos atletas com esses critérios. Tente ajustar seus filtros ou explore outras cidades."
          actionLabel="Limpar Filtros"
          onActionPress={onClearFilters}
          testID="recommendations-filtered-empty-state"
        />
      );
    }

    return (
      <EmptyState
        icon="compass-outline"
        title="Complete seu perfil"
        message="Para receber recomendações personalizadas, adicione seus esportes favoritos, localização e fotos ao seu perfil!"
        actionLabel="Editar Perfil"
        onActionPress={onEditProfile}
        testID="recommendations-empty-state"
      />
    );
  }

  return (
    <View style={styles.userList}>
      {recommendations.map((recommendation, index) => {
        return (
          <UserCard
            key={recommendation.id}
            user={recommendation}
            variant="recommendation"
            onPress={() => onNavigateToProfile(recommendation.id)}
            onAddFriend={() => onSendRequest(recommendation.id)}
            isLoading={loadingUserId === recommendation.id}
            testID={`recommendation-card-${recommendation.id}`}
          />
        );
      })}
    </View>
  );
};
