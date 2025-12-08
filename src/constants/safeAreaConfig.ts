import { Edge } from 'react-native-safe-area-context';

export const SafeAreaEdges = {
  DEFAULT: ['top', 'left', 'right'] as Edge[],
  FULL_SCREEN: ['top', 'bottom', 'left', 'right'] as Edge[],
  TAB_SCREEN: ['top', 'left', 'right'] as Edge[],
  MODAL: ['top', 'left', 'right'] as Edge[],
  BOTTOM_MODAL: ['bottom', 'left', 'right'] as Edge[],
  AUTH_SCREEN: ['top', 'left', 'right'] as Edge[],
  TOP_ONLY: ['top'] as Edge[],
  NONE: [] as Edge[],
} as const;

export type SafeAreaEdgeConfig = keyof typeof SafeAreaEdges;
