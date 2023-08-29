"use client";

import { TocTreeBranchType } from "@/utils/utils";
import { forwardRef } from "react";
import { TocControl } from "./TocControl";

const renderTree = (tree: TocTreeBranchType[], depth: number) => {
  return (
    <ul>
      {tree.map((branch) => (
        <li key={branch.url}>
          <TocControl {...{ branch, depth, renderTree }} />
        </li>
      ))}
    </ul>
  );
};

export type TocPropsType = {
  tree: TocTreeBranchType[];
};

export const Toc = forwardRef<HTMLDivElement, TocPropsType>(
  ({ tree }, forwardedRef) => {
    if (!tree.length) {
      return null;
    }

    return (
      <div ref={forwardedRef} className="space-y-8">
        <h3 className="font-medium">На странице:</h3>
        {renderTree(tree, 0)}
      </div>
    );
  }
);

Toc.displayName = "Toc";
