import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius['2xl'],
    borderTopRightRadius: ArenaBorders.radius['2xl'],
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.xl,
    paddingHorizontal: ArenaSpacing.md,
    gap: ArenaSpacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  section: {
    gap: ArenaSpacing.sm,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderWidth: 2,
    borderColor: ArenaColors.neutral.dark,
  },
  optionButtonSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  orderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
    gap: ArenaSpacing.sm,
  },
  footer: {
    marginTop: ArenaSpacing.none,
    marginBottom: ArenaSpacing.lg,
  },
});
