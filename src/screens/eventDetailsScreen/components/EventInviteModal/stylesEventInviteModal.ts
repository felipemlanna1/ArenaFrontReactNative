import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
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
    backgroundColor: ArenaColors.brand.primaryDark,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: ArenaColors.neutral.darker,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ArenaSpacing.md,
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
