import { FilterScreenState, FilterCount } from '../typesFilterScreen';
import { EventsFilter } from '@/services/events/typesEvents';

export const transformToAPIFilters = (
  state: FilterScreenState
): EventsFilter => {
  const apiFilters: EventsFilter = {};

  if (state.sportIds.length > 0) {
    apiFilters.sportIds = state.sportIds;
  }

  if (state.skillLevels.length > 0) {
    apiFilters.skillLevel = state.skillLevels;
  }

  if (state.privacy.length > 0) {
    apiFilters.privacy = state.privacy;
  }

  if (state.status.length > 0) {
    apiFilters.status = state.status;
  }

  if (state.priceMin !== null) {
    apiFilters.priceMin = state.priceMin;
  }

  if (state.priceMax !== null) {
    apiFilters.priceMax = state.priceMax;
  }

  if (state.isFree) {
    apiFilters.isFree = true;
  }

  if (state.hasAvailableSpots) {
    apiFilters.hasAvailableSpots = true;
  }

  if (state.startDateFrom) {
    apiFilters.startDateFrom = state.startDateFrom.toISOString();
  }

  if (state.startDateTo) {
    apiFilters.startDateTo = state.startDateTo.toISOString();
  }

  if (state.city.trim()) {
    apiFilters.city = state.city.trim();
  }

  if (state.state.trim()) {
    apiFilters.state = state.state.trim();
  }

  apiFilters.sortBy = state.sortBy;
  apiFilters.sortOrder = state.sortOrder;

  return apiFilters;
};

export const calculateFilterCount = (
  filters: FilterScreenState
): FilterCount => {
  const sports = filters.sportIds.length;
  const skill = filters.skillLevels.length;
  const price =
    (filters.priceMin !== null ? 1 : 0) +
    (filters.priceMax !== null ? 1 : 0) +
    (filters.isFree ? 1 : 0);
  const date =
    (filters.startDateFrom ? 1 : 0) + (filters.startDateTo ? 1 : 0);
  const location =
    (filters.city.trim() ? 1 : 0) + (filters.state.trim() ? 1 : 0);
  const other =
    filters.privacy.length +
    filters.status.length +
    filters.eventTypes.length +
    (filters.hasAvailableSpots ? 1 : 0);

  const total = sports + skill + price + date + location + other;

  return {
    total,
    byCategory: {
      sports,
      skill,
      price,
      date,
      location,
      other,
    },
  };
};
