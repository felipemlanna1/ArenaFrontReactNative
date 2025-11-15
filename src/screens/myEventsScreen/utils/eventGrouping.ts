import { Event } from '@/services/events/typesEvents';
import {
  TimeCategory,
  GroupedEventItem,
  TimeCategoryLabel,
} from '../typesMyEventsScreen';

export const TIME_CATEGORIES: TimeCategoryLabel[] = [
  { key: 'today', label: 'Hoje' },
  { key: 'tomorrow', label: 'Amanhã' },
  { key: 'thisWeek', label: 'Esta Semana' },
  { key: 'thisMonth', label: 'Este Mês' },
  { key: 'upcoming', label: 'Próximos' },
];

const isToday = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

const isTomorrow = (date: Date): boolean => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return (
    date.getDate() === tomorrow.getDate() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getFullYear() === tomorrow.getFullYear()
  );
};

const isThisWeek = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dayOfWeek = today.getDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - daysFromMonday);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return (
    date >= startOfWeek &&
    date <= endOfWeek &&
    !isToday(date) &&
    !isTomorrow(date)
  );
};

const isThisMonth = (date: Date): boolean => {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear() &&
    !isToday(date) &&
    !isTomorrow(date) &&
    !isThisWeek(date)
  );
};

export const categorizeEvent = (event: Event): TimeCategory => {
  const eventDate = new Date(event.startDate);

  if (isToday(eventDate)) return 'today';
  if (isTomorrow(eventDate)) return 'tomorrow';
  if (isThisWeek(eventDate)) return 'thisWeek';
  if (isThisMonth(eventDate)) return 'thisMonth';
  return 'upcoming';
};

export const groupEventsByTime = (events: Event[]): GroupedEventItem[] => {
  const currentDate = new Date();
  const futureEvents: Event[] = [];
  const pastEvents: Event[] = [];

  events.forEach(event => {
    const eventDate = new Date(event.startDate);
    if (eventDate > currentDate) {
      futureEvents.push(event);
    } else {
      pastEvents.push(event);
    }
  });

  const grouped: Record<TimeCategory, Event[]> = {
    today: [],
    tomorrow: [],
    thisWeek: [],
    thisMonth: [],
    upcoming: [],
  };

  futureEvents.forEach(event => {
    const category = categorizeEvent(event);
    grouped[category].push(event);
  });

  const result: GroupedEventItem[] = [];

  TIME_CATEGORIES.forEach(({ key, label }) => {
    const categoryEvents = grouped[key];
    if (categoryEvents.length > 0) {
      result.push({
        type: 'header',
        category: key,
        label,
      });

      categoryEvents.forEach(event => {
        result.push({
          type: 'event',
          event,
        });
      });
    }
  });

  return result;
};

export const getPastEvents = (events: Event[]): Event[] => {
  const currentDate = new Date();
  return events.filter(event => {
    const eventDate = new Date(event.startDate);
    return eventDate <= currentDate;
  });
};

export const getCategoryLabel = (category: TimeCategory): string => {
  const found = TIME_CATEGORIES.find(c => c.key === category);
  return found?.label || '';
};
