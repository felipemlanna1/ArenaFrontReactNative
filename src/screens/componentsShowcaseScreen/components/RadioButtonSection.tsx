import React, { useState } from 'react';
import { View } from 'react-native';
import { RadioButton } from '@/components/ui/radioButton';
import { Text } from '@/components/ui/text';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface RadioButtonSectionProps {
  onCopyCode: (code: string) => void;
}

const BASIC_CODE = `import { RadioButton } from '@/components/ui/radioButton';

const [selected, setSelected] = useState<string>('option1');

<RadioButton
  label="Opção 1"
  selected={selected === 'option1'}
  onPress={() => setSelected('option1')}
/>
<RadioButton
  label="Opção 2"
  selected={selected === 'option2'}
  onPress={() => setSelected('option2')}
/>`;

const GROUP_CODE = `import { ArenaSpacing } from '@/constants';

const options = [
  { id: 'small', label: 'Pequeno' },
  { id: 'medium', label: 'Médio' },
  { id: 'large', label: 'Grande' },
];

const [size, setSize] = useState<string>('medium');

<View style={{ gap: ArenaSpacing.md }}>
  {options.map(option => (
    <RadioButton
      key={option.id}
      label={option.label}
      selected={size === option.id}
      onPress={() => setSize(option.id)}
      testID={\`radio-\${option.id}\`}
    />
  ))}
</View>`;

const FORM_CODE = `import { ArenaSpacing } from '@/constants';

const [paymentMethod, setPaymentMethod] = useState<string>('credit');

const paymentMethods = [
  { id: 'credit', label: 'Cartão de Crédito' },
  { id: 'debit', label: 'Cartão de Débito' },
  { id: 'pix', label: 'PIX' },
  { id: 'boleto', label: 'Boleto Bancário' },
];

<View style={{ gap: ArenaSpacing.md }}>
  {paymentMethods.map(method => (
    <RadioButton
      key={method.id}
      label={method.label}
      selected={paymentMethod === method.id}
      onPress={() => setPaymentMethod(method.id)}
    />
  ))}
</View>`;

const INLINE_CODE = `import { ArenaSpacing } from '@/constants';

<View style={{ flexDirection: 'row', gap: ArenaSpacing.lg }}>
  <RadioButton
    label="Sim"
    selected={answer === 'yes'}
    onPress={() => setAnswer('yes')}
  />
  <RadioButton
    label="Não"
    selected={answer === 'no'}
    onPress={() => setAnswer('no')}
  />
</View>`;

export const RadioButtonSection: React.FC<RadioButtonSectionProps> = ({
  onCopyCode,
}) => {
  const [basicSelected, setBasicSelected] = useState<string>('option1');
  const [sizeSelected, setSizeSelected] = useState<string>('medium');
  const [paymentMethod, setPaymentMethod] = useState<string>('credit');
  const [answer, setAnswer] = useState<string>('yes');

  const sizeOptions = [
    { id: 'small', label: 'Pequeno' },
    { id: 'medium', label: 'Médio' },
    { id: 'large', label: 'Grande' },
  ];

  const paymentMethods = [
    { id: 'credit', label: 'Cartão de Crédito' },
    { id: 'debit', label: 'Cartão de Débito' },
    { id: 'pix', label: 'PIX' },
    { id: 'boleto', label: 'Boleto Bancário' },
  ];

  return (
    <ComponentSection title="RadioButton">
      <ShowcaseItem
        label="Basic Radio Buttons"
        description="Seleção única entre múltiplas opções"
        onCopyCode={onCopyCode}
        code={BASIC_CODE}
      >
        <View style={styles.gapMd}>
          <RadioButton
            label="Opção 1"
            selected={basicSelected === 'option1'}
            onPress={() => setBasicSelected('option1')}
            testID="radio-option1"
          />
          <RadioButton
            label="Opção 2"
            selected={basicSelected === 'option2'}
            onPress={() => setBasicSelected('option2')}
            testID="radio-option2"
          />
          <RadioButton
            label="Opção 3"
            selected={basicSelected === 'option3'}
            onPress={() => setBasicSelected('option3')}
            testID="radio-option3"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Radio Group (Array)"
        description="Padrão recomendado: usar array de opções com map"
        onCopyCode={onCopyCode}
        code={GROUP_CODE}
      >
        <View style={styles.gapMd}>
          {sizeOptions.map(option => (
            <RadioButton
              key={option.id}
              label={option.label}
              selected={sizeSelected === option.id}
              onPress={() => setSizeSelected(option.id)}
              testID={`radio-size-${option.id}`}
            />
          ))}
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Form Example"
        description="Uso em formulário: seleção de método de pagamento"
        onCopyCode={onCopyCode}
        code={FORM_CODE}
      >
        <View style={styles.gapMd}>
          <Text variant="labelPrimary">Método de Pagamento</Text>
          {paymentMethods.map(method => (
            <RadioButton
              key={method.id}
              label={method.label}
              selected={paymentMethod === method.id}
              onPress={() => setPaymentMethod(method.id)}
              testID={`radio-payment-${method.id}`}
            />
          ))}
          <Text variant="captionSecondary">
            Selecionado:{' '}
            {paymentMethods.find(m => m.id === paymentMethod)?.label}
          </Text>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Inline Radio Buttons"
        description="Radio buttons em linha horizontal (sim/não, etc)"
        onCopyCode={onCopyCode}
        code={INLINE_CODE}
      >
        <View style={styles.column}>
          <Text variant="labelPrimary">Aceita os termos?</Text>
          <View style={styles.row}>
            <RadioButton
              label="Sim"
              selected={answer === 'yes'}
              onPress={() => setAnswer('yes')}
              testID="radio-yes"
            />
            <RadioButton
              label="Não"
              selected={answer === 'no'}
              onPress={() => setAnswer('no')}
              testID="radio-no"
            />
          </View>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
