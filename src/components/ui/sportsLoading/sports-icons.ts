export const SPORTS_ICONS = {
  basquete: require('../../../assets/iconSports/basquete.png'),
  beachtenis: require('../../../assets/iconSports/beachtenis.png'),
  bicicleta: require('../../../assets/iconSports/bicicleta.png'),
  boxe: require('../../../assets/iconSports/boxe.png'),
  corrida: require('../../../assets/iconSports/corrida.png'),
  escalada: require('../../../assets/iconSports/escalada.png'),
  futebol: require('../../../assets/iconSports/futebol.png'),
  handebol: require('../../../assets/iconSports/handebol.png'),
  jiujitsu: require('../../../assets/iconSports/jiujitsu.png'),
  tenis: require('../../../assets/iconSports/tenis.png'),
  voleibol: require('../../../assets/iconSports/voleibol.png'),
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
