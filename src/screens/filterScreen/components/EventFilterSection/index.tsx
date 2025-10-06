import React from 'react';
import { View } from 'react-native';
import { RadioButton } from '@/components/ui/radioButton';
import { styles } from './stylesEventFilterSection';

interface EventFilterSectionProps {
  value: 'all' | 'organizing' | 'participating' | 'invited';
  onChange: (value: 'all' | 'organizing' | 'participating' | 'invited') => void;
}

const EVENT_FILTER_OPTIONS = [
  { value: 'all' as const, label: 'Todos os eventos' },
  { value: 'organizing' as const, label: 'Eventos que organizo' },
  { value: 'participating' as const, label: 'Eventos que participo' },
  { value: 'invited' as const, label: 'Eventos que fui convidado' },
];

export const EventFilterSection: React.FC<EventFilterSectionProps> = ({
  value,
  onChange,
}) => {
  return (
    <View style={styles.container}>
      {EVENT_FILTER_OPTIONS.map(option => (
        <RadioButton
          key={option.value}
          label={option.label}
          selected={value === option.value}
          onPress={() => onChange(option.value)}
        />
      ))}
    </View>
  );
};
