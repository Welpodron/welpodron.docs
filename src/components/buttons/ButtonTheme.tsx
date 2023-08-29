import { useTheme } from "@/hooks/useTheme/useTheme";
import { IconSun, IconMoon, IconLoader2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ComponentGeneralPropsType } from "@/components/component/Component";
import { useMergedClassName } from "@/hooks/useMergedClassName/useMergedClassName";

export type ButtonThemePropsType = {} & ComponentGeneralPropsType;

export const ButtonTheme = ({
  style: styleOutside,
  className: classNameOutside,
  ...props
}: ButtonThemePropsType) => {
  //! Next.js Hydration mismatch warning fix Thanks: https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
  const [isMounted, setIsMounted] = useState(false);

  const classNameInside = "rounded p-2";

  const { theme, toggleTheme } = useTheme();

  //! Next.js Hydration mismatch warning fix
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //! Next.js Hydration mismatch warning fix
  if (!isMounted) {
    return (
      <div
        className={`rounded p-2 bg-slate-200 dark:bg-slate-800 text-indigo-700 `}
      >
        <IconLoader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <button
      {...props}
      style={{
        ...styleOutside,
      }}
      onClick={toggleTheme}
      className={useMergedClassName(classNameInside, classNameOutside)}
    >
      {theme === "dark" ? (
        <IconSun className="text-yellow-500" />
      ) : (
        <IconMoon className="text-blue-500" />
      )}
      <span className="sr-only">
        {theme === "dark"
          ? "Переключить на светлую тему"
          : "Переключить на темную тему"}
      </span>
    </button>
  );
};

ButtonTheme.displayName = "Button.Theme";
