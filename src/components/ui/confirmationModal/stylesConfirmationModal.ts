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
    padding: ArenaSpacing.lg,
    marginHorizontal: ArenaSpacing.lg,
    width: '90%',
  },
  header: {
    marginBottom: ArenaSpacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  message: {
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
    marginTop: ArenaSpacing.lg,
  },
  buttonWrapper: {
    flex: 1,
  },
});
