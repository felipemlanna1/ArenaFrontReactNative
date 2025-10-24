import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: ArenaColors.neutral.darkest,
    borderTopLeftRadius: ArenaBorders.radius.xl,
    borderTopRightRadius: ArenaBorders.radius.xl,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  closeButton: {
    padding: ArenaSpacing.xs,
  },
  content: {
    padding: ArenaSpacing.lg,
  },
  section: {
    marginBottom: ArenaSpacing.lg,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.md,
  },
  userList: {
    gap: ArenaSpacing.sm,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: 1,
    borderColor: ArenaColors.neutral.medium,
  },
  userItemSelected: {
    borderColor: ArenaColors.brand.primary,
    backgroundColor: ArenaColors.brand.primarySubtle,
  },
  userItemDisabled: {
    opacity: 0.5,
    borderColor: ArenaColors.neutral.dark,
  },
  lockIcon: {
    marginRight: ArenaSpacing.xs,
  },
  userAvatar: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.darkest,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ArenaSpacing.md,
  },
  avatarImage: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaBorders.radius.circle,
  },
  userInfo: {
    flex: 1,
  },
  loadingContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: ArenaSpacing['2xl'],
    alignItems: 'center',
  },
  emptyIcon: {
    marginBottom: ArenaSpacing.md,
  },
  footer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
  },
  selectedCount: {
    marginBottom: ArenaSpacing.sm,
    textAlign: 'center',
  },
});
