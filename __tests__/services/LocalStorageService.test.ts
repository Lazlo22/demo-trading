import { themeStorage } from '../../src/services/LocalStorageService';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('LocalStorageService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('themeStorage', () => {
    it('gets theme from localStorage', () => {
      localStorageMock.getItem.mockReturnValue('dark');

      const result = themeStorage.get();
      
      expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
      expect(result).toBe('dark');
    });

    it('returns default light theme when no theme stored', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = themeStorage.get();
      
      expect(result).toBe('light');
    });

    it('sets theme in localStorage', () => {
      themeStorage.set('dark');
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });

    it('handles theme switching', () => {
      // Test setting light theme
      themeStorage.set('light');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');

      // Test setting dark theme
      themeStorage.set('dark');
      expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    });
  });
});