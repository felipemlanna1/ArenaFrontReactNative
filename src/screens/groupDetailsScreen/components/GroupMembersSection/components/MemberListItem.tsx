import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { RoleBadge } from '@/components/ui/roleBadge';
import { GroupMember } from '@/services/groups/typesGroups';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
import { StyleSheet } from 'react-native';

interface MemberListItemProps {
  member: GroupMember;
  canManage?: boolean;
  isOwner?: boolean;
}

export const MemberListItem: React.FC<MemberListItemProps> = ({
  member,
  canManage = false,
  isOwner = false,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (member.user?.id) {
      // @ts-expect-error - navigation typing
      navigation.navigate('Profile', { userId: member.user.id });
    }
  };

  const fullName = member.user
    ? `${member.user.firstName || ''} ${member.user.lastName || ''}`.trim()
    : 'Usuário';

  const username = member.user?.username || '@usuario';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        {member.user?.profilePicture ? (
          <Image
            source={{ uri: member.user.profilePicture }}
            style={styles.avatar}
          />
        ) : (
          <View style={styles.avatarFallback}>
            <Text variant="bodyPrimary" style={styles.initialsText}>
              {fullName.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text variant="bodyPrimary" style={styles.name} numberOfLines={1}>
              {fullName}
            </Text>
            {member.role && (
              <RoleBadge role={member.role} size="sm" showIcon={false} />
            )}
          </View>
          <Text variant="captionSecondary" numberOfLines={1}>
            {username}
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={20}
          color={ArenaColors.neutral.medium}
          style={styles.chevronIcon}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
  },
  avatar: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    borderRadius: ArenaSpacing['2xl'],
  },
  avatarFallback: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    borderRadius: ArenaSpacing['2xl'],
    backgroundColor: ArenaColors.neutral.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
  },
  info: {
    flex: 1,
    marginLeft: ArenaSpacing.md,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  name: {
    flex: 1,
  },
  chevronIcon: {
    marginLeft: ArenaSpacing.xs,
  },
});
