import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  IBGECity,
  UseCityDropdownProps,
  UseCityDropdownReturn,
} from './typesCityDropdown';

const IBGE_API_BASE =
  'https://servicodados.ibge.gov.br/api/v1/localidades/estados';

export const useCityDropdown = ({
  stateUF,
  value,
  onChange,
  disabled = false,
}: UseCityDropdownProps): UseCityDropdownReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchCities = useCallback(async (uf: string) => {
    setIsLoading(true);
    setLoadError(null);

    try {
      const response = await fetch(`${IBGE_API_BASE}/${uf}/municipios`);

      if (!response.ok) {
        throw new Error('Falha ao carregar cidades');
      }

      const data: IBGECity[] = await response.json();
      const cityNames = data.map(city => city.nome).sort();
      setCities(cityNames);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Erro ao carregar cidades';
      setLoadError(errorMessage);
      setCities([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (stateUF) {
      fetchCities(stateUF);
    } else {
      setCities([]);
      setLoadError(null);
    }
  }, [stateUF, fetchCities]);

  const openModal = useCallback(() => {
    if (!disabled && stateUF && !isLoading) {
      setIsOpen(true);
      setSearchQuery('');
    }
  }, [disabled, stateUF, isLoading]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, []);

  const selectCity = useCallback(
    (city: string) => {
      onChange(city);
      closeModal();
    },
    [onChange, closeModal]
  );

  const filteredCities = useMemo(() => {
    if (!searchQuery.trim()) {
      return cities;
    }

    const query = searchQuery.toLowerCase().trim();
    return cities.filter(city => city.toLowerCase().includes(query));
  }, [cities, searchQuery]);

  return {
    isOpen,
    cities,
    isLoading,
    loadError,
    openModal,
    closeModal,
    selectCity,
    searchQuery,
    setSearchQuery,
    filteredCities,
  };
};
