import React from 'react';
import { View, Switch as RNSwitch } from 'react-native';
import { Text } from '../text';
import { SwitchProps } from './typesSwitch';
import { useSwitch } from './useSwitch';
import { styles } from './stylesSwitch';

export const Switch: React.FC<SwitchProps> = ({
  variant = 'brand',
  size = 'md',
  label,
  labelPosition = 'right',
  value = false,
  disabled = false,
  testID,
  ...switchProps
}) => {
  const {
    trackColor,
    thumbColor,
    containerStyle,
    labelStyle,
    sizeConfig,
  } = useSwitch({
    variant,
    size,
    value,
    disabled,
  });

  return (
    <View
      style={[
        styles.container,
        containerStyle,
        labelPosition === 'right' && { flexDirection: 'row' },
        labelPosition === 'left' && { flexDirection: 'row-reverse' },
      ]}
      testID={testID}
    >
      <RNSwitch
        value={value}
        trackColor={trackColor}
        thumbColor={thumbColor}
        disabled={disabled}
        style={{ transform: sizeConfig.transform }}
        testID={testID ? `${testID}-switch` : undefined}
        accessibilityRole="switch"
        accessibilityState={{ checked: value, disabled }}
        accessibilityLabel={label}
        {...switchProps}
      />
      {label && (
        <Text variant="bodyPrimary" style={[styles.label, labelStyle]}>
          {label}
        </Text>
      )}
    </View>
  );
};

export type { SwitchProps } from './typesSwitch';
export { useSwitch } from './useSwitch';
