import { renderHook } from '../test-utils';
import { useNavigation } from '../../src/hooks/useNavigation';
import { RouterRoutes, RouterRoutesNames } from '../../src/constants/router';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('useNavigation', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns navigation functions and items', () => {
    const { result } = renderHook(() => useNavigation());
    
    expect(result.current).toHaveProperty('handleNavigation');
    expect(result.current).toHaveProperty('navigationItems');
    expect(typeof result.current.handleNavigation).toBe('function');
    expect(Array.isArray(result.current.navigationItems)).toBe(true);
  });

  it('provides correct navigation items', () => {
    const { result } = renderHook(() => useNavigation());
    
    expect(result.current.navigationItems).toHaveLength(2);
    expect(result.current.navigationItems[0]).toEqual({
      key: RouterRoutes.Home,
      label: RouterRoutesNames.Home,
      title: 'Home',
    });
    expect(result.current.navigationItems[1]).toEqual({
      key: RouterRoutes.Trade,
      label: RouterRoutesNames.Trade,
      title: 'Trade',
    });
  });

  it('handleNavigation sets active tab and navigates', () => {
    const { result } = renderHook(() => useNavigation());
    
    result.current.handleNavigation(RouterRoutesNames.Trade);
    
    expect(mockNavigate).toHaveBeenCalledWith(RouterRoutes.Trade);
  });

  it('handleNavigation works with home route', () => {
    const { result } = renderHook(() => useNavigation());
    
    result.current.handleNavigation(RouterRoutesNames.Home);
    
    expect(mockNavigate).toHaveBeenCalledWith(RouterRoutes.Home);
  });
});