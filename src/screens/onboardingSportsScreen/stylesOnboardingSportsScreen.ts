import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ArenaColors.backdrop.moderate,
  },
  topSymbol: {
    position: 'absolute',
    top: ArenaSpacing['3xl'] + 20,
    left: ArenaSpacing.lg,
    zIndex: ArenaSpacing.sm,
  },
  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing['3xl'] + 20,
    paddingBottom: ArenaSpacing.md,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing['4xl'] + ArenaSpacing['2xl'] + 20,
    paddingBottom: ArenaSpacing.xl,
  },
  errorContainer: {
    marginBottom: ArenaSpacing.md,
  },
  errorText: {
    textAlign: 'center',
  },
});
