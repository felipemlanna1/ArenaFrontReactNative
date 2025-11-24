import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
  },
  label: {
    marginBottom: ArenaSpacing.xs,
  },
  avatarsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkest,
    backgroundColor: ArenaColors.neutral.medium,
  },
  organizerBadge: {
    position: 'absolute',
    top: -ArenaSpacing.xs / 2,
    right: -ArenaSpacing.xs / 2,
    // eslint-disable-next-line arena/arena-design-tokens
    width: 18,
    // eslint-disable-next-line arena/arena-design-tokens
    height: 18,
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.brand.primary,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowBadge: {
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkest,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overflowText: {
    textAlign: 'center',
  },
  skeletonCircle: {
    borderRadius: ArenaBorders.radius.circle,
    backgroundColor: ArenaColors.neutral.medium,

    opacity: 0.3,
  },
  placeholder: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkest,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    textAlign: 'center',
  },
});
