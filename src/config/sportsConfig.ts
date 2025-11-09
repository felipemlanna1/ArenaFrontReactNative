export interface SportConfig {
  name: string;
  icon: string;
  color: string;
  category: string;
  popularity: number;
}

export const SPORTS_CONFIG: Record<string, SportConfig> = {
  Futebol: {
    name: 'Futebol',
    icon: 'futebol',
    color: '#018749',
    category: 'TEAM',
    popularity: 100,
  },
  Vôlei: {
    name: 'Vôlei',
    icon: 'volleyball',
    color: '#0077b6',
    category: 'TEAM',
    popularity: 89,
  },
  'Corrida/Caminhada': {
    name: 'Corrida/Caminhada',
    icon: 'running',
    color: '#5b5b5b',
    category: 'FITNESS',
    popularity: 86,
  },
  Futsal: {
    name: 'Futsal',
    icon: 'soccer',
    color: '#e67e22',
    category: 'TEAM',
    popularity: 82,
  },
  'Jiu-jitsu': {
    name: 'Jiu-jitsu',
    icon: 'karate-do',
    color: '#6b21a8',
    category: 'COMBAT',
    popularity: 78,
  },
  Basquete: {
    name: 'Basquete',
    icon: 'basketball-outline',
    color: '#c0392b',
    category: 'TEAM',
    popularity: 76,
  },
  Ciclismo: {
    name: 'Ciclismo',
    icon: 'bicycle',
    color: '#2c3e50',
    category: 'OUTDOOR',
    popularity: 74,
  },
  Natação: {
    name: 'Natação',
    icon: 'swim-outline',
    color: '#1a535c',
    category: 'WATER',
    popularity: 72,
  },
  Skate: {
    name: 'Skate',
    icon: 'skateboard',
    color: '#34495e',
    category: 'OUTDOOR',
    popularity: 71,
  },
  Musculação: {
    name: 'Musculação',
    icon: 'dumbbell',
    color: '#7f8c8d',
    category: 'FITNESS',
    popularity: 70,
  },
  Futevôlei: {
    name: 'Futevôlei',
    icon: 'ball',
    color: '#f9d423',
    category: 'TEAM',
    popularity: 67,
  },
  Surf: {
    name: 'Surf',
    icon: 'surfing-outline',
    color: '#16a085',
    category: 'WATER',
    popularity: 64,
  },
  Tênis: {
    name: 'Tênis',
    icon: 'tennis',
    color: '#d8d21b',
    category: 'RACKET',
    popularity: 60,
  },
  'Beach Tennis': {
    name: 'Beach Tennis',
    icon: 'racquetball',
    color: '#ff9933',
    category: 'RACKET',
    popularity: 59,
  },
  Crossfit: {
    name: 'Crossfit',
    icon: 'kettlebell',
    color: '#1f2c3d',
    category: 'FITNESS',
    popularity: 58,
  },
  Handebol: {
    name: 'Handebol',
    icon: 'sports-handball',
    color: '#96281b',
    category: 'TEAM',
    popularity: 56,
  },
  Boxe: {
    name: 'Boxe',
    icon: 'boxing-glove',
    color: '#9e0000',
    category: 'COMBAT',
    popularity: 54,
  },
  Patins: {
    name: 'Patins',
    icon: 'roller-skate',
    color: '#e84393',
    category: 'OUTDOOR',
    popularity: 49,
  },
  Peteca: {
    name: 'Peteca',
    icon: 'shuttlecock',
    color: '#d4af37',
    category: 'RACKET',
    popularity: 47,
  },
  Escalada: {
    name: 'Escalada',
    icon: 'climbing',
    color: '#7b5c3e',
    category: 'OUTDOOR',
    popularity: 45,
  },
};

export const getSportConfig = (sportName: string): SportConfig | undefined => {
  return SPORTS_CONFIG[sportName];
};

export const getSportIconName = (sportName: string): string => {
  const config = getSportConfig(sportName);
  return config?.icon || 'ball';
};

export const getSportColor = (sportName: string): string => {
  const config = getSportConfig(sportName);
  return config?.color || '#FF5301';
};

export const getAllSports = (): SportConfig[] => {
  return Object.values(SPORTS_CONFIG).sort(
    (a, b) => b.popularity - a.popularity
  );
};
