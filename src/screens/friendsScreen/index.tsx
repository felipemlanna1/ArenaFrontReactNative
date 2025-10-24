import React from 'react';
import { View, ScrollView } from 'react-native';
import { ArenaRefreshControl } from '@/components/ui/refreshControl';
import { AppLayout } from '@/components/AppLayout';
import { Text } from '@/components/ui/text';
import { FriendsScreenProps } from './typesFriendsScreen';
import { useFriendsScreen } from './useFriendsScreen';
import { styles } from './stylesFriendsScreen';
import { FriendsFilterBar } from './components/FriendsFilterBar';
import { FriendsAccordionSection } from './components/FriendsAccordionSection';
import { IncomingRequestsAccordionSection } from './components/IncomingRequestsAccordionSection';
import { OutgoingRequestsAccordionSection } from './components/OutgoingRequestsAccordionSection';
import { RecommendationsAccordionSection } from './components/RecommendationsAccordionSection';

export const FriendsScreen: React.FC<FriendsScreenProps> = ({ navigation }) => {
  const {
    friends,
    incomingRequests,
    outgoingRequests,
    recommendations,
    isLoadingFriends,
    isLoadingRequests,
    isLoadingOutgoing,
    isLoadingRecommendations,
    refreshing,
    handleRefresh,
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
  } = useFriendsScreen(navigation);

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
      </ScrollView>
    </AppLayout>
  );
};
