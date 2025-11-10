import React, { useRef } from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  PanResponder,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAlert } from '@/contexts/AlertContext';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { styles } from './stylesInviteUsersModal';
import { InviteUsersModalProps } from './typesInviteUsersModal';
import { useInviteUsersModal } from './useInviteUsersModal';
import { eventsApi } from '@/services/events/eventsApi';
import { groupsApi } from '@/services/groups/groupsApi';
import { getInviteErrorMessage } from '@/utils/inviteErrors';

export const InviteUsersModal: React.FC<InviteUsersModalProps> = ({
  visible,
  onClose,
  onInvite,
  title = 'Convidar Usuários',
  availableSlots,
  entityType,
  entityId,
}) => {
  const {
    selectedTab,
    setSelectedTab,
    searchQuery,
    setSearchQuery,
    friends,
    invitedUsers,
    selectedUserIds,
    getFilteredUsers,
    toggleUserSelection,
    selectAllFriends,
    markUsersAsInvited,
    removeInvitedUser,
    isLoadingFriends,
    isLoadingRecommendations,
    isInviting,
    setIsInviting,
    loadMoreFriends,
    loadMoreRecommendations,
    hasMoreFriends,
    hasMoreRecommendations,
  } = useInviteUsersModal({ visible, entityType, entityId });

  const { showError, showSuccess } = useAlert();

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 20;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > 50) {
          if (selectedTab === 'recommendations') {
            setSelectedTab('friends');
          } else if (selectedTab === 'invited') {
            setSelectedTab('recommendations');
          }
        } else if (gestureState.dx < -50) {
          if (selectedTab === 'friends') {
            setSelectedTab('recommendations');
          } else if (selectedTab === 'recommendations') {
            setSelectedTab('invited');
          }
        }
      },
    })
  ).current;

  const handleInvite = async () => {
    if (selectedUserIds.length === 0) {
      showError('Selecione pelo menos um usuário para convidar');
      return;
    }

    setIsInviting(true);
    try {
      if (entityType === 'group') {
        await groupsApi.inviteMembers(entityId, selectedUserIds);
      } else {
        await eventsApi.inviteParticipants(entityId, selectedUserIds);
      }

      showSuccess(
        `${selectedUserIds.length} usuário(s) convidado(s) com sucesso!`
      );

      markUsersAsInvited(selectedUserIds);

      if (onInvite) {
        await onInvite(selectedUserIds);
      }

      onClose();
    } catch (error) {
      showError(getInviteErrorMessage(error));
    } finally {
      setIsInviting(false);
    }
  };

  const filteredUsers = getFilteredUsers();

  const handleRemoveInvite = (userId: string) => {
    removeInvitedUser(userId);
  };

  const renderUserItem = ({ item }: { item: unknown }) => {
    const user = item as {
      id: string;
      firstName: string;
      lastName: string;
      username: string;
      profileImageUrl?: string;
    };
    const isSelected = selectedUserIds.includes(user.id);
    const isInvited = invitedUsers.some(u => u.id === user.id);

    return (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => !isInvited && toggleUserSelection(user.id)}
        disabled={isInvited}
      >
        <View style={styles.userAvatar}>
          {user.profileImageUrl ? (
            <Image
              source={{ uri: user.profileImageUrl }}
              style={styles.userAvatarImage}
            />
          ) : (
            <Text variant="titleSecondary">
              {user.firstName?.[0] || ''}
              {user.lastName?.[0] || ''}
            </Text>
          )}
        </View>

        <View style={styles.userInfo}>
          <Text variant="bodyPrimary" style={styles.userName}>
            {user.firstName} {user.lastName}
          </Text>
          <Text variant="captionSecondary">@{user.username}</Text>
        </View>

        {selectedTab !== 'invited' && (
          <View style={styles.checkboxContainer}>
            <Checkbox
              checked={isSelected}
              onPress={() => !isInvited && toggleUserSelection(user.id)}
              disabled={isInvited}
            />
          </View>
        )}

        {isInvited && selectedTab === 'invited' && (
          <TouchableOpacity
            style={styles.removeInviteButton}
            onPress={() => handleRemoveInvite(user.id)}
          >
            <Text variant="labelPrimary" style={styles.removeInviteText}>
              Remover
            </Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text variant="titlePrimary" style={styles.modalTitle}>
            {title}
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons
              name="close"
              size={24}
              color={ArenaColors.neutral.light}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'friends' && styles.tabActive]}
            onPress={() => setSelectedTab('friends')}
          >
            <Text
              variant={
                selectedTab === 'friends' ? 'bodyPrimary' : 'bodySecondary'
              }
            >
              Amigos
            </Text>
            {friends.length > 0 && (
              <View style={styles.tabBadge}>
                <Text variant="captionSecondary">{friends.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tab,
              selectedTab === 'recommendations' && styles.tabActive,
            ]}
            onPress={() => setSelectedTab('recommendations')}
          >
            <Text
              variant={
                selectedTab === 'recommendations'
                  ? 'bodyPrimary'
                  : 'bodySecondary'
              }
            >
              Recomendações
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, selectedTab === 'invited' && styles.tabActive]}
            onPress={() => setSelectedTab('invited')}
          >
            <Text
              variant={
                selectedTab === 'invited' ? 'bodyPrimary' : 'bodySecondary'
              }
            >
              Convidados
            </Text>
            {invitedUsers.length > 0 && (
              <View style={styles.tabBadge}>
                <Text variant="captionSecondary">{invitedUsers.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Input
            type="search"
            placeholder="Buscar por nome ou username..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.usersList} {...panResponder.panHandlers}>
          {selectedTab !== 'invited' &&
          (selectedTab === 'friends'
            ? isLoadingFriends
            : isLoadingRecommendations) ? (
            <View style={styles.loadingContainer}>
              <SportsLoading size="lg" animationSpeed="normal" />
            </View>
          ) : filteredUsers.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name={
                  selectedTab === 'invited' ? 'mail-outline' : 'people-outline'
                }
                size={48}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="bodySecondary" style={styles.emptyText}>
                {searchQuery
                  ? 'Nenhum usuário encontrado'
                  : selectedTab === 'friends'
                    ? 'Você não tem amigos para convidar'
                    : selectedTab === 'invited'
                      ? 'Nenhum usuário foi convidado ainda'
                      : 'Nenhuma recomendação disponível'}
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredUsers}
              renderItem={renderUserItem}
              keyExtractor={item => item.id}
              contentContainerStyle={styles.usersListContent}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode="on-drag"
              onEndReached={
                selectedTab === 'invited'
                  ? undefined
                  : selectedTab === 'friends'
                    ? loadMoreFriends
                    : loadMoreRecommendations
              }
              onEndReachedThreshold={0.1}
              ListFooterComponent={() => {
                if (
                  selectedTab !== 'invited' &&
                  (selectedTab === 'friends'
                    ? hasMoreFriends
                    : hasMoreRecommendations)
                ) {
                  return (
                    <View style={styles.loadingMoreContainer}>
                      <SportsLoading size="sm" animationSpeed="fast" />
                    </View>
                  );
                }
                return null;
              }}
            />
          )}
        </View>

        <View style={styles.footerContainer}>
          <View style={styles.footerContent}>
            <View style={styles.footerLeft}>
              <View style={styles.selectionInfo}>
                <Text variant="bodyPrimary" style={styles.selectionCount}>
                  {selectedUserIds.length > 0
                    ? `${selectedUserIds.length} selecionado${selectedUserIds.length > 1 ? 's' : ''}`
                    : 'Nenhum selecionado'}
                </Text>
                {availableSlots && (
                  <Text variant="captionSecondary">
                    {availableSlots} vaga{availableSlots > 1 ? 's' : ''}{' '}
                    disponível{availableSlots > 1 ? 'is' : ''}
                  </Text>
                )}
              </View>

              {selectedTab === 'friends' &&
                friends.length > 0 &&
                selectedUserIds.length < friends.length && (
                  <View style={styles.quickActions}>
                    <TouchableOpacity
                      onPress={selectAllFriends}
                      style={styles.quickActionButton}
                    >
                      <Text
                        variant="labelPrimary"
                        style={styles.quickActionText}
                      >
                        Todos
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
            </View>

            <View style={styles.inviteButton}>
              <Button
                variant="primary"
                size="md"
                onPress={handleInvite}
                disabled={selectedUserIds.length === 0 || isInviting}
                loading={isInviting}
              >
                {isInviting ? 'Enviando...' : 'Convidar'}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
