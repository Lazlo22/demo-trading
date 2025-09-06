import { render, screen } from '@testing-library/react';

import { GlobalLoader } from '../../../src/components/common/GlobalLoader';

describe('GlobalLoader Component', () => {
  it('renders with provided title', () => {

    const title = 'Loading application...';
    render(<GlobalLoader title={title} />);
    
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('renders with different titles', () => {
    const { rerender } = render(<GlobalLoader title="First title" />);
    expect(screen.getByText('First title')).toBeInTheDocument();
    
    rerender(<GlobalLoader title="Second title" />);
    expect(screen.getByText('Second title')).toBeInTheDocument();
    expect(screen.queryByText('First title')).not.toBeInTheDocument();
  });
});