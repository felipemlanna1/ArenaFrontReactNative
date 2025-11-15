import React, { useState, useEffect, useRef } from 'react';
import { View } from 'react-native';
import { ArenaKeyboardAwareScrollView } from '@/components/ui/arenaKeyboardAwareScrollView';
import { Text } from '@/components/ui/text';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { useLocationAutofill } from '@/screens/createEventScreen/hooks/useLocationAutofill';
import {
  applyCepMask,
  removeMask,
  isCepComplete,
  applyCurrencyMask,
  parseCurrency,
} from '@/utils/masks';
import { LocationStepProps } from './typesLocationStep';
import { styles } from './stylesLocationStep';

export const LocationStep: React.FC<LocationStepProps> = ({
  formData,
  errors,
  onUpdate,
}) => {
  const { isLoadingCep, cepError, fetchAddressByCep } = useLocationAutofill();
  const [hasMaxParticipants, setHasMaxParticipants] = useState(
    formData.maxParticipants !== null
  );
  const [priceDisplay, setPriceDisplay] = useState(
    applyCurrencyMask((formData.price * 100).toString())
  );
  const lastFetchedCepRef = useRef<string>('');

  useEffect(() => {
    const cleanCep = removeMask(formData.location.zipCode);
    if (
      isCepComplete(formData.location.zipCode) &&
      !isLoadingCep &&
      cleanCep !== lastFetchedCepRef.current
    ) {
      lastFetchedCepRef.current = cleanCep;
      const loadAddress = async () => {
        const addressData = await fetchAddressByCep(cleanCep);
        if (addressData) {
          onUpdate({
            location: {
              ...formData.location,
              ...addressData,
              zipCode: applyCepMask(cleanCep),
            },
          });
        }
      };
      loadAddress();
    }
  }, [
    formData.location.zipCode,
    isLoadingCep,
    fetchAddressByCep,
    onUpdate,
    formData.location,
  ]);

  const handleCepChange = (value: string) => {
    const masked = applyCepMask(value);
    if (masked.length <= 9) {
      onUpdate({
        location: { ...formData.location, zipCode: masked },
      });
    }
  };

  const handleMaxParticipantsToggle = (value: boolean) => {
    setHasMaxParticipants(value);
    onUpdate({ maxParticipants: value ? 10 : null });
  };

  const handlePriceChange = (value: string) => {
    const masked = applyCurrencyMask(value);
    setPriceDisplay(masked);
    onUpdate({ price: parseCurrency(masked) });
  };

  return (
    <ArenaKeyboardAwareScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      bottomOffset={60}
    >
      <View style={styles.section}>
        <Input
          label="CEP"
          placeholder="00000-000"
          value={formData.location.zipCode}
          onChangeText={handleCepChange}
          error={errors.zipCode || cepError || undefined}
          keyboardType="numeric"
          maxLength={9}
          editable={!isLoadingCep}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.flex2}>
          <Input
            label="Rua"
            placeholder="Nome da rua"
            value={formData.location.street}
            onChangeText={street =>
              onUpdate({
                location: { ...formData.location, street },
              })
            }
            error={errors.street}
          />
        </View>
        <View style={styles.flex1}>
          <Input
            label="Número"
            placeholder="123"
            value={formData.location.number || ''}
            onChangeText={number =>
              onUpdate({
                location: { ...formData.location, number },
              })
            }
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Input
          label="Bairro"
          placeholder="Bairro"
          value={formData.location.district}
          onChangeText={district =>
            onUpdate({
              location: { ...formData.location, district },
            })
          }
          error={errors.district}
        />
      </View>

      <View style={styles.section}>
        <Input
          label="Ponto de referência"
          placeholder="Ex: Quadra da prefeitura"
          value={formData.location.referencePoint || ''}
          onChangeText={referencePoint =>
            onUpdate({
              location: { ...formData.location, referencePoint },
            })
          }
          maxLength={100}
        />
        <Text variant="captionMuted" style={styles.helpText}>
          Opcional - ajuda a identificar o local
        </Text>
      </View>

      <View style={styles.row}>
        <View style={styles.flex2}>
          <Input
            label="Cidade"
            placeholder="Cidade"
            value={formData.location.city}
            onChangeText={city =>
              onUpdate({
                location: { ...formData.location, city },
              })
            }
            error={errors.city}
          />
        </View>
        <View style={styles.flex1}>
          <Input
            label="UF"
            placeholder="SP"
            value={formData.location.state}
            onChangeText={state =>
              onUpdate({
                location: { ...formData.location, state: state.toUpperCase() },
              })
            }
            error={errors.state}
            maxLength={2}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Switch
          value={hasMaxParticipants}
          onValueChange={handleMaxParticipantsToggle}
          label="Limitar número de participantes"
          labelPosition="right"
          variant="brand"
        />

        {hasMaxParticipants && (
          <Input
            label="Máximo de participantes"
            placeholder="Ex: 10"
            value={formData.maxParticipants?.toString() || ''}
            onChangeText={value =>
              onUpdate({ maxParticipants: parseInt(value) || null })
            }
            error={errors.maxParticipants}
            keyboardType="numeric"
          />
        )}
      </View>

      <View style={styles.section}>
        <Input
          label="Preço por pessoa"
          placeholder="R$ 0,00"
          value={priceDisplay}
          onChangeText={handlePriceChange}
          error={errors.price}
          keyboardType="numeric"
        />
        <Text variant="captionMuted" style={styles.helpText}>
          Deixe em R$ 0,00 para evento gratuito
        </Text>
      </View>
    </ArenaKeyboardAwareScrollView>
  );
};
