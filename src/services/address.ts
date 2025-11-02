import { httpService } from './http';

export interface CepData {
  cep: string;
  state: string;
  city: string;
  district?: string;
  street?: string;
  service: string;
  latitude?: number;
  longitude?: number;
  coordinateAccuracy?: 'high' | 'medium' | 'low';
}

interface CepResponse {
  data: CepData;
  message: string;
}

class AddressService {
  async searchCep(cep: string): Promise<CepData> {
    try {
      const cleanCep = cep.replace(/\D/g, '');

      if (!cleanCep || cleanCep.length !== 8) {
        throw new Error('CEP deve ter 8 dígitos');
      }

      const response = await httpService.get<CepResponse>(
        `/address/cep/${cleanCep}`
      );

      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao buscar CEP');
    }
  }
}

export const addressService = new AddressService();

export const searchCep = (cep: string) => addressService.searchCep(cep);
