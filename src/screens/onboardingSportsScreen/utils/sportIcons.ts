import { ImageSourcePropType } from 'react-native';

const sportIcons: Record<string, ImageSourcePropType> = {
  ball: require('@/assets/iconSports/ball.png'),
  basquete: require('@/assets/iconSports/basquete.png'),
  'basketball-outline': require('@/assets/iconSports/basketball-outline.png'),
  beachtenis: require('@/assets/iconSports/beachtenis.png'),
  bicicleta: require('@/assets/iconSports/bicicleta.png'),
  bicycle: require('@/assets/iconSports/bicycle.png'),
  boxe: require('@/assets/iconSports/boxe.png'),
  'boxing-glove': require('@/assets/iconSports/boxing-glove.png'),
  climbing: require('@/assets/iconSports/climbing.png'),
  corrida: require('@/assets/iconSports/corrida.png'),
  dumbbell: require('@/assets/iconSports/dumbbell.png'),
  escalada: require('@/assets/iconSports/escalada.png'),
  futbol: require('@/assets/iconSports/futbol.png'),
  futebol: require('@/assets/iconSports/futebol.png'),
  handebol: require('@/assets/iconSports/handebol.png'),
  jiujitsu: require('@/assets/iconSports/jiujitsu.png'),
  'karate-do': require('@/assets/iconSports/karate-do.png'),
};

export const getSportIcon = (iconName: string): ImageSourcePropType => {
  const icon = sportIcons[iconName];
  if (!icon) {
    console.warn(`Sport icon not found: ${iconName}`);
    return sportIcons.ball;
  }
  return icon;
};
