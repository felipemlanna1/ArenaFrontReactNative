import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckboxGroup } from '@/components/ui/checkboxGroup';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from './stylesCheckboxSection';

interface CheckboxSectionProps {
  onCopyCode: (code: string) => void;
}

export const CheckboxSection: React.FC<CheckboxSectionProps> = ({
  onCopyCode,
}) => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [checked3, setChecked3] = useState(false);
  const [checked4, setChecked4] = useState(false);
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [level, setLevel] = useState<string>('');
  const [preferences, setPreferences] = useState<string[]>([]);

  const BASIC_CODE = `import { Checkbox } from '@/components/ui/checkbox';

const [checked, setChecked] = useState(false);

<Checkbox
  checked={checked}
  onPress={() => setChecked(!checked)}
  label="Aceito os termos de uso"
/>`;

  const VARIANTS_CODE = `<Checkbox variant="default" checked={checked} onPress={toggle} label="Default" />
<Checkbox variant="primary" checked={checked} onPress={toggle} label="Primary" />
<Checkbox variant="secondary" checked={checked} onPress={toggle} label="Secondary" />`;

  const SIZES_CODE = `<Checkbox size="sm" checked={checked} onPress={toggle} label="Small" />
<Checkbox size="md" checked={checked} onPress={toggle} label="Medium" />
<Checkbox size="lg" checked={checked} onPress={toggle} label="Large" />`;

  const STATES_CODE = `<Checkbox checked={true} onPress={toggle} label="Checked" />
<Checkbox checked={false} onPress={toggle} label="Unchecked" />
<Checkbox checked={true} disabled label="Disabled Checked" />
<Checkbox checked={false} disabled label="Disabled Unchecked" />`;

  const GROUP_MULTI_CODE = `import { CheckboxGroup } from '@/components/ui/checkboxGroup';

const [hobbies, setHobbies] = useState<string[]>([]);

<CheckboxGroup
  options={[
    { value: 'leitura', label: 'Leitura' },
    { value: 'musica', label: 'Música' },
    { value: 'games', label: 'Games' },
    { value: 'cinema', label: 'Cinema' },
  ]}
  value={hobbies}
  onChange={setHobbies}
  label="Selecione seus hobbies"
  helperText="Você pode escolher quantos quiser"
/>`;

  const GROUP_SINGLE_CODE = `import { CheckboxGroup } from '@/components/ui/checkboxGroup';

const [level, setLevel] = useState<string>('');

<CheckboxGroup
  multiSelect={false}
  options={[
    { value: 'iniciante', label: 'Iniciante' },
    { value: 'intermediario', label: 'Intermediário' },
    { value: 'avancado', label: 'Avançado' },
    { value: 'expert', label: 'Expert' },
  ]}
  value={level}
  onChange={setLevel}
  label="Qual é o seu nível?"
/>`;

  const CARD_VARIANT_CODE = `import { CheckboxGroup } from '@/components/ui/checkboxGroup';

const [preferences, setPreferences] = useState<string[]>([]);

<CheckboxGroup
  variant="card"
  columns={2}
  multiSelect={true}
  options={[
    { value: 'manha', label: 'Manhã' },
    { value: 'tarde', label: 'Tarde' },
    { value: 'noite', label: 'Noite' },
    { value: 'madrugada', label: 'Madrugada' },
  ]}
  value={preferences}
  onChange={setPreferences}
  label="Preferência de horário"
/>`;

  return (
    <ComponentSection title="Checkbox">
      <ShowcaseItem
        label="Checkbox Básico"
        description="Checkbox para seleção com label"
        onCopyCode={onCopyCode}
        code={BASIC_CODE}
      >
        <Checkbox
          checked={checked1}
          onPress={() => setChecked1(!checked1)}
          label="Aceito os termos de uso"
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Variantes"
        description="Três variantes de cores disponíveis"
        onCopyCode={onCopyCode}
        code={VARIANTS_CODE}
      >
        <View style={styles.container}>
          <Checkbox
            variant="default"
            checked={checked1}
            onPress={() => setChecked1(!checked1)}
            label="Default variant"
          />
          <Checkbox
            variant="primary"
            checked={checked2}
            onPress={() => setChecked2(!checked2)}
            label="Primary variant"
          />
          <Checkbox
            variant="secondary"
            checked={checked3}
            onPress={() => setChecked3(!checked3)}
            label="Secondary variant"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Tamanhos"
        description="Três tamanhos disponíveis (sm, md, lg)"
        onCopyCode={onCopyCode}
        code={SIZES_CODE}
      >
        <View style={styles.container}>
          <Checkbox
            size="sm"
            checked={checked1}
            onPress={() => setChecked1(!checked1)}
            label="Small checkbox"
          />
          <Checkbox
            size="md"
            checked={checked2}
            onPress={() => setChecked2(!checked2)}
            label="Medium checkbox"
          />
          <Checkbox
            size="lg"
            checked={checked3}
            onPress={() => setChecked3(!checked3)}
            label="Large checkbox"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Estados"
        description="Checked, unchecked e disabled"
        onCopyCode={onCopyCode}
        code={STATES_CODE}
      >
        <View style={styles.container}>
          <Text variant="bodySecondary">Interativos:</Text>
          <Checkbox
            checked={checked4}
            onPress={() => setChecked4(!checked4)}
            label="Checkbox marcado"
          />
          <Checkbox
            checked={false}
            onPress={() => {}}
            label="Checkbox desmarcado"
          />

          <Text variant="bodySecondary" style={styles.sectionLabel}>
            Desabilitados:
          </Text>
          <Checkbox
            checked={true}
            disabled
            onPress={() => {}}
            label="Marcado e desabilitado"
          />
          <Checkbox
            checked={false}
            disabled
            onPress={() => {}}
            label="Desmarcado e desabilitado"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="CheckboxGroup - Multi-select"
        description="Grupo de checkboxes com seleção múltipla"
        onCopyCode={onCopyCode}
        code={GROUP_MULTI_CODE}
      >
        <CheckboxGroup
          options={[
            { value: 'leitura', label: 'Leitura' },
            { value: 'musica', label: 'Música' },
            { value: 'games', label: 'Games' },
            { value: 'cinema', label: 'Cinema' },
          ]}
          value={hobbies}
          onChange={value => setHobbies(value as string[])}
          label="Selecione seus hobbies"
          helperText="Você pode escolher quantos quiser"
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="CheckboxGroup - Single-select"
        description="Grupo com seleção única (comportamento de radio)"
        onCopyCode={onCopyCode}
        code={GROUP_SINGLE_CODE}
      >
        <CheckboxGroup
          multiSelect={false}
          options={[
            { value: 'iniciante', label: 'Iniciante' },
            { value: 'intermediario', label: 'Intermediário' },
            { value: 'avancado', label: 'Avançado' },
            { value: 'expert', label: 'Expert' },
          ]}
          value={level}
          onChange={value => setLevel(value as string)}
          label="Qual é o seu nível?"
        />
      </ShowcaseItem>

      <ShowcaseItem
        label="Variante Card"
        description="Cards clicáveis em grid 2x2"
        onCopyCode={onCopyCode}
        code={CARD_VARIANT_CODE}
      >
        <CheckboxGroup
          variant="card"
          columns={2}
          multiSelect={true}
          options={[
            { value: 'manha', label: 'Manhã' },
            { value: 'tarde', label: 'Tarde' },
            { value: 'noite', label: 'Noite' },
            { value: 'madrugada', label: 'Madrugada' },
          ]}
          value={preferences}
          onChange={value => setPreferences(value as string[])}
          label="Preferência de horário"
        />
      </ShowcaseItem>
    </ComponentSection>
  );
};
