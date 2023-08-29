"use client";

import { forwardRef, useCallback, useRef } from "react";

import { useMergedRef } from "@/hooks/useMergedRef/useMergedRef";

import { NavControl } from "./control/NavControl";
import Link from "next/link";
import { IconHome } from "@tabler/icons-react";
import { NavTreeBranchType } from "@/utils/utils";

const renderTree = (tree: NavTreeBranchType[], depth: number) => {
  return (
    <ul
      style={{
        marginLeft: depth * 8 + "px",
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

    if (!tree.length) {
      return null;
    }

    const handleBtnToContentClick = useCallback(() => {
      if (!shellContentRef || !shellContentRef.current) {
        return;
      }

      shellContentRef.current.focus();
    }, [shellContentRef]);

    return (
      <nav ref={mergedRef} className="space-y-8">
        <div className="flex items-center justify-between">
          <Link
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
        <p className="font-medium">Навигация:</p>
        {renderTree(tree, 0)}
        <div ref={tocMobileRef}></div>
      </nav>
    );
  }
);

Nav.displayName = "Nav";
