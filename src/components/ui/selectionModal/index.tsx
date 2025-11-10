import React from 'react';
import { View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from '../text';
import { Input } from '../input';
import { SportsLoading } from '../sportsLoading';
import { ArenaColors } from '@/constants';
import { SelectionModalProps } from './typesSelectionModal';
import { styles } from './stylesSelectionModal';

interface EmptyStateProps {
  error?: string | null;
  searchQuery?: string;
  emptyMessage?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  error,
  searchQuery,
  emptyMessage,
}) => {
  if (error) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIcon}>
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={ArenaColors.semantic.error}
          />
        </View>
        <Text variant="bodySecondary">{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons
          name="search-outline"
          size={48}
          color={ArenaColors.neutral.medium}
        />
      </View>
      <Text variant="bodySecondary">
        {searchQuery
          ? emptyMessage || 'Nenhum item encontrado'
          : 'Nenhum item disponível'}
      </Text>
    </View>
  );
};

interface LoadingStateProps {
  testID?: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ testID }) => (
  <View style={styles.loadingContainer}>
    <SportsLoading
      size="md"
      animationSpeed="normal"
      testID={testID ? `${testID}-loading` : undefined}
    />
  </View>
);

interface ModalHeaderProps {
  title: string;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  searchPlaceholder?: string;
  closeModal: () => void;
  showSearch?: boolean;
  testID?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  searchQuery,
  setSearchQuery,
  searchPlaceholder = 'Buscar...',
  closeModal,
  showSearch = true,
  testID,
}) => (
  <View style={styles.modalHeader}>
    <View style={styles.headerTop}>
      <Text variant="titlePrimary">{title}</Text>
      <TouchableOpacity
        onPress={closeModal}
        style={styles.closeButton}
        testID={testID ? `${testID}-close` : undefined}
        hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <Ionicons name="close" size={24} color={ArenaColors.neutral.light} />
      </TouchableOpacity>
    </View>
    {showSearch && setSearchQuery !== undefined && (
      <View style={styles.searchContainer}>
        <Input
          type="search"
          value={searchQuery || ''}
          onChangeText={setSearchQuery}
          placeholder={searchPlaceholder}
          autoFocus
          testID={testID ? `${testID}-search` : undefined}
        />
      </View>
    )}
  </View>
);

export const SelectionModal = <T,>({
  isOpen,
  onClose,
  title,
  searchValue,
  onSearchChange,
  searchPlaceholder,
  items,
  renderItem,
  keyExtractor,
  emptyMessage,
  errorMessage,
  isLoading = false,
  testID,
  showSearch = true,
}: SelectionModalProps<T>): React.ReactElement => {
  const isEmpty = items.length === 0;
  const hasError = errorMessage !== undefined && errorMessage !== null;

  return (
    <Modal
      visible={isOpen}
      transparent
      animationType="slide"
      presentationStyle="overFullScreen"
      onRequestClose={onClose}
      testID={testID ? `${testID}-modal` : undefined}
    >
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={styles.modalContent}
          onPress={e => e.stopPropagation()}
        >
          <ModalHeader
            title={title}
            searchQuery={searchValue}
            setSearchQuery={onSearchChange}
            searchPlaceholder={searchPlaceholder}
            closeModal={onClose}
            showSearch={showSearch}
            testID={testID}
          />

          {isLoading ? (
            <LoadingState testID={testID} />
          ) : hasError || isEmpty ? (
            <EmptyState
              error={errorMessage}
              searchQuery={searchValue}
              emptyMessage={emptyMessage}
            />
          ) : (
            <ArenaKeyboardAwareScrollView
              style={styles.itemsList}
              keyboardShouldPersistTaps="handled"
              bottomOffset={60}
            >
              {items.map(item => (
                <React.Fragment key={keyExtractor(item)}>
                  {renderItem(item)}
                </React.Fragment>
              ))}
            </ArenaKeyboardAwareScrollView>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export type { SelectionModalProps } from './typesSelectionModal';
