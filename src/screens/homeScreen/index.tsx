import React, { useState } from 'react';
import { View, Animated } from 'react-native';
import { Text } from '@/components/ui/text';
import { AppLayout } from '@/components/AppLayout';
import { FilterBar } from './components/FilterBar';
import { useFilterBarScroll } from './components/FilterBar/useFilterBarScroll';
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
  const { handleScroll, filterBarTranslateY } = useFilterBarScroll();
  const [searchValue, setSearchValue] = useState('');

  const handleSortPress = () => {};

  const handleFilterPress = () => {};

  return (
    <AppLayout onLogout={handleLogout}>
      <View style={styles.filterBarWrapper}>
        <Animated.View
          style={[{ transform: [{ translateY: filterBarTranslateY }] }]}
        >
          <FilterBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            onSortPress={handleSortPress}
            onFilterPress={handleFilterPress}
          />
        </Animated.View>
      </View>

      <Animated.ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.placeholder}>
          <Text variant="headingPrimary" style={styles.title}>
            Bem-vindo à Arena
          </Text>
          <Text variant="bodyPrimary" style={styles.subtitle}>
            Tela principal em desenvolvimento
          </Text>
        </View>
      </Animated.ScrollView>
    </AppLayout>
  );
};
