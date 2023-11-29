'use client';

import { useCallback, useState } from 'react';

import { ThemeProviderContext } from './ThemeProviderContext';

export type ThemeProviderPropsType = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderPropsType) => {
  const [theme, setTheme] = useState<'dark' | 'light'>(
    typeof localStorage !== 'undefined' &&
      (localStorage.theme === 'dark' ||
        (localStorage.theme !== 'light' &&
          typeof window !== 'undefined' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches))
      ? 'dark'
      : 'light'
  );

  const toggleTheme = useCallback(() => {
    setTheme((currentValue) => {
      const nextValue = currentValue === 'dark' ? 'light' : 'dark';
      localStorage.theme = nextValue;

      if (nextValue === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      return nextValue;
    });
  }, []);

  const _setTheme = useCallback((theme: 'dark' | 'light') => {
    setTheme(theme);
    localStorage.theme = theme;

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <ThemeProviderContext.Provider
      value={{ theme, toggleTheme, setTheme: _setTheme }}
    >
      <script
        dangerouslySetInnerHTML={{
          __html: `try{"dark"===localStorage.getItem("theme")||null===localStorage.getItem("theme")&&window.matchMedia("(prefers-color-scheme: dark)").matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}catch(e){}`,
        }}
      ></script>
      {children}
    </ThemeProviderContext.Provider>
  );
};

ThemeProvider.displayName = 'ThemeProvider';
