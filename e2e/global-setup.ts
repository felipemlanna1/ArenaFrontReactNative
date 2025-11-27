import { FullConfig } from '@playwright/test';
import path from 'path';
import {
  createStorageState,
  saveStorageStateToFile,
  TestUserData,
} from './helpers/storage-utils';

const API_BASE_URL =
  'https://backsportpulsemobile-production.up.railway.app/api/v1';

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
    sports?: {
      sportId: string;
      sportName: string;
      sportIcon: string;
      sportColor: string;
      isPrimary: boolean;
    }[];
  };
  access_token: string;
}

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
      errorMessage = errorText;
    }
    throw new Error(
      `Registration failed for ${payload.email}: ${response.status} - ${errorMessage}`
    );
  }

  const responseData = await response.json();

  const data = responseData.data || responseData;

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

async function loginUser(
  email: string,
  password: string
): Promise<AuthResponse> {
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
      errorMessage = errorText;
    }
    throw new Error(
      `Login failed for ${email}: ${response.status} - ${errorMessage}`
    );
  }

  const responseData = await response.json();

  const data = responseData.data || responseData;

  if (!data.user || !data.access_token) {
    throw new Error(
      `Invalid response from API for ${email}: missing user or access_token. Response: ${JSON.stringify(responseData)}`
    );
  }

  return data;
}

function generateUniqueId(): string {
  return Date.now().toString();
}

function generateTestUsers(): {
  file: string;
  description: string;
  payload: RegisterPayload;
  useLogin?: boolean;
}[] {
  const uniqueId = generateUniqueId();

  return [
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

export default async function globalSetup(_config: FullConfig): Promise<void> {
  const storageDir = path.join(__dirname, '.auth');
  const TEST_USERS = generateTestUsers();

  const results = await Promise.allSettled(
    TEST_USERS.map(
      async (testUser: ReturnType<typeof generateTestUsers>[number]) => {
        try {
          const authResponse = testUser.useLogin
            ? await loginUser(testUser.payload.email, testUser.payload.password)
            : await registerUser(testUser.payload);

          const userData: TestUserData = {
            id: authResponse.user.id,
            firstName: authResponse.user.firstName,
            lastName: authResponse.user.lastName,
            username: authResponse.user.username,
            email: authResponse.user.email,
            password: testUser.payload.password,
            hasSports: authResponse.user.hasSports || false,
            sports: authResponse.user.sports?.map(sport => ({
              sportId: sport.sportId,
              sportName: sport.sportName,
              isPrimary: sport.isPrimary,
              level: 'INTERMEDIATE',
            })),
          };

          const storageState = createStorageState(
            authResponse.access_token,
            userData
          );

          const storagePath = path.join(storageDir, testUser.file);
          await saveStorageStateToFile(storagePath, storageState);

          return { success: true, file: testUser.file };
        } catch (error) {
          return { success: false, file: testUser.file, error };
        }
      }
    )
  );

  const failed = results.filter(
    (
      r
    ): r is
      | PromiseRejectedResult
      | PromiseFulfilledResult<{ success: false; file: string }> =>
      r.status === 'rejected' ||
      (r.status === 'fulfilled' && r.value.success === false)
  ).length;

  if (failed > 0) {
    throw new Error(`Failed to setup ${failed} test user(s)`);
  }
}
