import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaOpacity,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: ArenaSpacing.xl,
    left: ArenaSpacing.lg,
    right: ArenaSpacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: ArenaSpacing.md,
    paddingHorizontal: ArenaSpacing.lg,
    borderRadius: ArenaBorders.radius.md,
    borderLeftWidth: ArenaSpacing.xs,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: { width: 0, height: ArenaSpacing.xs },
    shadowOpacity: ArenaOpacity.moderate,
    shadowRadius: ArenaSpacing.sm,
    elevation: ArenaSpacing.sm,
    zIndex: 9999,
    gap: ArenaSpacing.sm,
  },
  message: {
    flex: 1,
  },
});
