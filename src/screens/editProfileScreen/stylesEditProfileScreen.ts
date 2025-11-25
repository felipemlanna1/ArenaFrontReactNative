import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

const FOOTER_HEIGHT = ArenaTypography.size['5xl'] + 16;
const PROFILE_PICTURE_SIZE = 100;
const COVER_PHOTO_HEIGHT = 120;
const CAMERA_BADGE_SIZE = 32;

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
    width: PROFILE_PICTURE_SIZE,
    height: PROFILE_PICTURE_SIZE,
    borderRadius: PROFILE_PICTURE_SIZE / 2,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePictureImage: {
    width: PROFILE_PICTURE_SIZE,
    height: PROFILE_PICTURE_SIZE,
    borderRadius: PROFILE_PICTURE_SIZE / 2,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: CAMERA_BADGE_SIZE,
    height: CAMERA_BADGE_SIZE,
    borderRadius: CAMERA_BADGE_SIZE / 2,
    backgroundColor: ArenaColors.brand.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: ArenaColors.neutral.darkest,
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
    height: COVER_PHOTO_HEIGHT,
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.dark,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverPhotoImage: {
    width: '100%',
    height: COVER_PHOTO_HEIGHT,
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
    height: FOOTER_HEIGHT,
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
