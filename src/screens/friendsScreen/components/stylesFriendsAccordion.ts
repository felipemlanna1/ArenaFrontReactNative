import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const stylesFriendsAccordion = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    marginBottom: ArenaSpacing.sm,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.dark,
  },
  headerPressed: {
    backgroundColor: ArenaColors.neutral.darkIntermediate,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    flex: 1,
  },
  chevronContainer: {
    marginLeft: ArenaSpacing.sm,
  },
  content: {
    padding: ArenaSpacing.md,
    paddingTop: 0,
  },
  loadMoreContainer: {
    marginTop: ArenaSpacing.md,
    alignItems: 'center',
  },
});
