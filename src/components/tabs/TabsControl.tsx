"use client";

import { forwardRef, useCallback, useContext } from "react";
import { TabsContext } from "./TabsContext";
import { useMergedClassName } from "@/hooks/useMergedClassName/useMergedClassName";
import { polymorphize } from "@/utils/polymorphize/polymorphize";

export type TabsControlPropsType = {
  itemId: string;
  className?: string;
  children: React.ReactNode;
};

const _TabsControl = forwardRef<
  HTMLButtonElement,
  TabsControlPropsType & {
    as?: React.ElementType;
  }
>(
  (
    { children, itemId, className: classNameOutside, as, ...props },
    refForwarded
  ) => {
    const { activeItemId, setActiveItemId, items } = useContext(TabsContext);

    const item = items.find((item) => item.itemId === itemId);

    const Element = as || "button";

    const handleElementClick = useCallback(() => {
      setActiveItemId(itemId);
    }, [setActiveItemId]);

    return (
      <Element
        {...props}
        ref={refForwarded}
        role="tab"
        aria-controls={item?.id}
        aria-selected={activeItemId === itemId}
        className={useMergedClassName(classNameOutside)}
        onClick={handleElementClick}
      >
        {children}
      </Element>
    );
  }
);

_TabsControl.displayName = "Tabs.Control";

export const TabsControl = polymorphize<"button", TabsControlPropsType>(
  _TabsControl
);
