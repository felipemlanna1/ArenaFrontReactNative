import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '../../typesCreateEventScreen';

export interface PrivacyStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (updates: Partial<CreateEventFormData>) => void;
}
