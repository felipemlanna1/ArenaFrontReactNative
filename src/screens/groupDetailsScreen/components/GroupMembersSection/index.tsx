import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Group, GroupMember } from '@/services/groups/typesGroups';
import { MemberListItem } from './components/MemberListItem';
import { styles } from './stylesGroupMembersSection';

interface GroupMembersSectionProps {
  group: Group;
  members: GroupMember[];
  isOwner?: boolean;
  canManage?: boolean;
  onRefresh?: () => void;
}

export const GroupMembersSection: React.FC<GroupMembersSectionProps> = ({
  group,
  members,
  isOwner = false,
  canManage = false,
  onRefresh,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titlePrimary">Membros</Text>
        {members.length > 0 && (
          <Text variant="captionSecondary">({members.length})</Text>
        )}
      </View>

      <View style={styles.membersList}>
        {members.map(member => (
          <MemberListItem
            key={member.id}
            member={member}
            canManage={canManage}
            isOwner={isOwner}
          />
        ))}

        {members.length === 0 && (
          <View style={styles.emptyState}>
            <Text variant="bodySecondary">Nenhum membro ainda</Text>
          </View>
        )}
      </View>
    </View>
  );
};
