import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
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
  const { handleLogout, isLoggingOut } = useHomeScreen(navigation);

  return (
    <View style={styles.container}>
      <Text variant="headingPrimary" style={styles.title}>
        Bem-vindo à Arena
      </Text>
      <Text variant="bodyPrimary" style={styles.subtitle}>
        Tela principal em desenvolvimento
      </Text>

      <View style={styles.logoutButtonContainer}>
        <Button
          variant="destructive"
          size="md"
          onPress={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? 'Saindo...' : 'Logout (Dev)'}
        </Button>
      </View>
    </View>
  );
};
