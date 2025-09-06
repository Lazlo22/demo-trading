import { type FC, type PropsWithChildren, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useNavigationStore } from "@stores/NavigationStore";
import { Header } from "./components/Header";
import { RouterRoutesNames } from "@constants/router";

const routeMap: Record<string, RouterRoutesNames> = {
  '': RouterRoutesNames.Home,
  'trade': RouterRoutesNames.Trade,
};

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const activeTab = useNavigationStore((state) => state.activeTab);
  const setActiveTab = useNavigationStore((state) => state.setActiveTab);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1);
    const currentRoute = routeMap[path] || RouterRoutesNames.Home;

    if (currentRoute !== activeTab) {
      setActiveTab(currentRoute);
    }
  }, [location.pathname, activeTab, setActiveTab]);

  return (
    <div className="h-screen bg-background-primary flex flex-col overflow-hidden" data-testid="main-layout">
      <Header />
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <main 
          className="flex-1 transition-all duration-300 overflow-y-auto"
          role="main"
          aria-label={`${activeTab} page content`}
        >
            <div className="min-h-full">
                {children}
            </div>
        </main>
      </div>
    </div>
  );
};

MainLayout.displayName = "MainLayout";

export default MainLayout;
