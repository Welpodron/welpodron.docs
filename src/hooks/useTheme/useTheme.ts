"use client";

import { useCallback, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"dark" | "light">(
    (typeof localStorage !== "undefined" && localStorage.theme === "dark") ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light"
  );

  const toggleTheme = useCallback(() => {
    setTheme((currentValue) => {
      const nextValue = currentValue === "dark" ? "light" : "dark";
      localStorage.theme = nextValue;

      if (nextValue === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      return nextValue;
    });
  }, [setTheme]);

  const _setTheme = useCallback(
    (theme: "dark" | "light") => {
      setTheme(theme);
      localStorage.theme = theme;

      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    [setTheme]
  );

  return { theme, toggleTheme, setTheme: _setTheme };
};
