export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
export type EventPrivacy = 'PUBLIC' | 'PRIVATE' | 'FRIENDS_ONLY';
export type SkillLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'PROFESSIONAL'
  | 'ALL';
export type UserEventStatus =
  | 'ORGANIZER'
  | 'ADMIN'
  | 'PARTICIPANT'
  | 'INVITED'
  | 'REQUESTED'
  | 'NONE';

export type ParticipantStatus =
  | 'CONFIRMED'
  | 'PENDING'
  | 'INVITED'
  | 'DECLINED';

export interface EventLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  placeId?: string;
}

export interface EventSport {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface EventUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email?: string;
  profilePicture?: string;
  bio?: string;
  isActive: boolean;
}

export interface EventParticipant {
  id: string;
  eventId: string;
  userId: string;
  status: ParticipantStatus;
  joinedAt: string;
  updatedAt: string;
  note?: string;
  invitedBy?: string | null;
  isNotified: boolean;
  user: EventUser;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  sport: EventSport;
  location: EventLocation;
  startDate: string;
  endDate: string;
  price: number | string;
  isFree: boolean;
  maxParticipants: number;
  currentParticipants: number;
  availableSpots: number;
  skillLevel: SkillLevel;
  privacy: EventPrivacy;
  status: EventStatus;
  distance?: number;
  userEventStatus?: UserEventStatus;
  hasCheckedIn?: boolean;
  invitationId?: string;
  coverImage?: string;
  organizerId: string;
  organizerName?: string;
  organizerAvatar?: string;
  organizer?: EventUser;
  participants?: EventParticipant[];
  createdAt: string;
  updatedAt: string;
}

export interface EventsFilter {
  search?: string;
  sportIds?: string[];
  skillLevel?: SkillLevel[];
  privacy?: EventPrivacy[];
  startDateFrom?: string;
  startDateTo?: string;
  status?: EventStatus[];
  priceMin?: number;
  priceMax?: number;
  isFree?: boolean;
  hasAvailableSpots?: boolean;
  city?: string;
  state?: string;
  eventFilter?: 'all' | 'organizing' | 'participating' | 'invited';
  userEventStatus?: UserEventStatus[];
  limit?: number;
  sortBy?: 'date' | 'distance' | 'price' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalPages: number;
  totalItems: number;
  hasMore: boolean;
}

export interface EventsResponse {
  data: Event[];
  pagination: PaginationInfo;
}
