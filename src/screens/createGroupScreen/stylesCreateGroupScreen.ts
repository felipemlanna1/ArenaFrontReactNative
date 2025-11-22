import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const COVER_IMAGE_HEIGHT = 180;

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
    height: COVER_IMAGE_HEIGHT,
    borderRadius: ArenaBorders.radius.lg,
    backgroundColor: ArenaColors.neutral.dark,
    marginTop: ArenaSpacing.sm,
  },
  coverPlaceholder: {
    width: '100%',
    height: COVER_IMAGE_HEIGHT,
    borderRadius: ArenaBorders.radius.lg,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverSection: {
    marginTop: ArenaSpacing.sm,
  },
  coverText: {
    marginTop: ArenaSpacing.xs,
    textAlign: 'center',
  },
});
