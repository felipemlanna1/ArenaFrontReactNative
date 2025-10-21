import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { SkillLevel } from '@/types/sport';
import { EventPrivacy } from '@/services/events/typesEvents';

export type CreateEventScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateEvent'
>;

export type CreateEventScreenRouteProp = RouteProp<
  RootStackParamList,
  'CreateEvent'
>;

export interface CreateEventScreenProps {
  navigation: CreateEventScreenNavigationProp;
  route?: CreateEventScreenRouteProp;
}

export enum EventType {
  ONE_TIME = 'ONE_TIME',
  RECURRING = 'RECURRING',
}

export enum FormStep {
  BASIC_INFO = 0,
  PRIVACY = 1,
  LOCATION = 2,
  REVIEW = 3,
}

export const TOTAL_STEPS = 4;

export interface EventLocation {
  zipCode: string;
  street: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  latitude?: number; // Opcional - obtido via geocoding
  longitude?: number; // Opcional - obtido via geocoding
  formattedAddress?: string;
}

export interface AgeRestriction {
  min?: number;
  max?: number;
}

export interface DurationOption {
  label: string;
  value: number;
}

export const DURATION_OPTIONS: DurationOption[] = [
  { label: '30 min', value: 30 },
  { label: '1 hora', value: 60 },
  { label: '1h30', value: 90 },
  { label: '2 horas', value: 120 },
  { label: '3 horas', value: 180 },
];

export interface CreateEventFormData {
  title: string;
  sportId: string;
  startDate: Date | null;
  duration: number;
  description?: string;

  privacy: EventPrivacy;
  groupId?: string;

  location: EventLocation;
  maxParticipants: number | null;
  price: number;
  isFree?: boolean;
  coverImage?: string;

  skillLevel?: SkillLevel;
  ageRestriction?: AgeRestriction;
  rules?: string;
  requirements?: string;
}

export interface CreateEventFormErrors {
  title?: string;
  sportId?: string;
  startDate?: string;
  duration?: string;
  description?: string;
  privacy?: string;
  groupId?: string;
  zipCode?: string;
  street?: string;
  number?: string;
  district?: string;
  city?: string;
  state?: string;
  maxParticipants?: string;
  price?: string;
  skillLevel?: string;
  ageMin?: string;
  ageMax?: string;
  rules?: string;
  requirements?: string;
  general?: string;
}

export const DEFAULT_EVENT_VALUES: CreateEventFormData = {
  title: '',
  sportId: '',
  startDate: null,
  duration: 60,
  description: undefined,
  privacy: 'PUBLIC' as EventPrivacy,
  groupId: undefined,
  location: {
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    country: 'Brasil',
    latitude: undefined, // Será obtido via geocoding se disponível
    longitude: undefined, // Será obtido via geocoding se disponível
    formattedAddress: '',
  },
  maxParticipants: null,
  price: 0,
  skillLevel: undefined,
  ageRestriction: undefined,
  rules: undefined,
  requirements: undefined,
};

export interface CreateEventDto {
  title: string;
  description?: string;
  eventType: EventType;
  sportId: string;
  startDate: string;
  endDate: string;
  privacy: EventPrivacy;
  groupId?: string;
  location: {
    zipCode: string;
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
    latitude?: number; // Opcional - obtido via geocoding
    longitude?: number; // Opcional - obtido via geocoding
    formattedAddress?: string;
  };
  price: number;
  currency: string;
  maxParticipants?: number;
  skillLevel?: SkillLevel;
  ageRestriction?: {
    min?: number;
    max?: number;
  };
  rules?: string;
  requirements?: string;
}
