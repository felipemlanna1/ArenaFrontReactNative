import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ArenaColors.neutral.darkest,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingTop: ArenaSpacing.lg,
    paddingBottom: ArenaSpacing['2xl'],
  },
  header: {
    marginBottom: ArenaSpacing.xl,
  },
  successIcon: {
    alignSelf: 'center',
    marginBottom: ArenaSpacing.lg,
  },
  title: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  subtitleContainer: {
    marginBottom: ArenaSpacing.xl,
  },
  subtitle: {
    textAlign: 'center',
  },
  formContainer: {
    gap: ArenaSpacing.lg,
    marginBottom: ArenaSpacing.lg,
  },
  requirementsContainer: {
    marginBottom: ArenaSpacing.xl,
  },
  requirementsTitle: {
    marginBottom: ArenaSpacing.sm,
  },
  requirementsList: {
    gap: ArenaSpacing.xs,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.xs,
  },
  strengthContainer: {
    marginBottom: ArenaSpacing.xl,
  },
  strengthLabel: {
    marginBottom: ArenaSpacing.xs,
  },
  strengthBarContainer: {
    height: ArenaSpacing.sm,
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.pill,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: ArenaBorders.radius.pill,
  },
  strengthBarWeak: {
    backgroundColor: ArenaColors.semantic.error,
  },
  strengthBarMedium: {
    backgroundColor: ArenaColors.semantic.warning,
  },
  strengthBarGood: {
    backgroundColor: ArenaColors.semantic.success,
  },
  strengthBarStrong: {
    backgroundColor: ArenaColors.semantic.success,
  },
  strengthText: {
    marginTop: ArenaSpacing.xs,
  },
  actionsContainer: {
    gap: ArenaSpacing.md,
    marginTop: 'auto',
  },
  backButton: {
    alignSelf: 'center',
  },
});
