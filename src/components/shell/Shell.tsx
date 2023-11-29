'use client';

import { useCallback, useEffect, useRef } from 'react';

import { ShellAside } from './ShellAside';
import { ShellContent } from './ShellContent';
import { ShellSidebar } from './ShellSidebar';
import { BreadcrumbsTreeBranchType } from '@/utils/utils';
import { NavTreeBranchType } from '@/utils/utils';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';

type ShellPropsType = {
  children: React.ReactNode;
  navTree: NavTreeBranchType[];
  tocTree: any[];
  breadcrumbsTree: BreadcrumbsTreeBranchType[];
} & ComponentGeneralPropsType;

export const Shell = ({
  children,
  navTree,
  tocTree,
  breadcrumbsTree,
  className: classNameOutside,
  style: styleOutside,
  ...props
}: ShellPropsType) => {
  const tocRef = useRef<HTMLDivElement>(null);
  const tocParentRef = useRef<HTMLDivElement>(null);
  const tocMobileRef = useRef<HTMLDivElement>(null);
  const shellAsideRef = useRef<HTMLElement>(null);
  const shellContentRef = useRef<HTMLDivElement>(null);

  const _check = () => {
    if (!shellAsideRef || !shellAsideRef.current) {
      return;
    }

    if (!window) {
      return;
    }

    return true;
  };

  const _checkToc = () => {
    if (!tocRef || !tocRef.current) {
      return;
    }

    if (!tocParentRef || !tocParentRef.current) {
      return;
    }

    if (!tocMobileRef || !tocMobileRef.current) {
      return;
    }

    return true;
  };

  const handleWindowResize = useCallback(
    (event: Event) => {
      if (!_check()) {
        return;
      }

      if (window.innerWidth < 1280) {
        (shellAsideRef.current as HTMLElement).style.display = 'none';
        //! WTF c:
        if (!_checkToc()) {
          return;
        }

        if (!tocMobileRef.current?.contains(tocRef.current)) {
          tocMobileRef.current?.append(tocRef.current as HTMLElement);
        }
      } else {
        shellAsideRef.current?.style.removeProperty('display');
        //! WTF c:
        if (!_checkToc()) {
          return;
        }

        if (!tocParentRef.current?.contains(tocRef.current)) {
          tocParentRef.current?.append(tocRef.current as HTMLElement);
        }
      }
    },
    [shellAsideRef, tocRef, tocParentRef, tocMobileRef]
  );

  useEffect(() => {
    if (!_check()) {
      return;
    }

    window.removeEventListener('resize', handleWindowResize);
    window.addEventListener('resize', handleWindowResize);

    handleWindowResize(new Event('resize'));

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [shellAsideRef, tocRef, tocParentRef, tocMobileRef, handleWindowResize]);

  return (
    <div
      {...props}
      style={{
        ...styleOutside,
      }}
      className={classnamify(
        'grid grid-rows-1 grid-cols-1 pl-5 xl:pl-0 xl:grid-cols-[min-content_minmax(300px,_1fr)_min-content]',
        classNameOutside
      )}
    >
      <ShellSidebar {...{ shellContentRef, tocMobileRef, navTree }} />
      <ShellContent ref={shellContentRef} {...{ breadcrumbsTree }}>
        {children}
      </ShellContent>
      <ShellAside ref={shellAsideRef} {...{ tocTree, tocParentRef, tocRef }} />
    </div>
  );
};

Shell.displayName = 'Shell';
