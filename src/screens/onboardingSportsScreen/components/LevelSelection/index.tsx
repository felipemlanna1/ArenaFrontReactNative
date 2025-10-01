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
    { value: SkillLevel.INTERMEDIATE, label: 'Intermedi�rio' },
    { value: SkillLevel.ADVANCED, label: 'Avan�ado' },
    { value: SkillLevel.EXPERT, label: 'Expert' },
  ];

  return (
    <View style={styles.container}>
      <Text variant="titlePrimary" style={styles.title}>
        Qual é o seu nível em {sportName}?
      </Text>

      <CheckboxGroup
        multiSelect={false}
        options={levelOptions}
        value={selectedLevel || ''}
        onChange={value => onSelectLevel(value as SkillLevel)}
      />
    </View>
  );
};
