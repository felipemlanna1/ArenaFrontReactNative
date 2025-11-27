import { httpService } from '../http';
import { ReportUserDto, ReportUserResponse } from './typesReports';

class ReportsApi {
  async reportUser(data: ReportUserDto): Promise<ReportUserResponse> {
    const response = await httpService.post<ReportUserResponse>(
      '/reports/user',
      data
    );
    return response;
  }
}

export const reportsApi = new ReportsApi();
