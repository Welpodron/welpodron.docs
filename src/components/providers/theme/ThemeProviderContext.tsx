import { createContext } from 'react';

export type ThemeProviderContextType = {
  theme: 'dark' | 'light';
  setTheme: (theme: 'dark' | 'light') => void;
  toggleTheme: () => void;
};

export const ThemeProviderContext = createContext<ThemeProviderContextType>({
  theme: 'light',
  setTheme: () => {},
  toggleTheme: () => {},
});

ThemeProviderContext.displayName = 'ThemeProvider.Context';
