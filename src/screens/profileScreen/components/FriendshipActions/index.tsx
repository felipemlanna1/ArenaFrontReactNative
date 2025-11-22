import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { useFriendshipActions } from './useFriendshipActions';
import { FriendshipActionsProps } from './typesFriendshipActions';
import { styles } from './stylesFriendshipActions';

export const FriendshipActions: React.FC<FriendshipActionsProps> = ({
  userId,
  onStatusChange,
}) => {
  const {
    actionType,
    isLoading,
    handleSendRequest,
    handleCancelRequest,
    handleAcceptRequest,
    handleRejectRequest,
    handleRemoveFriend,
  } = useFriendshipActions(userId, onStatusChange);

  if (actionType === 'loading') {
    return null;
  }

  if (actionType === 'none') {
    return (
      <View style={styles.container}>
        <Button
          variant="primary"
          size="lg"
          onPress={handleSendRequest}
          loading={isLoading}
          fullWidth
        >
          Adicionar Amigo
        </Button>
      </View>
    );
  }

  if (actionType === 'pending_sent') {
    return (
      <View style={styles.container}>
        <Button
          variant="subtle"
          size="lg"
          onPress={handleCancelRequest}
          loading={isLoading}
          fullWidth
        >
          Cancelar Solicitação
        </Button>
      </View>
    );
  }

  if (actionType === 'pending_received') {
    return (
      <View style={styles.container}>
        <View style={styles.buttonsRow}>
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="lg"
              onPress={handleAcceptRequest}
              loading={isLoading}
              fullWidth
            >
              Aceitar
            </Button>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              variant="subtle"
              size="lg"
              onPress={handleRejectRequest}
              loading={isLoading}
              fullWidth
            >
              Recusar
            </Button>
          </View>
        </View>
      </View>
    );
  }

  if (actionType === 'accepted') {
    return (
      <View style={styles.container}>
        <Button
          variant="destructive"
          size="lg"
          onPress={handleRemoveFriend}
          loading={isLoading}
          fullWidth
        >
          Remover Amigo
        </Button>
      </View>
    );
  }

  return null;
};
