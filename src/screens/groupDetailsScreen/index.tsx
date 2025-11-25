import React, { useCallback, useState } from 'react';
import {
  View,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Fab } from '@/components/ui/fab';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ConfirmationModal } from '@/components/ui/confirmationModal';
import { InviteUsersModal } from '@/components/ui/inviteUsersModal';
import { ArenaColors } from '@/constants';
import { GroupEventsSection } from './components/GroupEventsSection';
import { GroupCapacityIndicator } from './components/GroupCapacityIndicator';
import { GroupRulesSection } from './components/GroupRulesSection';
import { GroupMembersSection } from './components/GroupMembersSection';
import { RoleBadge } from '@/components/ui/roleBadge';
import { ProfileHeroSection } from '@/screens/profileScreen/components/ProfileHeroSection';
import { ProfileInfoSection } from '@/screens/profileScreen/components/ProfileInfoSection';
import { ProfileStatsSection } from '@/screens/profileScreen/components/ProfileStatsSection';
import { AppLayout } from '@/components/AppLayout';
import { groupsApi } from '@/services/groups/groupsApi';
import { GroupDetailsScreenProps } from './typesGroupDetailsScreen';
import { useGroupDetailsScreen } from './useGroupDetailsScreen';
import { useGroupStatistics } from './hooks/useGroupStatistics';
import {
  mapGroupToHeroData,
  mapGroupToInfoData,
  mapGroupStatisticsToStats,
} from './utils/groupAdapters';
import { styles } from './stylesGroupDetailsScreen';

