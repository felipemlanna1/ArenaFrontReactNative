import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Pressable, Modal, Text } from 'react-native';
import { ArenaColors } from '@/constants';
import { DropdownProps } from './typesDropdown';
import { useDropdown } from './useDropdown';
import { styles } from './stylesDropdown';

export const Dropdown: React.FC<DropdownProps> = ({
  variant = 'default',
  trigger,
  items,
  position = 'bottom',
  testID,
  disabled = false,
}) => {
  const { isOpen, toggleDropdown, closeDropdown, handleItemPress } =
    useDropdown({ items });
  const [triggerLayout, setTriggerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });
  const triggerRef = useRef<View>(null);

  const handleTriggerPress = () => {
    if (!disabled && triggerRef.current) {
      triggerRef.current.measure(
        (
          _x: number,
          _y: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number
        ) => {
          setTriggerLayout({ x: pageX, y: pageY, width, height });
          toggleDropdown();
        }
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        ref={triggerRef}
        onPress={handleTriggerPress}
        disabled={disabled}
        style={[styles.triggerContainer, disabled && styles.triggerDisabled]}
        testID={testID}
        accessibilityRole="button"
        accessibilityLabel="Abrir menu dropdown"
        accessibilityHint="Duplo toque para abrir opções"
        accessibilityState={{ expanded: isOpen, disabled }}
      >
        {trigger}
      </TouchableOpacity>

      <Modal
        visible={isOpen && !disabled}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
        testID={`${testID}-modal`}
      >
        <Pressable style={styles.overlay} onPress={closeDropdown}>
          <View
            style={[
              styles.menuContainer,
              {
                top:
                  position === 'bottom'
                    ? triggerLayout.y + triggerLayout.height + 8
                    : undefined,
                bottom:
                  position === 'top'
                    ? triggerLayout.y - triggerLayout.height - 8
                    : undefined,
                left: triggerLayout.x,
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            {items.map((item, index) => (
              <React.Fragment key={item.id}>
                <Pressable
                  onPress={() => handleItemPress(item)}
                  disabled={item.disabled}
                  style={({ pressed }) => [
                    styles.menuItem,
                    pressed && styles.menuItemPressed,
                    item.disabled && styles.menuItemDisabled,
                  ]}
                  testID={`${testID}-item-${item.id}`}
                  accessibilityRole="menuitem"
                  accessibilityLabel={item.label}
                  accessibilityState={{ disabled: item.disabled }}
                >
                  {item.icon && (
                    <View style={styles.menuItemIconContainer}>
                      <item.icon
                        size={20}
                        color={
                          item.destructive
                            ? ArenaColors.semantic.error
                            : ArenaColors.text.inverse
                        }
                      />
                    </View>
                  )}
                  <Text
                    style={[
                      styles.menuItemLabel,
                      item.destructive && styles.menuItemLabelDestructive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
                {index < items.length - 1 && <View style={styles.separator} />}
              </React.Fragment>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};
