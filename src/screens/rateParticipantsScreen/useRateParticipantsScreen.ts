import { useState, useEffect, useCallback } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useAlert } from '@/contexts/AlertContext';
import { feedbackApi } from '@/services/feedback/feedbackApi';
import { eventsApi } from '@/services/events/eventsApi';
import { Event } from '@/services/events/typesEvents';
import { ParticipantToRate } from '@/services/feedback/typesFeedback';
import { haptic } from '@/utils/haptics';
import {
  ParticipantRating,
  RateParticipantsScreenParams,
  RatingProgress,
} from './typesRateParticipantsScreen';

interface UseRateParticipantsScreenReturn {
  event: Event | null;
  participantsToRate: ParticipantToRate[];
  ratings: Record<string, ParticipantRating>;
  alreadyRatedUserIds: string[];
  isLoading: boolean;
  isSaving: boolean;
  isMarking: boolean;
  updateRating: (
    userId: string,
    field: 'technical' | 'participation',
    value: number
  ) => void;
  submitRatings: () => Promise<void>;
  markAsCompleted: () => void;
  progress: RatingProgress;
}

type RateParticipantsScreenRouteProp = RouteProp<
  { RateParticipantsScreen: RateParticipantsScreenParams },
  'RateParticipantsScreen'
>;

export const useRateParticipantsScreen =
  (): UseRateParticipantsScreenReturn => {
    const route = useRoute<RateParticipantsScreenRouteProp>();
    const navigation = useNavigation();
    const { showError, showConfirm } = useAlert();
    const { eventId } = route.params;

    const [event, setEvent] = useState<Event | null>(null);
    const [participantsToRate, setParticipantsToRate] = useState<
      ParticipantToRate[]
    >([]);
    const [ratings, setRatings] = useState<Record<string, ParticipantRating>>(
      {}
    );
    const [alreadyRatedUserIds, setAlreadyRatedUserIds] = useState<string[]>(
      []
    );
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isMarking, setIsMarking] = useState(false);

    const fetchData = useCallback(async () => {
      try {
        setIsLoading(true);

        const [eventData, participantsResponse] = await Promise.all([
          eventsApi.getEventDetails(eventId),
          feedbackApi.getParticipantsToRate(eventId),
        ]);

        setEvent(eventData);
        setAlreadyRatedUserIds([]);

        const participantsToRateData = participantsResponse.participants.map(
          p => ({
            id: p.id,
            userId: p.userId,
            name: p.name,
            avatar: p.avatar,
          })
        );

        setParticipantsToRate(participantsToRateData);
      } catch (error) {
        const apiError = error as { status?: number; message?: string };
        showError('Não foi possível carregar os participantes');
        console.error('[RateParticipants] Erro ao carregar:', apiError);
      } finally {
        setIsLoading(false);
      }
    }, [eventId, showError]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

    const updateRating = useCallback(
      (
        userId: string,
        field: 'technical' | 'participation',
        value: number
      ): void => {
        setRatings(prev => ({
          ...prev,
          [userId]: {
            userId,
            technical:
              field === 'technical' ? value : prev[userId]?.technical || 0,
            participation:
              field === 'participation'
                ? value
                : prev[userId]?.participation || 0,
          },
        }));
      },
      []
    );

    const submitRatings = useCallback(async (): Promise<void> => {
      const feedbacks = Object.values(ratings).filter(
        rating => rating.technical > 0 && rating.participation > 0
      );

      if (feedbacks.length === 0) {
        showError('Avalie pelo menos 1 participante');
        return;
      }

      try {
        setIsSaving(true);
        await feedbackApi.createBatch({
          eventId,
          feedbacks: feedbacks.map(rating => ({
            evaluatedUserId: rating.userId,
            technicalSkillRating: rating.technical,
            participationRating: rating.participation,
          })),
        });

        haptic.success();
        navigation.goBack();
      } catch (error) {
        const apiError = error as { status?: number; message?: string };

        if (apiError.status === 403) {
          showError('Você não tem permissão para avaliar este evento');
        } else if (apiError.status === 400) {
          showError(apiError.message || 'Dados de avaliação inválidos');
        } else if (
          apiError.status === 0 ||
          (apiError.status !== undefined && apiError.status >= 500)
        ) {
          showError(
            'Não foi possível salvar. Verifique sua conexão e tente novamente.'
          );
        } else {
          showError('Erro ao salvar avaliações');
        }

        console.error('[RateParticipants] Erro ao salvar:', apiError);
      } finally {
        setIsSaving(false);
      }
    }, [ratings, eventId, navigation, showError]);

    const markAsCompleted = useCallback((): void => {
      showConfirm({
        title: 'Marcar como concluído?',
        message: 'Você não receberá mais notificações sobre este evento.',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        onConfirm: async () => {
          try {
            setIsMarking(true);
            await feedbackApi.markEventAsCompleted(eventId);
            haptic.success();
            navigation.goBack();
          } catch (error) {
            const apiError = error as { status?: number; message?: string };

            if (
              apiError.status === 0 ||
              (apiError.status !== undefined && apiError.status >= 500)
            ) {
              showError(
                'Não foi possível marcar como concluído. Verifique sua conexão.'
              );
            } else {
              showError('Não foi possível marcar como concluído');
            }

            console.error(
              '[RateParticipants] Erro ao marcar como concluído:',
              apiError
            );
          } finally {
            setIsMarking(false);
          }
        },
      });
    }, [eventId, navigation, showConfirm, showError]);

    const progress: RatingProgress = {
      rated:
        alreadyRatedUserIds.length +
        Object.values(ratings).filter(
          r => r.technical > 0 && r.participation > 0
        ).length,
      total: participantsToRate.length + alreadyRatedUserIds.length,
    };

    return {
      event,
      participantsToRate,
      ratings,
      alreadyRatedUserIds,
      isLoading,
      isSaving,
      isMarking,
      updateRating,
      submitRatings,
      markAsCompleted,
      progress,
    };
  };
