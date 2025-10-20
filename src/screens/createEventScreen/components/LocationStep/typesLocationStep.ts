import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '@/screens/createEventScreen/typesCreateEventScreen';

export interface LocationStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (data: Partial<CreateEventFormData>) => void;
}
