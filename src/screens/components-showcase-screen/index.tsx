import React from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@/components/text';
import { Symbol } from '@/components/ui/symbol';
import { Logo } from '@/components/ui/logo';
import { AppIcon } from '@/components/ui/app-icon';
import { Button } from '@/components/ui/button';
import { SportsLoading } from '@/components/ui/sports-loading';
import { useComponentsShowcaseScreen } from './useComponentsShowcaseScreen';
import { ComponentsShowcaseScreenProps } from './typesComponentsShowcaseScreen';
import { ComponentSection } from './component-section';
import { ShowcaseItem } from './showcase-item';
import { ShowcaseHeader } from './showcase-header';
import { TextComponentsSection } from './text-components-section';
import { styles } from './stylesComponentsShowcaseScreen';
export const ComponentsShowcaseScreen: React.FC<
  ComponentsShowcaseScreenProps
> = () => {
  const { actions } = useComponentsShowcaseScreen();
  return (
    <SafeAreaView style={styles.container}>
      <ShowcaseHeader onBackPress={actions.handleBackPress} />
      <View style={styles.content}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <TextComponentsSection onCopyCode={actions.handleCopyCode} />
          <ComponentSection title="Brand Components">
            <ShowcaseItem
              label="Symbol"
              description="Símbolo da marca Arena com 6 variantes de cores e tamanhos"
              onCopyCode={actions.handleCopyCode}
              code={`import { Symbol } from '@/components/ui/symbol';
<Symbol size="md" variant="variant1" />
<Symbol size="xs" variant="variant1" />
<Symbol size="sm" variant="variant2" />
<Symbol size="md" variant="variant3" />
<Symbol size="lg" variant="variant4" />
<Symbol size="xl" variant="black" />
<Symbol size="xxl" variant="white" />`}
            >
              <View style={styles.brandShowcase}>
                <View style={styles.brandRow}>
                  <Symbol size="xs" variant="variant1" testID="symbol-xs" />
                  <Symbol size="sm" variant="variant2" testID="symbol-sm" />
                  <Symbol size="md" variant="variant3" testID="symbol-md" />
                  <Symbol size="lg" variant="variant4" testID="symbol-lg" />
                  <Symbol size="xl" variant="black" testID="symbol-xl" />
                  <Symbol size="xxl" variant="white" testID="symbol-xxl" />
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="Logo"
              description="Logo completo da marca Arena com 6 variantes de cores e tamanhos"
              onCopyCode={actions.handleCopyCode}
              code={`import { Logo } from '@/components/ui/logo';
<Logo size="md" variant="variant1" />
<Logo size="xs" variant="variant1" />
<Logo size="sm" variant="variant2" />
<Logo size="md" variant="variant3" />
<Logo size="lg" variant="variant4" />
<Logo size="xl" variant="black" />
<Logo size="xxl" variant="white" />`}
            >
              <View style={styles.brandShowcase}>
                <View style={styles.brandColumn}>
                  <Logo size="xs" variant="variant1" testID="logo-xs" />
                  <Logo size="sm" variant="variant2" testID="logo-sm" />
                  <Logo size="md" variant="variant3" testID="logo-md" />
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="App Icon"
              description="Ícone do aplicativo com fundo laranja e símbolo branco para instalação"
              onCopyCode={actions.handleCopyCode}
              code={`import { AppIcon } from '@/components/ui/app-icon';
<AppIcon size="md" />
<AppIcon size="xs" />
<AppIcon size="sm" />
<AppIcon size="md" />
<AppIcon size="lg" />
<AppIcon size="xl" />
<AppIcon size="xxl" />`}
            >
              <View style={styles.brandShowcase}>
                <View style={styles.brandRow}>
                  <AppIcon size="xs" testID="app-icon-xs" />
                  <AppIcon size="sm" testID="app-icon-sm" />
                  <AppIcon size="md" testID="app-icon-md" />
                  <AppIcon size="lg" testID="app-icon-lg" />
                  <AppIcon size="xl" testID="app-icon-xl" />
                  <AppIcon size="xxl" testID="app-icon-xxl" />
                </View>
              </View>
            </ShowcaseItem>
          </ComponentSection>
          <ComponentSection title="Button Components">
            <ShowcaseItem
              label="Primary & Secondary"
              description="Botões principais e secundários para ações importantes"
              onCopyCode={actions.handleCopyCode}
              code={`import { Button } from '@/components/ui/button';
<Button variant="primary" onPress={handleSave}>
  Salvar Alterações
</Button>
<Button variant="secondary" onPress={handleCancel}>
  Cancelar
</Button>`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonRow}>
                  <Button
                    variant="primary"
                    size="md"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-primary"
                  >
                    Primary
                  </Button>
                  <Button
                    variant="secondary"
                    size="md"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-secondary"
                  >
                    Secondary
                  </Button>
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="Destructive & Success"
              description="Botões para ações destrutivas e confirmações positivas"
              onCopyCode={actions.handleCopyCode}
              code={`import { Button } from '@/components/ui/button';
<Button variant="destructive" onPress={handleDelete}>
  Excluir Item
</Button>
<Button variant="success" onPress={handleApprove}>
  Aprovar
</Button>`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonRow}>
                  <Button
                    variant="destructive"
                    size="md"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-destructive"
                  >
                    Destructive
                  </Button>
                  <Button
                    variant="success"
                    size="md"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-success"
                  >
                    Success
                  </Button>
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="Subtle & Ghost"
              description="Botões discretos para ações secundárias e navegação"
              onCopyCode={actions.handleCopyCode}
              code={`import { Button } from '@/components/ui/button';
<Button variant="subtle" onPress={handleFilter}>
  Filtrar
</Button>
<Button variant="ghost" onPress={handleNavigate}>
  Ver Mais
</Button>`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonRow}>
                  <Button
                    variant="subtle"
                    size="md"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-subtle"
                  >
                    Subtle
                  </Button>
                  <Button
                    variant="ghost"
                    size="md"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-ghost"
                  >
                    Ghost
                  </Button>
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="Tamanhos"
              description="Diferentes tamanhos para diversos contextos de uso"
              onCopyCode={actions.handleCopyCode}
              code={`import { Button } from '@/components/ui/button';
<Button size="xs" variant="primary" onPress={handleAction}>
  Extra Small
</Button>
<Button size="sm" variant="primary" onPress={handleAction}>
  Small
</Button>
<Button size="md" variant="primary" onPress={handleAction}>
  Medium
</Button>
<Button size="lg" variant="primary" onPress={handleAction}>
  Large
</Button>
<Button size="xl" variant="primary" onPress={handleAction}>
  Extra Large
</Button>`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonColumn}>
                  <Button
                    size="xs"
                    variant="primary"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-xs"
                  >
                    XS
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-sm"
                  >
                    SM
                  </Button>
                  <Button
                    size="md"
                    variant="primary"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-md"
                  >
                    MD
                  </Button>
                  <Button
                    size="lg"
                    variant="primary"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-lg"
                  >
                    LG
                  </Button>
                  <Button
                    size="xl"
                    variant="primary"
                    onPress={() => {}}
                    disableAnimations
                    testID="button-xl"
                  >
                    XL
                  </Button>
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="Estados"
              description="Estados de loading e disabled com animações suaves"
              onCopyCode={actions.handleCopyCode}
              code={`import { Button } from '@/components/ui/button';
<Button
  variant="primary"
  loading={isLoading}
  onPress={handleSave}
>
  Salvar
</Button>
<Button
  variant="primary"
  disabled={!isValid}
  onPress={handleSubmit}
>
  Enviar
</Button>`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonRow}>
                  <Button
                    variant="primary"
                    loading={true}
                    loadingText="Carregando..."
                    onPress={() => {}}
                    disableAnimations
                    testID="button-loading"
                  >
                    Loading
                  </Button>
                  <Button
                    variant="primary"
                    disabled={true}
                    onPress={() => {}}
                    disableAnimations
                    testID="button-disabled"
                  >
                    Disabled
                  </Button>
                </View>
              </View>
            </ShowcaseItem>
          </ComponentSection>
          <ComponentSection title="Loading Components">
            <ShowcaseItem
              label="Sports Loading"
              description="Loading customizado com ícones de esportes animados"
              onCopyCode={actions.handleCopyCode}
              code={`import { SportsLoading } from '@/components/ui/sports-loading';
<SportsLoading size="md" animationSpeed="normal" />
<SportsLoading size="lg" orientation="vertical" />
<SportsLoading size="xs" animationSpeed="fast" />
<SportsLoading size="sm" animationSpeed="fast" />`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonColumn}>
                  <SportsLoading
                    size="xs"
                    animationSpeed="normal"
                    testID="sports-loading-xs"
                  />
                  <SportsLoading
                    size="sm"
                    animationSpeed="normal"
                    testID="sports-loading-sm"
                  />
                  <SportsLoading
                    size="md"
                    animationSpeed="normal"
                    testID="sports-loading-md"
                  />
                  <SportsLoading
                    size="lg"
                    animationSpeed="normal"
                    testID="sports-loading-lg"
                  />
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="Orientações"
              description="Loading horizontal e vertical"
              onCopyCode={actions.handleCopyCode}
              code={`import { SportsLoading } from '@/components/ui/sports-loading';
<SportsLoading orientation="horizontal" />
<SportsLoading orientation="vertical" />`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonRow}>
                  <SportsLoading
                    size="md"
                    orientation="horizontal"
                    animationSpeed="normal"
                    testID="sports-loading-horizontal"
                  />
                  <SportsLoading
                    size="md"
                    orientation="vertical"
                    animationSpeed="normal"
                    testID="sports-loading-vertical"
                  />
                </View>
              </View>
            </ShowcaseItem>
            <ShowcaseItem
              label="Velocidades"
              description="Diferentes velocidades de animação"
              onCopyCode={actions.handleCopyCode}
              code={`import { SportsLoading } from '@/components/ui/sports-loading';
<SportsLoading animationSpeed="slow" />
<SportsLoading animationSpeed="normal" />
<SportsLoading animationSpeed="fast" />`}
            >
              <View style={styles.buttonShowcase}>
                <View style={styles.buttonColumn}>
                  <SportsLoading
                    size="md"
                    animationSpeed="slow"
                    testID="sports-loading-slow"
                  />
                  <SportsLoading
                    size="md"
                    animationSpeed="normal"
                    testID="sports-loading-normal"
                  />
                  <SportsLoading
                    size="md"
                    animationSpeed="fast"
                    testID="sports-loading-fast"
                  />
                </View>
              </View>
            </ShowcaseItem>
          </ComponentSection>
          <ComponentSection title="Input Components">
            <ShowcaseItem
              label="Coming Soon"
              description="Componentes de input em desenvolvimento"
            >
              <Text variant="captionMuted">Em breve...</Text>
            </ShowcaseItem>
          </ComponentSection>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
