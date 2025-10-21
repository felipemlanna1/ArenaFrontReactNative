import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

const HERO_HEIGHT = 280;
const BUTTON_SIZE = 40;
const AVATAR_SIZE = 150;
const PLACEHOLDER_ICON_SIZE = 120;
const PLACEHOLDER_ICON_OPACITY = 0.4;

export const styles = StyleSheet.create({
  container: {
    height: HERO_HEIGHT,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT,
  },
  backButton: {
    position: 'absolute',
    top: 48,
    left: ArenaSpacing.lg,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: ArenaBorders.radius['3xl'],
    backgroundColor: ArenaColors.neutral.darkMedium,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  avatarContainer: {
    position: 'absolute',
    bottom: -75,
    alignSelf: 'center',
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
    borderRadius: ArenaBorders.radius.circle,
    borderWidth: ArenaBorders.width.bold,
    borderColor: ArenaColors.neutral.darkest,
    overflow: 'hidden',
    backgroundColor: ArenaColors.neutral.dark,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ArenaColors.brand.primary,
  },
  initialsText: {
    textAlign: 'center',
  },
  coverImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT,
  },
  placeholderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HERO_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: PLACEHOLDER_ICON_SIZE,
    height: PLACEHOLDER_ICON_SIZE,
    opacity: PLACEHOLDER_ICON_OPACITY,
  },
});
