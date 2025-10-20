export const applyCepMask = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (cleaned.length <= 5) {
    return cleaned;
  }
  return `${cleaned.slice(0, 5)}-${cleaned.slice(5, 8)}`;
};

export const removeMask = (value: string): string => {
  return value.replace(/\D/g, '');
};

export const isCepComplete = (value: string): boolean => {
  const cleaned = removeMask(value);
  return cleaned.length === 8;
};
