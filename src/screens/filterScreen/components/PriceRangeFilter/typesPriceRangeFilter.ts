export interface PriceRangeFilterProps {
  priceMin: number | null;
  priceMax: number | null;
  isFree: boolean;
  onPriceMinChange: (value: number | null) => void;
  onPriceMaxChange: (value: number | null) => void;
  onIsFreeChange: (value: boolean) => void;
  testID?: string;
}

export interface UsePriceRangeFilterProps {
  priceMin: number | null;
  priceMax: number | null;
  onPriceMinChange: (value: number | null) => void;
  onPriceMaxChange: (value: number | null) => void;
}

export interface UsePriceRangeFilterReturn {
  formattedMin: string;
  formattedMax: string;
  handleMinChange: (text: string) => void;
  handleMaxChange: (text: string) => void;
  hasError: boolean;
  errorMessage: string;
}
