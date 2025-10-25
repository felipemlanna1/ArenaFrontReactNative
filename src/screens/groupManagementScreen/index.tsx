import React from 'react';
import { View, FlatList, ListRenderItem } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { GroupMemberItem } from '@/components/ui/groupMemberItem';
import { ConfirmationModal } from '@/components/ui/confirmationModal';
import { AppLayout } from '@/components/AppLayout';
import { GroupMember } from '@/services/groups/typesGroups';
import { GroupsStackParamList } from '@/screens/groupsListScreen/typesGroupsListScreen';
import { useGroupDetailsScreen } from '@/screens/groupDetailsScreen/useGroupDetailsScreen';
import { styles } from './stylesGroupManagementScreen';

type GroupManagementScreenProps = NativeStackScreenProps<
  GroupsStackParamList,
  'GroupManagement'
>;

export const GroupManagementScreen: React.FC<GroupManagementScreenProps> = ({
  route,
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
    handleRemoveMember,
    confirmRemoveMember,
    showRemoveConfirmation,
    setShowRemoveConfirmation,
  } = useGroupDetailsScreen(groupId);

  const renderItem: ListRenderItem<GroupMember> = ({ item }) => (
    <GroupMemberItem
      member={item}
      showActions
      onRemove={handleRemoveMember}
      isActionLoading={actionLoading}
      currentActionMemberId={currentActionMemberId}
      currentUserRole={group?.currentUserRole}
    />
  );

  const keyExtractor = (item: GroupMember) => item.id;

  if (isLoading) {
    return (
      <AppLayout>
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text variant="headingPrimary">Gerenciar Membros</Text>
          <Text variant="bodySecondary">
            {members.length} {members.length === 1 ? 'membro' : 'membros'}
          </Text>
        </View>

        <FlatList
          data={members}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <ArenaRefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
            />
          }
        />
      </View>

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
