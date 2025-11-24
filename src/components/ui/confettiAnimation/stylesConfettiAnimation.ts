import { StyleSheet } from 'react-native';
import { ArenaBorders } from '@/constants';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  particle: {
    position: 'absolute',
    borderRadius: ArenaBorders.radius.xs,
  },
});
