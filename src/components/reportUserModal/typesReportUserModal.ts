import { ReportReason } from '@/services/reports';

export interface ReportUserModalProps {
  userId: string;
  isOpen: boolean;
  onClose: () => void;
  onReportSuccess?: () => void;
}

export { ReportReason };
