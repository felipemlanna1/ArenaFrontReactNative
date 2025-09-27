// Arena CodeExample - Tipos TypeScript

export interface CodeExampleProps {
  code: string;
  language?: 'tsx' | 'ts' | 'js' | 'jsx';
  onCopy?: (code: string) => void;
}