import { FilterOption } from '../typesFilterScreen';

export const SKILL_LEVEL_OPTIONS: FilterOption[] = [
  { id: 'ALL', label: 'Todos os níveis', value: 'ALL' },
  { id: 'BEGINNER', label: 'Iniciante', value: 'BEGINNER' },
  { id: 'INTERMEDIATE', label: 'Intermediário', value: 'INTERMEDIATE' },
  { id: 'ADVANCED', label: 'Avançado', value: 'ADVANCED' },
  { id: 'PROFESSIONAL', label: 'Profissional', value: 'PROFESSIONAL' },
];

export const PRIVACY_OPTIONS: FilterOption[] = [
  { id: 'PUBLIC', label: 'Público', value: 'PUBLIC' },
  { id: 'PRIVATE', label: 'Privado', value: 'PRIVATE' },
  { id: 'FRIENDS_ONLY', label: 'Apenas Amigos', value: 'FRIENDS_ONLY' },
];

export const EVENT_STATUS_OPTIONS: FilterOption[] = [
  { id: 'PUBLISHED', label: 'Publicado', value: 'PUBLISHED' },
  { id: 'ONGOING', label: 'Em Andamento', value: 'ONGOING' },
  { id: 'COMPLETED', label: 'Concluído', value: 'COMPLETED' },
  { id: 'CANCELLED', label: 'Cancelado', value: 'CANCELLED' },
];

export const EVENT_TYPE_OPTIONS: FilterOption[] = [
  { id: 'CASUAL', label: 'Casual', value: 'CASUAL' },
  { id: 'COMPETITIVE', label: 'Competitivo', value: 'COMPETITIVE' },
  { id: 'TRAINING', label: 'Treino', value: 'TRAINING' },
  { id: 'TOURNAMENT', label: 'Torneio', value: 'TOURNAMENT' },
];

export const SORT_OPTIONS: FilterOption[] = [
  { id: 'date', label: 'Data', value: 'date' },
  { id: 'distance', label: 'Distância', value: 'distance' },
  { id: 'price', label: 'Preço', value: 'price' },
  { id: 'name', label: 'Nome', value: 'name' },
];

export const DEFAULT_FILTER_STATE = {
  sportIds: [],
  skillLevels: [],
  privacy: [],
  status: [],
  eventTypes: [],
  priceMin: null,
  priceMax: null,
  isFree: false,
  hasAvailableSpots: false,
  startDateFrom: null,
  startDateTo: null,
  city: '',
  state: '',
  sortBy: 'date' as const,
  sortOrder: 'desc' as const,
};

export const PRICE_LIMITS = {
  MIN: 0,
  MAX: 10000,
};

export const DATE_SHORTCUTS = {
  TODAY: 'today',
  THIS_WEEK: 'thisWeek',
  THIS_MONTH: 'thisMonth',
} as const;
