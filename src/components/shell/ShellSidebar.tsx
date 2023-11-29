import { useMergedRef } from '@/hooks/useMergedRef/useMergedRef';
import { IconArrowsHorizontal } from '@tabler/icons-react';
import { forwardRef, useRef, useCallback } from 'react';
import { Nav } from '@/components/nav/Nav';
import { useMatchMedia } from '@/hooks/useMatchMedia/useMatchMedia';
import { NavTreeBranchType } from '@/utils/utils';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';

export type ShellSidebarPropsType = {
  navTree: NavTreeBranchType[];

  tocMobileRef?: React.RefObject<HTMLDivElement>;
  shellContentRef?: React.RefObject<HTMLDivElement>;
} & ComponentGeneralPropsType;

export const ShellSidebar = forwardRef<HTMLElement, ShellSidebarPropsType>(
  (
    {
      navTree,
      tocMobileRef,
      className: classNameOutside,
      style: styleOutside,
      shellContentRef,
      ...props
    },
    forwardedRef
  ) => {
    const isDesktop = useMatchMedia('(min-width: 1280px)');

    const innerAsideRef = useRef<HTMLElement>(null);

    const mergedRef = useMergedRef(innerAsideRef, forwardedRef);

    const handleButtonClick = useCallback(() => {
      const asideElement = innerAsideRef.current;

      if (!asideElement) {
        return;
      }

      if (isDesktop) {
        asideElement.classList.toggle('sidebar--desktop-unactive');
      } else {
        asideElement.classList.toggle('sidebar--active');
      }
    }, [isDesktop]);

    return (
      <>
        <aside
          {...props}
          ref={mergedRef}
          style={{ ...styleOutside }}
          className={classnamify(
            `fixed sidebar xl:sticky xl:self-start w-5 xl:w-[350px] h-full xl:h-screen bg-white text-sm top-0 z-[100] left-0 border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800`,
            classNameOutside
          )}
        >
          <div className="overflow-y-auto sidebar__nav-container hidden xl:block max-h-full p-4 space-y-8">
            <Nav tree={navTree} {...{ shellContentRef, tocMobileRef }} />
          </div>
          <button
            type="button"
            onClick={handleButtonClick}
            className="bg-slate-200  dark:bg-slate-800 rounded w-8 h-12 inline-flex justify-center items-center absolute -translate-y-1/2 -translate-x-[40%] top-1/2 left-full"
          >
            <IconArrowsHorizontal />
            <span className="sr-only">
              Свернуть / развернуть боковую панель
            </span>
          </button>
        </aside>
        <div className="fixed hidden sidebar-overlay w-full h-full backdrop-blur-sm bg-black/20 z-[99]"></div>
      </>
    );
  }
);

ShellSidebar.displayName = 'Shell.Sidebar';
