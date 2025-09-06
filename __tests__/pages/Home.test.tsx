import { render, screen } from '../test-utils';
import Home from '@pages/Home';

jest.mock('@hooks/useMarkets', () => ({
  useMarkets: jest.fn(),
}));

jest.mock('@components/home/HomeError', () => {
  return function HomeError() {
    return <div data-testid="home-error">Error loading markets</div>;
  };
});

jest.mock('@components/home/MarketsList', () => {
  return function MarketsList({ markets }: { markets: Array<{ id: string | number; name?: string }> }) {
    return <div data-testid="markets-list">Markets: {markets.length}</div>;
  };
});

jest.mock('@/components/home/HomeLoading', () => {
  return function HomeLoading() {
    return <div data-testid="home-loading">Loading...</div>;
  };
});

const mockUseMarkets = require('@hooks/useMarkets').useMarkets;

describe('Home Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading state when markets array is empty', () => {
    mockUseMarkets.mockReturnValue({
      markets: [],
      error: null,
    });

    render(<Home />);
    
    expect(screen.getByTestId('home-loading')).toBeInTheDocument();
  });

  it('shows markets list when markets are loaded', () => {
    const mockMarkets = [
      { id: 1, name: 'BTC/USDT' },
      { id: 2, name: 'ETH/USDT' },
    ];

    mockUseMarkets.mockReturnValue({
      markets: mockMarkets,
      error: null,
    });

    render(<Home />);
    
    expect(screen.getByTestId('markets-list')).toBeInTheDocument();
    expect(screen.getByText('Markets: 2')).toBeInTheDocument();
  });

  it('shows error state when there is an error', () => {
    mockUseMarkets.mockReturnValue({
      markets: [],
      error: new Error('Failed to fetch'),
    });

    render(<Home />);
    
    expect(screen.getByTestId('home-error')).toBeInTheDocument();
  });
});