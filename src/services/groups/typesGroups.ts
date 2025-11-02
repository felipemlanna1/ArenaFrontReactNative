export type GroupPrivacyType = 'INVITE_ONLY' | 'APPROVAL_REQUIRED';

export type GroupUserRole = 'OWNER' | 'ADMIN' | 'MODERATOR' | 'MEMBER';

export type GroupMembershipStatus =
  | 'NONE'
  | 'MEMBER'
  | 'INVITED'
  | 'PENDING_APPROVAL';

export type GroupUserAction =
  | 'VIEW_GROUP'
  | 'REQUEST_JOIN'
  | 'ACCEPT_INVITE'
  | 'CANCEL_REQUEST'
  | 'CREATE_EVENTS'
  | 'LEAVE_GROUP'
  | 'MANAGE_MEMBERS'
  | 'INVITE_MEMBERS'
  | 'EDIT_GROUP';

export interface Sport {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface GroupUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  isActive: boolean;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: GroupUserRole;
  isActive: boolean;
  joinedAt: string;
  user?: GroupUser;
  group?: Group;
  username?: string;
  avatarUrl?: string;
}

export interface GroupMemberPreview {
  userId: string;
  username: string;
  avatarUrl?: string;
  role: GroupUserRole;
}

export interface Group {
  id: string;
  name: string;
  description?: string;
  coverImage?: string;
  avatar?: string;
  ownerId: string;
  owner?: GroupUser;
  isPublic: boolean;
  isActive: boolean;
  city?: string;
  state?: string;
  maxMembers?: number;
  rules?: string[];
  createdAt: string;
  updatedAt: string;

  sports: Sport[];
  memberCount: number;
  members?: GroupMember[];

  currentUserRole?: GroupUserRole;
  currentUserStatus?: GroupMembershipStatus;
  availableActions?: GroupUserAction[];

  memberPreview?: GroupMemberPreview[];
}

export interface CreateGroupDto {
  name: string;
  description?: string;
  sportIds: string[];
  isPublic: boolean;
  city?: string;
  state?: string;
  maxMembers?: number;
  rules?: string[];
  coverImage?: string;
  avatar?: string;
}

export interface UpdateGroupDto {
  name?: string;
  description?: string;
  sportIds?: string[];
  isPublic?: boolean;
  city?: string;
  state?: string;
  maxMembers?: number;
  rules?: string[];
  coverImage?: string;
  avatar?: string;
}

export interface AddMemberDto {
  userId: string;
  role?: GroupUserRole;
}

export interface UpdateMemberRoleDto {
  role: GroupUserRole;
}

export interface PaginatedGroupsResponse {
  data: Group[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GroupSearchOptions {
  search?: string;
  sportId?: string;
  city?: string;
  state?: string;
  page?: number;
  limit?: number;
}

export interface GroupStats {
  memberCount: number;
  eventsCount: number;
  weeklyActivity?: number;
  avgAge?: number;
  experienceLevel?: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
}

export interface GroupStatistics {
  eventsPerMonth: number;
  memberGrowthRate: number;
  participationRate: number;
  activeSportsCount: number;
  totalEvents: number;
  totalMembers: number;
  recentEvents: number;
  newMembers: number;
}
