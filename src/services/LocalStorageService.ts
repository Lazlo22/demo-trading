import { ELocalStorageKeys } from "@constants/localStorage";
import { ETheme } from "@constants/theme";

class LocalStorageService {
  static getItem<T = string>(key: ELocalStorageKeys): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;

      try {
        return JSON.parse(item) as T;
      } catch {
        return item as T;
      }
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);

      return null;
    }
  }

  static setItem<T>(key: ELocalStorageKeys, value: T): void {
    try {
      const serializedValue = typeof value === "string" ? value : JSON.stringify(value);

      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
    }
  }

  static removeItem(key: ELocalStorageKeys): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
    }
  }

  static clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn("Failed to clear localStorage", error);
    }
  }

  static isAvailable(): boolean {
    try {
      const test = "__localStorage_test__";

      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }
}

export const themeStorage = {
  get: () => LocalStorageService.getItem<ETheme>(ELocalStorageKeys.Theme) || ETheme.Light,
  set: (theme: string) => LocalStorageService.setItem(ELocalStorageKeys.Theme, theme),
};
