import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: ArenaColors.neutral.darkest,
  },
  coverImage: {
    width: '100%',
    height: ArenaSpacing['8xl'],
    backgroundColor: ArenaColors.neutral.darkest,
  },
  content: {
    padding: ArenaSpacing.md,
    gap: ArenaSpacing.sm,
  },
  header: {
    gap: ArenaSpacing.xs,
  },
  description: {
    marginTop: ArenaSpacing.xs,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: ArenaSpacing.sm,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.md,
  },
  metadataItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  sportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: ArenaSpacing.xs,
    marginTop: ArenaSpacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: ArenaSpacing.sm,
    marginTop: ArenaSpacing.md,
  },
  actionButton: {
    flex: 1,
  },
  roleContainer: {
    alignSelf: 'flex-start',
    marginTop: ArenaSpacing.xs,
  },
  compactCard: {
    flexDirection: 'row',
    padding: ArenaSpacing.md,
    gap: ArenaSpacing.md,
    alignItems: 'center',
  },
  compactAvatar: {
    width: ArenaSpacing['4xl'],
    height: ArenaSpacing['4xl'],
    borderRadius: ArenaBorders.radius.md,
    backgroundColor: ArenaColors.neutral.darkest,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactContent: {
    flex: 1,
    gap: ArenaSpacing.xs,
  },
  compactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  compactMetadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    flexWrap: 'wrap',
  },
  metadataChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  compactFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    justifyContent: 'space-between',
  },
});
