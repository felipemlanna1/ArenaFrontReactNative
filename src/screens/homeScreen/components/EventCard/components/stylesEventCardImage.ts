import { StyleSheet, ViewStyle, ImageStyle } from 'react-native';
import { ArenaBorders } from '@/constants';

interface Styles {
  container: ViewStyle;
  image: ImageStyle;
  fallbackContainer: ViewStyle;
}

export const styles = StyleSheet.create<Styles>({
  container: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
    borderTopLeftRadius: ArenaBorders.radius.lg,
    borderTopRightRadius: ArenaBorders.radius.lg,
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
  },
});
