import React from 'react';
import { View } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { ProgressBar } from '@/components/ui/progressBar';
import { ArenaColors } from '@/constants';
import { EventInfoGridProps } from './typesEventInfoGrid';
import { styles } from './stylesEventInfoGrid';

export const EventInfoGrid: React.FC<EventInfoGridProps> = ({
  event,
  status,
}) => {
  const formattedDate = format(new Date(event.startDate), "dd 'de' MMMM", {
    locale: ptBR,
  });
  const formattedTime = format(new Date(event.startDate), 'HH:mm', {
    locale: ptBR,
  });

  const location = `${event.location.city}, ${event.location.state}`;

  const price = event.isFree
    ? 'Gratuito'
    : `R$ ${
        typeof event.price === 'number' ? event.price.toFixed(2) : event.price
      }`;

  const isTrulyFull =
    status.availableSpots === 0 && event.currentParticipants > 0;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.item}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color={ArenaColors.brand.primary}
            style={styles.icon}
          />
          <View style={styles.content}>
            <Text variant="captionSecondary" style={styles.label}>
              Data
            </Text>
            <Text variant="bodyPrimary" style={styles.value}>
              {formattedDate}
            </Text>
            <Text variant="captionSecondary" style={styles.valueSecondary}>
              {formattedTime}
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="location-outline"
            size={20}
            color={ArenaColors.brand.primary}
            style={styles.icon}
          />
          <View style={styles.content}>
            <Text variant="captionSecondary" style={styles.label}>
              Local
            </Text>
            <Text variant="bodyPrimary" style={styles.value} numberOfLines={2}>
              {location}
            </Text>
            {event.location.referencePoint && (
              <Text variant="captionSecondary" style={styles.valueSecondary}>
                {event.location.referencePoint}
              </Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.item}>
          <Ionicons
            name="cash-outline"
            size={20}
            color={ArenaColors.brand.primary}
            style={styles.icon}
          />
          <View style={styles.content}>
            <Text variant="captionSecondary" style={styles.label}>
              Preço
            </Text>
            <Text variant="bodyPrimary" style={styles.value}>
              {price}
            </Text>
          </View>
        </View>

        <View style={styles.item}>
          <Ionicons
            name="people-outline"
            size={20}
            color={ArenaColors.brand.primary}
            style={styles.icon}
          />
          <View style={styles.content}>
            <Text variant="captionSecondary" style={styles.label}>
              Vagas
            </Text>

            {isTrulyFull ? (
              <>
                <View style={styles.fullBadge}>
                  <Text variant="captionSecondary" style={styles.fullBadgeText}>
                    LOTADO
                  </Text>
                </View>
                <Text variant="captionSecondary" style={styles.spotsText}>
                  {event.currentParticipants}/{event.maxParticipants}
                </Text>
              </>
            ) : (
              <>
                <Text variant="bodyPrimary" style={styles.value}>
                  {status.availableSpots === 0
                    ? 'Sem vagas'
                    : `${status.availableSpots} ${
                        status.availableSpots === 1 ? 'vaga' : 'vagas'
                      }`}
                </Text>
                {event.maxParticipants > 0 && (
                  <>
                    <View style={styles.progressContainer}>
                      <ProgressBar
                        progress={status.spotsProgress}
                        height={4}
                        showPercentage={false}
                      />
                    </View>
                    <Text variant="captionSecondary" style={styles.spotsText}>
                      {event.currentParticipants}/{event.maxParticipants}
                    </Text>
                  </>
                )}
              </>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
