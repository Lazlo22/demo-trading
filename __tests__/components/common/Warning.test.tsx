import { render, screen } from '../../test-utils';
import Warning from '../../../src/components/common/Warning';

describe('Warning', () => {
  it('renders with title and children', () => {
    render(
      <Warning title="Test Warning">
        <span>Warning content</span>
      </Warning>
    );
    
    expect(screen.getByText('Test Warning')).toBeInTheDocument();
    expect(screen.getByText('Warning content')).toBeInTheDocument();
  });

  it('renders without title', () => {
    render(
      <Warning>
        <span>Warning content only</span>
      </Warning>
    );
    
    expect(screen.getByText('Warning content only')).toBeInTheDocument();
  });
});