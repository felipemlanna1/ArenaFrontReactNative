import { StyleSheet } from 'react-native';
import {
  ArenaSpacing,
  ArenaColors,
  ArenaBorders,
  ArenaSizes,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    gap: ArenaSpacing['2xl'],
  },
  previewCard: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing.lg,
    gap: ArenaSpacing.md,
  },
  previewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  accordionContent: {
    paddingVertical: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  divider: {
    height: ArenaBorders.width.thin,
    backgroundColor: ArenaColors.neutral.dark,
    marginVertical: ArenaSpacing.sm,
  },
  row: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
  },
  flex1: {
    flex: 1,
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
    marginTop: ArenaSpacing.md,
  },
  coverButton: {
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
