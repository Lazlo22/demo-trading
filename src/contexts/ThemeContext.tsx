
import { createContext, useContext, useEffect, useMemo, useState, type FC, type PropsWithChildren } from 'react';

import { themeStorage } from '@services/LocalStorageService';
import { ETheme } from '@constants/theme';

interface ThemeContextType {
  theme: ETheme;
  setTheme: (theme: ETheme) => void;
  isDarkTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<ETheme>(themeStorage.get());

  useEffect(() => {
    themeStorage.set(theme);
    setTheme(theme);
    
    document.documentElement.classList.remove(ETheme.Light, ETheme.Dark);
    document.documentElement.classList.add(theme);
    document.body.classList.remove(ETheme.Light, ETheme.Dark);
    document.body.classList.add(theme);
  }, [theme]);

  const contextValue = useMemo(() => ({
    theme,
    setTheme,
    isDarkTheme: theme === ETheme.Dark
  }), [theme]);

  return (
    <ThemeContext value={contextValue}>
      {children}
    </ThemeContext>
  );
};

ThemeProvider.displayName = "ThemeProvider";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
