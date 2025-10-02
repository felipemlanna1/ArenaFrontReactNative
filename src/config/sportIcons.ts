import { ImageSourcePropType } from 'react-native';

const sportIcons: Record<string, ImageSourcePropType> = {
  ball: require('../assets/iconSports/ball.webp'),
  'basketball-outline': require('../assets/iconSports/basketball-outline.webp'),
  basquete: require('../assets/iconSports/basquete.webp'),
  beachtenis: require('../assets/iconSports/beachtenis.webp'),
  bicicleta: require('../assets/iconSports/bicicleta.webp'),
  bicycle: require('../assets/iconSports/bicycle.webp'),
  boxe: require('../assets/iconSports/boxe.webp'),
  'boxing-glove': require('../assets/iconSports/boxing-glove.webp'),
  climbing: require('../assets/iconSports/climbing.webp'),
  corrida: require('../assets/iconSports/corrida.webp'),
  dumbbell: require('../assets/iconSports/dumbbell.webp'),
  escalada: require('../assets/iconSports/escalada.webp'),
  futbol: require('../assets/iconSports/futbol.webp'),
  futebol: require('../assets/iconSports/futebol.webp'),
  handebol: require('../assets/iconSports/handebol.webp'),
  jiujitsu: require('../assets/iconSports/jiujitsu.webp'),
  'karate-do': require('../assets/iconSports/karate-do.webp'),
  kettlebell: require('../assets/iconSports/kettlebell.webp'),
  racquetball: require('../assets/iconSports/racquetball.webp'),
  'roller-skate': require('../assets/iconSports/roller-skate.webp'),
  running: require('../assets/iconSports/running.webp'),
  shuttlecock: require('../assets/iconSports/shuttlecock.webp'),
  skateboard: require('../assets/iconSports/skateboard.webp'),
  soccer: require('../assets/iconSports/soccer.webp'),
  'sports-handball': require('../assets/iconSports/sports-handball.webp'),
  'surfing-outline': require('../assets/iconSports/surfing-outline.webp'),
  'swim-outline': require('../assets/iconSports/swim-outline.webp'),
  tenis: require('../assets/iconSports/tenis.webp'),
  tennis: require('../assets/iconSports/tennis.webp'),
  voleibol: require('../assets/iconSports/voleibol.webp'),
  volleyball: require('../assets/iconSports/volleyball.webp'),
};

export const getSportIcon = (iconName: string): ImageSourcePropType => {
  const icon = sportIcons[iconName];
  if (!icon) {
    return sportIcons.ball;
  }
  return icon;
};
