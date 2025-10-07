import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '@/components/ui/text';
import { SportsLoading } from '@/components/ui/sportsLoading';
import { AppLayout } from '@/components/AppLayout';
import { ArenaColors } from '@/constants';
import { useExploreScreen } from './useExploreScreen';
import { ExploreScreenProps } from './typesExploreScreen';
import { styles } from './stylesExploreScreen';

export const ExploreScreen: React.FC<ExploreScreenProps> = ({
  testID = 'explore-screen',
}) => {
  const { isLoading } = useExploreScreen();

  if (isLoading) {
    return (
      <AppLayout>
        <View style={styles.container}>
          <SportsLoading size="lg" animationSpeed="normal" />
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout testID={testID}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Ionicons
            name="search-outline"
            size={64}
            color={ArenaColors.neutral.medium}
          />
          <Text variant="headingPrimary" style={styles.title}>
            Explorar Eventos
          </Text>
          <Text variant="bodySecondary" style={styles.subtitle}>
            Descubra novos eventos e esportes próximos de você
          </Text>
        </View>
      </View>
    </AppLayout>
  );
};
