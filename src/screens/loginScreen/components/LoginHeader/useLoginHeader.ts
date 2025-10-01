import { useMemo } from 'react';
import { UseLoginHeaderReturn } from './typesLoginHeader';

export const useLoginHeader = (): UseLoginHeaderReturn => {
  const title = useMemo(() => 'Entrar na Arena', []);

  const subtitle = useMemo(
    () => 'Acesse sua conta para continuar sua jornada esportiva',
    []
  );

  return {
    title,
    subtitle,
  };
};
