import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: ArenaSpacing.xl,
  },
  title: {
    marginBottom: ArenaSpacing.sm,
    color: ArenaColors.brand.primary,
    textAlign: 'center',
  },
  subtitle: {
    color: ArenaColors.neutral.light,
    textAlign: 'center',
  },
  selectedList: {
    marginTop: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    borderTopWidth: 1,
    borderTopColor: `${ArenaColors.neutral.medium}33`,
  },
  selectedTitle: {
    marginBottom: ArenaSpacing.sm,
    color: ArenaColors.neutral.medium,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: `${ArenaColors.brand.primary}22`,
    borderRadius: 20,
    paddingVertical: ArenaSpacing.xs,
    paddingHorizontal: ArenaSpacing.md,
    borderWidth: 1,
    borderColor: ArenaColors.brand.primary,
  },
  chipText: {
    color: ArenaColors.brand.primary,
    fontSize: ArenaTypography.size.sm,
    fontWeight: ArenaTypography.weight.medium,
    marginRight: ArenaSpacing.xs,
  },
  removeButton: {
    marginLeft: ArenaSpacing.xs,
  },
  loading: {
    paddingVertical: ArenaSpacing.xl,
    alignItems: 'center',
  },
});
