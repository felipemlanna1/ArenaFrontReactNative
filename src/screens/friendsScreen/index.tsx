import React from 'react';
import { View } from 'react-native';
import { AppLayout } from '@/components/AppLayout';
import { FriendsScreenProps } from './typesFriendsScreen';
import { useFriendsScreen } from './useFriendsScreen';
import { styles } from './stylesFriendsScreen';
import { FriendsBackground } from './components/FriendsBackground';
import { FriendsFilterBar } from './components/FriendsFilterBar';
import { FriendsAccordionSection } from './components/FriendsAccordionSection';
import { IncomingRequestsAccordionSection } from './components/IncomingRequestsAccordionSection';
import { OutgoingRequestsAccordionSection } from './components/OutgoingRequestsAccordionSection';
import { RecommendationsAccordionSection } from './components/RecommendationsAccordionSection';

export const FriendsScreen: React.FC<FriendsScreenProps> = ({ navigation }) => {
  const hookData = useFriendsScreen(navigation);

  const {
    friends,
    incomingRequests,
    outgoingRequests,
    recommendations,
    isLoadingFriends,
    isLoadingRequests,
    isLoadingOutgoing,
    isLoadingRecommendations,
    handleRemoveFriend,
    handleAcceptRequest,
    handleRejectRequest,
    handleCancelRequest,
    handleSendRequest,
    handleNavigateToProfile,
    loadingUserId,
    handleLogout,
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
    hasMoreFriends,
    hasMoreIncoming,
    hasMoreOutgoing,
    hasMoreRecommendations,
    isLoadingMoreFriends,
    isLoadingMoreIncoming,
    isLoadingMoreOutgoing,
    isLoadingMoreRecommendations,
    handleLoadMoreFriends,
    handleLoadMoreIncoming,
    handleLoadMoreOutgoing,
    handleLoadMoreRecommendations,
  } = hookData;

  return (
    <AppLayout onLogout={handleLogout}>
      <FriendsBackground>
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

        <View style={[styles.content, styles.scrollContent]}>
          <View style={styles.accordionsContainer}>
            <FriendsAccordionSection
              friends={friends}
              isLoading={isLoadingFriends}
              isLoadingMore={isLoadingMoreFriends}
              hasMore={hasMoreFriends}
              loadingUserId={loadingUserId}
              onNavigateToProfile={handleNavigateToProfile}
              onRemoveFriend={handleRemoveFriend}
              onLoadMore={handleLoadMoreFriends}
            />

            <IncomingRequestsAccordionSection
              requests={incomingRequests}
              isLoading={isLoadingRequests}
              isLoadingMore={isLoadingMoreIncoming}
              hasMore={hasMoreIncoming}
              loadingUserId={loadingUserId}
              onAcceptRequest={handleAcceptRequest}
              onRejectRequest={handleRejectRequest}
              onLoadMore={handleLoadMoreIncoming}
            />

            <OutgoingRequestsAccordionSection
              requests={outgoingRequests}
              isLoading={isLoadingOutgoing}
              isLoadingMore={isLoadingMoreOutgoing}
              hasMore={hasMoreOutgoing}
              loadingUserId={loadingUserId}
              onNavigateToProfile={handleNavigateToProfile}
              onCancelRequest={handleCancelRequest}
              onLoadMore={handleLoadMoreOutgoing}
            />

            <RecommendationsAccordionSection
              recommendations={recommendations}
              isLoading={isLoadingRecommendations}
              isLoadingMore={isLoadingMoreRecommendations}
              hasMore={hasMoreRecommendations}
              loadingUserId={loadingUserId}
              onNavigateToProfile={handleNavigateToProfile}
              onSendRequest={handleSendRequest}
              onLoadMore={handleLoadMoreRecommendations}
            />
          </View>
        </View>
      </FriendsBackground>
    </AppLayout>
  );
};
