import { create } from 'zustand';

import { RouterRoutesNames } from '@constants/router';

interface NavigationStore {
  activeTab: RouterRoutesNames;
  setActiveTab: (tab: RouterRoutesNames) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  activeTab: RouterRoutesNames.Home,
  setActiveTab: (tab) => set({ activeTab: tab }),
}));