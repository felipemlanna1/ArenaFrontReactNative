import { StyleSheet, Dimensions } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaTypography } from '@/constants';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F23',
  },
  content: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.xl,
  },
  logoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: ArenaSpacing.xl,
    paddingBottom: ArenaSpacing.lg,
  },
  logoText: {
    color: ArenaColors.neutral.light,
    fontSize: ArenaTypography.size['2xl'],
    fontWeight: ArenaTypography.weight.bold,
    letterSpacing: ArenaTypography.letterSpacing.wider,
  },
  playerImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: ArenaSpacing['2xl'],
  },
  playerImagePlaceholder: {
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    backgroundColor: `${ArenaColors.brand.primary}20`,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: `${ArenaColors.brand.primary}40`,
  },
  playerImageEmoji: {
    fontSize: width * 0.15,
  },
  bottomContent: {
    paddingBottom: ArenaSpacing['4xl'],
    alignItems: 'center',
  },
  title: {
    color: ArenaColors.neutral.light,
    fontSize: ArenaTypography.size['3xl'],
    fontWeight: ArenaTypography.weight.bold,
    textAlign: 'center',
    letterSpacing: ArenaTypography.letterSpacing.normal,
    lineHeight: ArenaTypography.size['3xl'] * 1.2,
  },
  subtitle: {
    color: ArenaColors.neutral.medium,
    fontSize: ArenaTypography.size.lg,
    fontWeight: ArenaTypography.weight.regular,
    textAlign: 'center',
    lineHeight: ArenaTypography.size.lg * 1.4,
    marginTop: ArenaSpacing.lg,
    marginBottom: ArenaSpacing['3xl'],
    paddingHorizontal: ArenaSpacing.md,
  },
  buttonContainer: {
    gap: ArenaSpacing.lg,
    width: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: `${ArenaColors.neutral.darkest}80`,
  },
});
