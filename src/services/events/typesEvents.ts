// Event lifecycle status
export type EventStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ONGOING'
  | 'COMPLETED'
  | 'CANCELLED';

// Event privacy/visibility types (matches backend EventPrivacy enum)
export type EventPrivacy =
  | 'PUBLIC' // Aberto a qualquer usuário
  | 'GROUP_ONLY' // Apenas membros do grupo
  | 'APPROVAL_REQUIRED' // Requer aprovação do organizador
  | 'INVITE_ONLY'; // Apenas convidados

// Skill levels for events
export type SkillLevel =
  | 'BEGINNER'
  | 'INTERMEDIATE'
  | 'ADVANCED'
  | 'EXPERT'
  | 'ALL';

// User's relationship with an event (frontend computed status)
export type UserEventStatus =
  | 'NONE' // Sem relação com o evento
  | 'PARTICIPANT' // Participante confirmado
  | 'PENDING_REQUEST' // Solicitação pendente (APPROVAL_REQUIRED)
  | 'INVITED' // Foi convidado (INVITE_ONLY)
  | 'ORGANIZER' // Organizador do evento
  | 'ADMIN'; // Owner/Admin (ownerIds)

// Participant status in event (matches backend ParticipantStatus enum)
export type ParticipantStatus =
  | 'CONFIRMED' // Participante confirmado (conta em currentParticipants)
  | 'PENDING' // Aguardando aprovação (APPROVAL_REQUIRED)
  | 'INVITED' // Foi convidado mas não aceitou (INVITE_ONLY)
  | 'CANCELLED' // Cancelou participação
  | 'REJECTED'; // Foi rejeitado pelo organizador

// Invitation status (matches backend InvitationStatus enum)
export type InvitationStatus =
  | 'PENDING' // Convite enviado, aguardando resposta
  | 'ACCEPTED' // Convite aceito
  | 'REJECTED'; // Convite recusado

export interface EventLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  placeId?: string;
  zipCode?: string;
  street?: string;
  number?: string;
  complement?: string;
  district?: string;
  formattedAddress?: string;
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

export interface EventGroup {
  id: string;
  name: string;
  description?: string;
  image?: string;
  membersCount: number;
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

export interface EventInvitation {
  id: string;
  eventId: string;
  invitedUserId: string;
  invitedByUserId: string;
  status: InvitationStatus;
  message?: string;
  createdAt: string;
  respondedAt?: string;
  user?: EventUser;
  invitedBy?: EventUser;
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

  // Privacy-related fields
  groupId?: string; // Required for GROUP_ONLY events
  group?: EventGroup; // Populated group data
  ownerIds?: string[]; // Event admins/owners (max 5)

  // Frontend computed fields
  distance?: number;
  userEventStatus?: UserEventStatus;
  hasCheckedIn?: boolean;
  invitationId?: string;
  pendingParticipantsCount?: number; // For APPROVAL_REQUIRED management

  // Media
  coverImage?: string;

  // Organizer info
  organizerId: string;
  organizerName?: string;
  organizerAvatar?: string;
  organizer?: EventUser;

  // Relations
  participants?: EventParticipant[];

  // Timestamps
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
