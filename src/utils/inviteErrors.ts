import { ApiError } from '@/services/http';

export const getInviteErrorMessage = (error: unknown): string => {
  if (!(error instanceof ApiError)) {
    return 'Não foi possível enviar os convites. Tente novamente.';
  }

  const { status, code, message, data } = error;

  if (status === 400) {
    if (
      code === 'USER_ALREADY_INVITED' ||
      message?.includes('already invited')
    ) {
      return 'Um ou mais usuários já foram convidados anteriormente.';
    }
    if (code === 'USER_ALREADY_MEMBER' || message?.includes('already member')) {
      return 'Um ou mais usuários já são membros deste evento.';
    }
    if (code === 'EVENT_FULL' || message?.includes('full')) {
      return 'O evento atingiu o número máximo de participantes.';
    }
    if (code === 'INVALID_USER_IDS') {
      return 'Um ou mais usuários selecionados são inválidos.';
    }
  }

  if (status === 403) {
    return 'Você não tem permissão para convidar usuários.';
  }

  if (status === 404) {
    return 'Evento ou usuário não encontrado.';
  }

  if (status === 0 || code === 'NETWORK_ERROR') {
    return 'Sem conexão com a internet. Verifique sua rede.';
  }

  if (data && typeof data === 'object' && 'errors' in data) {
    const errors = data.errors as Record<string, string[]>;
    const firstError = Object.values(errors)[0]?.[0];
    if (firstError) {
      return firstError;
    }
  }

  return message || 'Não foi possível enviar os convites. Tente novamente.';
};

export const getInvitationAcceptErrorMessage = (error: unknown): string => {
  if (!(error instanceof ApiError)) {
    return 'Não foi possível aceitar o convite. Tente novamente.';
  }

  const { status, code, message } = error;

  if (status === 400) {
    if (code === 'INVITATION_EXPIRED' || message?.includes('expired')) {
      return 'Este convite expirou. Solicite um novo convite.';
    }
    if (code === 'ALREADY_PARTICIPANT' || message?.includes('already')) {
      return 'Você já é participante deste evento.';
    }
    if (code === 'EVENT_FULL' || message?.includes('full')) {
      return 'O evento atingiu o número máximo de participantes.';
    }
  }

  if (status === 404) {
    return 'Convite não encontrado ou já foi processado.';
  }

  if (status === 0 || code === 'NETWORK_ERROR') {
    return 'Sem conexão com a internet. Verifique sua rede.';
  }

  return message || 'Não foi possível aceitar o convite. Tente novamente.';
};

export const getInvitationRejectErrorMessage = (error: unknown): string => {
  if (!(error instanceof ApiError)) {
    return 'Não foi possível recusar o convite. Tente novamente.';
  }

  const { status, code, message } = error;

  if (status === 404) {
    return 'Convite não encontrado ou já foi processado.';
  }

  if (status === 0 || code === 'NETWORK_ERROR') {
    return 'Sem conexão com a internet. Verifique sua rede.';
  }

  return message || 'Não foi possível recusar o convite. Tente novamente.';
};

export const getLoadInvitableUsersErrorMessage = (error: unknown): string => {
  if (!(error instanceof ApiError)) {
    return 'Não foi possível carregar os usuários. Tente novamente.';
  }

  const { status, code, message } = error;

  if (status === 403) {
    return 'Você não tem permissão para visualizar usuários convidáveis.';
  }

  if (status === 404) {
    return 'Evento ou grupo não encontrado.';
  }

  if (status === 0 || code === 'NETWORK_ERROR') {
    return 'Sem conexão com a internet. Verifique sua rede.';
  }

  return message || 'Não foi possível carregar os usuários. Tente novamente.';
};
