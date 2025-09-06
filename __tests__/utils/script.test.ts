import { loadScript } from '../../src/utils/script';

const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();
const mockGetElementsByTagName = jest.fn();

Object.defineProperty(document, 'createElement', {
  value: jest.fn(() => ({
    src: '',
    onload: null,
    onerror: null,
  })),
});

Object.defineProperty(document, 'getElementsByTagName', {
  value: mockGetElementsByTagName,
});

const mockHead = {
  appendChild: mockAppendChild,
  removeChild: mockRemoveChild,
};

mockGetElementsByTagName.mockReturnValue([mockHead]);

describe('script utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loadScript', () => {
    it('creates script element with correct properties', () => {
      const params = {
        src: 'https://example.com/script.js',
        async: true,
        defer: false,
      };
      
      const scriptElement = loadScript(params);
      
      expect(document.createElement).toHaveBeenCalledWith('script');
      expect(scriptElement.src).toBe(params.src);
      expect(scriptElement.async).toBe(true);
      expect(scriptElement.defer).toBe(false);
      expect(scriptElement.type).toBe('text/javascript');
    });

    it('sets default values when not provided', () => {
      const params = {
        src: 'https://example.com/script.js',
      };
      
      const scriptElement = loadScript(params);
      
      expect(scriptElement.async).toBe(false);
      expect(scriptElement.defer).toBe(false);
      expect(scriptElement.innerHTML).toBe('');
    });

    it('sets onload callback when provided', () => {
      const onloadCallback = jest.fn();
      const params = {
        src: 'https://example.com/script.js',
        onload: onloadCallback,
      };
      
      const scriptElement = loadScript(params);
      
      expect(scriptElement.onload).toBe(onloadCallback);
    });

    it('sets innerHTML when provided', () => {
      const innerHTML = 'console.log("test");';
      const params = {
        src: 'https://example.com/script.js',
        innerHTML,
      };
      
      const scriptElement = loadScript(params);
      
      expect(scriptElement.innerHTML).toBe(innerHTML);
    });

    it('handles all parameters correctly', () => {
      const onloadCallback = jest.fn();
      const params = {
        src: 'https://example.com/script.js',
        async: true,
        defer: true,
        onload: onloadCallback,
        innerHTML: 'console.log("loaded");',
      };
      
      const scriptElement = loadScript(params);
      
      expect(scriptElement.src).toBe(params.src);
      expect(scriptElement.async).toBe(true);
      expect(scriptElement.defer).toBe(true);
      expect(scriptElement.onload).toBe(onloadCallback);
      expect(scriptElement.innerHTML).toBe(params.innerHTML);
    });
  });
});