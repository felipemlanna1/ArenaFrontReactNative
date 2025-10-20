import {
  CreateEventFormData,
  CreateEventFormErrors,
} from '@/screens/createEventScreen/typesCreateEventScreen';

export interface BasicInfoStepProps {
  formData: CreateEventFormData;
  errors: CreateEventFormErrors;
  onUpdate: (data: Partial<CreateEventFormData>) => void;
  isEditMode?: boolean;
}
