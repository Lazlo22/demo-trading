import { useCallback, type FC } from "react";

import { Button } from "@ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@ui/sheet";
import { useNavigation } from "@hooks/useNavigation";
import { useNavigationStore } from "@stores/NavigationStore";
import type { RouterRoutesNames } from "@constants/router";
import { cn } from "@utils/styles";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

export const MobileNavigation: FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const activeTab = useNavigationStore((state) => state.activeTab);
  const { navigationItems, handleNavigation } = useNavigation();

  const handleNavigationClick = useCallback((tab: RouterRoutesNames) => {
    handleNavigation(tab);
    onClose();
  }, []);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-64 bg-background-secondary border-border-primary p-0" side="left">
        <SheetHeader className="p-4 border-b border-border-primary">
          <SheetTitle className="text-xl font-bold text-text-primary text-left">TradeFi</SheetTitle>
        </SheetHeader>
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map(({ key, label, title }) => (
              <Button
                key={key}
                onClick={() => handleNavigationClick(label)}
                variant={activeTab === label ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start cursor-pointer font-medium",
                  activeTab === label
                    ? "bg-primary-500 text-white"
                    : "text-text-secondary hover:text-text-primary hover:bg-background-hover"
                )}
              >
                <span>{title}</span>
              </Button>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

MobileNavigation.displayName = "MobileNavigation";