export const GroupDetailsScreen: React.FC<GroupDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const { groupId } = route.params;

  const {
    group,
    members,
    isLoading,
    actionLoading,
    handleRefresh,
    handleJoinGroup,
    handleLeaveGroup,
    confirmLeaveGroup,
    confirmRemoveMember,
    showLeaveConfirmation,
    setShowLeaveConfirmation,
    showRemoveConfirmation,
    setShowRemoveConfirmation,
  } = useGroupDetailsScreen(groupId);

  const [showAllMembers, setShowAllMembers] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showFab, setShowFab] = useState(true);

  const { statistics, isLoading: isLoadingStats } = useGroupStatistics(groupId);

  const handleCreateEvent = useCallback(() => {
    const defaultSportId = group?.sports?.[0]?.id;
    navigation.getParent()?.navigate('CreateEvent', {
      mode: 'create',
      preSelectedGroupId: groupId,
      preSelectedSportId: defaultSportId,
    });
  }, [navigation, groupId, group]);

  const handleInviteUsers = useCallback(
    async (userIds: string[], message?: string) => {
      await groupsApi.inviteMembers(groupId, userIds, message);
      await handleRefresh();
    },
    [groupId, handleRefresh]
  );

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      setShowFab(scrollY <= 100);
    },
    []
  );

  const isMember = group?.currentUserStatus === 'MEMBER';
  const canManage =
    group?.currentUserRole &&
    ['OWNER', 'ADMIN'].includes(group.currentUserRole);
  const canCreateEvents =
    group?.currentUserRole &&
    ['OWNER', 'ADMIN', 'MODERATOR'].includes(group.currentUserRole);

  if (isLoading) {
    return (
      <AppLayout>
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  if (!group) {
    return (
      <AppLayout>
        <View style={styles.loadingContainer}>
          <Text variant="bodySecondary">Grupo não encontrado</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <ProfileHeroSection
          {...mapGroupToHeroData(group)}
          showBackButton={false}
          hideAvatar={true}
        />

        <View style={styles.contentContainer}>
          {!group.isPublic && (
            <View style={styles.privacyBadgeContainer}>
              <View style={styles.privacyBadge}>
                <Ionicons
                  name="lock-closed"
                  size={16}
                  color={ArenaColors.neutral.light}
                />
                <Text variant="bodySecondary">Grupo Privado</Text>
              </View>
            </View>
          )}

          <ProfileInfoSection {...mapGroupToInfoData(group)} />

          {group.currentUserRole && (
            <View style={styles.roleBadgeContainer}>
              <RoleBadge role={group.currentUserRole} size="md" />
            </View>
          )}

          <GroupCapacityIndicator
            currentMembers={group.memberCount ?? 0}
            maxMembers={group.maxMembers}
          />

          <ProfileStatsSection
            stats={mapGroupStatisticsToStats(statistics)}
            isLoading={isLoadingStats}
            customLabels={{
              events: 'Eventos',
              created: 'Recentes',
              groups: 'Esportes',
              friends: 'Atletas',
            }}
          />

          <GroupRulesSection rules={group.rules} />

          <View style={styles.section}>
            <GroupEventsSection
              groupId={groupId}
              canCreateEvents={!!canCreateEvents}
              onCreateEvent={handleCreateEvent}
            />
          </View>

          <View style={styles.section}>
            <GroupMembersSection
              group={group}
              members={showAllMembers ? members : members.slice(0, 5)}
              isOwner={group.currentUserRole === 'OWNER'}
              canManage={!!canManage}
              onRefresh={handleRefresh}
            />
            <View style={styles.manageButtonContainer}>
              {canManage && (
                <Button
                  variant="secondary"
                  size="sm"
                  onPress={() => setShowInviteModal(true)}
                  fullWidth
                >
                  Convidar Membros
                </Button>
              )}

              {members.length > 5 && (
                <Button
                  variant="subtle"
                  size="sm"
                  onPress={() => setShowAllMembers(!showAllMembers)}
                  fullWidth
                >
                  {showAllMembers
                    ? 'Mostrar menos'
                    : `Ver todos (${members.length})`}
                </Button>
              )}
            </View>
          </View>

          {!isMember && group.isPublic && (
            <View style={styles.actions}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleJoinGroup}
                loading={actionLoading}
                fullWidth
              >
                Entrar no grupo
              </Button>
            </View>
          )}

          {!isMember && !group.isPublic && (
            <View style={styles.actions}>
              <View style={styles.privateGroupMessage}>
                <Ionicons
                  name="lock-closed-outline"
                  size={24}
                  color={ArenaColors.neutral.medium}
                />
                <Text variant="bodySecondary" style={styles.privateGroupText}>
                  Este é um grupo privado. Você precisa ser convidado por um
                  administrador para participar.
                </Text>
              </View>
            </View>
          )}

          {isMember && group.currentUserRole !== 'OWNER' && (
            <View style={styles.actions}>
              <Button
                variant="destructive"
                size="lg"
                onPress={handleLeaveGroup}
                loading={actionLoading}
                fullWidth
              >
                Sair do grupo
              </Button>
            </View>
          )}
        </View>
      </ScrollView>

      <ConfirmationModal
        visible={showLeaveConfirmation}
        title="Sair do Grupo"
        message={`Tem certeza que deseja sair do grupo "${group.name}"? Você precisará solicitar entrada novamente para voltar.`}
        confirmText="Sair"
        cancelText="Cancelar"
        confirmVariant="destructive"
        onConfirm={confirmLeaveGroup}
        onCancel={() => setShowLeaveConfirmation(false)}
        isLoading={actionLoading}
      />

      <ConfirmationModal
        visible={showRemoveConfirmation}
        title="Remover Membro"
        message="Tem certeza que deseja remover este membro do grupo?"
        confirmText="Remover"
        cancelText="Cancelar"
        confirmVariant="destructive"
        onConfirm={confirmRemoveMember}
        onCancel={() => setShowRemoveConfirmation(false)}
        isLoading={actionLoading}
      />

      {canManage && showFab && (
        <Fab
          variant="primary"
          size="md"
          position="bottom-right"
          icon={
            <Ionicons
              name="create-outline"
              size={24}
              color={ArenaColors.neutral.light}
            />
          }
          onPress={() => {
            navigation.navigate('CreateGroup', {
              mode: 'edit',
              groupId: group.id,
              groupData: group,
            });
          }}
          testID="edit-group-fab"
        />
      )}

      <InviteUsersModal
        visible={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        onInvite={handleInviteUsers}
        title="Convidar para o Grupo"
        availableSlots={
          group.maxMembers
            ? group.maxMembers - (group.memberCount || 0)
            : undefined
        }
        entityType="group"
        entityId={groupId}
      />
    </AppLayout>
  );
};
