import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },

  header: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: `${ArenaColors.neutral.medium}20`,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: ArenaSpacing.md,
  },

  backIcon: {
    marginRight: ArenaSpacing.sm,
  },

  headerContent: {
    alignItems: 'center',
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing.xl,
  },

  sectionContainer: {
    marginBottom: ArenaSpacing['4xl'],
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: ArenaSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: `${ArenaColors.brand.primary}40`,
  },

  sectionHeaderPressed: {
    opacity: 0.7,
  },

  sectionTitle: {
    flex: 1,
  },

  sectionToggleIcon: {
    marginLeft: ArenaSpacing.md,
  },

  sectionContent: {
    paddingTop: ArenaSpacing.xl,
  },

  showcaseItem: {
    marginBottom: ArenaSpacing['3xl'],
    padding: ArenaSpacing.lg,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: ArenaBorders.width.hairline,
    borderColor: `${ArenaColors.neutral.medium}20`,
  },

  showcaseHeader: {
    marginBottom: ArenaSpacing.md,
    paddingBottom: ArenaSpacing.md,
    borderBottomWidth: ArenaBorders.width.hairline,
    borderBottomColor: `${ArenaColors.neutral.medium}15`,
  },

  showcaseContent: {
    alignItems: 'flex-start',
  },

  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: ArenaSpacing['4xl'],
  },

  emptyIcon: {
    marginBottom: ArenaSpacing.xl,
    opacity: 0.5,
  },

  emptyContent: {
    alignItems: 'center',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});