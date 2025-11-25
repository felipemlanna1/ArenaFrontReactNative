import React, { useState, useCallback } from 'react';
import { View } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { AppLayout } from '@/components/AppLayout';
import { FriendsScreenProps } from './typesFriendsScreen';
import { useFriendsScreen } from './useFriendsScreen';
import { useFriendsShare } from './hooks/useFriendsShare';
import { styles } from './stylesFriendsScreen';
import { FriendsBackground } from './components/FriendsBackground';
import { FriendsFilterBar } from './components/FriendsFilterBar';
import { FriendsTabBar, FriendTab } from './components/FriendsTabBar';
import {
  FriendsSection,
  RequestsSection,
  OutgoingRequestsSection,
  RecommendationsSection,
} from './components/FriendsSections';
import { UserData } from '@/services/http';
import { SkeletonCard } from '@/components/ui/skeletonCard';
import { UserCard } from '@/components/userCard';
import { AnimatedListItem } from '@/components/ui/animatedListItem';

export const FriendsScreen: React.FC<FriendsScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<FriendTab>('friends');
  const hookData = useFriendsScreen(navigation);
  const { shareInvite } = useFriendsShare();

  const handleSwitchToRecommendations = useCallback(() => {
    setActiveTab('recommendations');
  }, []);

  const handleEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const handleInviteFriends = useCallback(() => {
    shareInvite();
  }, [shareInvite]);

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

  const getTabData = useCallback(() => {
    switch (activeTab) {
      case 'friends':
        return {
          data: friends,
          isLoading: isLoadingFriends,
          isLoadingMore: isLoadingMoreFriends,
          hasMore: hasMoreFriends,
          onLoadMore: handleLoadMoreFriends,
        };
      case 'incoming':
        return {
          data: incomingRequests,
          isLoading: isLoadingRequests,
          isLoadingMore: isLoadingMoreIncoming,
          hasMore: hasMoreIncoming,
          onLoadMore: handleLoadMoreIncoming,
        };
      case 'outgoing':
        return {
          data: outgoingRequests,
          isLoading: isLoadingOutgoing,
          isLoadingMore: isLoadingMoreOutgoing,
          hasMore: hasMoreOutgoing,
          onLoadMore: handleLoadMoreOutgoing,
        };
      case 'recommendations':
        return {
          data: recommendations,
          isLoading: isLoadingRecommendations,
          isLoadingMore: isLoadingMoreRecommendations,
          hasMore: hasMoreRecommendations,
          onLoadMore: handleLoadMoreRecommendations,
        };
    }
  }, [
    activeTab,
    friends,
    incomingRequests,
    outgoingRequests,
    recommendations,
    isLoadingFriends,
    isLoadingRequests,
    isLoadingOutgoing,
    isLoadingRecommendations,
    isLoadingMoreFriends,
    isLoadingMoreIncoming,
    isLoadingMoreOutgoing,
    isLoadingMoreRecommendations,
    hasMoreFriends,
    hasMoreIncoming,
    hasMoreOutgoing,
    hasMoreRecommendations,
    handleLoadMoreFriends,
    handleLoadMoreIncoming,
    handleLoadMoreOutgoing,
    handleLoadMoreRecommendations,
  ]);

  const renderItem: ListRenderItem<UserData> = useCallback(
    ({ item, index }) => {
      let cardContent;
      switch (activeTab) {
        case 'friends':
          cardContent = (
            <UserCard
              user={item}
              variant="friend"
              onPress={() => handleNavigateToProfile(item.id)}
              onRemove={() => handleRemoveFriend(item.id)}
              isLoading={loadingUserId === item.id}
              testID={`friend-card-${item.id}`}
            />
          );
          break;
        case 'incoming':
          cardContent = (
            <UserCard
              user={item}
              variant="request"
              onAccept={() => handleAcceptRequest(item.id)}
              onReject={() => handleRejectRequest(item.id)}
              isLoading={loadingUserId === item.id}
              testID={`request-card-${item.id}`}
            />
          );
          break;
        case 'outgoing':
          cardContent = (
            <UserCard
              user={item}
              variant="outgoing"
              onPress={() => handleNavigateToProfile(item.id)}
              onCancel={() => handleCancelRequest(item.id)}
              isLoading={loadingUserId === item.id}
              testID={`outgoing-card-${item.id}`}
            />
          );
          break;
        case 'recommendations':
          cardContent = (
            <UserCard
              user={item}
              variant="recommendation"
              onPress={() => handleNavigateToProfile(item.id)}
              onAddFriend={() => handleSendRequest(item.id)}
              isLoading={loadingUserId === item.id}
              testID={`recommendation-card-${item.id}`}
            />
          );
          break;
      }

      return (
        <AnimatedListItem index={index ?? 0}>{cardContent}</AnimatedListItem>
      );
    },
    [
      activeTab,
      handleNavigateToProfile,
      handleRemoveFriend,
      handleAcceptRequest,
      handleRejectRequest,
      handleCancelRequest,
      handleSendRequest,
      loadingUserId,
    ]
  );

  const renderFooter = useCallback(() => {
    const { isLoadingMore } = getTabData();
    if (!isLoadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <SkeletonCard />
      </View>
    );
  }, [getTabData]);

  const renderEmpty = useCallback(() => {
    const { isLoading } = getTabData();
    if (isLoading) return null;

    switch (activeTab) {
      case 'friends':
        return (
          <FriendsSection
            friends={[]}
            isLoading={false}
            loadingUserId={null}
            onNavigateToProfile={handleNavigateToProfile}
            onRemoveFriend={handleRemoveFriend}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            onSwitchToRecommendations={handleSwitchToRecommendations}
            onInviteFriends={handleInviteFriends}
          />
        );
      case 'incoming':
        return (
          <RequestsSection
            requests={[]}
            isLoading={false}
            loadingUserId={null}
            onAcceptRequest={handleAcceptRequest}
            onRejectRequest={handleRejectRequest}
          />
        );
      case 'outgoing':
        return (
          <OutgoingRequestsSection
            requests={[]}
            isLoading={false}
            loadingUserId={null}
            onNavigateToProfile={handleNavigateToProfile}
            onCancelRequest={handleCancelRequest}
            onSwitchToRecommendations={handleSwitchToRecommendations}
          />
        );
      case 'recommendations':
        return (
          <RecommendationsSection
            recommendations={[]}
            isLoading={false}
            loadingUserId={null}
            onNavigateToProfile={handleNavigateToProfile}
            onSendRequest={handleSendRequest}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={handleClearFilters}
            onEditProfile={handleEditProfile}
          />
        );
    }
  }, [
    activeTab,
    getTabData,
    handleNavigateToProfile,
    handleRemoveFriend,
    handleAcceptRequest,
    handleRejectRequest,
    handleCancelRequest,
    handleSendRequest,
    hasActiveFilters,
    handleClearFilters,
    handleSwitchToRecommendations,
    handleEditProfile,
    handleInviteFriends,
  ]);

  const { data, isLoading, hasMore, onLoadMore } = getTabData();

  return (
    <AppLayout>
      <FriendsBackground>
        {(activeTab === 'friends' || activeTab === 'recommendations') && (
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
        )}

        <FriendsTabBar
          activeTab={activeTab}
          onTabChange={setActiveTab}
          friendsCount={friends.length}
          incomingCount={incomingRequests.length}
          outgoingCount={outgoingRequests.length}
          recommendationsCount={recommendations.length}
        />

        {isLoading && data.length === 0 ? (
          <View style={styles.loadingContainer}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </View>
        ) : (
          <FlashList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            onEndReached={hasMore ? onLoadMore : undefined}
            onEndReachedThreshold={0.5}
            ListEmptyComponent={renderEmpty}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
          />
        )}
      </FriendsBackground>
    </AppLayout>
  );
};
