import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { CheckboxGroup } from '@/components/ui/checkboxGroup';
import { SkillLevel } from '@/types/sport';
import { styles } from './stylesLevelSelection';

interface LevelSelectionProps {
  sportName: string;
  selectedLevel: SkillLevel | null;
  onSelectLevel: (level: SkillLevel) => void;
}

export const LevelSelection: React.FC<LevelSelectionProps> = ({
  sportName,
  selectedLevel,
  onSelectLevel,
}) => {
  const levelOptions = [
    { value: SkillLevel.BEGINNER, label: 'Iniciante' },
    { value: SkillLevel.INTERMEDIATE, label: 'Intermediário' },
    { value: SkillLevel.ADVANCED, label: 'Avançado' },
    { value: SkillLevel.EXPERT, label: 'Expert' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text variant="displayAccent" style={styles.title}>
          Qual é o seu nível em {sportName}?
        </Text>
        <Text variant="bodySecondary" style={styles.subtitle}>
          Selecione seu nível de habilidade
        </Text>
      </View>

      <CheckboxGroup
        multiSelect={false}
        options={levelOptions}
        value={selectedLevel || ''}
        onChange={value => onSelectLevel(value as SkillLevel)}
      />
    </View>
  );
};
