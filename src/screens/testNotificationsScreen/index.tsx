import React from 'react';
import { View, ScrollView } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {
  testEventInviteNotification,
  testNewParticipantNotification,
  testEventStartingSoonNotification,
  testCheckInConfirmedNotification,
  testFriendRequestNotification,
  testAllNotifications,
} from '@/utils/testNotifications';
import { styles } from './styles';

export const TestNotificationsScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="headingPrimary" style={styles.title}>
        Testar Notificações Locais
      </Text>

      <Text variant="bodySecondary" style={styles.description}>
        Estas notificações funcionam no emulador e dispositivo real
      </Text>

      <View style={styles.section}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Notificações de Eventos
        </Text>

        <Button
          variant="primary"
          onPress={testEventInviteNotification}
          style={styles.button}
        >
          ⚽ Convite para Evento
        </Button>

        <Button
          variant="secondary"
          onPress={testNewParticipantNotification}
          style={styles.button}
        >
          🏀 Novo Participante
        </Button>

        <Button
          variant="secondary"
          onPress={testEventStartingSoonNotification}
          style={styles.button}
        >
          🏐 Evento Começando
        </Button>

        <Button
          variant="secondary"
          onPress={testCheckInConfirmedNotification}
          style={styles.button}
        >
          ✅ Check-in Confirmado
        </Button>
      </View>

      <View style={styles.section}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Notificações Sociais
        </Text>

        <Button
          variant="secondary"
          onPress={testFriendRequestNotification}
          style={styles.button}
        >
          👋 Solicitação de Amizade
        </Button>
      </View>

      <View style={styles.section}>
        <Text variant="titlePrimary" style={styles.sectionTitle}>
          Teste em Massa
        </Text>

        <Button
          variant="primary"
          onPress={testAllNotifications}
          style={styles.button}
        >
          🔔 Enviar Todas (5 notificações)
        </Button>
      </View>

      <Text variant="captionSecondary" style={styles.note}>
        Nota: Para testar PUSH notifications reais (do backend), use o botão
        &quot;Enviar Teste&quot; nas Configurações de Notificações (requer
        dispositivo real).
      </Text>
    </ScrollView>
  );
};
