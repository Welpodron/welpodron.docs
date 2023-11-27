'use client';

import { IconSun, IconMoon, IconLoader2 } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';
import { ThemeProviderContext } from '@/components/providers/theme/ThemeProviderContext';

export type ButtonThemePropsType = {} & ComponentGeneralPropsType;

export const ButtonTheme = ({
  style: styleOutside,
  className: classNameOutside,
  ...props
}: ButtonThemePropsType) => {
  //! Next.js Hydration mismatch warning fix Thanks: https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
  const [isMountedState, setIsMountedState] = useState(false);

  const classNameInside = 'rounded p-2';

  const { theme, toggleTheme } = useContext(ThemeProviderContext);

  //! так как useEffect вызывается на клиенте
  useEffect(() => {
    setIsMountedState(true);
  }, []);

  const className = classnamify(classNameInside, classNameOutside);

  //! Next.js Hydration mismatch warning fix
  if (!isMountedState) {
    return (
      <div
        className={`rounded p-2 bg-slate-200 dark:bg-slate-800 text-indigo-700 pointer-events-none`}
      >
        <IconLoader2 className="animate-spin pointer-events-none" />
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
      className={className}
    >
      {theme === 'dark' ? (
        <IconSun className="text-yellow-500 pointer-events-none" />
      ) : (
        <IconMoon className="text-blue-500 pointer-events-none" />
      )}
      <span className="sr-only">
        {theme === 'dark'
          ? 'Переключить на светлую тему'
          : 'Переключить на темную тему'}
      </span>
    </button>
  );
};

ButtonTheme.displayName = 'Button.Theme';
