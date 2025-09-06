import { render, screen } from '../../test-utils';
import HomeError from '../../../src/components/home/HomeError';

describe('HomeError', () => {
  it('renders markets title and message', () => {
    render(<HomeError />);
    
    expect(screen.getByText('Markets')).toBeInTheDocument();
    expect(screen.getByText('Error loading market meta data')).toBeInTheDocument();
  });
});