import { useNavigationStore } from '../../src/stores/NavigationStore';
import { RouterRoutesNames } from '../../src/constants/router';

describe('NavigationStore', () => {
  beforeEach(() => {
    useNavigationStore.setState({ activeTab: RouterRoutesNames.Home });
  });

  it('initializes with Home as default active tab', () => {
    const state = useNavigationStore.getState();

    expect(state.activeTab).toBe(RouterRoutesNames.Home);
  });

  it('sets active tab', () => {
    const { setActiveTab } = useNavigationStore.getState();
    
    setActiveTab(RouterRoutesNames.Trade);
    
    expect(useNavigationStore.getState().activeTab).toBe(RouterRoutesNames.Trade);
  });

  it('handles all available route names', () => {
    const { setActiveTab } = useNavigationStore.getState();
    
    Object.values(RouterRoutesNames).forEach(routeName => {
      setActiveTab(routeName);
      expect(useNavigationStore.getState().activeTab).toBe(routeName);
    });
  });
});