import React, { useCallback, useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { GroupMemberItem } from '@/components/ui/groupMemberItem';
import { ConfirmationModal } from '@/components/ui/confirmationModal';
import { GroupEventsSection } from './components/GroupEventsSection';
import { ProfileHeroSection } from '@/screens/profileScreen/components/ProfileHeroSection';
import { ProfileInfoSection } from '@/screens/profileScreen/components/ProfileInfoSection';
import { ProfileStatsSection } from '@/screens/profileScreen/components/ProfileStatsSection';
import { AppLayout } from '@/components/AppLayout';
import { Event } from '@/services/events/typesEvents';
import { groupsApi } from '@/services/groups/groupsApi';
import { GroupDetailsScreenProps } from './typesGroupDetailsScreen';
import { useGroupDetailsScreen } from './useGroupDetailsScreen';
import {
  mapGroupToHeroData,
  mapGroupToInfoData,
  mapGroupToStats,
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
    isRefreshing,
    actionLoading,
    currentActionMemberId,
    handleRefresh,
    handleJoinGroup,
    handleLeaveGroup,
    confirmLeaveGroup,
    handleRemoveMember,
    confirmRemoveMember,
    showLeaveConfirmation,
    setShowLeaveConfirmation,
    showRemoveConfirmation,
    setShowRemoveConfirmation,
  } = useGroupDetailsScreen(groupId);

  const [events, setEvents] = useState<Event[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoadingEvents(true);
        const groupEvents = await groupsApi.getGroupEvents(groupId);
        setEvents(Array.isArray(groupEvents) ? groupEvents : []);
      } catch {
        setEvents([]);
      } finally {
        setIsLoadingEvents(false);
      }
    };

    if (groupId) {
      fetchEvents();
    }
  }, [groupId]);

  const handleManagePress = useCallback(() => {
    navigation.navigate('GroupManagement', { groupId });
  }, [navigation, groupId]);

  const handleCreateEvent = useCallback(() => {
    navigation.getParent()?.navigate('CreateEvent', {
      mode: 'create',
      preSelectedGroupId: groupId,
    });
  }, [navigation, groupId]);

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const isMember = group?.currentUserStatus === 'MEMBER';
  const canManage =
    group?.currentUserRole &&
    ['OWNER', 'ADMIN'].includes(group.currentUserRole);
  const canCreateEvents =
    group?.currentUserRole &&
    ['OWNER', 'ADMIN', 'MODERATOR'].includes(group.currentUserRole);

  if (isLoading) {
    return (
      <AppLayout onBack={handleGoBack}>
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  if (!group) {
    return (
      <AppLayout onBack={handleGoBack}>
        <View style={styles.loadingContainer}>
          <Text variant="bodySecondary">Grupo não encontrado</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout onBack={handleGoBack}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <ArenaRefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
          />
        }
      >
        <ProfileHeroSection
          {...mapGroupToHeroData(group)}
          showBackButton={false}
          onBackPress={handleGoBack}
        />

        <View style={styles.contentContainer}>
          <ProfileInfoSection {...mapGroupToInfoData(group)} />

          <ProfileStatsSection
            {...mapGroupToStats(group, events)}
            isLoading={isLoadingEvents}
          />

          <View style={styles.section}>
            <GroupEventsSection
              groupId={groupId}
              canCreateEvents={!!canCreateEvents}
              onCreateEvent={handleCreateEvent}
            />
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titlePrimary">Membros</Text>
              {canManage && (
                <Button variant="subtle" size="sm" onPress={handleManagePress}>
                  Gerenciar
                </Button>
              )}
            </View>
            <View style={styles.membersList}>
              {members.slice(0, 5).map(member => (
                <GroupMemberItem
                  key={member.id}
                  member={member}
                  showActions={canManage}
                  onRemove={handleRemoveMember}
                  isActionLoading={actionLoading}
                  currentActionMemberId={currentActionMemberId}
                  currentUserRole={group.currentUserRole}
                />
              ))}
            </View>
          </View>

          {!isMember && (
            <View style={styles.actions}>
              <Button
                variant="primary"
                size="lg"
                onPress={handleJoinGroup}
                loading={actionLoading}
                fullWidth
              >
                Solicitar entrada
              </Button>
            </View>
          )}

          {isMember && !canManage && (
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
    </AppLayout>
  );
};
