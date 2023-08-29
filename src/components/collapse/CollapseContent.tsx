import { forwardRef, useContext } from "react";

import { polymorphize } from "@/utils/polymorphize/polymorphize";

import { CollapseContext } from "./CollapseContext";
import { ComponentGeneralPropsType } from "@/components/component/Component";
import { useMergedClassName } from "@/hooks/useMergedClassName/useMergedClassName";

type CollapseContentPropsType = {
  /** default children */
  children: React.ReactNode;
} & ComponentGeneralPropsType;

const _CollapseContent = forwardRef<
  HTMLDivElement,
  CollapseContentPropsType & {
    as?: React.ElementType;
  }
>(
  (
    {
      children,
      as,
      style: styleOutside,
      className: classNameOutside,
      ...props
    },
    refForwarded
  ) => {
    const { isActive, _id } = useContext(CollapseContext);

    const styleInside = { display: isActive ? "block" : "none" };

    const Element = as || "div";

    return (
      <Element
        {...props}
        ref={refForwarded}
        style={{ ...styleOutside, ...styleInside }}
        className={useMergedClassName(classNameOutside)}
        id={_id}
        aria-expanded={isActive}
      >
        {children}
      </Element>
    );
  }
);

_CollapseContent.displayName = "Collapse.Content";

export const CollapseContent = polymorphize<"div", CollapseContentPropsType>(
  _CollapseContent
);
