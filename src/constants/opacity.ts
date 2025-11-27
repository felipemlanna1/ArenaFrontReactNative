export const ArenaOpacity = {
  transparent: 0,
  subtle: 0.1,
  light: 0.2,
  moderate: 0.3,
  medium: 0.5,
  strong: 0.8,
  opaque: 1,
} as const;

export type ArenaOpacityKey = keyof typeof ArenaOpacity;

export const getArenaOpacity = (opacity: ArenaOpacityKey) => {
  return ArenaOpacity[opacity];
};
