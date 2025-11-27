const API_BASE_URL =
  'https://backsportpulsemobile-production.up.railway.app/api/v1';

export interface CreateEventPayload {
  title: string;
  description?: string;
  sportId: string;
  date: string;
  time: string;
  duration: number;
  maxParticipants?: number;
  privacy: 'PUBLIC' | 'PRIVATE' | 'FRIENDS_ONLY';
  address: string;
  city: string;
  state: string;
  lat?: number;
  lng?: number;
  groupId?: string;
}

export interface CreateGroupPayload {
  name: string;
  description: string;
  sportIds: string[];
  city: string;
  state: string;
  isPublic: boolean;
  maxMembers?: number;
  coverImage?: string;
  rules?: string[];
}

export interface CreatedEvent {
  id: string;
  title: string;
  sportId: string;
  organizerId: string;
  date: string;
  time: string;
  duration: number;
  maxParticipants: number;
  privacy: string;
  address: string;
  city: string;
  state: string;
  createdAt: string;
}

export interface CreatedGroup {
  id: string;
  name: string;
  description: string;
  sportIds: string[];
  city: string;
  state: string;
  isPublic: boolean;
  maxMembers?: number;
  createdAt: string;
}

async function authenticatedRequest(
  endpoint: string,
  accessToken: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
  return response;
}

async function extractData<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = errorText;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || errorText;
    } catch {
      errorMessage = errorText;
    }
    throw new Error(`API request failed: ${response.status} - ${errorMessage}`);
  }

  const responseData = await response.json();

  const data = responseData.data || responseData;

  return data as T;
}

export async function createTestEvent(
  accessToken: string,
  payload: CreateEventPayload
): Promise<CreatedEvent> {
  const response = await authenticatedRequest(
    '/events',
    accessToken,
    'POST',
    payload
  );
  const event = await extractData<CreatedEvent>(response);

  return event;
}

export function generateEventPayload(
  overrides?: Partial<CreateEventPayload>
): CreateEventPayload {
  const timestamp = Date.now();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    title: `Evento Teste ${timestamp}`,
    description: `Descrição do evento de teste ${timestamp}`,
    sportId: 'sport-id-placeholder',
    date: tomorrow.toISOString().split('T')[0],
    time: '18:00',
    duration: 120,
    maxParticipants: 20,
    privacy: 'PUBLIC',
    address: 'Rua Teste, 123',
    city: 'São Paulo',
    state: 'SP',
    ...overrides,
  };
}

export async function deleteTestEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  const response = await authenticatedRequest(
    `/events/${eventId}`,
    accessToken,
    'DELETE'
  );

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete event: ${response.status}`);
  }
}

export async function createTestGroup(
  accessToken: string,
  payload: CreateGroupPayload
): Promise<CreatedGroup> {
  const response = await authenticatedRequest(
    '/groups',
    accessToken,
    'POST',
    payload
  );
  const group = await extractData<CreatedGroup>(response);

  return group;
}

export function generateGroupPayload(
  overrides?: Partial<CreateGroupPayload>
): CreateGroupPayload {
  const timestamp = Date.now();

  return {
    name: `Grupo Teste ${timestamp}`,
    description: `Descrição do grupo de teste ${timestamp}`,
    sportIds: ['sport-id-placeholder'],
    city: 'São Paulo',
    state: 'SP',
    isPublic: true,
    maxMembers: 50,
    ...overrides,
  };
}

export async function deleteTestGroup(
  accessToken: string,
  groupId: string
): Promise<void> {
  const response = await authenticatedRequest(
    `/groups/${groupId}`,
    accessToken,
    'DELETE'
  );

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete group: ${response.status}`);
  }
}

export async function joinEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  const response = await authenticatedRequest(
    `/events/${eventId}/participants`,
    accessToken,
    'POST'
  );

  await extractData(response);
}

export async function leaveEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  const response = await authenticatedRequest(
    `/events/${eventId}/participants`,
    accessToken,
    'DELETE'
  );

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to leave event: ${response.status}`);
  }
}

export async function joinGroup(
  accessToken: string,
  groupId: string
): Promise<void> {
  const response = await authenticatedRequest(
    `/groups/${groupId}/members`,
    accessToken,
    'POST'
  );

  await extractData(response);
}

export async function leaveGroup(
  accessToken: string,
  groupId: string
): Promise<void> {
  const response = await authenticatedRequest(
    `/groups/${groupId}/members`,
    accessToken,
    'DELETE'
  );

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to leave group: ${response.status}`);
  }
}

export async function setupEventScenario(
  organizerToken: string,
  participantToken: string,
  eventOverrides?: Partial<CreateEventPayload>
): Promise<{
  event: CreatedEvent;
  organizerToken: string;
  participantToken: string;
}> {
  const eventPayload = generateEventPayload(eventOverrides);
  const event = await createTestEvent(organizerToken, eventPayload);

  await joinEvent(participantToken, event.id);

  return {
    event,
    organizerToken,
    participantToken,
  };
}

export async function setupGroupScenario(
  adminToken: string,
  memberToken: string,
  groupOverrides?: Partial<CreateGroupPayload>
): Promise<{
  group: CreatedGroup;
  adminToken: string;
  memberToken: string;
}> {
  const groupPayload = generateGroupPayload(groupOverrides);
  const group = await createTestGroup(adminToken, groupPayload);

  await joinGroup(memberToken, group.id);

  return {
    group,
    adminToken,
    memberToken,
  };
}

export async function cleanupEventScenario(
  organizerToken: string,
  eventId: string
): Promise<void> {
  try {
    await deleteTestEvent(organizerToken, eventId);
  } catch {
    return;
  }
}

export async function cleanupGroupScenario(
  adminToken: string,
  groupId: string
): Promise<void> {
  try {
    await deleteTestGroup(adminToken, groupId);
  } catch {
    return;
  }
}
