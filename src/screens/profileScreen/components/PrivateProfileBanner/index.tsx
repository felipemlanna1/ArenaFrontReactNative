import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { FriendshipStatus } from '@/services/friendships/typesFriendships';
import { PrivateProfileBannerProps } from './typesPrivateProfileBanner';
import { styles } from './stylesPrivateProfileBanner';

export const PrivateProfileBanner: React.FC<PrivateProfileBannerProps> = ({
  userId,
  userName,
  friendshipStatus,
  onSendRequest,
  onBack,
  testID = 'private-profile-banner',
}) => {
  const renderContent = () => {
    switch (friendshipStatus) {
      case FriendshipStatus.PENDING:
        return (
          <>
            <View style={styles.content}>
              <Text variant="bodyPrimary" style={styles.description}>
                Você enviou uma solicitação de amizade para {userName}.
              </Text>
              <Text variant="captionSecondary" style={styles.description}>
                Aguardando resposta para visualizar o perfil completo.
              </Text>
            </View>

            <View style={styles.statusContainer}>
              <Ionicons
                name="time-outline"
                size={20}
                color={ArenaColors.semantic.warning}
              />
              <Text variant="captionSecondary">Solicitação Pendente</Text>
            </View>

            <View style={styles.buttonsRow}>
              <View style={styles.button}>
                <Button
                  variant="secondary"
                  onPress={onBack}
                  size="md"
                  fullWidth
                >
                  Voltar
                </Button>
              </View>
            </View>
          </>
        );

      case FriendshipStatus.REJECTED:
        return (
          <>
            <View style={styles.content}>
              <Text variant="bodyPrimary" style={styles.description}>
                {userName} recusou sua solicitação de amizade.
              </Text>
              <Text variant="captionSecondary" style={styles.description}>
                O perfil deste usuário permanece privado.
              </Text>
            </View>

            <View style={styles.buttonsRow}>
              <View style={styles.button}>
                <Button
                  variant="secondary"
                  onPress={onBack}
                  size="md"
                  fullWidth
                >
                  Voltar
                </Button>
              </View>
            </View>
          </>
        );

      case FriendshipStatus.BLOCKED:
        return (
          <>
            <View style={styles.content}>
              <Text variant="bodyPrimary" style={styles.description}>
                Você não pode visualizar este perfil.
              </Text>
            </View>

            <View style={styles.buttonsRow}>
              <View style={styles.button}>
                <Button
                  variant="secondary"
                  onPress={onBack}
                  size="md"
                  fullWidth
                >
                  Voltar
                </Button>
              </View>
            </View>
          </>
        );

      default:
        return (
          <>
            <View style={styles.content}>
              <Text variant="bodyPrimary" style={styles.description}>
                Este usuário mantém seu perfil privado. Envie uma solicitação de
                amizade para ver mais informações.
              </Text>
            </View>

            <View style={styles.buttonsRow}>
              <View style={styles.button}>
                <Button
                  variant="secondary"
                  onPress={onBack}
                  size="md"
                  fullWidth
                >
                  Voltar
                </Button>
              </View>
              <View style={styles.button}>
                <Button
                  variant="primary"
                  onPress={onSendRequest}
                  size="md"
                  fullWidth
                >
                  Adicionar Amigo
                </Button>
              </View>
            </View>
          </>
        );
    }
  };

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="lock-closed"
          size={48}
          color={ArenaColors.brand.primary}
        />
        <Text variant="titlePrimary">Perfil Privado</Text>
      </View>

      {renderContent()}
    </View>
  );
};
