import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  section: {
    marginBottom: ArenaSpacing.xl,
  },
  sectionHeader: {
    marginBottom: ArenaSpacing.sm,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.darker,
  },
  optionContent: {
    flex: 1,
    marginRight: ArenaSpacing.md,
  },
  button: {
    marginTop: ArenaSpacing.xl,
  },
  emptyContainer: {
    padding: ArenaSpacing.xl,
    alignItems: 'center',
  },
  errorText: {
    marginTop: ArenaSpacing.md,
    textAlign: 'center',
  },
});