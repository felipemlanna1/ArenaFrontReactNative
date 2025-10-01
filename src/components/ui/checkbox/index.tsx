import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Text } from '@/components/ui/text';
import { CheckboxProps } from './typesCheckbox';
import { useCheckbox } from './useCheckbox';
import { styles } from './stylesCheckbox';

const CheckIcon: React.FC<{ size: number; color: string }> = ({
  size,
  color,
}) => (
  <Ionicons
    name="checkmark"
    size={size}
    color={color}
    style={styles.checkIcon}
  />
);

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onPress,
  label,
  size = 'md',
  variant = 'default',
  disabled = false,
  style,
  labelStyle,
  testID,
}) => {
  const checkboxLogic = useCheckbox({
    checked,
    disabled,
    size,
    variant,
    onPress,
  });

  return (
    <TouchableOpacity
      onPress={checkboxLogic.handlePress}
      disabled={checkboxLogic.isInteractionDisabled}
      style={[checkboxLogic.computedStyles.container, style]}
      testID={testID}
      activeOpacity={0.8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={label}
    >
      <View style={checkboxLogic.computedStyles.checkbox}>
        {checked && (
          <CheckIcon
            size={checkboxLogic.iconProps.size}
            color={checkboxLogic.iconProps.color}
          />
        )}
      </View>
      {label && (
        <Text
          style={[checkboxLogic.computedStyles.label, labelStyle || {}]}
          variant="bodyPrimary"
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};
