import React from 'react';
import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { ArenaColors, ArenaSpacing } from '@/constants';
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
        <>
          <Button
            variant="ghost"
            size="sm"
            onPress={onApprove}
            disabled={isManaging}
            iconOnly
          >
            <Ionicons
              name="checkmark-circle-outline"
              size={20}
              color={ArenaColors.semantic.success}
            />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onPress={onReject}
            disabled={isManaging}
            iconOnly
          >
            <Ionicons
              name="close-circle-outline"
              size={20}
              color={ArenaColors.semantic.error}
            />
          </Button>
        </>
      )}

      {status === 'CONFIRMED' && onRemove && (
        <Button
          variant="ghost"
          size="sm"
          onPress={onRemove}
          disabled={isManaging}
          iconOnly
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color={ArenaColors.semantic.error}
          />
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
});
