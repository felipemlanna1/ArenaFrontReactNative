/**
 * Arena Copy - Friendly Copy System
 *
 * Centraliza todo copy do app para consistência de tom e voz.
 * Tom: Direct, Motivational, Technical, Friendly, Inclusive
 *
 * SEMPRE importar daqui ao invés de hardcoded strings.
 *
 * @module constants/copy
 */

export const ArenaCopy = {
  /**
   * Empty States - Encouraging, Actionable
   */
  emptyStates: {
    noEvents: {
      title: 'Vamos começar algo incrível! 🎯',
      description:
        'Nenhum evento por aqui ainda. Seja o primeiro a reunir atletas da sua região!',
      primaryAction: 'Criar Primeiro Evento',
      secondaryAction: 'Ajustar Filtros',
      socialProof: '{count} eventos criados esta semana no Brasil',
    },
    noFriends: {
      title: 'Sua crew esportiva te espera!',
      description: 'Participe de eventos para conhecer atletas incríveis da sua área.',
      primaryAction: 'Buscar Eventos',
    },
    noFriendsRecommendations: {
      title: 'Conhece alguém legal por aqui?',
      description: 'Ainda não temos recomendações para você. Participe de mais eventos!',
    },
    noFriendRequests: {
      title: 'Nenhuma solicitação no momento',
      description: 'Quando alguém quiser se conectar, você verá aqui.',
    },
    noPendingRequests: {
      title: 'Nenhuma solicitação pendente',
      description: 'Suas solicitações de amizade aparecerão aqui.',
    },
    noNotifications: {
      title: 'Tudo em dia por aqui! ✓',
      description: 'Volte mais tarde para novidades.',
    },
    noSearchResults: {
      title: 'Hmm, não achamos nada...',
      description: 'Não encontramos jogos de {sport} por perto. Quer criar um?',
      primaryAction: 'Criar Evento de {sport}',
      secondaryAction: 'Mudar Filtros',
    },
    noEventAttendees: {
      title: 'Seja o primeiro a entrar!',
      description: 'Grandes jogos começam em algum lugar. Que tal você?',
    },
    noProfilePhoto: {
      title: 'Mostre sua cara!',
      description: 'Adicione uma foto de perfil para que outros atletas reconheçam você.',
      primaryAction: 'Adicionar Foto',
    },
    noEventsCreated: {
      title: 'Tem um jogo em mente?',
      description: 'Organize seu primeiro evento e reúna atletas para jogar!',
      primaryAction: 'Criar Evento',
    },
    noEventsHistory: {
      title: 'Sua jornada começa aqui!',
      description: 'Quando você participar de eventos, seu histórico aparecerá aqui.',
      primaryAction: 'Explorar Eventos',
    },
    noUpcomingEvents: {
      title: 'Nenhum evento agendado',
      description: 'Que tal marcar um jogo para o fim de semana?',
      primaryAction: 'Buscar Eventos',
    },
    noPastEvents: {
      title: 'Você ainda não jogou nenhum evento',
      description: 'Participe de eventos e crie memórias incríveis!',
    },
    noOrganizedEvents: {
      title: 'Você ainda não criou eventos',
      description: 'Organize jogos e traga atletas juntos!',
      primaryAction: 'Criar Primeiro Evento',
    },
  },

  /**
   * Error Messages - Helpful, Not Blaming
   * Pattern: [O que aconteceu] + [Por quê] + [Como resolver]
   */
  errors: {
    noInternet: {
      title: 'Sem conexão com a internet',
      message: 'Verifique seu Wi-Fi ou dados móveis e tente novamente.',
      action: 'Tentar Novamente',
    },
    loginFailed: {
      title: 'Email ou senha incorretos',
      message: 'Confira seus dados e tente de novo.',
      action: 'Tentar Novamente',
    },
    registrationFailed: {
      title: 'Não foi possível criar sua conta',
      message: '{reason}. Tente novamente.',
      action: 'Tentar Novamente',
    },
    eventFull: {
      title: 'Esse jogo já está lotado!',
      message: 'Mas encontramos {count} eventos similares perto de você. Veja as opções.',
      action: 'Ver Eventos Similares',
      secondaryAction: 'Entrar na Lista de Espera',
    },
    pastDate: {
      title: 'Essa data já passou',
      message: 'Escolha uma data futura para seu evento.',
    },
    invalidDate: {
      title: 'Data inválida',
      message: 'Escolha uma data entre hoje e {maxDate}.',
    },
    serverError: {
      title: 'Algo deu errado aqui',
      message: 'Já estamos resolvendo! Tente em 1 minuto.',
      action: 'Tentar Novamente',
    },
    networkTimeout: {
      title: 'A conexão demorou demais',
      message: 'Verifique sua internet e tente novamente.',
      action: 'Tentar Novamente',
    },
    formValidation: {
      required: 'Este campo é obrigatório',
      emailInvalid: 'Email inválido. Use o formato nome@exemplo.com',
      passwordTooShort: 'Senha muito curta. Use pelo menos {min} caracteres.',
      passwordMismatch: 'As senhas não conferem. Confira e tente novamente.',
      photoTooBig: 'Foto muito grande. Use imagens menores que {maxSize}MB.',
      invalidPhone: 'Telefone inválido. Use o formato (11) 99999-9999.',
    },
    uploadFailed: {
      title: 'Falha no upload da foto',
      message: 'Verifique se a foto tem menos de 5MB e tente novamente.',
      action: 'Tentar Novamente',
    },
    locationDenied: {
      title: 'Localização negada',
      message: 'Permita acesso à localização nas configurações para ver eventos perto de você.',
      action: 'Abrir Configurações',
    },
    cameraPermissionDenied: {
      title: 'Câmera bloqueada',
      message: 'Permita acesso à câmera nas configurações para tirar fotos.',
      action: 'Abrir Configurações',
    },
    notificationsDenied: {
      title: 'Notificações desativadas',
      message: 'Ative notificações para saber quando rolar jogos do seu estilo.',
      action: 'Ativar Notificações',
    },
  },

  /**
   * Success Messages - Celebratory, Not Clinical
   */
  success: {
    eventJoined: 'Você está dentro! Até {date} {emoji}',
    eventJoinedDefault: 'Você está dentro! Até o jogo {emoji}',
    eventLeft: 'Você saiu do evento. Até a próxima!',
    eventCreated: 'Partiu! Seu evento está no ar. Vamos encher essas vagas!',
    eventUpdated: 'Evento atualizado com sucesso!',
    eventDeleted: 'Evento removido.',
    profileUpdated: 'Ficou show! Seu perfil está completo.',
    profilePhotoUpdated: 'Foto atualizada! Você está com boa cara.',
    friendAdded: 'Conexão feita! Você e {name} agora são amigos 👋',
    friendRequestSent: 'Solicitação enviada! Aguarde {name} aceitar.',
    friendRequestAccepted: '{name} aceitou sua solicitação! Vocês são amigos agora 🎉',
    friendRemoved: 'Você e {name} não são mais amigos.',
    passwordChanged: 'Tudo certo! Sua nova senha está salva.',
    passwordResetSent: 'Email enviado! Confira sua caixa de entrada para redefinir a senha.',
    photoUploaded: 'Perfeito! Sua foto está no ar.',
    messagesSent: 'Mensagem enviada!',
    reviewSubmitted: 'Avaliação enviada! Obrigado pelo feedback.',
    reportSubmitted: 'Denúncia enviada. Vamos analisar em breve.',
    achievementUnlocked: 'Conquista Desbloqueada: {name}! 🏆',
    levelUp: 'Level Up! Você agora é {level} ⭐',
    streakMaintained: 'Streak mantido! 🔥 {days} dias consecutivos.',
    profileComplete: 'Perfil 100% completo! 🎉 Você desbloqueou recursos premium.',
  },

  /**
   * Onboarding - Conversational, Not Robotic
   */
  onboarding: {
    welcome: {
      title: 'Bem-vindo ao Arena!',
      subtitle: 'Vamos encontrar seu jogo perfeito.',
      primaryAction: 'Começar',
    },
    sports: {
      title: 'O que você adora jogar?',
      subtitle: 'Escolha todos que quiser. Dá pra mudar depois!',
      primaryAction: 'Continuar',
      skipAction: 'Pular por enquanto',
    },
    location: {
      title: 'Onde você costuma jogar?',
      subtitle: 'Vamos mostrar jogos perto de você primeiro.',
      primaryAction: 'Usar Minha Localização',
      secondaryAction: 'Digitar Manualmente',
    },
    notifications: {
      title: 'Quer saber quando rolar jogos do seu estilo?',
      subtitle: 'Você pode mudar isso depois nas configurações.',
      primaryAction: 'Sim, Me Avise!',
      secondaryAction: 'Agora Não',
    },
    complete: {
      title: 'Tudo pronto! 🎉',
      subtitle: 'Vamos explorar eventos na sua área e começar a jogar!',
      primaryAction: 'Explorar Eventos',
    },
  },

  /**
   * UI Elements - Personality in Microcopy
   */
  ui: {
    pullToRefresh: {
      idle: 'Puxe para atualizar',
      pulling: 'Puxe para atualizar',
      release: 'Solte para atualizar',
      refreshing: 'Encontrando jogos frescos...',
      success: 'Atualizado agora',
    },
    loading: {
      events: 'Verificando a agenda...',
      profile: 'Carregando perfil...',
      friends: 'Buscando seus amigos...',
      creating: 'Montando seu jogo...',
      saving: 'Salvando...',
      uploading: 'Enviando foto...',
      joining: 'Confirmando...',
      default: 'Carregando...',
    },
    offline: {
      title: 'Você está offline',
      message: 'Vamos sincronizar assim que você voltar online.',
    },
    filter: {
      applied: 'Filtros aplicados',
      resultsCount: 'Encontramos {count} {count, plural, one {jogo} other {jogos}} para você!',
      noResults: 'Nenhum jogo com esses filtros. Tente ajustar!',
    },
    search: {
      placeholder: 'Buscar por nome ou esporte',
      searching: 'Procurando...',
      noResults: 'Nenhum resultado para "{query}"',
      resultsCount: '{count} {count, plural, one {resultado} other {resultados}}',
    },
    profileViews: {
      single: 'Seu perfil foi visto {count} vez esta semana 👀',
      multiple: 'Seu perfil foi visto {count} vezes esta semana 👀',
    },
    streakReminder: {
      title: 'Não perca seu streak de {days} dias! 🔥',
      message: 'Participe de um jogo rápido amanhã para manter.',
      action: 'Ver Jogos',
    },
  },

  /**
   * Social Features
   */
  social: {
    mutualFriends: {
      single: '{count} amigo em comum',
      multiple: '{count} amigos em comum',
      withNames: 'Amigos de {name}',
      withNamesMultiple: 'Amigos de {name1} e mais {count}',
    },
    eventAttendees: {
      none: 'Seja o primeiro a entrar!',
      single: '{count} atleta confirmado',
      multiple: '{count} atletas confirmados',
      withFriends: '{count} atletas · {friendsCount} {friendsCount, plural, one {amigo} other {amigos}}',
    },
    eventActivity: {
      joined: '{name} entrou neste evento',
      left: '{name} saiu deste evento',
      created: '{name} criou este evento',
      updated: 'Evento atualizado pelo organizador',
    },
    friendActivity: {
      joinedEvent: '{name} entrou em "{eventName}"',
      createdEvent: '{name} criou "{eventName}"',
      earnedBadge: '{name} desbloqueou "{badgeName}"',
      leveledUp: '{name} subiu para {level}',
    },
  },

  /**
   * Event Details
   */
  event: {
    spots: {
      available: '{count} {count, plural, one {vaga disponível} other {vagas disponíveis}}',
      almostFull: 'Só {count} {count, plural, one {vaga} other {vagas}}! 🔥',
      full: 'Lotado',
      waitlist: 'Lista de espera: {count}',
    },
    time: {
      today: 'Hoje',
      tomorrow: 'Amanhã',
      inDays: 'Em {count} {count, plural, one {dia} other {dias}}',
      thisWeekend: 'Este fim de semana',
      nextWeekend: 'Próximo fim de semana',
    },
    actions: {
      join: 'Entrar no Jogo',
      leave: 'Sair do Evento',
      edit: 'Editar Evento',
      delete: 'Remover Evento',
      share: 'Compartilhar',
      report: 'Denunciar',
      waitlist: 'Entrar na Lista',
    },
    status: {
      upcoming: 'Próximo',
      ongoing: 'Acontecendo agora',
      past: 'Passado',
      cancelled: 'Cancelado',
    },
  },

  /**
   * Achievements & Gamification
   */
  achievements: {
    unlocked: 'Conquista Desbloqueada!',
    progress: '{current} de {total}',
    viewAll: 'Ver Todas ({count})',
    locked: 'Trancada',
    categories: {
      sports: 'Esportes',
      social: 'Social',
      streak: 'Streaks',
      creator: 'Organizador',
    },
  },

  /**
   * Streaks
   */
  streaks: {
    current: '{days} {days, plural, one {dia} other {dias}} ativo!',
    maintain: 'Continue para manter seu streak!',
    broken: 'Streak perdido. Comece de novo!',
    freeze: 'Você tem {count} {count, plural, one {freeze disponível} other {freezes disponíveis}}',
    freezeUsed: 'Freeze usado! Seu streak está protegido.',
  },

  /**
   * Levels
   */
  levels: {
    rookie: 'Rookie',
    beginner: 'Iniciante',
    intermediate: 'Intermediário',
    advanced: 'Avançado',
    proAthlete: 'Atleta Pro',
    legend: 'Lenda Arena',
    progress: '{current}/{total} eventos até {nextLevel}',
    levelUp: 'Você subiu de nível!',
  },

  /**
   * Validation Messages
   */
  validation: {
    email: {
      required: 'Precisamos do seu email para enviar atualizações do evento.',
      invalid: 'Email inválido. Use o formato nome@exemplo.com',
    },
    password: {
      required: 'Crie uma senha para proteger sua conta.',
      tooShort: 'Senha muito curta. Use pelo menos 8 caracteres.',
      weak: 'Senha fraca. Adicione números ou símbolos.',
    },
    name: {
      required: 'Como devemos te chamar?',
      tooShort: 'Nome muito curto. Use pelo menos 3 caracteres.',
    },
    eventName: {
      required: 'Dê um nome para seu evento!',
      tooShort: 'Nome muito curto. Seja mais específico!',
    },
    date: {
      required: 'Quando vai rolar o jogo?',
      past: 'Escolha uma data futura.',
    },
    location: {
      required: 'Onde vai ser o jogo?',
    },
  },

  /**
   * Accessibility Labels
   */
  a11y: {
    buttons: {
      close: 'Fechar',
      back: 'Voltar',
      menu: 'Menu',
      search: 'Buscar',
      filter: 'Filtrar',
      share: 'Compartilhar',
      like: 'Curtir',
      bookmark: 'Salvar',
      settings: 'Configurações',
      notifications: 'Notificações',
      profile: 'Perfil',
    },
    images: {
      profilePhoto: 'Foto de perfil de {name}',
      eventImage: 'Imagem do evento {eventName}',
      achievementBadge: 'Conquista {badgeName}',
    },
  },
} as const;

/**
 * Helper para formatar copy com variáveis
 *
 * Exemplo:
 * formatCopy(ArenaCopy.success.friendAdded, { name: 'João' })
 * → "Conexão feita! Você e João agora são amigos 👋"
 */
export const formatCopy = (
  template: string,
  variables?: Record<string, string | number>
): string => {
  if (!variables) return template;

  return Object.keys(variables).reduce((result, key) => {
    const value = variables[key];
    return result.replace(new RegExp(`{${key}}`, 'g'), String(value));
  }, template);
};

/**
 * Helper para copy com pluralização
 *
 * Exemplo:
 * pluralize(3, 'evento', 'eventos')
 * → "eventos"
 */
export const pluralize = (
  count: number,
  singular: string,
  plural: string
): string => {
  return count === 1 ? singular : plural;
};

/**
 * Helper para copy com contagem
 *
 * Exemplo:
 * formatCount(3, 'atleta', 'atletas')
 * → "3 atletas"
 */
export const formatCount = (
  count: number,
  singular: string,
  plural: string
): string => {
  return `${count} ${pluralize(count, singular, plural)}`;
};
