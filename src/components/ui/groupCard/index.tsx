import React from 'react';
import { View, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { RoleBadge } from '@/components/ui/roleBadge';
import { getSportIcon } from '@/config/sportIcons';
import { GroupCardImage } from './components/GroupCardImage';
import { GroupCardProps } from './typesGroupCard';
import { useGroupCardActions } from './hooks/useGroupCardActions';
import { styles } from './stylesGroupCard';

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onDetailsPress,
  onManagePress,
  onJoinGroup,
  onLeaveGroup,
  isActionLoading = false,
  currentActionGroupId,
  testID = 'group-card',
}) => {
  const { viewButton, actionButton, secondaryActionButton } =
    useGroupCardActions({
      currentUserStatus: group.currentUserStatus,
      currentUserRole: group.currentUserRole,
      isPublic: group.isPublic,
      memberCount: group.memberCount,
      maxMembers: group.maxMembers,
      isLoading: isActionLoading,
      currentActionGroupId,
      groupId: group.id,
    });

  const getButtonVariant = (
    variant:
      | 'primary'
      | 'secondary'
      | 'subtle'
      | 'destructive'
      | 'outline-light'
      | 'outline-primary'
      | 'ghost'
  ):
    | 'primary'
    | 'secondary'
    | 'subtle'
    | 'destructive'
    | 'outline-light'
    | 'outline-primary'
    | 'ghost' => {
    return variant;
  };

  const handleViewPress = () => {
    onDetailsPress(group.id);
  };

  const handleActionPress = async () => {
    if (!actionButton) return;

    switch (actionButton.type) {
      case 'join':
        await onJoinGroup(group.id);
        break;
      case 'leave':
        await onLeaveGroup(group.id);
        break;
    }
  };

  const handleSecondaryActionPress = async () => {
    if (!secondaryActionButton) return;

    if (secondaryActionButton.type === 'leave') {
      await onLeaveGroup(group.id);
    }
  };

  const primarySport =
    group.sports && group.sports.length > 0 ? group.sports[0] : null;

  return (
    <View style={styles.container} testID={testID}>
      <GroupCardImage
        coverImage={group.coverImage}
        name={group.name}
        sport={primarySport || undefined}
        isPublic={group.isPublic}
        memberCount={group.memberCount}
        maxMembers={group.maxMembers}
        testID={`${testID}-image`}
      />

      <View style={styles.contentContainer}>
        <View style={styles.titleRow}>
          <Text variant="titlePrimary" numberOfLines={1} style={styles.title}>
            {group.name}
          </Text>
          {group.currentUserRole && (
            <RoleBadge
              role={group.currentUserRole}
              size="sm"
              showIcon={false}
            />
          )}
        </View>

        {group.description && (
          <View style={styles.descriptionRow}>
            <Text
              variant="bodySecondary"
              numberOfLines={2}
              style={styles.descriptionText}
            >
              {group.description}
            </Text>
          </View>
        )}

        {primarySport && (
          <View style={styles.infoRow}>
            <View style={styles.sportInfo}>
              {primarySport.icon && (
                <Image
                  source={getSportIcon(primarySport.icon)}
                  style={styles.sportIcon}
                />
              )}
              <Text
                variant="bodySecondary"
                numberOfLines={1}
                style={styles.sportTextOrange}
              >
                {primarySport.name}
              </Text>
            </View>
          </View>
        )}

        {(group.city || group.state) && (
          <View style={styles.locationRow}>
            <Ionicons
              name="location-outline"
              size={16}
              color={ArenaColors.neutral.medium}
            />
            <Text
              variant="captionSecondary"
              numberOfLines={1}
              style={styles.locationText}
            >
              {group.city && group.state
                ? `${group.city}, ${group.state}`
                : group.city || group.state}
            </Text>
          </View>
        )}

        <View style={styles.actionsRow}>
          <View style={styles.buttonWrapper}>
            <Button
              variant={getButtonVariant(viewButton.variant)}
              size="sm"
              onPress={handleViewPress}
              testID={viewButton.testID}
              loading={viewButton.loading}
              disabled={viewButton.disabled}
              rightIcon={({ size, color }) => (
                <Ionicons name="arrow-forward" size={size} color={color} />
              )}
              fullWidth
            >
              {viewButton.label}
            </Button>
          </View>

          {actionButton && (
            <View style={styles.buttonWrapper}>
              <Button
                variant={getButtonVariant(actionButton.variant)}
                size="sm"
                onPress={handleActionPress}
                testID={actionButton.testID}
                loading={actionButton.loading}
                disabled={actionButton.disabled}
                fullWidth
              >
                {actionButton.label}
              </Button>
            </View>
          )}

          {secondaryActionButton && (
            <View style={styles.buttonWrapper}>
              <Button
                variant={getButtonVariant(secondaryActionButton.variant)}
                size="sm"
                onPress={handleSecondaryActionPress}
                testID={secondaryActionButton.testID}
                loading={secondaryActionButton.loading}
                disabled={secondaryActionButton.disabled}
                fullWidth
              >
                {secondaryActionButton.label}
              </Button>
            </View>
          )}
        </View>

        {!actionButton &&
          group.currentUserStatus === 'NONE' &&
          !group.isPublic && (
            <View style={styles.privateGroupMessage}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={ArenaColors.neutral.medium}
              />
              <Text variant="bodySecondary" style={styles.privateGroupText}>
                Grupo privado - Somente por convite
              </Text>
            </View>
          )}
      </View>
    </View>
  );
};
