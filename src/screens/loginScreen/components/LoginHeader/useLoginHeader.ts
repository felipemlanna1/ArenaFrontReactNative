import { useMemo } from 'react';
import { UseLoginHeaderReturn } from './typesLoginHeader';

export const useLoginHeader = (): UseLoginHeaderReturn => {
  const title = useMemo(() => 'ACESSE sua conta', []);

  const subtitle = useMemo(
    () => 'E faça parte de uma comunidade de atletas',
    []
  );

  return {
    title,
    subtitle,
  };
};
