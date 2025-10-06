import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { styles } from './stylesRadioButton';

export interface RadioButtonProps {
  label: string;
  selected: boolean;
  onPress: () => void;
  testID?: string;
}

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected,
  onPress,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      testID={testID}
      activeOpacity={0.7}
    >
      <View style={styles.radioOuter}>
        {selected && <View style={styles.radioInner} />}
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
