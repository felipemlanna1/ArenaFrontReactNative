import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.overlay,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    padding: ArenaSpacing['2xl'],
    marginHorizontal: ArenaSpacing.lg,
    width: '90%',
    alignItems: 'center',
  },
  icon: {
    marginBottom: ArenaSpacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    width: '100%',
    marginTop: ArenaSpacing.md,
  },
  buttonWrapper: {
    flex: 1,
  },
});
