import { ImageSourcePropType } from 'react-native';
import { logger } from '@/utils/logger';

const sportIcons: Record<string, ImageSourcePropType> = {
  ball: require('../assets/iconSports/ball.png'),
  'basketball-outline': require('../assets/iconSports/basketball-outline.png'),
  basquete: require('../assets/iconSports/basquete.png'),
  beachtenis: require('../assets/iconSports/beachtenis.png'),
  bicicleta: require('../assets/iconSports/bicicleta.png'),
  bicycle: require('../assets/iconSports/bicycle.png'),
  boxe: require('../assets/iconSports/boxe.png'),
  'boxing-glove': require('../assets/iconSports/boxing-glove.png'),
  climbing: require('../assets/iconSports/climbing.png'),
  corrida: require('../assets/iconSports/corrida.png'),
  dumbbell: require('../assets/iconSports/dumbbell.png'),
  escalada: require('../assets/iconSports/escalada.png'),
  futbol: require('../assets/iconSports/futbol.png'),
  futebol: require('../assets/iconSports/futebol.png'),
  handebol: require('../assets/iconSports/handebol.png'),
  jiujitsu: require('../assets/iconSports/jiujitsu.png'),
  'karate-do': require('../assets/iconSports/karate-do.png'),
  kettlebell: require('../assets/iconSports/kettlebell.png'),
  racquetball: require('../assets/iconSports/racquetball.png'),
  'roller-skate': require('../assets/iconSports/roller-skate.png'),
  running: require('../assets/iconSports/running.png'),
  shuttlecock: require('../assets/iconSports/shuttlecock.png'),
  skateboard: require('../assets/iconSports/skateboard.png'),
  soccer: require('../assets/iconSports/soccer.png'),
  'sports-handball': require('../assets/iconSports/sports-handball.png'),
  'surfing-outline': require('../assets/iconSports/surfing-outline.png'),
  'swim-outline': require('../assets/iconSports/swim-outline.png'),
  tenis: require('../assets/iconSports/tenis.png'),
  tennis: require('../assets/iconSports/tennis.png'),
  voleibol: require('../assets/iconSports/voleibol.png'),
  volleyball: require('../assets/iconSports/volleyball.png'),
};

export const getSportIcon = (iconName: string): ImageSourcePropType => {
  const icon = sportIcons[iconName];
  if (!icon) {
    logger.warn('Sport icon not found, using fallback', { iconName });
    return sportIcons.ball;
  }
  return icon;
};
