import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/typesNavigation';
import { SkillLevel } from '@/types/sport';

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

export enum EventPrivacy {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  FRIENDS_ONLY = 'FRIENDS_ONLY',
}

export enum FormStep {
  BASIC_INFO = 0,
  LOCATION = 1,
  REVIEW = 2,
}

export const TOTAL_STEPS = 3;

export interface EventLocation {
  zipCode: string;
  street: string;
  number?: string;
  complement?: string;
  district: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
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

  location: EventLocation;
  maxParticipants: number | null;
  price: number;
  isFree?: boolean;
  privacy?: string;
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
  location: {
    zipCode: '',
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: '',
    country: 'Brasil',
    latitude: 0,
    longitude: 0,
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
  location: {
    zipCode: string;
    street: string;
    number?: string;
    complement?: string;
    district: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
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
