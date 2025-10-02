import { StyleSheet, ViewStyle, ImageStyle, TextStyle } from 'react-native';
import {
  ArenaBorders,
  ArenaColors,
  ArenaSpacing,
  ArenaTypography,
} from '@/constants';

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
  fallbackContainer: ViewStyle;
  fallbackIcon: ImageStyle;
  priceBadge: ViewStyle;
  priceSuccessBadge: ViewStyle;
  pricePrimaryBadge: ViewStyle;
  priceText: TextStyle;
  distanceBadge: ViewStyle;
  distanceIcon: ViewStyle;
  distanceText: TextStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
    borderTopLeftRadius: ArenaBorders.radius.lg,
    borderTopRightRadius: ArenaBorders.radius.lg,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fallbackContainer: {
    width: '100%',
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: ArenaBorders.radius.lg,
    borderTopRightRadius: ArenaBorders.radius.lg,
    position: 'relative',
  },
  fallbackIcon: {
    width: 60,
    height: 60,
  },
  priceBadge: {
    position: 'absolute',
    top: ArenaSpacing.sm,
    left: ArenaSpacing.sm,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
  },
  priceSuccessBadge: {
    backgroundColor: ArenaColors.semantic.success,
  },
  pricePrimaryBadge: {
    backgroundColor: ArenaColors.brand.primary,
  },
  priceText: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
  },
  distanceBadge: {
    position: 'absolute',
    top: ArenaSpacing.sm,
    right: ArenaSpacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: ArenaSpacing.micro,
    paddingHorizontal: ArenaSpacing.sm,
    paddingVertical: ArenaSpacing.xs,
    borderRadius: ArenaBorders.radius.pill,
    backgroundColor: ArenaColors.neutral.dark,
  },
  distanceIcon: {},
  distanceText: {
    color: ArenaColors.text.inverse,
    fontSize: ArenaTypography.size.xs,
    fontWeight: ArenaTypography.weight.bold,
  },
});
