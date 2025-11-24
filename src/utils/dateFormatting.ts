export const formatDateHumanized = (
  date: Date,
  variant: 'date' | 'datetime' | 'time'
): string => {
  if (variant === 'time') {
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  };

  if (variant === 'datetime') {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  const formatted = date.toLocaleDateString('pt-BR', options);

  if (variant === 'datetime') {
    const parts = formatted.split(', ');
    if (parts.length >= 2) {
      const [weekday, dateStr] = parts;
      const timeStr = date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      });
      return `${weekday}, ${dateStr} • ${timeStr}`;
    }
  }

  return formatted;
};

export const getRelativeDateLabel = (date: Date): string => {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Hoje';
  if (diffDays === 1) return 'Amanhã';
  if (diffDays === -1) return 'Ontem';
  if (diffDays > 1 && diffDays <= 7) {
    const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' });
    return `Daqui a ${diffDays} dias (${weekday.charAt(0).toUpperCase() + weekday.slice(1)})`;
  }
  if (diffDays < -1 && diffDays >= -7) {
    return `Há ${Math.abs(diffDays)} dias atrás`;
  }

  return '';
};
