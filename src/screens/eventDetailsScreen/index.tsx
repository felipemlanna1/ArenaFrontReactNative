import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { EventHeroSection } from './components/EventHeroSection';
import { EventInfoGrid } from './components/EventInfoGrid';
import { EventOrganizerCard } from './components/EventOrganizerCard';
import { EventDescriptionSection } from './components/EventDescriptionSection';
import { EventParticipantsSection } from './components/EventParticipantsSection';
import { EventActionButton } from './components/EventActionButton';
import { useEventDetailsScreen } from './useEventDetailsScreen';
import { EventDetailsScreenProps } from './typesEventDetailsScreen';
import { styles } from './stylesEventDetailsScreen';

export const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { eventId } = route.params;

  const {
    event,
    isLoading,
    error,
    status,
    shareActions,
    managementActions,
    actionButtonState,
    refresh,
  } = useEventDetailsScreen({
    eventId,
    navigation,
    currentUserId: undefined,
  });

  if (isLoading && !event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <SportsLoading size="lg" />
        </View>
      </SafeAreaView>
    );
  }

  if (error && !event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="bodySecondary" style={styles.errorText}>
            {error.message || 'Erro ao carregar detalhes do evento'}
          </Text>
          <Button variant="primary" onPress={refresh}>
            Tentar Novamente
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  if (!event) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text variant="bodySecondary" style={styles.errorText}>
            Evento não encontrado
          </Text>
          <Button variant="primary" onPress={() => navigation.goBack()}>
            Voltar
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <EventHeroSection
        event={event}
        isOwner={status.isOwner}
        onBackPress={() => navigation.goBack()}
        onSharePress={shareActions.onShare}
        onEditPress={managementActions?.onEdit}
      />

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <ArenaRefreshControl refreshing={isLoading} onRefresh={refresh} />
        }
      >
        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text variant="headingPrimary" style={styles.title}>
              {event.title}
            </Text>
          </View>

          <EventInfoGrid event={event} status={status} />

          <EventOrganizerCard
            event={event}
            isOwner={status.isOwner}
            onPress={() => {}}
          />

          {event.description && (
            <EventDescriptionSection description={event.description} />
          )}

          <EventParticipantsSection event={event} />
        </View>
      </ScrollView>

      <EventActionButton state={actionButtonState} />
    </View>
  );
};
