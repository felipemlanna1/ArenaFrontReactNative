import { BugReportPriority } from '@/services/bugReport/typesBugReport';

export interface BugReportModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface BugReportFormData {
  title: string;
  description: string;
  steps: string;
  expectedBehavior: string;
  actualBehavior: string;
  priority: BugReportPriority;
  screenshots: string[];
  videos: string[];
}

export interface BugReportFormErrors {
  title?: string;
  description?: string;
  steps?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  priority?: string;
  screenshots?: string;
  videos?: string;
}
