import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  modalTitle: {
    flex: 1,
  },
  closeButton: {
    padding: ArenaSpacing.xs,
  },
  searchContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  usersList: {
    flex: 1,
  },
  usersListContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.xl,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  userAvatar: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    borderRadius: ArenaSpacing['2xl'],
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: ArenaSpacing.md,
  },
  userAvatarImage: {
    width: ArenaSpacing['5xl'],
    height: ArenaSpacing['5xl'],
    borderRadius: ArenaSpacing['2xl'],
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    marginBottom: ArenaSpacing.xs,
  },
  checkboxContainer: {
    padding: ArenaSpacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ArenaSpacing['3xl'],
  },
  emptyText: {
    marginTop: ArenaSpacing.md,
  },
  footerContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['3xl'],
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: ArenaSpacing.lg,
  },
  footerLeft: {
    flex: 1,
    gap: ArenaSpacing.sm,
  },
  selectionInfo: {
    gap: ArenaSpacing.xs,
  },
  selectionCount: {},
  quickActions: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    alignItems: 'center',
    marginTop: ArenaSpacing.xs,
  },
  quickActionButton: {
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.neutral.dark,
  },
  quickActionText: {
    textAlign: 'center',
  },
  inviteButton: {
    minWidth: ArenaSpacing['6xl'],
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ArenaSpacing['3xl'],
  },
  sectionHeader: {
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.xs,
    marginTop: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  sectionTitle: {
    textTransform: 'uppercase',
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: ArenaSpacing.lg,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    gap: ArenaSpacing.xs,
    paddingVertical: ArenaSpacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: ArenaSpacing.xxs,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: ArenaColors.brand.primary,
  },
  tabBadge: {
    minWidth: ArenaSpacing.lg,
    height: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    paddingHorizontal: ArenaSpacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invitedBadge: {
    position: 'absolute',
    right: ArenaSpacing.md,
    top: ArenaSpacing.sm,
    backgroundColor: ArenaColors.neutral.dark,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.sm,
  },
  loadingMoreContainer: {
    paddingVertical: ArenaSpacing.lg,
    alignItems: 'center',
  },
  removeInviteButton: {
    paddingHorizontal: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    borderRadius: ArenaBorders.radius.sm,
    backgroundColor: ArenaColors.semantic.error,
  },
  removeInviteText: {
    textAlign: 'center',
  },
});
