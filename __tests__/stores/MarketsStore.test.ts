import { useMarketsStore } from '../../src/stores/MarketsStore';

describe('MarketsStore', () => {
  beforeEach(() => {
    useMarketsStore.setState({ markets: [] });
  });

  it('initializes with empty markets array', () => {
    const state = useMarketsStore.getState();
    expect(state.markets).toEqual([]);
  });

  it('updates markets data', () => {
    const mockMids = {
      'BTC': '50000',
      'ETH': '3000',
    };
    
    const { updateMarkets } = useMarketsStore.getState();
    updateMarkets(mockMids);
    
    const state = useMarketsStore.getState();
    expect(state.markets).toHaveLength(2);
    expect(state.markets[0]).toEqual({
      coin: 'BTC',
      mid: '50000',
      id: 'BTC',
      symbol: 'FUTURES BTC/USDC',
      price: '50000',
      displayName: 'FUTURES BTC/USDC',
    });
    expect(state.markets[1]).toEqual({
      coin: 'ETH',
      mid: '3000',
      id: 'ETH',
      symbol: 'FUTURES ETH/USDC',
      price: '3000',
      displayName: 'FUTURES ETH/USDC',
    });
  });

  it('filters out spot tokens (coins starting with @)', () => {
    const mockMids = {
      'BTC': '50000',
      '@1': '1.0', // This should be filtered out
      'ETH': '3000',
    };
    
    const { updateMarkets } = useMarketsStore.getState();
    updateMarkets(mockMids);
    
    const state = useMarketsStore.getState();
    expect(state.markets).toHaveLength(2);
    expect(state.markets.find(m => m.coin === '@1')).toBeUndefined();
  });

  it('handles empty mids object', () => {
    const { updateMarkets } = useMarketsStore.getState();
    updateMarkets({});
    
    const state = useMarketsStore.getState();
    expect(state.markets).toEqual([]);
  });
});