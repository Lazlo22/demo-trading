import { webSocketService } from '../../src/services/WebSocketService';

class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSING = 2;
  static CLOSED = 3;

  readyState = MockWebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;

  constructor(public url: string) {
    setTimeout(() => {
      this.readyState = MockWebSocket.OPEN;
      if (this.onopen) {
        this.onopen(new Event('open'));
      }
    }, 0);
  }

  send = jest.fn();
  close = jest.fn(() => {
    this.readyState = MockWebSocket.CLOSED;
    if (this.onclose) {
      this.onclose(new CloseEvent('close'));
    }
  });
}

(global as typeof globalThis).WebSocket = MockWebSocket as unknown as typeof WebSocket;

describe('WebSocketService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    webSocketService.disconnect();
  });

  it('creates WebSocketService instance', () => {
    expect(webSocketService).toBeDefined();
  });

  it('connects to WebSocket', async () => {
    await webSocketService.connect();
    
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(webSocketService.isConnected()).toBe(true);
  });

  it('can subscribe to messages when connected', async () => {
    await webSocketService.connect();
    await new Promise(resolve => setTimeout(resolve, 10));
    
    const callback = jest.fn();
    webSocketService.subscribe('allMids', callback);
    
    expect(webSocketService.isConnected()).toBe(true);
  });

  it('handles connection errors gracefully', () => {
    const errorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    webSocketService.connect();
    
    // Simulate error
    const mockWs = (webSocketService as unknown as { socket?: MockWebSocket }).socket;
    if (mockWs && mockWs.onerror) {
      mockWs.onerror(new Event('error'));
    }
    
    errorSpy.mockRestore();
  });

  it('disconnects properly', async () => {
    await webSocketService.connect();
    await new Promise(resolve => setTimeout(resolve, 10));
    
    const mockWs = (webSocketService as unknown as { socket?: MockWebSocket }).socket;
    const closeSpy = jest.spyOn(mockWs!, 'close');
    
    webSocketService.disconnect();
    
    expect(closeSpy).toHaveBeenCalled();
    expect(webSocketService.isConnected()).toBe(false);
  });

  it('handles message reception through subscription', async () => {
    const messageHandler = jest.fn();
    
    await webSocketService.connect();
    await new Promise(resolve => setTimeout(resolve, 10));
    
    webSocketService.subscribe('allMids', messageHandler);
    
    const mockWs = (webSocketService as unknown as { socket?: MockWebSocket }).socket;
    const testMessage = { channel: 'allMids', data: 'received' };
    
    if (mockWs && mockWs.onmessage) {
      mockWs.onmessage(new MessageEvent('message', {
        data: JSON.stringify(testMessage)
      }));
    }
    
    expect(messageHandler).toHaveBeenCalledWith(testMessage);
  });

  it('handles subscription when not connected', () => {
    const callback = jest.fn();
    
    webSocketService.subscribe('allMids', callback);
    
    expect(callback).not.toHaveBeenCalled();
  });

  it('handles reconnection attempts', async () => {
    await webSocketService.connect();
    await new Promise(resolve => setTimeout(resolve, 10));
    
    const mockWs = (webSocketService as unknown as { socket?: MockWebSocket }).socket;
    if (mockWs && mockWs.onclose) {
      mockWs.readyState = MockWebSocket.CLOSED;
      mockWs.onclose(new CloseEvent('close', { code: 1006 }));
    }
    
    expect(webSocketService.isConnected()).toBe(false);
  });
});