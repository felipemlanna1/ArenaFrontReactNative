import { useState, useCallback } from 'react';
import { eventsService } from '@/services/events/eventsService';
import {
  CreateEventFormData,
  CreateEventDto,
  EventType,
} from '../typesCreateEventScreen';
import { Event } from '@/services/events/typesEvents';
import { useAlert } from '@/contexts/AlertContext';

interface UseCreateEventApiReturn {
  isCreating: boolean;
  createEventError: string | null;
  createEvent: (formData: CreateEventFormData) => Promise<Event | null>;
}

export const useCreateEventApi = (): UseCreateEventApiReturn => {
  const { showError } = useAlert();
  const [isCreating, setIsCreating] = useState(false);
  const [createEventError, setCreateEventError] = useState<string | null>(null);

  const buildEventDto = useCallback(
    (formData: CreateEventFormData): CreateEventDto => {
      if (!formData.startDate) {
        throw new Error('Start date is required');
      }

      const endDate = new Date(formData.startDate);
      endDate.setMinutes(endDate.getMinutes() + formData.duration);

      // Validar coordenadas: só enviar se válidas (não undefined e não 0)
      const hasValidCoordinates =
        formData.location.latitude !== undefined &&
        formData.location.latitude !== 0 &&
        formData.location.longitude !== undefined &&
        formData.location.longitude !== 0;

      return {
        title: formData.title,
        description: formData.description || undefined,
        eventType: EventType.ONE_TIME,
        sportId: formData.sportId,
        startDate: formData.startDate.toISOString(),
        endDate: endDate.toISOString(),
        location: {
          zipCode: formData.location.zipCode,
          street: formData.location.street,
          number: formData.location.number || undefined,
          complement: formData.location.complement || undefined,
          district: formData.location.district,
          city: formData.location.city,
          state: formData.location.state,
          country: formData.location.country,
          ...(hasValidCoordinates && {
            latitude: formData.location.latitude,
            longitude: formData.location.longitude,
          }),
          formattedAddress: formData.location.formattedAddress || undefined,
        },
        price: formData.price,
        currency: 'BRL',
        maxParticipants:
          formData.maxParticipants !== null
            ? Math.floor(formData.maxParticipants)
            : undefined,
        skillLevel: formData.skillLevel || undefined,
        ageRestriction:
          formData.ageRestriction?.min || formData.ageRestriction?.max
            ? formData.ageRestriction
            : undefined,
        rules:
          formData.rules && formData.rules.trim().length > 0
            ? formData.rules
            : undefined,
        requirements:
          formData.requirements && formData.requirements.trim().length > 0
            ? formData.requirements
            : undefined,
        privacy: formData.privacy,
        groupId: formData.groupId || undefined,
      };
    },
    []
  );

  const createEvent = useCallback(
    async (formData: CreateEventFormData): Promise<Event | null> => {
      try {
        setIsCreating(true);
        setCreateEventError(null);

        const dto = buildEventDto(formData);
        const createdEvent = await eventsService.createEvent(dto);

        return createdEvent;
      } catch (error) {
        let errorMessage = 'Erro ao criar evento. Tente novamente.';

        if (error instanceof Error) {
          if (error.message.includes('network')) {
            errorMessage = 'Erro de conexão. Verifique sua internet.';
          } else if (error.message.includes('validation')) {
            errorMessage = 'Dados inválidos. Revise os campos.';
          }
        }

        setCreateEventError(errorMessage);
        showError(errorMessage);

        return null;
      } finally {
        setIsCreating(false);
      }
    },
    [buildEventDto, showError]
  );

  return {
    isCreating,
    createEventError,
    createEvent,
  };
};
