import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { FilterModal } from '@/components/ui/filterModal';
import { Button } from '@/components/ui/button';
import { StateDropdown } from '@/components/ui/stateDropdown';
import { CityDropdown } from '@/components/ui/cityDropdown';
import { Checkbox } from '@/components/ui/checkbox';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { ArenaSpacing } from '@/constants';

interface FilterModalSectionProps {
  onCopyCode: (code: string) => void;
}

const BASIC_CODE = `import { FilterModal } from '@/components/ui/filterModal';

<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleApply}
  title="Filtrar por Categoria"
  height="85%"
>
  <View style={{ gap: ArenaSpacing.md }}>
    <Checkbox label="Categoria 1" checked={cat1} onPress={() => setCat1(!cat1)} />
    <Checkbox label="Categoria 2" checked={cat2} onPress={() => setCat2(!cat2)} />
  </View>
</FilterModal>`;

const WITH_LOCATION_CODE = `<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleApply}
  title="Filtrar por Localização"
  height="85%"
>
  <View style={{ gap: ArenaSpacing.lg }}>
    <StateDropdown value={state} onChange={setState} label="Estado" />
    {state && (
      <CityDropdown value={city} onChange={setCity} stateUF={state} label="Cidade" />
    )}
  </View>
</FilterModal>`;

const WITH_LOADING_CODE = `<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleApply}
  title="Carregando..."
  isLoading={true}
>
  {/* Conteúdo */}
</FilterModal>`;

const WITH_CUSTOM_HEIGHT_CODE = `<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleApply}
  title="Filtros Avançados"
  height="90%"
>
  {/* Muitos filtros */}
</FilterModal>`;

const WITH_CUSTOM_LABELS_CODE = `<FilterModal
  visible={visible}
  onClose={() => setVisible(false)}
  onApply={handleSave}
  title="Editar Preferências"
  applyButtonLabel="Salvar"
  cancelButtonLabel="Descartar"
  applyButtonDisabled={!hasChanges}
>
  {/* Formulário */}
</FilterModal>`;

export const FilterModalSection: React.FC<FilterModalSectionProps> = ({
  onCopyCode,
}) => {
  const [basicModalOpen, setBasicModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [heightModalOpen, setHeightModalOpen] = useState(false);
  const [labelsModalOpen, setLabelsModalOpen] = useState(false);

  const [cat1, setCat1] = useState(false);
  const [cat2, setCat2] = useState(false);

  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  const [height, setHeight] = useState<'80%' | '85%' | '90%'>('80%');

  const handleBasicApply = () => {
    setBasicModalOpen(false);
  };

  const handleLocationApply = () => {
    setLocationModalOpen(false);
  };

  const handleHeightApply = () => {
    setHeightModalOpen(false);
  };

  const handleLabelsApply = () => {
    setLabelsModalOpen(false);
  };

  return (
    <ComponentSection title="FilterModal">
      <ShowcaseItem
        label="FilterModal Básico"
        description="Modal de filtro com confirmação (Cancelar/Aplicar)"
        code={BASIC_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setBasicModalOpen(true)}>
            Abrir Filtro Básico
          </Button>
          <FilterModal
            visible={basicModalOpen}
            onClose={() => setBasicModalOpen(false)}
            onApply={handleBasicApply}
            title="Filtrar por Categoria"
            height="85%"
          >
            <View style={{ gap: ArenaSpacing.md }}>
              <Checkbox
                label="Categoria 1"
                checked={cat1}
                onPress={() => setCat1(!cat1)}
              />
              <Checkbox
                label="Categoria 2"
                checked={cat2}
                onPress={() => setCat2(!cat2)}
              />
            </View>
          </FilterModal>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="FilterModal com Dropdowns"
        description="Filtro com seleção de Estado e Cidade"
        code={WITH_LOCATION_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setLocationModalOpen(true)}>
            Abrir Filtro de Localização
          </Button>
          <FilterModal
            visible={locationModalOpen}
            onClose={() => {
              setLocationModalOpen(false);
              setState('');
              setCity('');
            }}
            onApply={handleLocationApply}
            title="Filtrar por Localização"
            height="85%"
          >
            <View style={{ gap: ArenaSpacing.lg }}>
              <StateDropdown value={state} onChange={setState} label="Estado" />
              {state && (
                <CityDropdown
                  value={city}
                  onChange={setCity}
                  stateUF={state}
                  label="Cidade"
                />
              )}
            </View>
          </FilterModal>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="FilterModal com Loading"
        description="Modal exibindo estado de carregamento"
        code={WITH_LOADING_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setLoadingModalOpen(true)}>
            Abrir Filtro Loading
          </Button>
          <FilterModal
            visible={loadingModalOpen}
            onClose={() => setLoadingModalOpen(false)}
            onApply={() => setLoadingModalOpen(false)}
            title="Carregando..."
            isLoading={true}
          >
            <View />
          </FilterModal>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="FilterModal com Altura Customizada"
        description="Demonstra diferentes alturas: 80%, 85%, 90%"
        code={WITH_CUSTOM_HEIGHT_CODE}
        onCopyCode={onCopyCode}
      >
        <View style={{ gap: ArenaSpacing.sm }}>
          <View
            style={{
              flexDirection: 'row',
              gap: ArenaSpacing.sm,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="secondary"
              size="sm"
              onPress={() => {
                setHeight('80%');
                setHeightModalOpen(true);
              }}
            >
              80%
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onPress={() => {
                setHeight('85%');
                setHeightModalOpen(true);
              }}
            >
              85%
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onPress={() => {
                setHeight('90%');
                setHeightModalOpen(true);
              }}
            >
              90%
            </Button>
          </View>

          <FilterModal
            visible={heightModalOpen}
            onClose={() => setHeightModalOpen(false)}
            onApply={handleHeightApply}
            title={`Filtros Avançados (${height})`}
            height={height}
          >
            <View style={{ gap: ArenaSpacing.md }}>
              <Text variant="bodyPrimary">
                Modal com altura customizada: {height}
              </Text>
              <Text variant="bodySecondary">
                Use altura maior (90%) para filtros complexos com muitos campos.
              </Text>
            </View>
          </FilterModal>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="FilterModal com Labels Customizados"
        description="Botões com labels personalizados"
        code={WITH_CUSTOM_LABELS_CODE}
        onCopyCode={onCopyCode}
      >
        <View>
          <Button variant="primary" onPress={() => setLabelsModalOpen(true)}>
            Abrir com Labels Customizados
          </Button>
          <FilterModal
            visible={labelsModalOpen}
            onClose={() => setLabelsModalOpen(false)}
            onApply={handleLabelsApply}
            title="Editar Preferências"
            applyButtonLabel="Salvar"
            cancelButtonLabel="Descartar"
          >
            <View style={{ gap: ArenaSpacing.md }}>
              <Text variant="bodyPrimary">
                Botões customizados: "Salvar" e "Descartar"
              </Text>
            </View>
          </FilterModal>
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
