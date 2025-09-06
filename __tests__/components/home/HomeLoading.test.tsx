import { render, screen } from '../../test-utils';
import HomeLoading from '../../../src/components/home/HomeLoading';

describe('HomeLoading', () => {
  it('renders loading message', () => {
    render(<HomeLoading />);
    
    expect(screen.getByText('Loading markets...')).toBeInTheDocument();
  });
});