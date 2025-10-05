import { useRef, useMemo } from 'react';

/**
 * Hook personalizado para memoização profunda de objetos
 * Evita re-renders desnecessários causados por JSON.stringify
 */
export const useDeepMemo = <T>(value: T): T => {
  const ref = useRef<T>(value);
  const previousValue = ref.current;

  const isEqual = useMemo(() => {
    return deepEqual(previousValue, value);
  }, [previousValue, value]);

  if (!isEqual) {
    ref.current = value;
  }

  return ref.current;
};

/**
 * Comparação profunda otimizada para objetos de filtro
 * Evita problemas de ordem de propriedades do JSON.stringify
 */
function deepEqual(obj1: unknown, obj2: unknown): boolean {
  if (obj1 === obj2) return true;

  if (obj1 == null || obj2 == null) return obj1 === obj2;

  if (typeof obj1 !== typeof obj2) return false;

  if (typeof obj1 !== 'object') return obj1 === obj2;

  if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) return false;
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) return false;
    }
    return true;
  }

  const keys1 = Object.keys(obj1 as Record<string, unknown>);
  const keys2 = Object.keys(obj2 as Record<string, unknown>);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!(key in (obj2 as Record<string, unknown>))) return false;
    if (
      !deepEqual(
        (obj1 as Record<string, unknown>)[key],
        (obj2 as Record<string, unknown>)[key]
      )
    ) {
      return false;
    }
  }

  return true;
}
