export interface CodeExampleProps {
  code: string;
  language?: 'tsx' | 'ts' | 'js' | 'jsx' | 'javascript';
  onCopy?: (code: string) => void;
}
