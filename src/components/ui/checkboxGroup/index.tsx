import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Checkbox } from '../checkbox';
import { CheckboxGroupProps } from './typesCheckboxGroup';
import { useCheckboxGroup } from './useCheckboxGroup';
import { styles } from './stylesCheckboxGroup';
import { ArenaSpacing } from '@/constants';

export const CheckboxGroup = <T extends string | number>({
  options,
  value,
  onChange,
  multiSelect = true,
  variant = 'default',
  size = 'md',
  direction = 'vertical',
  columns = 1,
  spacing = 'md',
  disabled = false,
  required = false,
  label,
  helperText,
  errorMessage,
  style,
  testID,
}: CheckboxGroupProps<T>): React.ReactElement => {
  const { handleSelect, isSelected } = useCheckboxGroup({
    value,
    multiSelect,
    onChange,
  });

  const spacingValue = ArenaSpacing[spacing];

  const optionsContainerStyle = useMemo(
    () => [
      styles.optionsContainer,
      {
        flexDirection: (direction === 'horizontal' ? 'row' : 'column') as
          | 'row'
          | 'column',
        gap: spacingValue,
      },
    ],
    [direction, spacingValue]
  );

  const checkboxWrapperStyle = useMemo(() => {
    if (variant === 'card' && columns > 1) {
      const widthPercentage = `${100 / columns}%` as `${number}%`;
      return {
        width: widthPercentage,
        paddingHorizontal: spacingValue / 2,
      };
    }
    return styles.checkboxWrapper;
  }, [variant, columns, spacingValue]);

  return (
    <View style={[styles.container, style]} testID={testID}>
      {label && (
        <View style={styles.labelContainer}>
          <Text variant="labelPrimary">
            {label}
            {required && (
              <Text variant="labelError" style={styles.requiredAsterisk}>
                {' '}
                *
              </Text>
            )}
          </Text>
        </View>
      )}

      <View style={optionsContainerStyle}>
        {options.map(option => (
          <View key={String(option.value)} style={checkboxWrapperStyle}>
            <Checkbox
              checked={isSelected(option.value)}
              onPress={() => handleSelect(option.value)}
              label={option.label}
              variant={variant}
              size={size}
              disabled={disabled || option.disabled}
              testID={`${testID}-option-${String(option.value)}`}
            />
          </View>
        ))}
      </View>

      {helperText && !errorMessage && (
        <Text variant="captionMuted" style={styles.helperText}>
          {helperText}
        </Text>
      )}

      {errorMessage && (
        <Text variant="captionError" style={styles.errorText}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};
