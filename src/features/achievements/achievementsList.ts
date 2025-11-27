import { Achievement } from './typesAchievements';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-event',
    title: 'Primeira Partida',
    description: 'Participe do seu primeiro evento',
    category: 'participation',
    tier: 'bronze',
    icon: 'trophy',
    points: 10,
    requirements: {
      eventsParticipated: 1,
    },
  },
  {
    id: 'event-veteran',
    title: 'Veterano da Arena',
    description: 'Participe de 10 eventos',
    category: 'participation',
    tier: 'silver',
    icon: 'medal',
    points: 50,
    requirements: {
      eventsParticipated: 10,
    },
  },
  {
    id: 'event-legend',
    title: 'Lenda da Arena',
    description: 'Participe de 50 eventos',
    category: 'participation',
    tier: 'gold',
    icon: 'star',
    points: 200,
    requirements: {
      eventsParticipated: 50,
    },
  },
  {
    id: 'event-creator',
    title: 'Organizador',
    description: 'Crie seu primeiro evento',
    category: 'participation',
    tier: 'bronze',
    icon: 'add-circle',
    points: 20,
    requirements: {
      eventsCreated: 1,
    },
  },
  {
    id: 'event-master',
    title: 'Mestre de Eventos',
    description: 'Crie 10 eventos',
    category: 'participation',
    tier: 'gold',
    icon: 'ribbon',
    points: 100,
    requirements: {
      eventsCreated: 10,
    },
  },

  {
    id: 'first-friend',
    title: 'Primeira Conexão',
    description: 'Adicione seu primeiro amigo',
    category: 'social',
    tier: 'bronze',
    icon: 'person-add',
    points: 10,
    requirements: {
      friendsAdded: 1,
    },
  },
  {
    id: 'social-butterfly',
    title: 'Borboleta Social',
    description: 'Adicione 10 amigos',
    category: 'social',
    tier: 'silver',
    icon: 'people',
    points: 50,
    requirements: {
      friendsAdded: 10,
    },
  },
  {
    id: 'community-leader',
    title: 'Líder da Comunidade',
    description: 'Adicione 50 amigos',
    category: 'social',
    tier: 'gold',
    icon: 'people-circle',
    points: 200,
    requirements: {
      friendsAdded: 50,
    },
  },

  {
    id: 'streak-3',
    title: 'Em Chamas 🔥',
    description: 'Mantenha 3 dias de atividade consecutiva',
    category: 'streak',
    tier: 'bronze',
    icon: 'flame',
    points: 30,
    requirements: {
      currentStreak: 3,
    },
  },
  {
    id: 'streak-7',
    title: 'Sequência de Fogo',
    description: 'Mantenha 7 dias de atividade consecutiva',
    category: 'streak',
    tier: 'silver',
    icon: 'bonfire',
    points: 70,
    requirements: {
      currentStreak: 7,
    },
  },
  {
    id: 'streak-30',
    title: 'Imparável',
    description: 'Mantenha 30 dias de atividade consecutiva',
    category: 'streak',
    tier: 'gold',
    icon: 'trending-up',
    points: 300,
    requirements: {
      currentStreak: 30,
    },
  },

  {
    id: 'football-fan',
    title: 'Craque do Futebol',
    description: 'Participe de 10 eventos de futebol',
    category: 'sport',
    tier: 'silver',
    icon: 'football',
    points: 50,
    requirements: {
      customCheck: userStats => (userStats.eventsBySport['futebol'] ?? 0) >= 10,
    },
  },
  {
    id: 'basketball-pro',
    title: 'Ás do Basquete',
    description: 'Participe de 10 eventos de basquete',
    category: 'sport',
    tier: 'silver',
    icon: 'basketball',
    points: 50,
    requirements: {
      customCheck: userStats =>
        (userStats.eventsBySport['basquete'] ?? 0) >= 10,
    },
  },
  {
    id: 'multi-sport',
    title: 'Atleta Completo',
    description: 'Participe de eventos em 5 esportes diferentes',
    category: 'sport',
    tier: 'gold',
    icon: 'trophy-outline',
    points: 150,
    requirements: {
      customCheck: userStats =>
        Object.keys(userStats.eventsBySport).length >= 5,
    },
  },

  {
    id: 'profile-complete',
    title: 'Perfil Completo',
    description: 'Complete 100% do seu perfil',
    category: 'profile',
    tier: 'bronze',
    icon: 'person-circle',
    points: 20,
    requirements: {
      profileCompletion: 100,
    },
  },

  {
    id: 'arena-veteran',
    title: 'Veterano Arena',
    description: 'Sua conta completou 30 dias',
    category: 'milestone',
    tier: 'silver',
    icon: 'calendar',
    points: 100,
    requirements: {
      customCheck: userStats => {
        const daysSinceCreation =
          (Date.now() - userStats.accountCreatedAt.getTime()) /
          (1000 * 60 * 60 * 24);
        return daysSinceCreation >= 30;
      },
    },
  },
];

export const getAchievementsByCategory = (
  category: Achievement['category']
): Achievement[] => {
  return ACHIEVEMENTS.filter(a => a.category === category);
};

export const getAchievementsByTier = (
  tier: Achievement['tier']
): Achievement[] => {
  return ACHIEVEMENTS.filter(a => a.tier === tier);
};

export const getAchievementById = (id: string): Achievement | undefined => {
  return ACHIEVEMENTS.find(a => a.id === id);
};

export const TOTAL_ACHIEVEMENT_POINTS = ACHIEVEMENTS.reduce(
  (sum, a) => sum + a.points,
  0
);
