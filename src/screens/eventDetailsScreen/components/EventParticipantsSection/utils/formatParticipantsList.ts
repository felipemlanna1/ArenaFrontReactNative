import { EventParticipant, EventLocation } from '@/services/events/typesEvents';

export interface FormatParticipantsOptions {
  includeEventTitle?: boolean;
  eventTitle?: string;
  sportName?: string;
  description?: string;
  location?: EventLocation;
  startDate?: string;
  endDate?: string;
}

const formatEventAddress = (location: EventLocation): string => {
  if (location.formattedAddress) {
    return location.formattedAddress;
  }

  const parts: string[] = [];

  if (location.street) {
    const streetLine = location.number
      ? `${location.street}, ${location.number}`
      : location.street;
    parts.push(streetLine);
  }

  if (location.complement) {
    parts.push(location.complement);
  }

  if (location.district) {
    parts.push(location.district);
  }

  const cityState = `${location.city}, ${location.state}`;
  parts.push(cityState);

  if (location.zipCode) {
    parts.push(location.zipCode);
  }

  if (
    location.country &&
    location.country !== 'Brasil' &&
    location.country !== 'Brazil'
  ) {
    parts.push(location.country);
  }

  if (parts.length === 0 && location.address) {
    return location.address;
  }

  if (parts.length === 0) {
    return `${location.city}, ${location.state}`;
  }

  return parts.join(' - ');
};

export const formatParticipantsList = (
  participants: EventParticipant[],
  organizerId: string,
  options: FormatParticipantsOptions = {}
): string => {
  const {
    includeEventTitle = true,
    eventTitle = '',
    sportName = '',
    description = '',
    location,
    startDate = '',
    endDate = '',
  } = options;

  const confirmedParticipants = participants
    .filter(p => p.status === 'CONFIRMED')
    .sort((a, b) => {
      if (a.userId === organizerId) return -1;
      if (b.userId === organizerId) return 1;
      return a.user.firstName.localeCompare(b.user.firstName);
    });

  const lines: string[] = [];

  if (includeEventTitle && (eventTitle || sportName)) {
    if (sportName && eventTitle) {
      lines.push(`${sportName} - ${eventTitle}`);
    } else if (eventTitle) {
      lines.push(eventTitle);
    } else if (sportName) {
      lines.push(sportName);
    }
    lines.push('');
  }

  if (description) {
    lines.push(`${description}`);
    lines.push('');
  }

  if (startDate) {
    const startDateTime = new Date(startDate);
    const formattedDate = startDateTime.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
    const formattedTime = startDateTime.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });

    if (endDate) {
      const endDateTime = new Date(endDate);
      const endTime = endDateTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      lines.push(`📅 ${formattedDate}`);
      lines.push(`⏰ ${formattedTime} - ${endTime}`);
    } else {
      lines.push(`📅 ${formattedDate} às ${formattedTime}`);
    }
    lines.push('');
  }

  if (location) {
    const formattedAddress = formatEventAddress(location);
    lines.push(`📍 ${formattedAddress}`);
    lines.push('');
  }

  lines.push(`Participantes confirmados (${confirmedParticipants.length}):`);

  confirmedParticipants.forEach((participant, index) => {
    const name = `${participant.user.firstName} ${participant.user.lastName}`;
    const isOrganizer = participant.userId === organizerId;
    const organizerLabel = isOrganizer ? ' (Organizador)' : '';
    lines.push(`${index + 1}. ${name}${organizerLabel}`);
  });

  return lines.join('\n');
};
