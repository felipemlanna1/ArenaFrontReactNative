import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const PRIORITY_BUTTON_MIN_WIDTH = 100;
const SCREENSHOT_SIZE = 100;
const REMOVE_BUTTON_SIZE = 24;

export const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  closeButton: {
    padding: ArenaSpacing.xs,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  sectionsContainer: {
    gap: ArenaSpacing.lg,
  },
  section: {
    gap: ArenaSpacing.md,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.xs,
  },
  priorityContainer: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  priorityButton: {
    flex: 1,
    minWidth: PRIORITY_BUTTON_MIN_WIDTH,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    alignItems: 'center',
    justifyContent: 'center',
  },
  priorityButtonActive: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: `${ArenaColors.brand.primary}20`,
  },
  screenshotsContainer: {
    gap: ArenaSpacing.sm,
  },
  screenshotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  screenshotItem: {
    width: SCREENSHOT_SIZE,
    height: SCREENSHOT_SIZE,
    borderRadius: ArenaBorders.radius.sm,
    overflow: 'hidden',
    position: 'relative',
  },
  screenshotImage: {
    width: '100%',
    height: '100%',
  },
  removeScreenshotButton: {
    position: 'absolute',
    top: ArenaSpacing.xs,
    right: ArenaSpacing.xs,
    backgroundColor: ArenaColors.semantic.error,
    borderRadius: ArenaBorders.radius.circle,
    width: REMOVE_BUTTON_SIZE,
    height: REMOVE_BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addImageButton: {
    width: SCREENSHOT_SIZE,
    height: SCREENSHOT_SIZE,
    borderRadius: ArenaBorders.radius.sm,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.xs,
  },
  footer: {
    padding: ArenaSpacing.lg,
    borderTopWidth: ArenaBorders.width.thin,
    borderTopColor: ArenaColors.neutral.dark,
    gap: ArenaSpacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
  },
  flex1: {
    flex: 1,
  },
});
