import { StyleSheet } from 'react-native';
import {
  ArenaColors,
  ArenaSpacing,
  ArenaBorders,
  ArenaShadowConfig,
} from '@/constants';

export const styles = StyleSheet.create({
  alertWrapper: {
    width: '100%',
    marginBottom: ArenaSpacing.md,
  },
  container: {
    backgroundColor: ArenaColors.neutral.dark,
    borderRadius: ArenaBorders.radius.xl,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.neutral.darkSubtleBorder,
    shadowColor: ArenaColors.neutral.darkest,
    shadowOffset: ArenaShadowConfig.alertShadow.offset,
    shadowOpacity: ArenaShadowConfig.alertShadow.opacity,
    shadowRadius: ArenaShadowConfig.alertShadow.radius,
    elevation: ArenaShadowConfig.alertShadow.elevation,
  },
  content: {
    padding: ArenaSpacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.sm,
    marginBottom: ArenaSpacing.sm,
  },
  iconContainer: {
    flexShrink: 0,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    textAlign: 'left',
  },
  messageContainer: {
    marginBottom: ArenaSpacing.md,
    paddingLeft: ArenaSpacing['4xl'],
  },
  message: {
    textAlign: 'left',
  },
  buttonsContainer: {
    gap: ArenaSpacing.md,
  },
  singleButtonRow: {
    flexDirection: 'column',
  },
  twoButtonsRow: {
    flexDirection: 'row',
    gap: ArenaSpacing.md,
  },
  buttonWrapper: {
    flex: 1,
  },
  fullWidthButton: {
    width: '100%',
  },
});
