export interface StarRatingProps {
  value: number;
  onValueChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showLabel?: boolean;
  testID?: string;
}
