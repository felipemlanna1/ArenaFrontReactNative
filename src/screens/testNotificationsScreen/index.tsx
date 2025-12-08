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
import { styles } from './stylesTestNotificationsScreen';

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
        <Text variant="titlePrimary">Notificações de Eventos</Text>

        <Button variant="primary" onPress={testEventInviteNotification}>
          ⚽ Convite para Evento
        </Button>

        <Button variant="secondary" onPress={testNewParticipantNotification}>
          🏀 Novo Participante
        </Button>

        <Button variant="secondary" onPress={testEventStartingSoonNotification}>
          🏐 Evento Começando
        </Button>

        <Button variant="secondary" onPress={testCheckInConfirmedNotification}>
          ✅ Check-in Confirmado
        </Button>
      </View>

      <View style={styles.section}>
        <Text variant="titlePrimary">Notificações Sociais</Text>

        <Button variant="secondary" onPress={testFriendRequestNotification}>
          👋 Solicitação de Amizade
        </Button>
      </View>

      <View style={styles.section}>
        <Text variant="titlePrimary">Teste em Massa</Text>

        <Button variant="primary" onPress={testAllNotifications}>
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
