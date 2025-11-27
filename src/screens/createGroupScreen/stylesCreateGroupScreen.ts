import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaSizes,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.lg,
  },
  section: {
    gap: ArenaSpacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
  },
  flex1: {
    flex: 1,
  },
  actions: {
    gap: ArenaSpacing.sm,
    paddingTop: ArenaSpacing.md,
  },
  coverPreview: {
    width: '100%',
    height: ArenaSizes.coverImageHeight,
    borderRadius: ArenaBorders.radius.lg,
    backgroundColor: ArenaColors.neutral.dark,
    marginTop: ArenaSpacing.sm,
  },
  coverPlaceholder: {
    width: '100%',
    height: ArenaSizes.coverImageHeight,
    borderRadius: ArenaBorders.radius.lg,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverSection: {
    marginTop: ArenaSpacing.sm,
  },
  coverContainer: {
    position: 'relative',
  },
  uploadOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ArenaColors.backdrop.darkestOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ArenaBorders.radius.lg,
  },
  coverText: {
    marginTop: ArenaSpacing.xs,
    textAlign: 'center',
  },
});
