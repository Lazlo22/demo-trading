import { memo, useState } from "react";
import { Menu } from "lucide-react";

import { useNavigation } from "@hooks/useNavigation";
import { useNavigationStore } from "@stores/NavigationStore";
import { Button } from "@ui/button";
import { ThemeToggle } from "./components/ThemeToggle";
import { MobileNavigation } from "./components/MobileNavigation";
import { cn } from "@utils/styles";
import { Menubar, MenubarMenu, MenubarTrigger } from "@ui/menubar";

export const Header = memo(() => {
  const activeTab = useNavigationStore((state) => state.activeTab);

  const { navigationItems, handleNavigation } = useNavigation();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  return (
    <>
      <header
        className="h-16 bg-nav-bg border-b border-border-primary text-nav-text flex items-center justify-between px-4 lg:px-6 shadow-sm"
        role="banner"
      >
        <div className="flex items-center space-x-4 lg:space-x-8">
          <Button
            onClick={() => setIsMobileNavOpen(true)}
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer hover:bg-nav-hover transition-all duration-150 hover:scale-105 active:scale-95"
            aria-label={"open mobile menu"}
          >
            <Menu className="w-5 h-5 text-text-secondary" />
          </Button>
          <h1 className="text-xl font-bold lg:ml-0 text-text-primary">TradeFi</h1>
          <nav className="hidden md:flex border-none bg-transparent" role="navigation" aria-label="Main navigation">
            <Menubar className="border-none bg-transparent">
              {navigationItems.map(({ key, label, title }) => (
                <MenubarMenu key={key}>
                  <MenubarTrigger
                    onClick={() => handleNavigation(label)}
                    className={cn(
                      "cursor-pointer font-medium border-none gap-2 px-4 py-2 transition-all duration-150 hover:scale-105 active:scale-95",
                      activeTab === label
                        ? "bg-primary-500 text-white"
                        : "text-text-secondary hover:text-text-primary hover:bg-nav-hover"
                    )}
                    aria-current={activeTab === label ? "page" : undefined}
                  >
                    <span>{title}</span>
                  </MenubarTrigger>
                </MenubarMenu>
              ))}
            </Menubar>
          </nav>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </header>
      <MobileNavigation isOpen={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)} />
    </>
  );
});

Header.displayName = "Header";
