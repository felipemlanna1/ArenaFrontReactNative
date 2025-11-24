/**
 * Playwright Global Setup
 *
 * Registra usuários de teste e cria storage states para multi-user testing.
 * Executado UMA VEZ antes de todos os testes.
 */

import { FullConfig } from '@playwright/test';
import path from 'path';
import { createStorageState, saveStorageStateToFile, TestUserData } from './helpers/storage-utils';

const API_BASE_URL = 'https://backsportpulsemobile-production.up.railway.app/api/v1';

interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  city: string;
  state: string;
}

interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    isActive: boolean;
    isEmailVerified: boolean;
    hasSports?: boolean;
    sports?: Array<{
      sportId: string;
      sportName: string;
      sportIcon: string;
      sportColor: string;
      isPrimary: boolean;
    }>;
  };
  access_token: string;
}

/**
 * Registra um usuário via API
 */
async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = errorText;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || errorText;
    } catch {
      // Keep errorText as is
    }
    throw new Error(`Registration failed for ${payload.email}: ${response.status} - ${errorMessage}`);
  }

  const responseData = await response.json();

  // Extract data from envelope (API returns {data: {user, access_token}})
  const data = responseData.data || responseData;

  // Validate response structure
  if (!data.user || !data.access_token) {
    throw new Error(
      `Invalid response from API for ${payload.email}: missing user or access_token. Response: ${JSON.stringify(responseData)}`
    );
  }

  return data;
}

interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Login de usuário via API
 */
async function loginUser(email: string, password: string): Promise<AuthResponse> {
  const payload: LoginPayload = { email, password };

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = errorText;
    try {
      const errorJson = JSON.parse(errorText);
      errorMessage = errorJson.message || errorJson.error || errorText;
    } catch {
      // Keep errorText as is
    }
    throw new Error(`Login failed for ${email}: ${response.status} - ${errorMessage}`);
  }

  const responseData = await response.json();

  // Extract data from envelope (API returns {data: {user, access_token}})
  const data = responseData.data || responseData;

  // Validate response structure
  if (!data.user || !data.access_token) {
    throw new Error(
      `Invalid response from API for ${email}: missing user or access_token. Response: ${JSON.stringify(responseData)}`
    );
  }

  return data;
}

/**
 * Gera ID único baseado em timestamp
 */
function generateUniqueId(): string {
  return Date.now().toString();
}

/**
 * Define os 6 usuários de teste
 * - 1 usuário real (login com credenciais fornecidas)
 * - 5 usuários novos (registro com emails/usernames únicos)
 */
function generateTestUsers(): Array<{
  file: string;
  description: string;
  payload: RegisterPayload;
  useLogin?: boolean;
}> {
  const uniqueId = generateUniqueId();

  return [
    // Usuário REAL (login com credenciais fornecidas pelo usuário)
    {
      file: 'real-user.json',
      description: 'Usuário real (login)',
      useLogin: true,
      payload: {
        firstName: 'Felipe',
        lastName: 'Lanna',
        username: 'felipelanna',
        email: 'felipemlanna@gmail.com',
        password: 'P@lioed2011',
        confirmPassword: 'P@lioed2011',
        city: 'São Paulo',
        state: 'SP',
      },
    },
    // 5 usuários NOVOS (registro com dados únicos)
    {
      file: 'organizer.json',
      description: 'Organizador de eventos',
      payload: {
        firstName: 'Test',
        lastName: 'Organizer',
        username: `testuser_org_${uniqueId}`,
        email: `e2e.org.${uniqueId}@arena-test.com`,
        password: 'Test@1234',
        confirmPassword: 'Test@1234',
        city: 'Rio de Janeiro',
        state: 'RJ',
      },
    },
    {
      file: 'participant.json',
      description: 'Participante de eventos',
      payload: {
        firstName: 'Test',
        lastName: 'Participant',
        username: `testuser_part_${uniqueId}`,
        email: `e2e.part.${uniqueId}@arena-test.com`,
        password: 'Test@1234',
        confirmPassword: 'Test@1234',
        city: 'Belo Horizonte',
        state: 'MG',
      },
    },
    {
      file: 'group-admin.json',
      description: 'Admin de grupo',
      payload: {
        firstName: 'Test',
        lastName: 'GroupAdmin',
        username: `testuser_admin_${uniqueId}`,
        email: `e2e.admin.${uniqueId}@arena-test.com`,
        password: 'Test@1234',
        confirmPassword: 'Test@1234',
        city: 'Curitiba',
        state: 'PR',
      },
    },
    {
      file: 'user-with-friends.json',
      description: 'Usuário com amigos',
      payload: {
        firstName: 'Test',
        lastName: 'WithFriends',
        username: `testuser_friends_${uniqueId}`,
        email: `e2e.friends.${uniqueId}@arena-test.com`,
        password: 'Test@1234',
        confirmPassword: 'Test@1234',
        city: 'Porto Alegre',
        state: 'RS',
      },
    },
    {
      file: 'user-no-sports.json',
      description: 'Usuário sem esportes cadastrados',
      payload: {
        firstName: 'Test',
        lastName: 'NoSports',
        username: `testuser_nosports_${uniqueId}`,
        email: `e2e.nosports.${uniqueId}@arena-test.com`,
        password: 'Test@1234',
        confirmPassword: 'Test@1234',
        city: 'Brasília',
        state: 'DF',
      },
    },
  ];
}

