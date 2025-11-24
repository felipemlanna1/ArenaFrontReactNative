/**
 * Test Data Factory
 *
 * Helper functions para criar dados de teste (eventos, grupos) via API.
 * Permite setup rápido de cenários multi-user.
 */

const API_BASE_URL = 'https://backsportpulsemobile-production.up.railway.app/api/v1';

// ========================================
// INTERFACES
// ========================================

export interface CreateEventPayload {
  title: string;
  description?: string;
  sportId: string;
  date: string; // ISO 8601
  time: string; // HH:MM
  duration: number; // minutes
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

// ========================================
// API HELPERS
// ========================================

/**
 * Faz requisição autenticada para a API
 */
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

/**
 * Extrai dados da resposta (lida com envelope {data: ...})
 */
async function extractData<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = errorText;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || errorText;
    } catch {
      // Keep errorText as is
    }
    throw new Error(`API request failed: ${response.status} - ${errorMessage}`);
  }

  const responseData = await response.json();

  // Extract from envelope if present
  const data = responseData.data || responseData;

  return data as T;
}

// ========================================
// EVENT CREATION
// ========================================

/**
 * Cria um evento via API
 */
export async function createTestEvent(
  accessToken: string,
  payload: CreateEventPayload
): Promise<CreatedEvent> {
  console.log(`📝 Creating test event: "${payload.title}"...`);

  const response = await authenticatedRequest('/events', accessToken, 'POST', payload);
  const event = await extractData<CreatedEvent>(response);

  console.log(`✅ Event created with ID: ${event.id}`);
  return event;
}

/**
 * Gera payload de evento de teste com valores padrão
 */
export function generateEventPayload(overrides?: Partial<CreateEventPayload>): CreateEventPayload {
  const timestamp = Date.now();
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return {
    title: `Evento Teste ${timestamp}`,
    description: `Descrição do evento de teste ${timestamp}`,
    sportId: 'sport-id-placeholder', // TODO: Get real sport ID from API or hardcode known IDs
    date: tomorrow.toISOString().split('T')[0], // YYYY-MM-DD
    time: '18:00',
    duration: 120, // 2 hours
    maxParticipants: 20,
    privacy: 'PUBLIC',
    address: 'Rua Teste, 123',
    city: 'São Paulo',
    state: 'SP',
    ...overrides,
  };
}

/**
 * Deleta evento via API (cleanup)
 */
export async function deleteTestEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  console.log(`🗑️  Deleting test event: ${eventId}...`);

  const response = await authenticatedRequest(`/events/${eventId}`, accessToken, 'DELETE');

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete event: ${response.status}`);
  }

  console.log(`✅ Event deleted: ${eventId}`);
}

// ========================================
// GROUP CREATION
// ========================================

/**
 * Cria um grupo via API
 */
export async function createTestGroup(
  accessToken: string,
  payload: CreateGroupPayload
): Promise<CreatedGroup> {
  console.log(`📝 Creating test group: "${payload.name}"...`);

  const response = await authenticatedRequest('/groups', accessToken, 'POST', payload);
  const group = await extractData<CreatedGroup>(response);

  console.log(`✅ Group created with ID: ${group.id}`);
  return group;
}

/**
 * Gera payload de grupo de teste com valores padrão
 */
export function generateGroupPayload(overrides?: Partial<CreateGroupPayload>): CreateGroupPayload {
  const timestamp = Date.now();

  return {
    name: `Grupo Teste ${timestamp}`,
    description: `Descrição do grupo de teste ${timestamp}`,
    sportIds: ['sport-id-placeholder'], // TODO: Get real sport IDs
    city: 'São Paulo',
    state: 'SP',
    isPublic: true,
    maxMembers: 50,
    ...overrides,
  };
}

/**
 * Deleta grupo via API (cleanup)
 */
export async function deleteTestGroup(
  accessToken: string,
  groupId: string
): Promise<void> {
  console.log(`🗑️  Deleting test group: ${groupId}...`);

  const response = await authenticatedRequest(`/groups/${groupId}`, accessToken, 'DELETE');

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to delete group: ${response.status}`);
  }

  console.log(`✅ Group deleted: ${groupId}`);
}

// ========================================
// PARTICIPANT ACTIONS
// ========================================

/**
 * Entra em evento (join)
 */
export async function joinEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  console.log(`📝 Joining event: ${eventId}...`);

  const response = await authenticatedRequest(
    `/events/${eventId}/participants`,
    accessToken,
    'POST'
  );

  await extractData(response);

  console.log(`✅ Joined event: ${eventId}`);
}

