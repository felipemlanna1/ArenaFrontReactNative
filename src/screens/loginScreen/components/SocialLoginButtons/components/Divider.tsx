import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

interface DividerProps {
  text?: string;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: ArenaSpacing.lg,
  },
  line: {
    flex: 1,
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.medium,
    opacity: 0.5,
  },
  text: {
    marginHorizontal: ArenaSpacing.md,
    color: ArenaColors.neutral.medium,
  },
});

export const Divider: React.FC<DividerProps> = ({ text }) => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      {text && (
        <Text variant="captionSecondary" style={styles.text}>
          {text}
        </Text>
      )}
      <View style={styles.line} />
    </View>
  );
};
