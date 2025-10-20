import React, { useState } from 'react';
import { View } from 'react-native';
import { CardCheckbox } from '@/components/ui/cardCheckbox';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface CardCheckboxSectionProps {
  onCopyCode: (code: string) => void;
}

const BASIC_CODE = `import { CardCheckbox } from '@/components/ui/cardCheckbox';

const [selected, setSelected] = useState<string | null>(null);

<CardCheckbox
  label="Futebol"
  icon="⚽"
  checked={selected === 'football'}
  onPress={() => setSelected('football')}
/>`;

const GRID_CODE = `import { CardCheckbox } from '@/components/ui/cardCheckbox';

const sports = [
  { id: 'football', name: 'Futebol', icon: '⚽' },
  { id: 'basketball', name: 'Basquete', icon: '🏀' },
  { id: 'volleyball', name: 'Vôlei', icon: '🏐' },
];

const [selectedSport, setSelectedSport] = useState<string | null>(null);

<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
  {sports.map(sport => (
    <CardCheckbox
      key={sport.id}
      label={sport.name}
      icon={sport.icon}
      checked={selectedSport === sport.id}
      onPress={() => setSelectedSport(sport.id)}
    />
  ))}
</View>`;

const MULTIPLE_CODE = `const [selectedSports, setSelectedSports] = useState<string[]>([]);

const toggleSport = (sportId: string) => {
  setSelectedSports(prev =>
    prev.includes(sportId)
      ? prev.filter(id => id !== sportId)
      : [...prev, sportId]
  );
};

<CardCheckbox
  label="Futebol"
  icon="⚽"
  checked={selectedSports.includes('football')}
  onPress={() => toggleSport('football')}
/>`;

const NO_ICON_CODE = `<CardCheckbox
  label="Opção sem ícone"
  checked={checked}
  onPress={handlePress}
/>`;

export const CardCheckboxSection: React.FC<CardCheckboxSectionProps> = ({
  onCopyCode,
}) => {
  const [singleSelected, setSingleSelected] = useState<string | null>(null);
  const [multipleSelected, setMultipleSelected] = useState<string[]>([]);

  const sports = [
    { id: 'football', name: 'Futebol', icon: '⚽' },
    { id: 'basketball', name: 'Basquete', icon: '🏀' },
    { id: 'volleyball', name: 'Vôlei', icon: '🏐' },
    { id: 'tennis', name: 'Tênis', icon: '🎾' },
  ];

  const toggleMultiple = (sportId: string) => {
    setMultipleSelected(prev =>
      prev.includes(sportId)
        ? prev.filter(id => id !== sportId)
        : [...prev, sportId]
    );
  };

  return (
    <ComponentSection title="CardCheckbox">
      <ShowcaseItem
        label="Basic CardCheckbox"
        description="Checkbox em formato de card, ideal para seleção visual em grids"
        onCopyCode={onCopyCode}
        code={BASIC_CODE}
      >
        <View style={styles.row}>
          <CardCheckbox
            label="Futebol"
            icon="⚽"
            checked={singleSelected === 'football'}
            onPress={() => setSingleSelected('football')}
          />
          <CardCheckbox
            label="Basquete"
            icon="🏀"
            checked={singleSelected === 'basketball'}
            onPress={() => setSingleSelected('basketball')}
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Grid Layout (Single Selection)"
        description="Seleção única em grid - usado em formulários como escolha de esporte"
        onCopyCode={onCopyCode}
        code={GRID_CODE}
      >
        <View style={styles.grid}>
          {sports.map(sport => (
            <CardCheckbox
              key={sport.id}
              label={sport.name}
              icon={sport.icon}
              checked={singleSelected === sport.id}
              onPress={() => setSingleSelected(sport.id)}
              testID={`sport-${sport.id}`}
            />
          ))}
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Multiple Selection"
        description="Permite selecionar múltiplos itens (array de IDs)"
        onCopyCode={onCopyCode}
        code={MULTIPLE_CODE}
      >
        <View style={styles.grid}>
          {sports.map(sport => (
            <CardCheckbox
              key={sport.id}
              label={sport.name}
              icon={sport.icon}
              checked={multipleSelected.includes(sport.id)}
              onPress={() => toggleMultiple(sport.id)}
              testID={`multi-sport-${sport.id}`}
            />
          ))}
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Without Icon"
        description="CardCheckbox também funciona sem ícone"
        onCopyCode={onCopyCode}
        code={NO_ICON_CODE}
      >
        <View style={styles.row}>
          <CardCheckbox
            label="Opção A"
            checked={singleSelected === 'optionA'}
            onPress={() => setSingleSelected('optionA')}
          />
          <CardCheckbox
            label="Opção B"
            checked={singleSelected === 'optionB'}
            onPress={() => setSingleSelected('optionB')}
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
