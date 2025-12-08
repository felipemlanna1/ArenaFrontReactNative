import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: ArenaSpacing.lg,
    paddingVertical: ArenaSpacing['2xl'],
  },
  stepContainer: {
    flex: 1,
    alignItems: 'center',
    gap: ArenaSpacing.lg,
  },
  iconContainer: {
    marginBottom: ArenaSpacing.md,
  },
  title: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.sm,
  },
  description: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.md,
  },
  bulletList: {
    width: '100%',
    gap: ArenaSpacing.sm,
    marginBottom: ArenaSpacing.lg,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: ArenaSpacing.sm,
  },
  bulletIcon: {
    marginTop: ArenaSpacing.xxs,
  },
  bulletText: {
    flex: 1,
  },
  lgpdNotice: {
    textAlign: 'center',
    marginBottom: ArenaSpacing.lg,
    paddingHorizontal: ArenaSpacing.md,
  },
  keywordBox: {
    width: '100%',
    backgroundColor: ArenaColors.neutral.dark,
    padding: ArenaSpacing.md,
    borderRadius: ArenaBorders.radius.md,
    borderWidth: 1,
    borderColor: ArenaColors.brand.primary,
    marginBottom: ArenaSpacing.md,
  },
  keywordText: {
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: ArenaSpacing.lg,
  },
  buttonContainer: {
    width: '100%',
    gap: ArenaSpacing.sm,
  },
});
