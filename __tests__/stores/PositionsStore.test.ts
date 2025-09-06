import { usePositionsStore } from '../../src/stores/PositionsStore';

jest.mock('idb-keyval', () => ({
  get: jest.fn().mockResolvedValue(null),
  set: jest.fn().mockResolvedValue(undefined),
  del: jest.fn().mockResolvedValue(undefined),
}));

describe('PositionsStore', () => {
  beforeEach(() => {
    usePositionsStore.setState({ 
      positions: [],
    });
  });

  it('initializes with empty positions array', () => {
    const state = usePositionsStore.getState();
    expect(state.positions).toEqual([]);
  });

  it('has addPosition and removePosition methods', () => {
    const state = usePositionsStore.getState();
    expect(typeof state.addPosition).toBe('function');
    expect(typeof state.removePosition).toBe('function');
  });

  it('adds new position from order', () => {
    const newOrder = {
      id: 2,
      type: 'sell' as const,
      mode: 'limit' as const,
      amount: '2.0',
      price: '3000',
      totalValue: 6000,
      fee: 10,
      finalTotal: 6010,
      timestamp: Date.now(),
    };
    
    const { addPosition } = usePositionsStore.getState();
    addPosition(newOrder);
    
    const state = usePositionsStore.getState();
    expect(state.positions).toHaveLength(1);
    expect(state.positions[0].id).toBe(2);
    expect(state.positions[0].type).toBe('sell');
    expect(state.positions[0].size).toBe('2.0');
  });

  it('removes position by id', () => {
    const positions = [
      {
        id: 1,
        entryPrice: '50000',
        size: '1.0',
        pnl: '1000',
        type: 'buy' as const,
        mode: 'market' as const,
        timestamp: Date.now(),
      },
      {
        id: 2,
        entryPrice: '3000',
        size: '2.0',
        pnl: '-100',
        type: 'sell' as const,
        mode: 'limit' as const,
        timestamp: Date.now(),
      },
    ];
    
    usePositionsStore.setState({ positions });
    const { removePosition } = usePositionsStore.getState();
    removePosition(1);
    
    const state = usePositionsStore.getState();
    expect(state.positions).toHaveLength(1);
    expect(state.positions[0].id).toBe(2);
  });
});