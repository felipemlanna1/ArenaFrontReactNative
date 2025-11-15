import { Event } from '@/services/events/typesEvents';

export interface SeparatedEvents {
  futureEvents: Event[];
  pastEvents: Event[];
}

export const separateEventsByDate = (events: Event[]): SeparatedEvents => {
  const currentDate = new Date();

  const futureEvents: Event[] = [];
  const pastEvents: Event[] = [];

  events.forEach(event => {
    const eventStartDate = new Date(event.startDate);
    if (eventStartDate > currentDate) {
      futureEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  return { futureEvents, pastEvents };
};

export const isPastEvent = (event: Event): boolean => {
  const currentDate = new Date();
  const eventStartDate = new Date(event.startDate);
  return eventStartDate <= currentDate;
};
