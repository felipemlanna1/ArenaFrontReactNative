import { bugReportApi } from './bugReportApi';
import {
  CreateBugReportData,
  BugReportResponse,
  BugReportsListResponse,
} from './typesBugReport';

class BugReportService {
  submitBugReport = async (
    data: CreateBugReportData
  ): Promise<BugReportResponse> => {
    return bugReportApi.submitBugReport(data);
  };

  getUserBugReports = async (): Promise<BugReportsListResponse> => {
    return bugReportApi.getUserBugReports();
  };

  getBugReportById = async (id: string) => {
    return bugReportApi.getBugReportById(id);
  };

  getStatistics = async () => {
    return bugReportApi.getStatistics();
  };
}

export const bugReportService = new BugReportService();
