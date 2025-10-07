import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Fab } from '@/components/ui/fab';
import { ArenaColors } from '@/constants';
import { ComponentSection } from '../componentSection';
import { ShowcaseItem } from '../showcaseItem';
import { styles } from '../stylesComponentsShowcaseScreen';

interface FabSectionProps {
  onCopyCode: (code: string) => void;
}

export const FabSection: React.FC<FabSectionProps> = ({ onCopyCode }) => {
  return (
    <ComponentSection title="Floating Action Button">
      <ShowcaseItem
        label="Sizes"
        description="Small, medium and large FAB sizes"
        onCopyCode={onCopyCode}
        code={`import { Fab } from '@/components/ui/fab';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ArenaColors } from '@/constants';

<Fab
  size="sm"
  onPress={handleAction}
  icon={<Ionicons name="add" size={20} color={ArenaColors.neutral.light} />}
/>

<Fab
  size="md"
  onPress={handleAction}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>

<Fab
  size="lg"
  onPress={handleAction}
  icon={<Ionicons name="add" size={28} color={ArenaColors.neutral.light} />}
/>`}
      >
        <View style={styles.fabShowcase}>
          <Fab
            size="sm"
            onPress={() => {}}
            icon={<Ionicons name="add" size={20} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
          <Fab
            size="md"
            onPress={() => {}}
            icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
          <Fab
            size="lg"
            onPress={() => {}}
            icon={<Ionicons name="add" size={28} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Variants"
        description="Primary and secondary variants"
        onCopyCode={onCopyCode}
        code={`<Fab
  variant="primary"
  onPress={handleAction}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>

<Fab
  variant="secondary"
  onPress={handleAction}
  icon={<Ionicons name="create" size={24} color={ArenaColors.neutral.light} />}
/>`}
      >
        <View style={styles.fabShowcase}>
          <Fab
            variant="primary"
            onPress={() => {}}
            icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
          <Fab
            variant="secondary"
            onPress={() => {}}
            icon={<Ionicons name="create" size={24} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Different Icons"
        description="FAB with various icon types"
        onCopyCode={onCopyCode}
        code={`<Fab
  onPress={handleAdd}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>

<Fab
  onPress={handleEdit}
  icon={<Ionicons name="create" size={24} color={ArenaColors.neutral.light} />}
/>

<Fab
  onPress={handleCamera}
  icon={<Ionicons name="camera" size={24} color={ArenaColors.neutral.light} />}
/>`}
      >
        <View style={styles.fabShowcase}>
          <Fab
            onPress={() => {}}
            icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
          <Fab
            onPress={() => {}}
            icon={<Ionicons name="create" size={24} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
          <Fab
            onPress={() => {}}
            icon={<Ionicons name="camera" size={24} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
        </View>
      </ShowcaseItem>

      <ShowcaseItem
        label="Disabled State"
        description="FAB in disabled state"
        onCopyCode={onCopyCode}
        code={`<Fab
  disabled
  onPress={handleAction}
  icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
/>`}
      >
        <View style={styles.fabShowcase}>
          <Fab
            disabled
            onPress={() => {}}
            icon={<Ionicons name="add" size={24} color={ArenaColors.neutral.light} />}
            position="bottom-center"
          />
        </View>
      </ShowcaseItem>
    </ComponentSection>
  );
};
