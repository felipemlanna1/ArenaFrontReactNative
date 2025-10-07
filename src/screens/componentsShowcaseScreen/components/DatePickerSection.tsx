import React, { useState } from 'react';
import { View } from 'react-native';
import { DatePicker } from '@/components/ui/datePicker';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface DatePickerSectionProps {
  onCopyCode: (code: string) => void;
}

export const DatePickerSection: React.FC<DatePickerSectionProps> = ({
  onCopyCode,
}) => {
  const [dateTime, setDateTime] = useState<Date | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<Date | null>(null);

  return (
    <ComponentSection title="Date & Time Selection">
      <ShowcaseItem
        label="Date & Time Picker"
        description="Full datetime picker"
        onCopyCode={onCopyCode}
        code={`import { DatePicker } from '@/components/ui/datePicker';
const [dateTime, setDateTime] = useState<Date | null>(null);

<DatePicker
  label="Data e Hora"
  variant="datetime"
  value={dateTime}
  onChange={setDateTime}
  placeholder="Selecione data e hora"
/>`}
      >
        <View style={styles.verticalStack}>
          <DatePicker
            label="Data e Hora"
            variant="datetime"
            value={dateTime}
            onChange={setDateTime}
            placeholder="Selecione data e hora"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Date Only"
        description="Date picker without time"
        onCopyCode={onCopyCode}
        code={`<DatePicker
  label="Data"
  variant="date"
  value={date}
  onChange={setDate}
  placeholder="DD/MM/AAAA"
/>`}
      >
        <View style={styles.verticalStack}>
          <DatePicker
            label="Data"
            variant="date"
            value={date}
            onChange={setDate}
            placeholder="DD/MM/AAAA"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Time Only"
        description="Time picker without date"
        onCopyCode={onCopyCode}
        code={`<DatePicker
  label="Hora"
  variant="time"
  value={time}
  onChange={setTime}
  placeholder="HH:MM"
/>`}
      >
        <View style={styles.verticalStack}>
          <DatePicker
            label="Hora"
            variant="time"
            value={time}
            onChange={setTime}
            placeholder="HH:MM"
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
