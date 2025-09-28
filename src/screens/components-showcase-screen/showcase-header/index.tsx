import React from 'react';
import { View, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ArenaColors } from '@/constants';
import { Text } from '@/components/text';
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
        <Pressable style={styles.backButton} onPress={onBackPress}>
          <Text variant="bodySecondary">← Voltar</Text>
        </Pressable>
        <View style={styles.headerContent}>
          <Text variant="displayAccent">Arena</Text>
          <Text variant="titleSecondary">Design System</Text>
          <Text variant="captionMuted">Showcase de Componentes</Text>
        </View>
      </View>
    </>
  );
};
