import * as Notifications from 'expo-notifications';

export const testEventInviteNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('Permissão de notificação negada!');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⚽ Convite para Pelada",
      body: "João te convidou para Pelada de Sábado às 14h no Campo do Zé",
      data: {
        entityType: 'event',
        entityId: 'event-123',
        inviterId: 'user-456'
      },
      sound: true,
      badge: 1,
    },
    trigger: { seconds: 2 },
  });

  alert('Notificação de convite agendada! Aguarde 2 segundos...');
};

export const testNewParticipantNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('Permissão negada!');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🏀 Novo Participante",
      body: "Maria confirmou presença em 'Basquete na Quadra'",
      data: {
        entityType: 'event',
        entityId: 'event-789',
        userId: 'user-321'
      },
      sound: true,
    },
    trigger: null,
  });

  alert('Notificação enviada imediatamente!');
};

export const testEventStartingSoonNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🏐 Seu Evento Começa em 15min!",
      body: "Vôlei de Praia na Orla - Não se esqueça de fazer check-in",
      data: {
        entityType: 'event',
        entityId: 'event-999',
        action: 'check-in'
      },
      sound: true,
    },
    trigger: { seconds: 3 },
  });

  alert('Notificação de evento começando agendada para 3s!');
};

export const testCheckInConfirmedNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "✅ Check-in Confirmado",
      body: "Você fez check-in em 'Futebol Society'. Boa partida!",
      data: {
        entityType: 'event',
        entityId: 'event-555',
        action: 'check-in-confirmed'
      },
      sound: true,
    },
    trigger: null,
  });
};

export const testFriendRequestNotification = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "👋 Nova Solicitação de Amizade",
      body: "Pedro quer ser seu amigo no Arena",
      data: {
        entityType: 'user',
        entityId: 'user-888',
        action: 'friend-request'
      },
      sound: true,
    },
    trigger: { seconds: 1 },
  });
};

export const testAllNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    alert('Permissão negada!');
    return;
  }

  const notifications = [
    {
      title: "⚽ Convite para Pelada",
      body: "João te convidou para jogar amanhã",
      delay: 1,
    },
    {
      title: "🏀 Novo Participante",
      body: "Maria entrou no seu evento",
      delay: 3,
    },
    {
      title: "💬 Nova Mensagem",
      body: "Pedro: 'Vou chegar 10min atrasado'",
      delay: 5,
    },
    {
      title: "🏐 Evento Começando",
      body: "Seu evento começa em 15 minutos!",
      delay: 7,
    },
    {
      title: "✅ Check-in Confirmado",
      body: "Você fez check-in com sucesso!",
      delay: 9,
    },
  ];

  for (const notif of notifications) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notif.title,
        body: notif.body,
        sound: true,
      },
      trigger: { seconds: notif.delay },
    });
  }

  alert('5 notificações agendadas! Aguarde...');
};
