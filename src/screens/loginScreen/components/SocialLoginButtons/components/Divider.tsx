import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';
import { StyleSheet } from 'react-native';

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
    height: 1,
    backgroundColor: ArenaColors.neutral.medium,
    opacity: 0.5,
  },
  text: {
    marginHorizontal: ArenaSpacing.md,
    fontSize: ArenaTypography.size.sm,
    color: ArenaColors.neutral.medium,
    fontWeight: ArenaTypography.weight.medium,
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
