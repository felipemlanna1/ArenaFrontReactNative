/**
 * Arena Production SDK Configuration
 *
 * Este arquivo contém as configurações para fazer requests
 * diretas no backend de produção usando MCP Playwright ou outras ferramentas.
 *
 * Uso com MCP Playwright:
 *
 * ```typescript
 * // GET request
 * await mcp__playwright__playwright_get({
 *   url: `${PRODUCTION_SDK.baseURL}/events`
 * });
 *
 * // POST request com autenticação
 * await mcp__playwright__playwright_post({
 *   url: `${PRODUCTION_SDK.baseURL}/auth/login`,
 *   value: JSON.stringify({
 *     email: 'user@example.com',
 *     password: 'password123'
 *   }),
 *   headers: {
 *     'Content-Type': 'application/json'
 *   }
 * });
 *
 * // Request autenticado
 * await mcp__playwright__playwright_get({
 *   url: `${PRODUCTION_SDK.baseURL}/auth/me`,
 *   token: 'seu-jwt-token-aqui'
 * });
 * ```
 */

export const PRODUCTION_SDK = {
  // Base URLs
  baseURL: 'https://backsportpulsemobile-production.up.railway.app/api/v1',
  swaggerURL: 'https://backsportpulsemobile-production.up.railway.app/api/docs',
  healthURL: 'https://backsportpulsemobile-production.up.railway.app/health',

  // Supabase Configuration
  supabase: {
    url: 'https://mqackbycjhsetihmvdfq.supabase.co',
    anonKey:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1xYWNrYnljamhzZXRpaG12ZGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc1MjAyMzYsImV4cCI6MjA3MzA5NjIzNn0.QKHfleZr6G_NWQHBf9JXlFOLO0ya2F9MSTScxSkOn3M',
  },

  // Common Headers
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },

  // Test User Credentials (para testes)
  testUser: {
    email: 'teste2123@gmail.com',
    password: 'SuaSenhaAqui', // ⚠️ ATENÇÃO: Trocar pela senha real
    userId: '2e0c5708-66c7-4d9b-91d4-a01044dbbb42',
  },

  // Endpoints principais
  endpoints: {
    // Authentication
    auth: {
      register: '/auth/register',
      login: '/auth/login',
      me: '/auth/me',
      logout: '/auth/logout',
      refresh: '/auth/refresh',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      checkUsername: '/auth/check-username',
      checkEmail: '/auth/check-email',
    },

    // Users
    users: {
      search: '/users/search',
      getById: (id: string) => `/users/${id}`,
      update: (id: string) => `/users/${id}`,
      stats: (id: string) => `/users/${id}/stats`,
    },

    // Events
    events: {
      list: '/events',
      create: '/events',
      nearby: '/events/nearby',
      myEvents: '/events/my-events',
      feed: '/events/feed',
      getById: (id: string) => `/events/${id}`,
      update: (id: string) => `/events/${id}`,
      delete: (id: string) => `/events/${id}`,
      join: (id: string) => `/events/${id}/join`,
      leave: (id: string) => `/events/${id}/leave`,
      participants: (id: string) => `/events/${id}/participants`,
      checkIn: (id: string) => `/events/${id}/check-in`,
    },

    // Groups
    groups: {
      list: '/groups',
      create: '/groups',
      myGroups: '/groups/my-groups',
      available: '/groups/available',
      getById: (id: string) => `/groups/${id}`,
      update: (id: string) => `/groups/${id}`,
      delete: (id: string) => `/groups/${id}`,
      members: (id: string) => `/groups/${id}/members`,
      events: (id: string) => `/groups/${id}/events`,
      join: (id: string) => `/groups/${id}/join`,
      leave: (id: string) => `/groups/${id}/leave`,
    },

    // Sports
    sports: {
      list: '/sports',
      popular: '/sports/popular',
      mySports: '/sports/my-sports',
      getById: (id: string) => `/sports/${id}`,
      userSports: (userId: string) => `/sports/users/${userId}/sports`,
    },

    // Notifications
    notifications: {
      list: '/notifications',
      unreadCount: '/notifications/unread-count',
      markAsRead: (id: string) => `/notifications/${id}/read`,
      markAllAsRead: '/notifications/mark-all-read',
      deviceTokens: '/notifications/device-tokens',
      preferences: '/notifications/preferences',
      test: '/notifications/test',
    },

    // Friendships
    friendships: {
      list: '/friendships',
      request: '/friendships/request',
      updateStatus: (id: string) => `/friendships/${id}`,
      remove: (friendId: string) => `/friendships/${friendId}`,
      status: (userId: string) => `/friendships/status/${userId}`,
      block: (userId: string) => `/friendships/block/${userId}`,
    },

    // Address (CEP)
    address: {
      searchCep: (cep: string) => `/address/cep/${cep}`,
    },

    // Health
    health: '/health',
  },
} as const;

// Helper types
export type ProductionSDK = typeof PRODUCTION_SDK;
export type Endpoints = typeof PRODUCTION_SDK.endpoints;

// Example usage in comments:
/**
 * Exemplo 1: Login
 *
 * await mcp__playwright__playwright_post({
 *   url: `${PRODUCTION_SDK.baseURL}${PRODUCTION_SDK.endpoints.auth.login}`,
 *   value: JSON.stringify({
 *     email: PRODUCTION_SDK.testUser.email,
 *     password: PRODUCTION_SDK.testUser.password
 *   }),
 *   headers: PRODUCTION_SDK.headers
 * });
 */

/**
 * Exemplo 2: Buscar eventos
 *
 * await mcp__playwright__playwright_get({
 *   url: `${PRODUCTION_SDK.baseURL}${PRODUCTION_SDK.endpoints.events.list}`
 * });
 */

/**
 * Exemplo 3: Buscar CEP
 *
 * await mcp__playwright__playwright_get({
 *   url: `${PRODUCTION_SDK.baseURL}${PRODUCTION_SDK.endpoints.address.searchCep('01310100')}`
 * });
 */

/**
 * Exemplo 4: Request autenticado
 *
 * const token = 'seu-jwt-token-aqui';
 *
 * await mcp__playwright__playwright_get({
 *   url: `${PRODUCTION_SDK.baseURL}${PRODUCTION_SDK.endpoints.auth.me}`,
 *   token: token
 * });
 */
