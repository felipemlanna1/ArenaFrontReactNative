import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaSizes,
} from '@/constants';

export const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
    gap: ArenaSpacing['2xl'],
  },
  section: {
    gap: ArenaSpacing.md,
  },
  sectionTitle: {
    marginBottom: ArenaSpacing.sm,
  },
  bioCounter: {
    alignSelf: 'flex-end',
  },
  profilePictureSection: {
    alignItems: 'center',
  },
  profilePictureTouchable: {
    alignItems: 'center',
  },
  profilePictureWrapper: {
    position: 'relative',
  },
  profilePictureContainer: {
    width: ArenaSizes.avatarMedium,
    height: ArenaSizes.avatarMedium,
    borderRadius: ArenaSizes.avatarMedium / 2,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureImage: {
    width: ArenaSizes.avatarMedium,
    height: ArenaSizes.avatarMedium,
    borderRadius: ArenaSizes.avatarMedium / 2,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: ArenaSizes.badgeSmall,
    height: ArenaSizes.badgeSmall,
    borderRadius: ArenaSizes.badgeSmall / 2,
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: ArenaSpacing.xxs,
    borderColor: ArenaColors.neutral.darkest,
  },
  uploadOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: ArenaColors.backdrop.darkestOverlay,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: ArenaSizes.avatarMedium / 2,
  },
  photoLabel: {
    marginTop: ArenaSpacing.xs,
    textAlign: 'center',
  },
  coverPhotoButton: {
    marginTop: ArenaSpacing.md,
  },
  coverPhotoWrapper: {
    position: 'relative',
  },
  coverPhotoContainer: {
    width: '100%',
    height: ArenaSizes.coverPhotoHeight,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPhotoImage: {
    width: '100%',
    height: ArenaSizes.coverPhotoHeight,
    borderRadius: ArenaBorders.radius.md,
  },
  genderLabel: {
    marginTop: ArenaSpacing.md,
  },
  ageDisplay: {
    marginTop: ArenaSpacing.md,
    paddingVertical: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.sm,
  },
  privacyHelper: {
    marginTop: ArenaSpacing.xs,
  },
  footer: {
    height: ArenaSpacing['6xl'],
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.md,
    borderTopWidth: 1,
    borderTopColor: ArenaColors.neutral.dark,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
