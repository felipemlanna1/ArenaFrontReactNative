import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
    marginBottom: ArenaSpacing.sm,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  unreadContainer: {
    backgroundColor: ArenaColors.neutral.medium + '20',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: ArenaBorders.radius.full,
    backgroundColor: ArenaColors.brand.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: ArenaSpacing.md,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: ArenaSpacing.xs,
  },
  title: {
    flex: 1,
    marginRight: ArenaSpacing.sm,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: ArenaBorders.radius.full,
    backgroundColor: ArenaColors.brand.primary,
    marginTop: 6,
  },
  body: {
    marginBottom: ArenaSpacing.xs,
  },
  time: {
    marginTop: ArenaSpacing.xs,
  },
});
