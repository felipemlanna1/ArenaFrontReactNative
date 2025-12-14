import { StyleSheet } from 'react-native';
import { ArenaSpacing, ArenaColors, ArenaSizes } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: ArenaSpacing['2xl'],
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: ArenaSpacing['6xl'],
  },
  logo: {
    width: ArenaSizes.logoWidth,
    height: ArenaSizes.logoHeight,
  },
  textContainer: {
    alignItems: 'center',
    gap: 0,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: ArenaColors.neutral.light,
  },
});
