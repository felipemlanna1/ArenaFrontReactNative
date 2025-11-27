import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaBorders,
  ArenaSizes,
  ArenaOpacity,
} from '@/constants';

export const styles = StyleSheet.create({
  container: {
    height: ArenaSizes.heroSectionHeight,
    position: 'relative',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ArenaSizes.heroSectionHeight,
  },
  completionRingContainer: {
    position: 'absolute',
    bottom: -64,
    alignSelf: 'center',
  },
  avatarContainer: {
    width: ArenaSizes.avatarLarge,
    height: ArenaSizes.avatarLarge,
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
    height: ArenaSizes.heroSectionHeight,
  },
  placeholderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ArenaSizes.heroSectionHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    width: ArenaSizes.avatarLarge,
    height: ArenaSizes.avatarLarge,
    opacity: ArenaOpacity.medium,
  },
  activeBadge: {
    position: 'absolute',
    bottom: -85,
    alignSelf: 'center',
  },
});
