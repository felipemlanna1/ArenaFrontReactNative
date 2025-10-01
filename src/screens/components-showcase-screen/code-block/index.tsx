import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/text';
import { Button } from '@/components/ui/button';
import { styles } from './stylesCodeBlock';
interface CodeBlockProps {
  code: string;
  onCopy?: (code: string) => void;
}
export const CodeBlock: React.FC<CodeBlockProps> = ({ code, onCopy }) => {
  const handleCopyPress = () => {
    onCopy?.(code);
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="captionSecondary">Código</Text>
        <Button
          onPress={handleCopyPress}
          variant="ghost"
          size="sm"
          style={styles.copyButton}
        >
          Copiar
        </Button>
      </View>
      <View style={styles.codeContainer}>
        <Text variant="captionMuted" style={styles.codeText}>
          {code}
        </Text>
      </View>
    </View>
  );
};
