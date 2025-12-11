import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaSizes } from '@/constants';

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
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    zIndex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
  },
  logoContainer: {
    alignItems: 'center',
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  logo: {
    width: ArenaSizes.logoWidth,
    height: ArenaSizes.logoHeight,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingBottom: ArenaSpacing.lg,
    zIndex: 10,
  },
  titleContainer: {
    marginBottom: ArenaSpacing.md,
  },
  titleText: {
    textAlign: 'left',
  },
  subtitle: {
    marginBottom: ArenaSpacing['2xl'],
    paddingRight: ArenaSpacing['8.5xl'],
    textAlign: 'left',
    color: ArenaColors.neutral.light,
  },
  buttonContainer: {
    gap: ArenaSpacing.lg,
    width: '100%',
    paddingBottom: ArenaSpacing.lg,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
    width: '100%',
  },
  buttonHalf: {
    flex: 1,
  },
});
