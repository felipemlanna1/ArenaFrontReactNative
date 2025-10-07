import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '../../typesCreateEventScreen';

export interface LocationStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (data: Partial<CreateEventFormData>) => void;
}
