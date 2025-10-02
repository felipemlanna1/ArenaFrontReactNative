import React from 'react';
import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import { Header } from '@/components/header';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { useHomeScreen } from './useHomeScreen';
import { styles } from './stylesHomeScreen';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const { handleLogout } = useHomeScreen(navigation);

  return (
    <View style={styles.container}>
      <Header onLogout={handleLogout} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        <Text variant="headingPrimary" style={styles.title}>
          Bem-vindo à Arena
        </Text>
        <Text variant="bodyPrimary" style={styles.subtitle}>
          Tela principal em desenvolvimento
        </Text>
      </ScrollView>
    </View>
  );
};
