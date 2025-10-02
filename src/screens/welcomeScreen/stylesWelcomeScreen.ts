import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaShadows } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: ArenaSpacing.xs,
    paddingBottom: ArenaSpacing.sm,
    width: '100%',
    position: 'relative',
    zIndex: 4,
  },
  playerImageContainer: {
    position: 'absolute',
    top: '5%',
    left: 0,
    right: 0,
    bottom: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  playerImage: {
    width: '89%',
    height: '100%',
    resizeMode: 'contain',
    boxShadow: ArenaShadows.backgroundImage,
  },
  backgroundOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${ArenaColors.neutral.darkest}66`,
    zIndex: 0,
  },
  radialOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  bottomOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 2,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: ArenaSpacing['2xl'],
    paddingBottom: ArenaSpacing.lg,
    zIndex: 3,
  },
  titleContainer: {
    marginBottom: ArenaSpacing.xs,
  },
  subtitle: {
    marginBottom: ArenaSpacing['2xl'],
  },
  buttonContainer: {
    gap: ArenaSpacing.lg,
    width: '100%',
    paddingBottom: ArenaSpacing.lg,
  },
});
