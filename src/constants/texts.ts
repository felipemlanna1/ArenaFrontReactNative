export const TEXTS = {
  WELCOME: {
    TITLE_LINES: ['CONECTE, JOGUE, VIVA A ARENA'],
    SUBTITLE:
      'A primeira plataforma que te coloca em movimento. Encontre atletas, crie eventos, forme sua comunidade esportiva.',
    START_BUTTON: 'Começar agora',
    CREATE_ACCOUNT_BUTTON: 'Criar conta',
    ACCESSIBILITY: {
      START_BUTTON: 'Começar agora',
      CREATE_ACCOUNT_BUTTON: 'Criar conta',
      BACKGROUND_IMAGE: 'Imagem de fundo da tela de boas-vindas',
    },
  },

  LOGIN: {
    TITLE: 'Bem-vindo de volta',
    SUBTITLE: 'Faça login para continuar',
    EMAIL_LABEL: 'E-mail',
    PASSWORD_LABEL: 'Senha',
    LOGIN_BUTTON: 'Entrar',
    FORGOT_PASSWORD: 'Esqueci minha senha',
    CREATE_ACCOUNT: 'Criar conta',
  },

  COMMON: {
    LOADING: 'Carregando...',
    ERROR_GENERIC: 'Algo deu errado. Tente novamente.',
    ERROR_NETWORK: 'Verifique sua conexão com a internet',
    TRY_AGAIN: 'Tentar novamente',
    CANCEL: 'Cancelar',
    SAVE: 'Salvar',
    BACK: 'Voltar',
    NEXT: 'Próximo',
    CONFIRM: 'Confirmar',
  },
} as const;

export const WELCOME_TEXTS = TEXTS.WELCOME;
export const LOGIN_TEXTS = TEXTS.LOGIN;
export const COMMON_TEXTS = TEXTS.COMMON;

export type TextsType = typeof TEXTS;
export type WelcomeTextsType = typeof WELCOME_TEXTS;
export type LoginTextsType = typeof LOGIN_TEXTS;
export type CommonTextsType = typeof COMMON_TEXTS;
