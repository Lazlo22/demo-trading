import { render, screen } from '../../test-utils';
import EmptyPlaceholder from '../../../src/components/trade/EmptyPlaceholder';

describe('EmptyPlaceholder', () => {
  it('renders empty state message and description', () => {
    render(<EmptyPlaceholder />);
    
    expect(screen.getByText('No open positions')).toBeInTheDocument();
    expect(screen.getByText('Your positions will appear here once you place trades')).toBeInTheDocument();
  });
});