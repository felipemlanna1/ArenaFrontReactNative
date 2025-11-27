import React, { useState } from 'react';
import { View } from 'react-native';
import { OptimizedImage } from '@/components/ui/optimizedImage';
import { Text } from '@/components/ui/text';
import { Button } from '@/components/ui/button';
import { ArenaColors } from '@/constants';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface OptimizedImageSectionProps {
  onCopyCode: (code: string) => void;
}

const BASIC_CODE = `import { OptimizedImage } from '@/components/ui/optimizedImage';

<OptimizedImage
  source={require('@/assets/image.png')}
  style={{ width: 200, height: 150 }}
  contentFit="cover"
/>`;

const PRIORITY_CODE = `// High priority - carrega primeiro (hero images, banners)
<OptimizedImage
  source={require('@/assets/hero.png')}
  style={{ width: '100%', height: 200 }}
  contentFit="cover"
  priority="high"
/>

<OptimizedImage
  source={require('@/assets/image.png')}
  priority="normal"
/>

<OptimizedImage
  source={require('@/assets/thumbnail.png')}
  priority="low"
/>`;

const LOADING_CODE = `// Com loading indicator (padrão)
<OptimizedImage
  source={require('@/assets/image.png')}
  showLoading={true}
  loadingSize="md"
/>

<OptimizedImage
  source={require('@/assets/image.png')}
  showLoading={false}
/>`;

const CALLBACKS_CODE = `<OptimizedImage
  source={require('@/assets/image.png')}
  onLoadComplete={() => {}}
  onLoadError={() => {}}
  placeholderColor={ArenaColors.neutral.darkest}
/>`;

const CONTENT_FIT_CODE = `// Cover - preenche o container (padrão para banners)
<OptimizedImage
  source={require('@/assets/image.png')}
  contentFit="cover"
/>

<OptimizedImage
  source={require('@/assets/logo.png')}
  contentFit="contain"
/>

<OptimizedImage
  source={require('@/assets/bg.png')}
  contentFit="fill"
/>`;

const REMOTE_CODE = `// Imagens remotas (URLs)
<OptimizedImage
  source={{ uri: 'https://example.com/image.jpg' }}
  style={{ width: 300, height: 200 }}
  contentFit="cover"
  priority="normal"
/>`;

export const OptimizedImageSection: React.FC<OptimizedImageSectionProps> = ({
  onCopyCode,
}) => {
  const [imageKey, setImageKey] = useState(0);

  const handleReload = () => {
    setImageKey(prev => prev + 1);
  };

  return (
    <ComponentSection title="OptimizedImage">
      <ShowcaseItem
        label="Basic Usage"
        description="SEMPRE use OptimizedImage ao invés de Image do React Native. Inclui caching, loading states e otimizações."
        onCopyCode={onCopyCode}
        code={BASIC_CODE}
      >
        <View style={styles.column}>
          <Text variant="bodySecondary" style={styles.textMarginBottom}>
            Componente obrigatório para todas as imagens na aplicação.
          </Text>
          <OptimizedImage
            key={`basic-${imageKey}`}
            source={{ uri: 'https://picsum.photos/400/300' }}
            style={styles.imageShowcaseMedium}
            contentFit="cover"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Priority Levels"
        description="Controla a prioridade de carregamento das imagens"
        onCopyCode={onCopyCode}
        code={PRIORITY_CODE}
      >
        <View style={styles.column}>
          <View style={styles.gapXs}>
            <Text variant="captionSecondary">High Priority (hero images)</Text>
            <OptimizedImage
              key={`high-${imageKey}`}
              source={{ uri: 'https://picsum.photos/400/200' }}
              style={styles.imageShowcaseFull}
              contentFit="cover"
              priority="high"
            />
          </View>
          <View style={styles.gapXs}>
            <Text variant="captionSecondary">Low Priority (thumbnails)</Text>
            <View style={styles.row}>
              <OptimizedImage
                key={`low1-${imageKey}`}
                source={{ uri: 'https://picsum.photos/100/100' }}
                style={styles.imageShowcaseThumbnail}
                contentFit="cover"
                priority="low"
                loadingSize="xs"
              />
              <OptimizedImage
                key={`low2-${imageKey}`}
                source={{ uri: 'https://picsum.photos/101/101' }}
                style={styles.imageShowcaseThumbnail}
                contentFit="cover"
                priority="low"
                loadingSize="xs"
              />
            </View>
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Loading States"
        description="Controla exibição do loading indicator durante carregamento"
        onCopyCode={onCopyCode}
        code={LOADING_CODE}
      >
        <View style={styles.row}>
          <View style={styles.gapXs}>
            <Text variant="captionSecondary">Com Loading</Text>
            <OptimizedImage
              key={`loading-${imageKey}`}
              source={{ uri: 'https://picsum.photos/150/150' }}
              style={styles.imageShowcaseSmall}
              contentFit="cover"
              showLoading={true}
              loadingSize="md"
            />
          </View>
          <View style={styles.gapXs}>
            <Text variant="captionSecondary">Sem Loading</Text>
            <OptimizedImage
              key={`no-loading-${imageKey}`}
              source={{ uri: 'https://picsum.photos/151/151' }}
              style={styles.imageShowcaseSmall}
              contentFit="cover"
              showLoading={false}
            />
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Content Fit Modes"
        description="Controla como a imagem se ajusta ao container"
        onCopyCode={onCopyCode}
        code={CONTENT_FIT_CODE}
      >
        <View style={styles.column}>
          <View style={styles.gapXs}>
            <Text variant="captionSecondary">Cover (preenche)</Text>
            <OptimizedImage
              key={`cover-${imageKey}`}
              source={{ uri: 'https://picsum.photos/300/200' }}
              style={styles.imageShowcaseCompare}
              contentFit="cover"
            />
          </View>
          <View style={styles.gapXs}>
            <Text variant="captionSecondary">Contain (mantém proporções)</Text>
            <OptimizedImage
              key={`contain-${imageKey}`}
              source={{ uri: 'https://picsum.photos/300/200' }}
              style={styles.imageShowcaseCompare}
              contentFit="contain"
            />
          </View>
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Event Callbacks"
        description="Callbacks para eventos de load e erro (veja console)"
        onCopyCode={onCopyCode}
        code={CALLBACKS_CODE}
      >
        <View style={styles.column}>
          <Button variant="secondary" onPress={handleReload}>
            Recarregar Imagens
          </Button>
          <OptimizedImage
            key={`callback-${imageKey}`}
            source={{ uri: 'https://picsum.photos/250/150' }}
            style={styles.imageShowcaseCallbacks}
            contentFit="cover"
            onLoadComplete={() => {}}
            onLoadError={() => {}}
            placeholderColor={ArenaColors.neutral.darkest}
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Remote Images"
        description="Suporta URLs remotas com caching automático"
        onCopyCode={onCopyCode}
        code={REMOTE_CODE}
      >
        <OptimizedImage
          key={`remote-${imageKey}`}
          source={{ uri: 'https://picsum.photos/300/200' }}
          style={styles.imageShowcaseRemote}
          contentFit="cover"
          priority="normal"
        />
      </ShowcaseItem>
    </ComponentSection>
  );
};
