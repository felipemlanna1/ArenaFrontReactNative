import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '../../typesCreateEventScreen';

export interface ReviewStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (data: Partial<CreateEventFormData>) => void;
}
