import { renderHook, waitFor } from "../test-utils";
import { useMarkets } from "../../src/hooks/useMarkets";

jest.mock("../../src/stores/MarketsStore", () => ({
  useMarketsStore: jest.fn((selector) => {
    const state = {
      markets: [],
      updateMarkets: jest.fn(),
    };
    return selector(state);
  }),
}));

jest.mock("../../src/services/HyperliquidApiService", () => ({
  hyperliquidApiService: {
    getMeta: jest.fn().mockResolvedValue({
      universe: [
        { name: "BTC", szDecimals: 5 },
        { name: "ETH", szDecimals: 5 },
      ],
    }),
    getSpotMeta: jest.fn().mockResolvedValue({
      tokens: [],
      universe: [],
    }),
  },
}));

jest.mock("../../src/contexts/WebSocketContext", () => ({
  useWebSocket: jest.fn(() => ({
    isConnected: jest.fn().mockReturnValue(true),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  })),
}));

describe("useMarkets", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns markets data and error state", async () => {
    const { AllTheProviders } = require("../test-utils");
    const { result } = renderHook(() => useMarkets(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current).toHaveProperty("markets");
      expect(result.current).toHaveProperty("error");
      expect(Array.isArray(result.current.markets)).toBe(true);
    });
  });

  it("initializes with empty markets array", async () => {
    const { AllTheProviders } = require("../test-utils");
    const { result } = renderHook(() => useMarkets(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(result.current.markets).toEqual([]);
    });
  });

  it("fetches market metadata on mount", async () => {
    const { AllTheProviders } = require("../test-utils");
    const { hyperliquidApiService } = require("../../src/services/HyperliquidApiService");

    renderHook(() => useMarkets(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(hyperliquidApiService.getMeta).toHaveBeenCalled();
      expect(hyperliquidApiService.getSpotMeta).toHaveBeenCalled();
    });
  });

  it("subscribes to WebSocket updates when connected", async () => {
    const { AllTheProviders } = require("../test-utils");
    const mockSubscribe = jest.fn();
    const { useWebSocket } = require("../../src/contexts/WebSocketContext");
    
    useWebSocket.mockReturnValue({
      isConnected: jest.fn().mockReturnValue(true),
      subscribe: mockSubscribe,
      unsubscribe: jest.fn(),
    });

    renderHook(() => useMarkets(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(mockSubscribe).toHaveBeenCalled();
    });
  });

  it("handles WebSocket disconnection", async () => {
    const { AllTheProviders } = require("../test-utils");
    const mockSubscribe = jest.fn();
    const { useWebSocket } = require("../../src/contexts/WebSocketContext");

    useWebSocket.mockReturnValue({
      isConnected: jest.fn().mockReturnValue(false),
      subscribe: mockSubscribe,
      unsubscribe: jest.fn(),
    });

    renderHook(() => useMarkets(), {
      wrapper: AllTheProviders,
    });

    await waitFor(() => {
      expect(mockSubscribe).toHaveBeenCalled();
    });
  });
});
