import { EventParticipant } from '@/services/events/typesEvents';

export interface FormatParticipantsOptions {
  includeEventTitle?: boolean;
  eventTitle?: string;
  sportName?: string;
}

export const formatParticipantsList = (
  participants: EventParticipant[],
  organizerId: string,
  options: FormatParticipantsOptions = {}
): string => {
  const { includeEventTitle = true, eventTitle = '', sportName = '' } = options;

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

  lines.push(`Participantes confirmados (${confirmedParticipants.length}):`);

  confirmedParticipants.forEach((participant, index) => {
    const name = `${participant.user.firstName} ${participant.user.lastName}`;
    const isOrganizer = participant.userId === organizerId;
    const organizerLabel = isOrganizer ? ' (Organizador)' : '';
    lines.push(`${index + 1}. ${name}${organizerLabel}`);
  });

  return lines.join('\n');
};
