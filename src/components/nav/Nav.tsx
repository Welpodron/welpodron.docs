'use client';

import { forwardRef, useCallback, useRef } from 'react';

import { useMergedRef } from '@/hooks/useMergedRef/useMergedRef';

import { NavControl } from './control/NavControl';
import Link from 'next/link';
import { IconHome } from '@tabler/icons-react';
import { NavTreeBranchType } from '@/utils/utils';
import Image from 'next/image';

const renderTree = (tree: NavTreeBranchType[], depth: number) => {
  return (
    <ul
      style={{
        marginLeft: depth * 4 + 'px',
      }}
    >
      {tree.map((branch) => (
        <li key={branch.url}>
          <NavControl {...{ branch, depth, renderTree }} />
        </li>
      ))}
    </ul>
  );
};

export type NavPropsType = {
  tree: NavTreeBranchType[];
  tocMobileRef?: React.RefObject<HTMLDivElement>;
  shellContentRef?: React.RefObject<HTMLDivElement>;
};

export const Nav = forwardRef<HTMLDivElement, NavPropsType>(
  ({ tree, tocMobileRef, shellContentRef }, forwardedRef) => {
    const ref = useRef<HTMLDivElement>(null);

    const mergedRef = useMergedRef(ref, forwardedRef);

    const handleBtnToContentClick = useCallback(() => {
      if (!shellContentRef || !shellContentRef.current) {
        return;
      }

      shellContentRef.current.focus();
    }, [shellContentRef]);

    if (!tree.length) {
      return <></>;
    }

    return (
      <nav ref={mergedRef} className="space-y-8">
        <div className="flex items-center justify-between">
          <Link
            scroll={false}
            href="/"
            className="inline-flex items-center p-2 font-medium text-xs lowercase bg-slate-200 dark:bg-slate-800 rounded"
          >
            <Image
              src="/logo.svg"
              className="shrink-0 mr-1 w-5 h-5"
              width={255}
              height={236}
              alt="logo"
            />
            Welpodron.Docs
          </Link>
          <Link
            scroll={false}
            className="rounded text-white inline-block p-2 bg-indigo-500 dark:text-slate-300 dark:bg-indigo-700"
            href="/"
          >
            <IconHome />
            <span className="sr-only">Домашняя страница</span>
          </Link>
          <button
            onClick={handleBtnToContentClick}
            className="text-sm sr-only focus-visible:not-sr-only"
          >
            Перейти к содержимому
          </button>
        </div>
        <div ref={tocMobileRef}></div>
        <p className="font-medium">Навигация:</p>
        {renderTree(tree, 0)}
      </nav>
    );
  }
);

Nav.displayName = 'Nav';
