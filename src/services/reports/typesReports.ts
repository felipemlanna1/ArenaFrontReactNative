export enum ReportReason {
  HARASSMENT = 'HARASSMENT',
  INAPPROPRIATE_CONTENT = 'INAPPROPRIATE_CONTENT',
  SPAM = 'SPAM',
  FAKE_PROFILE = 'FAKE_PROFILE',
  OTHER = 'OTHER',
}

export interface ReportUserDto {
  reportedUserId: string;
  reason: ReportReason;
  description?: string;
}

export interface ReportUserResponse {
  message: string;
}
