import { httpService } from '../http';
import {
  CreateBugReportData,
  BugReportResponse,
  BugReportsListResponse,
  BugReport,
} from './typesBugReport';

class BugReportApi {
  private readonly basePath = '/api/v1/bug-reports';

  async submitBugReport(data: CreateBugReportData): Promise<BugReportResponse> {
    return httpService.post<BugReportResponse>(this.basePath, data);
  }

  async getUserBugReports(): Promise<BugReportsListResponse> {
    return httpService.get<BugReportsListResponse>(this.basePath);
  }

  async getBugReportById(id: string): Promise<{ data: BugReport }> {
    return httpService.get<{ data: BugReport }>(`${this.basePath}/${id}`);
  }

  async getStatistics(): Promise<{
    data: {
      total: number;
      byStatus: Record<string, number>;
      byPriority: Record<string, number>;
    };
  }> {
    return httpService.get(`${this.basePath}/statistics`);
  }
}

export const bugReportApi = new BugReportApi();
