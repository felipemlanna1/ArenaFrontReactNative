import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '@/screens/createEventScreen/typesCreateEventScreen';

export interface PrivacyStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (updates: Partial<CreateEventFormData>) => void;
}
