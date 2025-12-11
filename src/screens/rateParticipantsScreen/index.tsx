import React from 'react';
import { View, FlatList } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ProgressBar } from '@/components/ui/progressBar';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { EmptyState } from '@/components/ui/emptyState';
import { useRateParticipantsScreen } from './useRateParticipantsScreen';
import { ParticipantRatingCard } from './components/ParticipantRatingCard';
import { styles } from './stylesRateParticipantsScreen';

export const RateParticipantsScreen: React.FC = () => {
  const {
    event,
    participantsToRate,
    ratings,
    alreadyRatedUserIds,
    isLoading,
    isSaving,
    isMarking,
    updateTechnicalRating,
    updateParticipationRating,
    submitRatings,
    markAsCompleted,
    progress,
  } = useRateParticipantsScreen();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <SportsLoading size="lg" animationSpeed="normal" />
      </View>
    );
  }

  if (participantsToRate.length === 0 && alreadyRatedUserIds.length === 0) {
    return (
      <EmptyState
        icon="checkmark-circle-outline"
        title="Nenhum participante"
        message="Não há participantes confirmados neste evento"
      />
    );
  }

  const hasNewRatings = Object.values(ratings).some(
    r => r.technical !== null && r.participation > 0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="titlePrimary">Avaliar Participantes</Text>
        {event && (
          <Text variant="bodySecondary">
            {event.title} • {event.sport.name}
          </Text>
        )}
      </View>

      <View style={styles.progressContainer}>
        <ProgressBar
          progress={(progress.rated / progress.total) * 100}
          showPercentage={false}
        />
        <Text variant="captionSecondary">
          {progress.rated} de {progress.total} avaliados
        </Text>
      </View>

      <FlatList
        data={participantsToRate}
        renderItem={({ item }) => (
          <ParticipantRatingCard
            participant={item}
            technicalRating={ratings[item.userId]?.technical || null}
            participationRating={ratings[item.userId]?.participation || 0}
            onTechnicalChange={value =>
              updateTechnicalRating(item.userId, value)
            }
            onParticipationChange={value =>
              updateParticipationRating(item.userId, value)
            }
            isAlreadyRated={alreadyRatedUserIds.includes(item.userId)}
            testID={`participant-card-${item.userId}`}
          />
        )}
        keyExtractor={item => item.userId}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        {hasNewRatings && (
          <Button
            variant="primary"
            size="lg"
            onPress={submitRatings}
            loading={isSaving}
            fullWidth
          >
            Salvar Avaliações
          </Button>
        )}
        <Button
          variant="secondary"
          size="md"
          onPress={markAsCompleted}
          loading={isMarking}
          fullWidth
        >
          Marcar como Concluído
        </Button>
      </View>
    </View>
  );
};
