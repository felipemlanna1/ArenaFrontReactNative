import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  FlatList,
  ListRenderItem,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { Label } from '@/components/ui/label';
import { ArenaColors } from '@/constants';
import { Group } from '@/services/groups/typesGroups';
import { GroupDropdownProps } from './typesGroupDropdown';
import { styles } from './stylesGroupDropdown';

export const GroupDropdown: React.FC<GroupDropdownProps> = ({
  label,
  placeholder = 'Selecione um grupo',
  value,
  onChange,
  groups,
  error,
  disabled = false,
  required = false,
  testID,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedGroup = useMemo(
    () => groups?.find(group => group.id === value),
    [groups, value]
  );

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelect = useCallback(
    (groupId: string) => {
      onChange(groupId);
      handleClose();
    },
    [onChange, handleClose]
  );

  const renderGroupItem: ListRenderItem<Group> = useCallback(
    ({ item }) => {
      const isSelected = item.id === value;
      return (
        <TouchableOpacity
          onPress={() => handleSelect(item.id)}
          style={[styles.groupItem, isSelected && styles.groupItemSelected]}
          testID={`${testID}-item-${item.id}`}
        >
          <View style={styles.groupItemContent}>
            <Text variant="bodyPrimary">{item.name}</Text>
            {item.description && (
              <Text variant="captionSecondary" numberOfLines={1}>
                {item.description}
              </Text>
            )}
            <Text variant="captionMuted">
              {item.memberCount} {item.memberCount === 1 ? 'membro' : 'membros'}
            </Text>
          </View>
          {isSelected && (
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={ArenaColors.brand.primary}
            />
          )}
        </TouchableOpacity>
      );
    },
    [value, handleSelect, testID]
  );

  const keyExtractor = useCallback((item: Group) => item.id, []);

  return (
    <View style={styles.container} testID={testID}>
      {label && (
        <Label variant="form" required={required}>
          {label}
        </Label>
      )}

      <TouchableOpacity
        onPress={handleOpen}
        disabled={disabled}
        style={[
          styles.trigger,
          disabled && styles.triggerDisabled,
          error && styles.triggerError,
        ]}
        testID={`${testID}-trigger`}
      >
        <View style={styles.triggerContent}>
          <View style={styles.iconContainer}>
            <Ionicons
              name="people"
              size={20}
              color={
                selectedGroup
                  ? ArenaColors.neutral.light
                  : ArenaColors.neutral.medium
              }
            />
          </View>
          <Text
            variant={selectedGroup ? 'bodyPrimary' : 'bodyMuted'}
            numberOfLines={1}
          >
            {selectedGroup ? selectedGroup.name : placeholder}
          </Text>
        </View>
        <Ionicons
          name={isOpen ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={ArenaColors.neutral.medium}
        />
      </TouchableOpacity>

      {error && <Text variant="labelError">{error}</Text>}

      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
        testID={`${testID}-modal`}
      >
        <Pressable style={styles.modalOverlay} onPress={handleClose}>
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.modalHeader}>
              <Text variant="titlePrimary">
                {label || 'Selecione um grupo'}
              </Text>
            </View>

            <FlatList
              data={groups}
              renderItem={renderGroupItem}
              keyExtractor={keyExtractor}
              contentContainerStyle={styles.modalList}
              ListEmptyComponent={
                <View style={styles.emptyState}>
                  <Text variant="bodySecondary">Nenhum grupo disponível</Text>
                </View>
              }
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
