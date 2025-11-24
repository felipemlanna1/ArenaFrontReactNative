/**
 * Storage State Utilities
 *
 * Helper functions para criar e gerenciar storage states do Playwright.
 * Storage states permitem reutilizar sessões autenticadas entre testes.
 */

import { Page } from '@playwright/test';

export interface TestUserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password?: string;
  hasSports: boolean;
  sports?: Array<{
    sportId: string;
    sportName?: string;
    isPrimary: boolean;
    level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
  }>;
}

/**
 * Extrai localStorage items da página
 */
export async function extractLocalStorage(page: Page): Promise<Record<string, string>> {
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

/**
 * Injeta localStorage items na página
 */
export async function injectLocalStorage(
  page: Page,
  items: Record<string, string>
): Promise<void> {
  await page.evaluate((storageItems) => {
    for (const [key, value] of Object.entries(storageItems)) {
      localStorage.setItem(key, value);
    }
  }, items);
}

/**
 * Cria storage state object no formato Playwright
 */
export function createStorageState(
  accessToken: string,
  userData: TestUserData,
  refreshToken?: string
): {
  cookies: unknown[];
  origins: Array<{ origin: string; localStorage: Array<{ name: string; value: string }> }>;
} {
  const localStorage: Array<{ name: string; value: string }> = [
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

/**
 * Salva storage state em arquivo JSON
 */
export async function saveStorageStateToFile(
  storagePath: string,
  storageState: ReturnType<typeof createStorageState>
): Promise<void> {
  const fs = await import('fs/promises');
  await fs.writeFile(storagePath, JSON.stringify(storageState, null, 2), 'utf-8');
  console.log(`✅ Storage state saved: ${storagePath}`);
}
