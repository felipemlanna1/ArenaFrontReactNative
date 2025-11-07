import { DeviceInfo } from '@/utils/deviceInfo';

export enum BugReportPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export enum BugReportStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
}

export interface BugReport {
  id: string;
  userId: string;
  title: string;
  description: string;
  steps?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  priority: BugReportPriority;
  status: BugReportStatus;
  screenshots?: string[];
  videos?: string[];
  deviceInfo: DeviceInfo;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBugReportData {
  title: string;
  description: string;
  steps?: string;
  expectedBehavior?: string;
  actualBehavior?: string;
  priority?: BugReportPriority;
  screenshots?: string[];
  videos?: string[];
  deviceInfo: DeviceInfo;
}

export interface BugReportResponse {
  data: BugReport;
  message: string;
}

export interface BugReportsListResponse {
  data: BugReport[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}
