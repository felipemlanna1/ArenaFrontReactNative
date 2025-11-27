import { Page } from '@playwright/test';

export interface TestUserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  hasSports: boolean;
  sports?: {
    sportId: string;
    sportName?: string;
    isPrimary: boolean;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  }[];
}

export async function extractLocalStorage(
  page: Page
): Promise<Record<string, string>> {
  return await page.evaluate(() => {
    const items: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const value = localStorage.getItem(key);
        if (value) {
          items[key] = value;
        }
      }
    }
    return items;
  });
}

export async function injectLocalStorage(
  page: Page,
  items: Record<string, string>
): Promise<void> {
  await page.evaluate(storageItems => {
    for (const [key, value] of Object.entries(storageItems)) {
      localStorage.setItem(key, value);
    }
  }, items);
}

export function createStorageState(
  accessToken: string,
  userData: TestUserData,
  refreshToken?: string
): {
  cookies: unknown[];
  origins: {
    origin: string;
    localStorage: { name: string; value: string }[];
  }[];
} {
  const localStorage: { name: string; value: string }[] = [
    {
      name: '@Arena:access_token',
      value: accessToken,
    },
    {
      name: '@Arena:user_data',
      value: JSON.stringify(userData),
    },
  ];

  if (refreshToken) {
    localStorage.push({
      name: '@Arena:refresh_token',
      value: refreshToken,
    });
  }

  return {
    cookies: [],
    origins: [
      {
        origin: 'http://localhost:8081',
        localStorage,
      },
    ],
  };
}

export async function saveStorageStateToFile(
  storagePath: string,
  storageState: ReturnType<typeof createStorageState>
): Promise<void> {
  const fs = await import('fs/promises');
  await fs.writeFile(
    storagePath,
    JSON.stringify(storageState, null, 2),
    'utf-8'
  );
}