/**
 * Global Setup - Executado uma vez antes de todos os testes
 */
export default async function globalSetup(_config: FullConfig): Promise<void> {
  console.log('\n🚀 Global Setup - Criando usuários de teste...\n');

  const storageDir = path.join(__dirname, '.auth');
  const TEST_USERS = generateTestUsers();

  // Registrar ou fazer login de todos os usuários em paralelo
  const results = await Promise.allSettled(
    TEST_USERS.map(async (testUser: ReturnType<typeof generateTestUsers>[number]) => {
      try {
        console.log(`📝 Processando: ${testUser.payload.email}...`);

        // Fazer login (usuário real) ou registrar (usuários novos)
        const authResponse = testUser.useLogin
          ? await loginUser(testUser.payload.email, testUser.payload.password)
          : await registerUser(testUser.payload);

        // Criar TestUserData a partir do response
        const userData: TestUserData = {
          id: authResponse.user.id,
          firstName: authResponse.user.firstName,
          lastName: authResponse.user.lastName,
          username: authResponse.user.username,
          email: authResponse.user.email,
          password: testUser.payload.password,
          hasSports: authResponse.user.hasSports || false,
          sports: authResponse.user.sports?.map((sport) => ({
            sportId: sport.sportId,
            sportName: sport.sportName,
            isPrimary: sport.isPrimary,
            level: 'INTERMEDIATE',
          })),
        };

        // Criar storage state
        const storageState = createStorageState(authResponse.access_token, userData);

        // Salvar em arquivo
        const storagePath = path.join(storageDir, testUser.file);
        await saveStorageStateToFile(storagePath, storageState);

        console.log(`✅ ${testUser.file} criado com sucesso`);
        return { success: true, file: testUser.file };
      } catch (error) {
        console.error(`❌ Erro ao criar ${testUser.file}:`, error);
        return { success: false, file: testUser.file, error };
      }
    })
  );

  // Validar resultados
  const successful = results.filter(
    (r): r is PromiseFulfilledResult<{ success: boolean; file: string }> =>
      r.status === 'fulfilled' && r.value.success
  ).length;
  const failed = results.filter(
    (r): r is PromiseRejectedResult | PromiseFulfilledResult<{ success: false; file: string }> =>
      r.status === 'rejected' || (r.status === 'fulfilled' && r.value.success === false)
  ).length;

  console.log(`\n📊 Resumo:`);
  console.log(`  ✅ Sucesso: ${successful}/6`);
  console.log(`  ❌ Falhas: ${failed}/6\n`);

  if (failed > 0) {
    console.warn('⚠️  Alguns usuários falharam ao ser criados. Testes podem falhar.');
  } else {
    console.log('🎉 Todos os usuários de teste criados com sucesso!\n');
  }
}
