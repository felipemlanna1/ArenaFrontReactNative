import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import { styles } from './stylesShowcaseHeader';
interface ShowcaseHeaderProps {
  onBackPress: () => void;
}
export const ShowcaseHeader: React.FC<ShowcaseHeaderProps> = ({
  onBackPress,
}) => {
  return (
    <>
      <StatusBar style="light" backgroundColor={ArenaColors.neutral.darkest} />
      <View style={styles.header}>
        <Button
          onPress={onBackPress}
          variant="ghost"
          size="sm"
          style={styles.backButton}
        >
          ← Voltar
        </Button>
        <View style={styles.headerContent}>
          <Text variant="displayAccent">Arena</Text>
          <Text variant="titleSecondary">Design System</Text>
          <Text variant="captionMuted">Showcase de Componentes</Text>
        </View>
      </View>
    </>
  );
};
