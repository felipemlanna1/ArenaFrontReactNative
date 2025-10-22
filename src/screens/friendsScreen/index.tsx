import React from 'react';
import { View, ScrollView } from 'react-native';
import { Accordion } from '@/components/ui/accordion';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { AppLayout } from '@/components/AppLayout';
import { Text } from '@/components/ui/text';
import { FriendsScreenProps } from './typesFriendsScreen';
import { useFriendsScreen } from './useFriendsScreen';
import { styles } from './stylesFriendsScreen';
import {
  FriendsSection,
  RequestsSection,
  RecommendationsSection,
} from './components/FriendsSections';
import { FriendsFilterBar } from './components/FriendsFilterBar';

export const FriendsScreen: React.FC<FriendsScreenProps> = ({ navigation }) => {
  const {
    friends,
    incomingRequests,
    recommendations,
    isLoadingFriends,
    isLoadingRequests,
    isLoadingRecommendations,
    refreshing,
    handleRefresh,
    handleRemoveFriend,
    handleAcceptRequest,
    handleRejectRequest,
    handleSendRequest,
    handleNavigateToProfile,
    loadingUserId,
    handleLogout,
    // Filters
    searchQuery,
    setSearchQuery,
    selectedCity,
    setSelectedCity,
    selectedState,
    setSelectedState,
    selectedSportId,
    setSelectedSportId,
    handleClearFilters,
    hasActiveFilters,
  } = useFriendsScreen(navigation);

  const accordionItems = [
    {
      id: 'friends',
      title: `Meus Amigos (${friends.length})`,
      content: (
        <FriendsSection
          friends={friends}
          isLoading={isLoadingFriends}
          loadingUserId={loadingUserId}
          onNavigateToProfile={handleNavigateToProfile}
          onRemoveFriend={handleRemoveFriend}
        />
      ),
    },
    {
      id: 'requests',
      title: `Solicitações (${incomingRequests.length})`,
      content: (
        <RequestsSection
          requests={incomingRequests}
          isLoading={isLoadingRequests}
          loadingUserId={loadingUserId}
          onAcceptRequest={handleAcceptRequest}
          onRejectRequest={handleRejectRequest}
        />
      ),
    },
    {
      id: 'recommendations',
      title: `Recomendações (${recommendations.length})`,
      content: (
        <RecommendationsSection
          recommendations={recommendations}
          isLoading={isLoadingRecommendations}
          loadingUserId={loadingUserId}
          onNavigateToProfile={handleNavigateToProfile}
          onSendRequest={handleSendRequest}
        />
      ),
    },
  ];

  return (
    <AppLayout onLogout={handleLogout}>
      <View style={styles.titleContainer}>
        <Text variant="headingPrimary" style={styles.title}>
          Amigos
        </Text>
      </View>

      <FriendsFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCity={selectedCity}
        onCityChange={setSelectedCity}
        selectedState={selectedState}
        onStateChange={setSelectedState}
        selectedSportId={selectedSportId}
        onSportChange={setSelectedSportId}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <ScrollView
        style={styles.content}
        refreshControl={
          <ArenaRefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        }
        testID="friends-screen-scroll"
      >
        <View style={styles.accordionsContainer}>
          <Accordion
            variant="default"
            mode="multiple"
            items={accordionItems}
            testID="friends-accordion"
          />
        </View>
      </ScrollView>
    </AppLayout>
  );
};
