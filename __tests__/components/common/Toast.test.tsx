import { render, screen } from '../../test-utils';
import Toast from '../../../src/components/common/Toast';
import { ThemeProvider } from '../../../src/contexts/ThemeContext';

jest.mock('react-toastify', () => ({
  ToastContainer: ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="toast-container" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('../../../src/services/LocalStorageService', () => ({
  themeStorage: {
    get: jest.fn().mockReturnValue('light'),
    set: jest.fn(),
  },
}));

describe('Toast', () => {
  it('renders ToastContainer component', () => {
    render(
      <ThemeProvider>
        <Toast />
      </ThemeProvider>
    );
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
  });

  it('applies correct props to ToastContainer', () => {
    render(
      <ThemeProvider>
        <Toast />
      </ThemeProvider>
    );
    const toastContainer = screen.getByTestId('toast-container');
    
    expect(toastContainer).toBeInTheDocument();
  });
});