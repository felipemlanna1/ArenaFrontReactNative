import React from 'react';
import { View, Modal, ScrollView, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { UserData } from '@/services/http';
import { EventInviteModalProps } from './typesEventInviteModal';
import { useEventInviteModal } from './useEventInviteModal';
import { styles } from './stylesEventInviteModal';

interface UserItemProps {
  user: UserData;
  selected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  selected,
  onToggle,
  disabled = false,
}) => (
  <TouchableOpacity
    onPress={disabled ? undefined : onToggle}
    disabled={disabled}
    activeOpacity={disabled ? 1 : 0.7}
    style={[
      styles.userItem,
      selected && styles.userItemSelected,
      disabled && styles.userItemDisabled,
    ]}
  >
    <View style={styles.userAvatar}>
      {user.profilePicture ? (
        <OptimizedImage
          source={{ uri: user.profilePicture }}
          style={styles.avatarImage}
          contentFit="cover"
          priority="normal"
        />
      ) : (
        <Ionicons name="person" size={20} color={ArenaColors.neutral.medium} />
      )}
    </View>

    <View style={styles.userInfo}>
      <Text variant="bodyPrimary">
        {user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.username}
      </Text>
      {user.city && user.state && (
        <Text variant="captionSecondary">
          {user.city}, {user.state}
        </Text>
      )}
    </View>

    {disabled ? (
      <Ionicons
        name="lock-closed"
        size={20}
        color={ArenaColors.neutral.medium}
        style={styles.lockIcon}
      />
    ) : (
      <Ionicons
        name={selected ? 'checkbox' : 'square-outline'}
        size={24}
        color={
          selected ? ArenaColors.brand.primary : ArenaColors.neutral.medium
        }
      />
    )}
  </TouchableOpacity>
);

const EmptyState: React.FC<{ message: string }> = ({ message }) => (
  <View style={styles.emptyContainer}>
    <View style={styles.emptyIcon}>
      <Ionicons
        name="people-outline"
        size={48}
        color={ArenaColors.neutral.medium}
      />
    </View>
    <Text variant="bodySecondary">{message}</Text>
  </View>
);

export const EventInviteModal: React.FC<EventInviteModalProps> = ({
  visible,
  eventId,
  onClose,
  onInvitesSent,
}) => {
  const {
    friends,
    others,
    invited,
    selectedUserIds,
    isLoading,
    isSending,
    error,
    searchQuery,
    setSearchQuery,
    toggleSelection,
    sendInvites,
    canSendInvites,
  } = useEventInviteModal({ eventId, visible, onInvitesSent });

  const handleSendInvites = async () => {
    await sendInvites();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        onPress={onClose}
        activeOpacity={1}
      >
        <TouchableOpacity
          style={styles.modalContent}
          activeOpacity={1}
          onPress={e => e.stopPropagation()}
        >
          <View style={styles.header}>
            <Text variant="titlePrimary">Convidar para o Evento</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
            >
              <Ionicons
                name="close"
                size={24}
                color={ArenaColors.neutral.light}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.searchContainer}>
            <Input
              type="search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Buscar por nome ou username..."
              clearable
              showSearchIcon
              size="md"
              testID="event-invite-search-input"
            />
          </View>

          <ScrollView style={styles.content}>
            {isLoading ? (
              <View style={styles.loadingContainer}>
                <SportsLoading size="md" animationSpeed="normal" />
              </View>
            ) : error ? (
              <EmptyState message={error} />
            ) : (
              <>
                {invited.length > 0 && (
                  <View style={styles.section}>
                    <Text variant="titleSecondary" style={styles.sectionTitle}>
                      Convidados ({invited.length})
                    </Text>
                    <View style={styles.userList}>
                      {invited.map(user => (
                        <UserItem
                          key={user.id}
                          user={user}
                          selected={false}
                          onToggle={() => {}}
                          disabled
                        />
                      ))}
                    </View>
                  </View>
                )}

                {friends.length > 0 && (
                  <View style={styles.section}>
                    <Text variant="titleSecondary" style={styles.sectionTitle}>
                      Amigos ({friends.length})
                    </Text>
                    <View style={styles.userList}>
                      {friends.map(user => (
                        <UserItem
                          key={user.id}
                          user={user}
                          selected={selectedUserIds.has(user.id)}
                          onToggle={() => toggleSelection(user.id)}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {others.length > 0 && (
                  <View style={styles.section}>
                    <Text variant="titleSecondary" style={styles.sectionTitle}>
                      Outras Pessoas ({others.length})
                    </Text>
                    <View style={styles.userList}>
                      {others.map(user => (
                        <UserItem
                          key={user.id}
                          user={user}
                          selected={selectedUserIds.has(user.id)}
                          onToggle={() => toggleSelection(user.id)}
                          disabled={user.isProfilePrivate}
                        />
                      ))}
                    </View>
                  </View>
                )}

                {friends.length === 0 &&
                  others.length === 0 &&
                  invited.length === 0 && (
                    <EmptyState message="Nenhum usuário disponível para convite" />
                  )}
              </>
            )}
          </ScrollView>

          <View style={styles.footer}>
            {selectedUserIds.size > 0 && (
              <Text variant="captionSecondary" style={styles.selectedCount}>
                {selectedUserIds.size} pessoa(s) selecionada(s)
              </Text>
            )}
            <Button
              variant="primary"
              onPress={handleSendInvites}
              disabled={!canSendInvites}
              loading={isSending}
            >
              Enviar Convites
            </Button>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};
