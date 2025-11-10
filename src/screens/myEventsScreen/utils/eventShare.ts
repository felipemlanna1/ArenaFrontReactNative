import { Share } from 'react-native';
import { Event } from '@/services/events/typesEvents';
import { deepLinksService } from '@/services/deepLinks';

export const shareEvent = async (event: Event): Promise<void> => {
  try {
    const eventDate = new Date(event.startDate);
    const day = eventDate.getDate().toString().padStart(2, '0');
    const month = eventDate.getMonth() + 1;
    const monthNames = [
      'janeiro',
      'fevereiro',
      'março',
      'abril',
      'maio',
      'junho',
      'julho',
      'agosto',
      'setembro',
      'outubro',
      'novembro',
      'dezembro',
    ];
    const hours = eventDate.getHours().toString().padStart(2, '0');
    const minutes = eventDate.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day} de ${monthNames[month - 1]} às ${hours}:${minutes}`;

    const price = event.isFree
      ? 'Gratuito'
      : `R$ ${
          typeof event.price === 'number' ? event.price.toFixed(2) : event.price
        }`;

    const location = `${event.location.city}, ${event.location.state}`;
    const eventLink = deepLinksService.generateEventLink(event.id);

    const message = `🏃 ${event.sport.name}: ${event.title}

📅 ${formattedDate}
📍 ${location}
💰 ${price}
👥 ${event.currentParticipants}/${event.maxParticipants} participantes

${event.description ? `${event.description}\n\n` : ''}🔗 Acesse o evento: ${eventLink}

Participe pelo app Arena! 🔥`;

    await Share.share({
      message,
      title: `Arena - ${event.title}`,
    });
  } catch (error) {
    if (__DEV__) {
      throw error;
    }
  }
};
