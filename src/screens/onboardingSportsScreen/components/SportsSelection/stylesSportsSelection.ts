import { StyleSheet, Dimensions } from 'react-native';
import { ArenaColors, ArenaSpacing } from '@/constants';

const { width } = Dimensions.get('window');
const GRID_COLUMNS = 3;
const GRID_GAP = ArenaSpacing.md;
const HORIZONTAL_PADDING = ArenaSpacing.lg;
const CARD_WIDTH = (width - HORIZONTAL_PADDING * 2 - GRID_GAP * (GRID_COLUMNS - 1)) / GRID_COLUMNS;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: ArenaSpacing.xl,
  },
  title: {
    marginBottom: ArenaSpacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GRID_GAP,
  },
  sportCardWrapper: {
    width: CARD_WIDTH,
    aspectRatio: 1,
  },
  sportCardInner: {
    width: '100%',
    height: '100%',
  },
  selectedList: {
    marginTop: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.md,
    borderTopWidth: 1,
    borderTopColor: `${ArenaColors.neutral.medium}33`,
  },
  selectedTitle: {
    marginBottom: ArenaSpacing.sm,
    color: ArenaColors.neutral.medium,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.sm,
  },
  badgeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  starIcon: {
    marginRight: -ArenaSpacing.xs,
  },
  loading: {
    paddingVertical: ArenaSpacing.xl,
    alignItems: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: ArenaSpacing.md,
  },
});
