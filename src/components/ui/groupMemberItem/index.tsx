import React, { useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { RoleBadge } from '@/components/ui/roleBadge';
import { Dropdown } from '@/components/ui/dropdown';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { ArenaColors } from '@/constants';
import { GroupMemberItemProps } from './typesGroupMemberItem';
import { styles } from './stylesGroupMemberItem';

export const GroupMemberItem: React.FC<GroupMemberItemProps> = ({
  member,
  onPress,
  onRoleChange,
  onRemove,
  showActions = false,
  isActionLoading = false,
  currentActionMemberId,
  currentUserRole,
  roleActions = [],
  testID = 'group-member-item',
}) => {
  const memberId = member.user?.id || member.userId;
  const memberName = member.user
    ? `${member.user.firstName} ${member.user.lastName}`.trim()
    : member.username || 'Usuário';
  const memberAvatar = member.user?.profilePicture || member.avatarUrl;
  const memberBio = member.user?.bio;

  const isLoading = isActionLoading && currentActionMemberId === memberId;
  const canManage =
    currentUserRole &&
    ['OWNER', 'ADMIN'].includes(currentUserRole) &&
    member.role !== 'OWNER';

  const handlePress = useCallback(() => {
    if (onPress && memberId) {
      onPress(memberId);
    }
  }, [onPress, memberId]);

  const handleRemove = useCallback(async () => {
    if (onRemove && !isLoading && memberId) {
      await onRemove(memberId);
    }
  }, [onRemove, memberId, isLoading]);

  return (
    <View style={styles.container} testID={testID}>
      <TouchableOpacity onPress={handlePress} disabled={!onPress}>
        {memberAvatar ? (
          <OptimizedImage
            source={{ uri: memberAvatar }}
            style={styles.avatar}
            contentFit="cover"
            priority="normal"
          />
        ) : (
          <View style={styles.avatar}>
            <Ionicons
              name="person"
              size={24}
              color={ArenaColors.neutral.medium}
            />
          </View>
        )}
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="bodyBold">{memberName}</Text>
          {member.role && (
            <RoleBadge
              role={member.role as 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER'}
              size="sm"
              showIcon
            />
          )}
        </View>

        {memberBio && (
          <Text variant="captionMuted" numberOfLines={1}>
            {memberBio}
          </Text>
        )}

        <View style={styles.metadata}>
          <Text variant="captionMuted">
            Membro desde {new Date(member.joinedAt).toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </View>

      {showActions && canManage && (
        <View style={styles.actionsContainer}>
          {roleActions.length > 0 && (
            <Dropdown
              variant="default"
              trigger={
                <TouchableOpacity
                  style={styles.iconButton}
                  disabled={isLoading}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    color={
                      isLoading
                        ? ArenaColors.neutral.medium
                        : ArenaColors.neutral.light
                    }
                  />
                </TouchableOpacity>
              }
              items={roleActions}
            />
          )}
          {onRemove && (
            <TouchableOpacity
              onPress={handleRemove}
              disabled={isLoading}
              style={styles.iconButton}
              testID={`${testID}-remove`}
            >
              <Ionicons
                name="close-circle"
                size={24}
                color={
                  isLoading
                    ? ArenaColors.neutral.medium
                    : ArenaColors.semantic.error
                }
              />
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};
