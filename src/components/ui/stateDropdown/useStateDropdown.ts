import { useState, useCallback, useMemo } from 'react';
import {
  BrazilianState,
  UseStateDropdownProps,
  UseStateDropdownReturn,
} from './typesStateDropdown';

const BRAZILIAN_STATES: BrazilianState[] = [
  { uf: 'AC', name: 'Acre' },
  { uf: 'AL', name: 'Alagoas' },
  { uf: 'AP', name: 'Amapá' },
  { uf: 'AM', name: 'Amazonas' },
  { uf: 'BA', name: 'Bahia' },
  { uf: 'CE', name: 'Ceará' },
  { uf: 'DF', name: 'Distrito Federal' },
  { uf: 'ES', name: 'Espírito Santo' },
  { uf: 'GO', name: 'Goiás' },
  { uf: 'MA', name: 'Maranhão' },
  { uf: 'MT', name: 'Mato Grosso' },
  { uf: 'MS', name: 'Mato Grosso do Sul' },
  { uf: 'MG', name: 'Minas Gerais' },
  { uf: 'PA', name: 'Pará' },
  { uf: 'PB', name: 'Paraíba' },
  { uf: 'PR', name: 'Paraná' },
  { uf: 'PE', name: 'Pernambuco' },
  { uf: 'PI', name: 'Piauí' },
  { uf: 'RJ', name: 'Rio de Janeiro' },
  { uf: 'RN', name: 'Rio Grande do Norte' },
  { uf: 'RS', name: 'Rio Grande do Sul' },
  { uf: 'RO', name: 'Rondônia' },
  { uf: 'RR', name: 'Roraima' },
  { uf: 'SC', name: 'Santa Catarina' },
  { uf: 'SP', name: 'São Paulo' },
  { uf: 'SE', name: 'Sergipe' },
  { uf: 'TO', name: 'Tocantins' },
];

export const useStateDropdown = ({
  value,
  onChange,
  disabled = false,
}: UseStateDropdownProps): UseStateDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedState = useMemo(
    () => BRAZILIAN_STATES.find(state => state.uf === value),
    [value]
  );

  const openModal = useCallback(() => {
    if (!disabled) {
      setIsOpen(true);
    }
  }, [disabled]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectState = useCallback(
    (uf: string) => {
      onChange(uf);
      closeModal();
    },
    [onChange, closeModal]
  );

  return {
    isOpen,
    selectedState,
    states: BRAZILIAN_STATES,
    openModal,
    closeModal,
    selectState,
  };
};
