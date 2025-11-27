import { StyleSheet } from 'react-native';
import { ArenaColors, ArenaSpacing, ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: ArenaSpacing.md,
    marginBottom: ArenaSpacing.lg,
  },
  card: {
    backgroundColor: `${ArenaColors.brand.primary}26`,
    borderWidth: ArenaBorders.width.thin,
    borderColor: ArenaColors.brand.primary,
    borderRadius: ArenaBorders.radius.md,
    padding: ArenaSpacing.md,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: ArenaSpacing.md,
  },
  iconContainer: {
    marginRight: ArenaSpacing.sm,
    paddingTop: ArenaSpacing.xs,
  },
  textContainer: {
    flex: 1,
    marginRight: ArenaSpacing.sm,
  },
  messageText: {},
  closeButton: {
    width: ArenaSpacing['3xl'],
    height: ArenaSpacing['3xl'],
    borderRadius: ArenaBorders.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  buttonContainer: {
    alignSelf: 'flex-start',
  },
});

export const CONSTANTS = {
  ICON_SIZE: ArenaSpacing['2xl'],
  CLOSE_BUTTON_SIZE: ArenaSpacing['3xl'],
};
