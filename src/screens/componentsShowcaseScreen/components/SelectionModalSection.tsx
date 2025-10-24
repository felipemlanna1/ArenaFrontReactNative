import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { SelectionModal } from '@/components/ui/selectionModal';
import { Button } from '@/components/ui/button';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { ArenaColors } from '@/constants';

interface SelectionModalSectionProps {
  onCopyCode: (code: string) => void;
}

const BASIC_MODAL_CODE = `import { SelectionModal } from '@/components/ui/selectionModal';

const items = ['Item 1', 'Item 2', 'Item 3'];

<SelectionModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Selecione uma opção"
  items={items}
  renderItem={(item) => (
    <Pressable onPress={() => handleSelect(item)}>
      <Text variant="bodyPrimary">{item}</Text>
    </Pressable>
  )}
  keyExtractor={(item) => item}
/>`;

const WITH_SEARCH_CODE = `<SelectionModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Selecione um item"
  searchValue={searchQuery}
  onSearchChange={setSearchQuery}
  searchPlaceholder="Buscar item..."
  items={filteredItems}
  renderItem={(item) => (
    <Pressable onPress={() => selectItem(item)}>
      <Text variant="bodyPrimary">{item.name}</Text>
    </Pressable>
  )}
  keyExtractor={(item) => item.id}
/>`;

const WITH_LOADING_CODE = `<SelectionModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Carregando..."
  items={items}
  isLoading={isLoading}
  renderItem={(item) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
/>`;

const WITH_ERROR_CODE = `<SelectionModal
  isOpen={isOpen}
  onClose={closeModal}
  title="Selecione"
  items={items}
  errorMessage={loadError}
  emptyMessage="Nenhum item encontrado"
  renderItem={(item) => <ItemComponent item={item} />}
  keyExtractor={(item) => item.id}
/>`;

export const SelectionModalSection: React.FC<SelectionModalSectionProps> = ({
  onCopyCode,
}) => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const basicItems = ['Opção 1', 'Opção 2', 'Opção 3', 'Opção 4', 'Opção 5'];

  const searchItems = [
    'React',
    'React Native',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Next.js',
    'Expo',
    'Redux',
  ];

  const filteredSearchItems = searchItems.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderBasicItem = (item: string) => (
    <Pressable
      onPress={() => {
        setBasicModalOpen(false);
      }}
      style={({ pressed }) => ({
        padding: 12,
        borderRadius: 8,
        marginBottom: 4,
        backgroundColor: pressed ? ArenaColors.neutral.dark : 'transparent',
      })}
    >
      <Text variant="bodyPrimary">{item}</Text>
    </Pressable>
  );

  const renderSearchItem = (item: string) => (
    <Pressable
      onPress={() => {
        setSearchModalOpen(false);
        setSearchQuery('');
      }}
      style={({ pressed }) => ({
        padding: 12,
        borderRadius: 8,
        marginBottom: 4,
        backgroundColor: pressed ? ArenaColors.neutral.dark : 'transparent',
      })}
    >
      <Text variant="bodyPrimary">{item}</Text>
    </Pressable>
  );

  return (
    <ComponentSection title="SelectionModal">
      <ShowcaseItem
        label="Modal Básico"
        description="Modal de seleção simples sem busca"
        code={BASIC_MODAL_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setBasicModalOpen(true)}>
            Abrir Modal Básico
          </Button>
          <SelectionModal
            isOpen={basicModalOpen}
            onClose={() => setBasicModalOpen(false)}
            title="Selecione uma opção"
            items={basicItems}
            renderItem={renderBasicItem}
            keyExtractor={item => item}
            showSearch={false}
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Modal com Busca"
        description="Modal de seleção com campo de busca"
        code={WITH_SEARCH_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setSearchModalOpen(true)}>
            Abrir Modal com Busca
          </Button>
          <SelectionModal
            isOpen={searchModalOpen}
            onClose={() => {
              setSearchModalOpen(false);
              setSearchQuery('');
            }}
            title="Selecione uma tecnologia"
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Buscar tecnologia..."
            items={filteredSearchItems}
            renderItem={renderSearchItem}
            keyExtractor={item => item}
            emptyMessage="Nenhuma tecnologia encontrada"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Modal com Loading"
        description="Modal exibindo estado de carregamento"
        code={WITH_LOADING_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setLoadingModalOpen(true)}>
            Abrir Modal Loading
          </Button>
          <SelectionModal
            isOpen={loadingModalOpen}
            onClose={() => setLoadingModalOpen(false)}
            title="Carregando..."
            items={[]}
            isLoading={true}
            renderItem={renderBasicItem}
            keyExtractor={item => item}
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Modal com Erro"
        description="Modal exibindo mensagem de erro"
        code={WITH_ERROR_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setErrorModalOpen(true)}>
            Abrir Modal com Erro
          </Button>
          <SelectionModal
            isOpen={errorModalOpen}
            onClose={() => setErrorModalOpen(false)}
            title="Erro ao carregar"
            items={[]}
            errorMessage="Falha ao carregar itens. Tente novamente."
            renderItem={renderBasicItem}
            keyExtractor={item => item}
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
