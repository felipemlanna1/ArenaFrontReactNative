import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaTypography,
} from '@/constants';

const HEADER_HEIGHT = ArenaTypography.size['4xl'] + 32;
const FOOTER_HEIGHT = ArenaTypography.size['5xl'] + 16;
const PROFILE_PICTURE_SIZE = 100;
const COVER_PHOTO_HEIGHT = 120;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  header: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ArenaSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: ArenaColors.neutral.dark,
  },
  headerButton: {
    padding: ArenaSpacing.sm,
  },
  headerTitle: {
    textAlign: 'center',
  },
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
  photoLabel: {
    marginTop: ArenaSpacing.xs,
  },
  coverPhotoButton: {
    marginTop: ArenaSpacing.md,
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
