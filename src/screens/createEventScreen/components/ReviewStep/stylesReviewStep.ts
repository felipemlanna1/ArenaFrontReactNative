import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

const COVER_IMAGE_HEIGHT = 180;

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
    borderBottomWidth: 1,
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
    marginTop: ArenaSpacing.md,
  },
  coverButton: {
    marginTop: ArenaSpacing.sm,
  },
  coverText: {
    marginTop: ArenaSpacing.xs,
    textAlign: 'center',
  },
});
