import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNavigationStore } from '@stores/NavigationStore';
import { RouterRoutes, RouterRoutesNames } from '@constants/router';

interface NavigationItem {
    label: RouterRoutesNames;
    key: RouterRoutes;
    title: string;
}

interface UseNavigationReturn {
    handleNavigation: (tab: RouterRoutesNames) => void;
    navigationItems: NavigationItem[];
}

export const useNavigation = (): UseNavigationReturn => {
    const navigate = useNavigate();

    const setActiveTab = useNavigationStore((state) => state.setActiveTab);

    const handleNavigation = useCallback((tab: RouterRoutesNames) => {
        setActiveTab(tab);
        navigate(`/${tab}`);
    }, []);
  
    const navigationItems = useMemo(() => [
        { key: RouterRoutes.Home, label: RouterRoutesNames.Home, title: 'Home' },
        { key: RouterRoutes.Trade, label: RouterRoutesNames.Trade, title: 'Trade' },
    ], []);
  
  return useMemo(() => ({
    handleNavigation,
    navigationItems,
  }), [handleNavigation, navigationItems]);
};