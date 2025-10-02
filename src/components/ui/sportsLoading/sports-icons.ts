export const SPORTS_ICONS = {
  basquete: require('../../../assets/iconSports/basquete.webp'),
  beachtenis: require('../../../assets/iconSports/beachtenis.webp'),
  bicicleta: require('../../../assets/iconSports/bicicleta.webp'),
  boxe: require('../../../assets/iconSports/boxe.webp'),
  corrida: require('../../../assets/iconSports/corrida.webp'),
  escalada: require('../../../assets/iconSports/escalada.webp'),
  futebol: require('../../../assets/iconSports/futebol.webp'),
  handebol: require('../../../assets/iconSports/handebol.webp'),
  jiujitsu: require('../../../assets/iconSports/jiujitsu.webp'),
  tenis: require('../../../assets/iconSports/tenis.webp'),
  voleibol: require('../../../assets/iconSports/voleibol.webp'),
} as const;

export type SportIconKey = keyof typeof SPORTS_ICONS;

export const SPORT_ICON_KEYS: SportIconKey[] = [
  'basquete',
  'beachtenis',
  'bicicleta',
  'boxe',
  'corrida',
  'escalada',
  'futebol',
  'handebol',
  'jiujitsu',
  'tenis',
  'voleibol',
];

export const getRandomSportsIcons = (count: number = 3): SportIconKey[] => {
  const shuffled = [...SPORT_ICON_KEYS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const getSportIcon = (iconKey: SportIconKey) => {
  return SPORTS_ICONS[iconKey];
};
