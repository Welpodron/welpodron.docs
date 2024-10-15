'use client';

import { IconSun, IconMoon, IconLoader2 } from '@tabler/icons-react';
import { useContext, useEffect, useState } from 'react';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';
import { ThemeProviderContext } from '@/components/providers/theme/ThemeProviderContext';
import { useTooltip } from '@/hooks/useTooltip/useTooltip';

export type ButtonThemePropsType = {} & ComponentGeneralPropsType;

export const ButtonTheme = ({
  style: styleOutside,
  className: classNameOutside,
  ...props
}: ButtonThemePropsType) => {
  //! Next.js Hydration mismatch warning fix Thanks: https://www.npmjs.com/package/next-themes#avoid-hydration-mismatch
  const [isMountedState, setIsMountedState] = useState(false);

  const { theme, toggleTheme } = useContext(ThemeProviderContext);

  const { refs, update } = useTooltip<HTMLButtonElement, HTMLSpanElement>();

  //! так как useEffect вызывается на клиенте
  useEffect(() => {
    setIsMountedState(true);
  }, []);

  useEffect(() => {
    update();
  }, [theme, update]);

  return (
    <div className="relative">
      <button
        {...props}
        style={{
          ...styleOutside,
        }}
        onClick={toggleTheme}
        className={classnamify(
          `rounded p-2`,
          !isMountedState && 'pointer-events-none',
          classNameOutside
        )}
        ref={refs.anchorRef}
        type="button"
      >
        {!isMountedState ? (
          <IconLoader2 className="animate-spin pointer-events-none" />
        ) : theme === 'dark' ? (
          <IconSun className="text-yellow-500 pointer-events-none" />
        ) : (
          <IconMoon className="text-blue-500 pointer-events-none" />
        )}
        {isMountedState && (
          <span className="sr-only">
            {theme === 'dark'
              ? 'Переключить на светлую тему'
              : 'Переключить на темную тему'}
          </span>
        )}
      </button>
      <span
        ref={refs.contentRef}
        className="bg-[#101D41] z-[200] hidden rounded text-white p-2 text-xs absolute left-0 pointer-events-none top-0 w-max max-w-[200px] line-clamp-2"
      >
        {isMountedState && (
          <>{theme === 'dark' ? 'На светлую тему' : 'На темную тему'}</>
        )}
      </span>
    </div>
  );
};

ButtonTheme.displayName = 'Button.Theme';
