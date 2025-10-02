import React from 'react';
import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Text } from '@/components/ui/text';
import { PriceRangeFilterProps } from './typesPriceRangeFilter';
import { usePriceRangeFilter } from './usePriceRangeFilter';
import { styles } from './stylesPriceRangeFilter';

export const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  priceMin,
  priceMax,
  isFree,
  onPriceMinChange,
  onPriceMaxChange,
  onIsFreeChange,
  testID = 'price-range-filter',
}) => {
  const {
    formattedMin,
    formattedMax,
    handleMinChange,
    handleMaxChange,
    hasError,
    errorMessage,
  } = usePriceRangeFilter({
    priceMin,
    priceMax,
    onPriceMinChange,
    onPriceMaxChange,
  });

  return (
    <View style={styles.container} testID={testID}>
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Input
            label="Mínimo"
            value={formattedMin}
            onChangeText={handleMinChange}
            keyboardType="numeric"
            placeholder="R$ 0"
            testID={`${testID}-min`}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Input
            label="Máximo"
            value={formattedMax}
            onChangeText={handleMaxChange}
            keyboardType="numeric"
            placeholder="R$ 1000"
            testID={`${testID}-max`}
          />
        </View>
      </View>

      {hasError && (
        <Text variant="captionError" style={styles.errorText}>
          {errorMessage}
        </Text>
      )}

      <Checkbox
        checked={isFree}
        onPress={() => onIsFreeChange(!isFree)}
        label="Apenas eventos gratuitos"
        testID={`${testID}-free`}
      />
    </View>
  );
};
