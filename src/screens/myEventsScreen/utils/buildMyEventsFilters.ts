import { EventsFilter } from '@/services/events/typesEvents';
import { EventFilterType } from '../typesMyEventsScreen';

export const buildMyEventsFilters = (filter: EventFilterType): EventsFilter => {
  const baseFilters: EventsFilter = {};

  if (filter === 'participating') {
    baseFilters.userEventStatus = ['PARTICIPANT'];
  } else if (filter === 'invited') {
    baseFilters.userEventStatus = ['INVITED'];
  } else if (filter === 'organizing') {
    baseFilters.userEventStatus = ['ORGANIZER', 'ADMIN'];
  } else {
    baseFilters.userEventStatus = [
      'ORGANIZER',
      'ADMIN',
      'PARTICIPANT',
      'INVITED',
    ];
  }

  return baseFilters;
};
