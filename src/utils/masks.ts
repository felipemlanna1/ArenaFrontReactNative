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

export const applyCurrencyMask = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  if (!cleaned) return 'R$ 0,00';

  const number = parseInt(cleaned, 10);
  const cents = number % 100;
  const reais = Math.floor(number / 100);

  const formattedCents = cents.toString().padStart(2, '0');
  const formattedReais = reais.toLocaleString('pt-BR');

  return `R$ ${formattedReais},${formattedCents}`;
};

export const parseCurrency = (masked: string): number => {
  const cleaned = masked.replace(/[^\d,]/g, '');
  const normalized = cleaned.replace(',', '.');
  return parseFloat(normalized) || 0;
};
