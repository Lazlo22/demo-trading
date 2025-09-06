import { render, screen } from '../test-utils';
import NotFound from '@pages/NotFound';

describe('NotFound Page', () => {
  it('renders 404 error message', () => {
    render(<NotFound />);
    
    expect(screen.getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(screen.getByText("The page you're looking for doesn't exist.")).toBeInTheDocument();
    expect(screen.getByText('Please check the URL or navigate back to the home page.')).toBeInTheDocument();
  });
});