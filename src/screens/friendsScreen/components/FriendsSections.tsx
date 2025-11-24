import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { UserCard } from '@/components/userCard';
import { ArenaColors } from '@/constants';
import { UserData } from '@/services/http';
import { StyleSheet } from 'react-native';
import { ArenaSpacing } from '@/constants';

const styles = StyleSheet.create({
  userList: {
    gap: ArenaSpacing.md,
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    paddingHorizontal: ArenaSpacing.lg,
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.md,
  },
  emptyMessage: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.lg,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
});

const EmptyState: React.FC<{
  icon: keyof typeof Ionicons.glyphMap;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}> = ({ icon, message, actionLabel, onAction }) => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIcon}>
      <Ionicons name={icon} size={32} color={ArenaColors.neutral.medium} />
    </View>
    <Text variant="bodySecondary" style={styles.emptyMessage}>
      {message}
    </Text>
    {actionLabel && onAction && (
      <Button variant="ghost" size="sm" onPress={onAction}>
        {actionLabel}
      </Button>
    )}
  </View>
);

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
  onSearchPress?: () => void;
}

export const FriendsSection: React.FC<FriendsSectionProps> = ({
  friends,
  isLoading,
  loadingUserId,
  onNavigateToProfile,
  onRemoveFriend,
  onSearchPress,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }

  if (friends.length === 0) {
    return (
      <EmptyState
        icon="people-outline"
        message="Você ainda não tem amigos"
        actionLabel={onSearchPress ? 'Buscar Atletas' : undefined}
        onAction={onSearchPress}
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
        message="Nenhuma solicitação no momento"
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
}

export const OutgoingRequestsSection: React.FC<
  OutgoingRequestsSectionProps
> = ({
  requests,
  isLoading,
  loadingUserId,
  onNavigateToProfile,
  onCancelRequest,
}) => {
  if (isLoading) return <LoadingState />;
  if (requests.length === 0) {
    return (
      <EmptyState icon="time-outline" message="Nenhuma solicitação pendente" />
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
}

export const RecommendationsSection: React.FC<RecommendationsSectionProps> = ({
  recommendations,
  isLoading,
  loadingUserId,
  onNavigateToProfile,
  onSendRequest,
}) => {
  if (isLoading) {
    return <LoadingState />;
  }
  if (recommendations.length === 0) {
    return (
      <EmptyState
        icon="sparkles-outline"
        message="Nenhuma recomendação disponível no momento"
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