/**
 * Sai de evento (leave)
 */
export async function leaveEvent(
  accessToken: string,
  eventId: string
): Promise<void> {
  console.log(`📝 Leaving event: ${eventId}...`);

  const response = await authenticatedRequest(
    `/events/${eventId}/participants`,
    accessToken,
    'DELETE'
  );

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to leave event: ${response.status}`);
  }

  console.log(`✅ Left event: ${eventId}`);
}

// ========================================
// GROUP MEMBER ACTIONS
// ========================================

/**
 * Entra em grupo (join)
 */
export async function joinGroup(
  accessToken: string,
  groupId: string
): Promise<void> {
  console.log(`📝 Joining group: ${groupId}...`);

  const response = await authenticatedRequest(
    `/groups/${groupId}/members`,
    accessToken,
    'POST'
  );

  await extractData(response);

  console.log(`✅ Joined group: ${groupId}`);
}

/**
 * Sai de grupo (leave)
 */
export async function leaveGroup(
  accessToken: string,
  groupId: string
): Promise<void> {
  console.log(`📝 Leaving group: ${groupId}...`);

  const response = await authenticatedRequest(
    `/groups/${groupId}/members`,
    accessToken,
    'DELETE'
  );

  if (!response.ok && response.status !== 404) {
    throw new Error(`Failed to leave group: ${response.status}`);
  }

  console.log(`✅ Left group: ${groupId}`);
}

// ========================================
// CONVENIENCE METHODS
// ========================================

/**
 * Setup completo de cenário de evento multi-user
 *
 * @example
 * const scenario = await setupEventScenario(
 *   organizerToken,
 *   participantToken,
 *   { title: 'Futebol Teste' }
 * );
 * // scenario.event contém o evento criado
 * // scenario.organizerToken e scenario.participantToken para uso posterior
 */
export async function setupEventScenario(
  organizerToken: string,
  participantToken: string,
  eventOverrides?: Partial<CreateEventPayload>
): Promise<{
  event: CreatedEvent;
  organizerToken: string;
  participantToken: string;
}> {
  console.log('🎬 Setting up event scenario...');

  // Organizer cria evento
  const eventPayload = generateEventPayload(eventOverrides);
  const event = await createTestEvent(organizerToken, eventPayload);

  // Participant entra no evento
  await joinEvent(participantToken, event.id);

  console.log('✅ Event scenario ready!');

  return {
    event,
    organizerToken,
    participantToken,
  };
}

/**
 * Setup completo de cenário de grupo multi-user
 *
 * @example
 * const scenario = await setupGroupScenario(
 *   adminToken,
 *   memberToken,
 *   { name: 'Grupo Teste' }
 * );
 * // scenario.group contém o grupo criado
 * // scenario.adminToken e scenario.memberToken para uso posterior
 */
export async function setupGroupScenario(
  adminToken: string,
  memberToken: string,
  groupOverrides?: Partial<CreateGroupPayload>
): Promise<{
  group: CreatedGroup;
  adminToken: string;
  memberToken: string;
}> {
  console.log('🎬 Setting up group scenario...');

  // Admin cria grupo
  const groupPayload = generateGroupPayload(groupOverrides);
  const group = await createTestGroup(adminToken, groupPayload);

  // Member entra no grupo
  await joinGroup(memberToken, group.id);

  console.log('✅ Group scenario ready!');

  return {
    group,
    adminToken,
    memberToken,
  };
}

/**
 * Cleanup de cenário de evento (deleta evento e remove participantes)
 */
export async function cleanupEventScenario(
  organizerToken: string,
  eventId: string
): Promise<void> {
  console.log(`🧹 Cleaning up event scenario: ${eventId}...`);

  try {
    await deleteTestEvent(organizerToken, eventId);
  } catch (error) {
    console.warn(`⚠️  Failed to cleanup event ${eventId}:`, error);
    // Don't throw - cleanup is best-effort
  }

  console.log('✅ Event scenario cleaned up!');
}

/**
 * Cleanup de cenário de grupo (deleta grupo)
 */
export async function cleanupGroupScenario(
  adminToken: string,
  groupId: string
): Promise<void> {
  console.log(`🧹 Cleaning up group scenario: ${groupId}...`);

  try {
    await deleteTestGroup(adminToken, groupId);
  } catch (error) {
    console.warn(`⚠️  Failed to cleanup group ${groupId}:`, error);
    // Don't throw - cleanup is best-effort
  }

  console.log('✅ Group scenario cleaned up!');
}
