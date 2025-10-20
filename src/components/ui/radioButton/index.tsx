import React from 'react';
import { TouchableOpacity, View, TextStyle } from 'react-native';
import { Text } from '../text';
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
      <Text
        variant={selected ? 'bodyBold' : 'bodyPrimary'}
        style={
          [styles.label, selected && styles.labelSelected].filter(
            Boolean
          ) as TextStyle[]
        }
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
