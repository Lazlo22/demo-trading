import { render, screen, renderHook } from '../test-utils';
import { WebSocketProvider, useWebSocket } from '../../src/contexts/WebSocketContext';

jest.mock('../../src/services/WebSocketService', () => ({
  webSocketService: {
    connect: jest.fn().mockResolvedValue(undefined),
    disconnect: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
    isConnected: jest.fn().mockReturnValue(false),
  },
}));

const TestComponent = () => {
  const { isConnected, subscribe } = useWebSocket();
  return (
    <div>
      <span data-testid="connection-status">{isConnected() ? 'Connected' : 'Disconnected'}</span>
      <button onClick={() => subscribe('allMids', () => {})} data-testid="subscribe-button">
        Subscribe
      </button>
    </div>
  );
};

describe('WebSocketContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('provides WebSocket context', () => {
    render(
      <WebSocketProvider>
        <TestComponent />
      </WebSocketProvider>
    );

    expect(screen.getByTestId('connection-status')).toBeInTheDocument();
    expect(screen.getByTestId('subscribe-button')).toBeInTheDocument();
  });

  it('shows disconnected status initially', () => {
    render(
      <WebSocketProvider>
        <TestComponent />
      </WebSocketProvider>
    );

    expect(screen.getByTestId('connection-status')).toHaveTextContent('Disconnected');
  });

  it('provides subscribe function', () => {
    render(
      <WebSocketProvider>
        <TestComponent />
      </WebSocketProvider>
    );

    const subscribeButton = screen.getByTestId('subscribe-button');
    expect(subscribeButton).toBeInTheDocument();
    
    // Click should not throw error
    subscribeButton.click();
  });

  it('throws error when useWebSocket is used outside provider', () => {
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => {
      renderHook(() => useWebSocket());
    }).toThrow('useWebSocket must be used within a WebSocketProvider');

    console.error = originalError;
  });

  it('initializes WebSocket service on mount', () => {
    const { webSocketService } = require('../../src/services/WebSocketService');
    
    render(
      <WebSocketProvider>
        <TestComponent />
      </WebSocketProvider>
    );

    expect(webSocketService.connect).toHaveBeenCalled();
  });

  it('handles WebSocket service methods', () => {
    const { webSocketService } = require('../../src/services/WebSocketService');
    webSocketService.isConnected.mockReturnValue(true);

    render(
      <WebSocketProvider>
        <TestComponent />
      </WebSocketProvider>
    );

    // Should call connect on mount
    expect(webSocketService.connect).toHaveBeenCalled();
  });
});