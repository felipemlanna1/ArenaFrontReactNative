import React, { useState, useCallback } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { Fab } from '@/components/ui/fab';
import { InviteUsersModal } from '@/components/ui/inviteUsersModal';
import { AppLayout } from '@/components/AppLayout';
import { EventHeroSection } from './components/EventHeroSection';
import { EventInfoGrid } from './components/EventInfoGrid';
import { EventOrganizerCard } from './components/EventOrganizerCard';
import { EventDescriptionSection } from './components/EventDescriptionSection';
import { EventParticipantsSection } from './components/EventParticipantsSection';
import { EventActionButton } from './components/EventActionButton';
import { EventRequirementsSection } from './components/EventRequirementsSection';
import { EventRulesSection } from './components/EventRulesSection';
import { useEventDetailsScreen } from './useEventDetailsScreen';
import { EventDetailsScreenProps } from './typesEventDetailsScreen';
import { styles } from './stylesEventDetailsScreen';
import { ArenaColors } from '@/constants';
import { useAuth } from '@/contexts/AuthContext';

export const EventDetailsScreen: React.FC<EventDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { eventId } = route.params;
  const { user } = useAuth();
  const [showInviteModal, setShowInviteModal] = useState(false);

  const {
    event,
    isLoading,
    error,
    status,
    shareActions,
    actionButtonState,
    refresh,
  } = useEventDetailsScreen({
    eventId,
    navigation,
    currentUserId: user?.id,
  });

  const handleInviteParticipants = useCallback(
    async (userIds: string[], message?: string) => {
      const { eventsApi } = await import('@/services/events/eventsApi');
      await eventsApi.inviteParticipants(eventId, userIds, message);
      refresh();
    },
    [eventId, refresh]
  );

  if (isLoading && !event) {
    return (
      <AppLayout>
        <SafeAreaView style={styles.container}>
          <View style={styles.loadingContainer}>
            <SportsLoading size="lg" />
          </View>
        </SafeAreaView>
      </AppLayout>
    );
  }

  if (error && !event) {
    return (
      <AppLayout>
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
      </AppLayout>
    );
  }

  if (!event) {
    return (
      <AppLayout>
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
      </AppLayout>
    );
  }

  return (
    <AppLayout
      showHeader={true}
      headerVariant="mainWithBack"
      headerShowLogo={true}
      headerShowBackButton={true}
      headerOnBackPress={() => navigation.goBack()}
      headerRightActions={
        status.isOwner
          ? [
              {
                icon: 'share-outline',
                onPress: shareActions.onShare,
              },
            ]
          : undefined
      }
    >
      <View style={styles.container}>
        <EventHeroSection
          event={event}
          userStatus={status.isParticipant ? 'confirmed' : null}
        />

        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            <View style={styles.titleSection}>
              {event.sport?.name ? (
                <View style={styles.titleRow}>
                  <Text
                    variant="headingPrimary"
                    style={[styles.title, styles.sportName]}
                  >
                    {event.sport.name}
                  </Text>
                  <Text variant="headingPrimary" style={styles.title}>
                    {' - '}
                  </Text>
                  <Text variant="headingPrimary" style={styles.title}>
                    {event.title}
                  </Text>
                </View>
              ) : (
                <Text variant="headingPrimary" style={styles.title}>
                  {event.title}
                </Text>
              )}
            </View>

            <EventInfoGrid event={event} status={status} />

            {event.description && (
              <EventDescriptionSection description={event.description} />
            )}

            {event.requirements && (
              <EventRequirementsSection requirements={event.requirements} />
            )}

            {event.rules && <EventRulesSection rules={event.rules} />}

            <EventParticipantsSection
              event={event}
              isOwner={status.isOwner}
              onRefresh={refresh}
            />

            <EventOrganizerCard
              event={event}
              isOwner={status.isOwner}
              onPress={() => {
                const organizerId = event.organizerId || event.organizer?.id;
                if (organizerId) {
                  navigation.navigate('Profile', { userId: organizerId });
                }
              }}
            />

            {(status.isOwner || event.ownerIds?.includes(user?.id || '')) && (
              <View style={styles.inviteContainer}>
                <Button
                  variant="secondary"
                  size="md"
                  onPress={() => setShowInviteModal(true)}
                  fullWidth
                >
                  Convidar Participantes
                </Button>
              </View>
            )}
          </View>
        </ScrollView>

        {!status.isOwner && <EventActionButton state={actionButtonState} />}

        {status.isOwner && (
          <Fab
            variant="primary"
            size="md"
            position="bottom-right"
            icon={
              <Ionicons
                name="create-outline"
                size={24}
                color={ArenaColors.neutral.light}
              />
            }
            onPress={() => {
              navigation.navigate('CreateEvent', {
                mode: 'edit',
                eventId: event.id,
                eventData: event,
              });
            }}
            testID="edit-event-fab"
          />
        )}

        <InviteUsersModal
          visible={showInviteModal}
          onClose={() => setShowInviteModal(false)}
          onInvite={handleInviteParticipants}
          title="Convidar para o Evento"
          availableSlots={
            event.maxParticipants - (event.currentParticipants || 0)
          }
          entityType="event"
          entityId={eventId}
        />
      </View>
    </AppLayout>
  );
};
