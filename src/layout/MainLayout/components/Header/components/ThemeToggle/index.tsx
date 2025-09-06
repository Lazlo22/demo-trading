import { memo } from "react";
import { Moon, Sun } from "lucide-react";

import { useTheme } from "@/contexts/ThemeContext";
import { ETheme } from "@constants/theme";
import { Button } from "@ui/button";

export const ThemeToggle = memo(() => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === ETheme.Light ? ETheme.Dark : ETheme.Light);
  };

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      size="icon"
      className="cursor-pointer hover:bg-nav-hover transition-all duration-150 hover:scale-105 active:scale-95"
      aria-label={`Switch to ${theme === ETheme.Light ? 'dark' : 'light'} theme`}
    >
      {theme === ETheme.Light ? (
        <Moon className="w-5 h-5 text-text-secondary" />
      ) : (
        <Sun className="w-5 h-5 text-text-secondary" />
      )}
    </Button>
  );
});

ThemeToggle.displayName = "ThemeToggle";