import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    marginTop: ArenaSpacing['2xl'],
    marginHorizontal: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
    padding: ArenaSpacing['2xl'],
    alignItems: 'center',
    gap: ArenaSpacing.lg,
  },
  iconContainer: {
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
  content: {
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  description: {
    textAlign: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    width: '100%',
    marginTop: ArenaSpacing.md,
  },
  button: {
    flex: 1,
  },
  statusContainer: {
    marginTop: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkIntermediate,
    borderRadius: ArenaBorders.radius.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
  },
});
