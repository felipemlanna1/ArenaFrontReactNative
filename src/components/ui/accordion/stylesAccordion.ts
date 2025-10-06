import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    gap: ArenaSpacing.xs,
  },
  itemDefault: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.medium,
    overflow: 'hidden',
  },
  itemOutlined: {
    backgroundColor: ArenaColors.neutral.transparent,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.medium,
    borderColor: ArenaColors.brand.primary,
    overflow: 'hidden',
  },
  itemFilled: {
    backgroundColor: ArenaColors.brand.primarySubtle,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
    overflow: 'hidden',
  },
  itemMinimal: {
    backgroundColor: ArenaColors.neutral.transparent,
    borderBottomWidth: ArenaBorders.width.thin,
    borderBottomColor: ArenaColors.neutral.medium,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    minHeight: ArenaSpacing['5xl'],
  },
  headerPressed: {
    backgroundColor: ArenaColors.interaction.pressed.surface,
  },
  headerDisabled: {
    opacity: 0.5,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    marginRight: ArenaSpacing.md,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: ArenaTypography.size.md,
    fontFamily: ArenaTypography.fontFamily.semibold,
    color: ArenaColors.text.inverse,
  },
  chevronContainer: {
    marginLeft: ArenaSpacing.md,
  },
  content: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing.md,
  },
  contentText: {
    fontSize: ArenaTypography.size.md,
    fontFamily: ArenaTypography.fontFamily.regular,
    color: ArenaColors.text.inverse,
    lineHeight: ArenaTypography.size.md * 1.5,
  },
});
