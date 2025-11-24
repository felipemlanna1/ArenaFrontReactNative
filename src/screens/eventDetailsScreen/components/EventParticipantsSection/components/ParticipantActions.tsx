import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@/components/ui/text';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';
import { StyleSheet } from 'react-native';
import { ParticipantStatus } from '@/services/events/typesEvents';

interface ParticipantActionsProps {
  status: ParticipantStatus;
  isOwner: boolean;
  isOrganizer: boolean;
  onApprove?: () => void;
  onReject?: () => void;
  onRemove?: () => void;
  isManaging?: boolean;
}

export const ParticipantActions: React.FC<ParticipantActionsProps> = ({
  status,
  isOwner,
  isOrganizer,
  onApprove,
  onReject,
  onRemove,
  isManaging = false,
}) => {
  if (!isOwner || isOrganizer) return null;

  return (
    <View style={styles.container}>
      {status === 'PENDING' && onApprove && onReject && (
        <View style={styles.actionsRow}>
          <TouchableOpacity
            style={[styles.actionButton, styles.approveButton]}
            onPress={onApprove}
            disabled={isManaging}
            activeOpacity={0.7}
          >
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={ArenaColors.neutral.light}
            />
            <Text variant="labelPrimary" style={styles.buttonText}>
              Aprovar
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.rejectButton]}
            onPress={onReject}
            disabled={isManaging}
            activeOpacity={0.7}
          >
            <Ionicons
              name="close-circle"
              size={20}
              color={ArenaColors.neutral.light}
            />
            <Text variant="labelPrimary" style={styles.buttonText}>
              Recusar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {status === 'CONFIRMED' && onRemove && (
        <TouchableOpacity
          style={[styles.actionButton, styles.removeButton]}
          onPress={onRemove}
          disabled={isManaging}
          activeOpacity={0.7}
        >
          <Ionicons
            name="trash-outline"
            size={20}
            color={ArenaColors.neutral.light}
          />
          <Text variant="labelPrimary" style={styles.buttonText}>
            Remover
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: ArenaSpacing.sm,
  },
  actionsRow: {
    flexDirection: 'column',
    gap: ArenaSpacing.sm,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.md,
    minWidth: ArenaSpacing['10xl'],
    minHeight: ArenaSpacing['4xl'],
  },
  approveButton: {
    backgroundColor: ArenaColors.semantic.success,
  },
  rejectButton: {
    backgroundColor: ArenaColors.semantic.error,
  },
  removeButton: {
    backgroundColor: ArenaColors.semantic.error,
    minWidth: ArenaSpacing['10xl'],
  },
  buttonText: {
    color: ArenaColors.neutral.light,
  },
});
