"use client";

import { LayoutHeader } from "./LayoutHeader";
import { LayoutFooter } from "./LayoutFooter";
import { LayoutContent } from "./LayoutContent";

import { useMergedClassName } from "@/hooks/useMergedClassName/useMergedClassName";
import { ComponentGeneralPropsType } from "@/components/component/Component";
import { NavTreeBranchType } from "@/utils/utils";
import { LayoutSidebar } from "./LayoutSidebar";

export type LayoutPropsType = {
  navTree: NavTreeBranchType[];
} & ComponentGeneralPropsType;

export const Layout = ({
  navTree,
  style: styleOutside,
  className: classNameOutside,
  ...props
}: LayoutPropsType) => {
  const classNameInside = "grid relative grid-rows-[auto_minmax(0,_1fr)_auto]";

  return (
    <div
      {...props}
      style={{
        ...styleOutside,
      }}
      className={useMergedClassName(classNameOutside, classNameInside)}
    >
      <LayoutSidebar />
      <LayoutHeader />
      <LayoutContent {...{ navTree }} />
      <LayoutFooter />
    </div>
  );
};

Layout.Header = LayoutHeader;
Layout.Content = LayoutContent;
Layout.Footer = LayoutFooter;

Layout.displayName = "Layout";
