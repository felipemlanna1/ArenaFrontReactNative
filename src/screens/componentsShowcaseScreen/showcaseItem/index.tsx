import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { ShowcaseItemProps } from '../typesComponentsShowcaseScreen';
import { CodeBlock } from '../codeBlock';
import { styles } from './stylesShowcaseItem';
export const ShowcaseItem: React.FC<ShowcaseItemProps> = ({
  label,
  description,
  children,
  code,
  showCode = true,
  onCopyCode,
}) => {
  return (
    <View style={styles.showcaseItem}>
      <View style={styles.showcaseHeader}>
        <Text variant="bodyPrimary">{label}</Text>
        {description && <Text variant="captionSecondary">{description}</Text>}
      </View>
      <View style={styles.showcaseContent}>{children}</View>
      {code && showCode && <CodeBlock code={code} onCopy={onCopyCode} />}
    </View>
  );
};
