import AsyncStorage from '@react-native-async-storage/async-storage';

export class StorageService {
  async setItem(key: string, value: string): Promise<void> {
    await AsyncStorage.setItem(key, value);
  }

  async getItem(key: string): Promise<string | null> {
    try {
      return await AsyncStorage.getItem(key);
    } catch {
      return null;
    }
  }

  async removeItem(key: string): Promise<void> {
    await AsyncStorage.removeItem(key);
  }

  async multiSet(items: [string, string][]): Promise<void> {
    await AsyncStorage.multiSet(items);
  }

  async multiGet(keys: string[]): Promise<[string, string | null][]> {
    const result = await AsyncStorage.multiGet(keys);
    return result as [string, string | null][];
  }

  async multiRemove(keys: string[]): Promise<void> {
    await AsyncStorage.multiRemove(keys);
  }

  async clear(): Promise<void> {
    await AsyncStorage.clear();
  }

  async getAllKeys(): Promise<string[]> {
    try {
      const result = await AsyncStorage.getAllKeys();
      return result as string[];
    } catch {
      return [];
    }
  }
}

export const storageService = new StorageService();
