import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '@/screens/createEventScreen/typesCreateEventScreen';

export interface ReviewStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (data: Partial<CreateEventFormData>) => void;
}
