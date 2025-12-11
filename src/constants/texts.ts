export const TEXTS = {
  WELCOME: {
    TITLE_LINES: ['CONECTE,', 'JOGUE,', 'VIVA A ARENA'],
    SUBTITLE:
      'A primeira plataforma que te coloca em movimento. Encontre atletas, crie eventos, forme sua comunidade esportiva.',
    START_BUTTON: 'COMEÇAR AGORA',
    CREATE_ACCOUNT_BUTTON: 'CRIAR CONTA',
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

  REGISTER: {
    TERMS_PREFIX: 'Ao me cadastrar, eu aceito os',
    TERMS_LINK: 'Termos de Uso',
    TERMS_SEPARATOR: 'e',
    PRIVACY_LINK: 'Política de Privacidade',
    TERMS_SUFFIX: 'da Arena',
  },

  FORGOT_PASSWORD: {
    TITLE: 'Recuperar senha',
    SUBTITLE: 'Digite seu e-mail para receber o código de recuperação',
    EMAIL_LABEL: 'E-mail',
    EMAIL_PLACEHOLDER: 'Digite seu e-mail',
    SEND_BUTTON: 'Enviar código',
    BACK_TO_LOGIN: 'Voltar ao login',
    SUCCESS_MESSAGE: 'Código enviado com sucesso!',
    ERRORS: {
      EMAIL_REQUIRED: 'E-mail é obrigatório',
      EMAIL_INVALID: 'E-mail inválido',
      RATE_LIMIT: 'Aguarde 1 minuto para tentar novamente',
      NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
      GENERIC_ERROR: 'Erro ao enviar código. Tente novamente.',
    },
  },

  VERIFY_CODE: {
    TITLE: 'Verificar código',
    SUBTITLE: 'Digite o código de 6 dígitos enviado para',
    CODE_LABEL: 'Código',
    CODE_PLACEHOLDER: '000000',
    VERIFY_BUTTON: 'Verificar código',
    RESEND_BUTTON: 'Reenviar código',
    RESEND_AVAILABLE_IN: 'Reenviar em',
    TIMER_TEXT: 'Código expira em',
    CODE_EXPIRED: 'Código expirado',
    SUCCESS_MESSAGE: 'Código verificado com sucesso!',
    RESEND_SUCCESS: 'Novo código enviado!',
    ERRORS: {
      CODE_REQUIRED: 'Digite o código',
      CODE_INVALID: 'Código inválido ou expirado',
      CODE_LENGTH: 'O código deve ter 6 dígitos',
      NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
      GENERIC_ERROR: 'Erro ao verificar código. Tente novamente.',
      RESEND_ERROR: 'Erro ao reenviar código. Tente novamente.',
    },
  },

  RESET_PASSWORD: {
    TITLE: 'Nova senha',
    SUBTITLE: 'Crie uma senha forte para sua conta',
    PASSWORD_LABEL: 'Nova senha',
    PASSWORD_PLACEHOLDER: 'Digite sua nova senha',
    CONFIRM_PASSWORD_LABEL: 'Confirmar senha',
    CONFIRM_PASSWORD_PLACEHOLDER: 'Digite novamente sua senha',
    RESET_BUTTON: 'Redefinir senha',
    BACK_TO_LOGIN: 'Voltar ao login',
    SUCCESS_MESSAGE: 'Senha redefinida com sucesso!',
    REDIRECTING: 'Redirecionando para o login...',
    REQUIREMENTS_TITLE: 'Sua senha deve ter:',
    REQUIREMENTS: {
      MIN_LENGTH: 'Mínimo 8 caracteres',
      UPPERCASE: 'Pelo menos 1 letra maiúscula',
      LOWERCASE: 'Pelo menos 1 letra minúscula',
      NUMBER: 'Pelo menos 1 número',
      SPECIAL_CHAR: 'Pelo menos 1 caractere especial (@$!%*?&)',
    },
    STRENGTH: {
      WEAK: 'Fraca',
      MEDIUM: 'Média',
      GOOD: 'Boa',
      STRONG: 'Forte',
    },
    ERRORS: {
      PASSWORD_REQUIRED: 'Senha é obrigatória',
      PASSWORD_WEAK: 'Senha não atende aos requisitos',
      CONFIRM_PASSWORD_REQUIRED: 'Confirmação de senha é obrigatória',
      PASSWORD_MISMATCH: 'As senhas não coincidem',
      TOKEN_INVALID: 'Link inválido ou expirado',
      NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
      GENERIC_ERROR: 'Erro ao redefinir senha. Tente novamente.',
    },
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
export const REGISTER_TEXTS = TEXTS.REGISTER;
export const FORGOT_PASSWORD_TEXTS = TEXTS.FORGOT_PASSWORD;
export const VERIFY_CODE_TEXTS = TEXTS.VERIFY_CODE;
export const RESET_PASSWORD_TEXTS = TEXTS.RESET_PASSWORD;
export const COMMON_TEXTS = TEXTS.COMMON;

export type TextsType = typeof TEXTS;
export type WelcomeTextsType = typeof WELCOME_TEXTS;
export type LoginTextsType = typeof LOGIN_TEXTS;
export type RegisterTextsType = typeof REGISTER_TEXTS;
export type ForgotPasswordTextsType = typeof FORGOT_PASSWORD_TEXTS;
export type VerifyCodeTextsType = typeof VERIFY_CODE_TEXTS;
export type ResetPasswordTextsType = typeof RESET_PASSWORD_TEXTS;
export type CommonTextsType = typeof COMMON_TEXTS;
