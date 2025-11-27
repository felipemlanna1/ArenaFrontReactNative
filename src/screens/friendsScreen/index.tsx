import React, { useState, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { GestureDetector } from 'react-native-gesture-handler';
import { AppLayout } from '@/components/AppLayout';
import { FriendsScreenProps } from './typesFriendsScreen';
import { useFriendsScreen } from './useFriendsScreen';
import { useFriendsShare } from './hooks/useFriendsShare';
import { useSwipeableFilters } from '@/hooks/useSwipeableFilters';
import { styles } from './stylesFriendsScreen';
import { FilterBar } from './components/FilterBar';
import { FriendsTabBar, FriendTab } from './components/FriendsTabBar';
import {
  FriendsSection,
  RequestsSection,
  OutgoingRequestsSection,
  RecommendationsSection,
} from './components/FriendsSections';
import { UserData } from '@/services/http';
import { SkeletonUserCard } from '@/components/ui/skeletonUserCard';
import { UserCard } from '@/components/userCard';
import { AnimatedListItem } from '@/components/ui/animatedListItem';

export const FriendsScreen: React.FC<FriendsScreenProps> = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState<FriendTab>('friends');
  const hookData = useFriendsScreen(navigation);
  const { shareInvite } = useFriendsShare();

  const friendTabs: FriendTab[] = [
    'friends',
    'incoming',
    'outgoing',
    'recommendations',
  ];

  const { composedGesture } = useSwipeableFilters({
    filters: friendTabs,
    activeFilter: activeTab,
    onChange: setActiveTab,
  });

  const handleSwitchToRecommendations = useCallback(() => {
    setActiveTab('recommendations');
  }, []);

  const handleEditProfile = useCallback(() => {
    navigation.navigate('EditProfile');
  }, [navigation]);

  const handleInviteFriends = useCallback(() => {
    shareInvite();
  }, [shareInvite]);

  const handleBackPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

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
    selectedState,
    selectedSportId,
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

  const handleFilterPress = useCallback(() => {
    navigation.navigate('FilterScreen', { source: 'friends' });
  }, [navigation]);

  const filterCount = useMemo(() => {
    let count = 0;
    if (selectedCity) count++;
    if (selectedState) count++;
    if (selectedSportId) count++;
    return count;
  }, [selectedCity, selectedState, selectedSportId]);

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

  const renderSeparator = useCallback(() => {
    return <View style={styles.itemSeparator} />;
  }, []);

  const renderFooter = useCallback(() => {
    const { isLoadingMore } = getTabData();
    if (!isLoadingMore) return null;

    return (
      <View style={styles.loadingFooter}>
        <SkeletonUserCard showActions={true} />
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
    <AppLayout
      showHeader={true}
      headerVariant="mainWithBack"
      headerShowLogo={true}
      headerShowBackButton={true}
      headerOnBackPress={handleBackPress}
    >
      <GestureDetector gesture={composedGesture}>
        <View style={styles.content}>
          <FriendsTabBar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            friendsCount={friends.length}
            incomingCount={incomingRequests.length}
            outgoingCount={outgoingRequests.length}
            recommendationsCount={recommendations.length}
          />

          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterPress={handleFilterPress}
            filterCount={filterCount}
          />

          {isLoading && data.length === 0 ? (
            <View style={styles.loadingContainer}>
              <SkeletonUserCard showActions={true} />
              <SkeletonUserCard showActions={true} />
              <SkeletonUserCard showActions={true} />
            </View>
          ) : (
            <View style={styles.listWrapper}>
              <FlashList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ItemSeparatorComponent={renderSeparator}
                onEndReached={hasMore ? onLoadMore : undefined}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={renderEmpty}
                ListFooterComponent={renderFooter}
                showsVerticalScrollIndicator={false}
                estimatedItemSize={120}
              />
            </View>
          )}
        </View>
      </GestureDetector>
    </AppLayout>
  );
};
