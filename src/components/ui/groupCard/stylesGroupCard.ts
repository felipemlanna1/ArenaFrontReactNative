import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    overflow: 'hidden',
  },
  contentContainer: {
    padding: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: ArenaSpacing.sm,
  },
  title: {
    flex: 1,
  },
  descriptionRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.xs,
  },
  descriptionText: {
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: ArenaSpacing.sm,
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
    flex: 1,
  },
  sportIcon: {
    width: ArenaSpacing.xl,
    height: ArenaSpacing.xl,
  },
  sportText: {
    flex: 1,
  },
  sportTextOrange: {
    flex: 1,
    color: ArenaColors.brand.primary,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  locationText: {
    flex: 1,
    color: ArenaColors.neutral.medium,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.xs,
  },
  buttonWrapper: {
    flex: 1,
  },
  privateGroupMessage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: ArenaSpacing.sm,
    padding: ArenaSpacing.md,
    backgroundColor: ArenaColors.neutral.darkest,
    borderRadius: ArenaBorders.radius.sm,
  },
  privateGroupText: {
    flex: 1,
    textAlign: 'center',
  },
});
