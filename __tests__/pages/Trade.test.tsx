import { render, screen } from '../test-utils';
import Trade from '@pages/Trade';

jest.mock('@/stores/PositionsStore', () => ({
  usePositionsStore: jest.fn(),
}));

jest.mock('@/components/trade/EmptyPlaceholder', () => {
  return function EmptyPlaceholder() {
    return <div data-testid="empty-placeholder">No positions</div>;
  };
});

jest.mock('@/components/trade/PositionsList', () => {
  return function PositionsList({ positions }: { positions: Array<{ id: number; symbol?: string; size?: number }> }) {
    return <div data-testid="positions-list">Positions: {positions.length}</div>;
  };
});

jest.mock('@/components/trade/TradingChart', () => {
  return function TradingChart() {
    return <div data-testid="trading-chart">Trading Chart</div>;
  };
});

jest.mock('@/components/trade/PlaceOrder', () => {
  return function PlaceOrder() {
    return <div data-testid="place-order">Place Order</div>;
  };
});

const mockUsePositionsStore = require('@/stores/PositionsStore').usePositionsStore;

describe('Trade Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the trading interface', () => {
    mockUsePositionsStore.mockReturnValue([]);

    render(<Trade />);
    
    expect(screen.getByText('BTC/USDT - BINANCE')).toBeInTheDocument();
    expect(screen.getByTestId('trading-chart')).toBeInTheDocument();
    expect(screen.getByTestId('place-order')).toBeInTheDocument();
    expect(screen.getByText('Positions')).toBeInTheDocument();
  });

  it('shows empty placeholder when no positions', () => {
    mockUsePositionsStore.mockReturnValue([]);

    render(<Trade />);
    
    expect(screen.getByTestId('empty-placeholder')).toBeInTheDocument();
  });

  it('shows positions list when positions exist', () => {
    const mockPositions = [
      { id: 1, symbol: 'BTC/USDT', size: 0.1 },
      { id: 2, symbol: 'ETH/USDT', size: 1.0 },
    ];

    mockUsePositionsStore.mockReturnValue(mockPositions);

    render(<Trade />);
    
    expect(screen.getByTestId('positions-list')).toBeInTheDocument();
    expect(screen.getByText('Positions: 2')).toBeInTheDocument();
  });
});