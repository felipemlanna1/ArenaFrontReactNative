export const FILTER_DEFAULTS = {
  PAGINATION: {
    DEFAULT_LIMIT: 20,
  },
  FILTERS: {
    HAS_AVAILABLE_SPOTS: true,
  },
  SORT: {
    DEFAULT_SORT_ORDER: 'asc' as const,
  },
};

export const PRICE_LIMITS = {
  MIN: 0,
  MAX: 10000,
};
