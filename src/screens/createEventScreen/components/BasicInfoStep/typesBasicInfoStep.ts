import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '../../typesCreateEventScreen';

export interface BasicInfoStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (data: Partial<CreateEventFormData>) => void;
}
