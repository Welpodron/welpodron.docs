import {
  useState,
  Children,
  useRef,
  useCallback,
  useEffect,
  cloneElement,
} from "react";
import { createPortal } from "react-dom";
import { TooltipContent } from "./TooltipContent";

export type TooltipControlPropsType = {
  text: string;
  children: React.ReactNode;
};

export const TooltipControl = ({ children, text }: TooltipControlPropsType) => {
  const [isActive, setIsActive] = useState(false);

  const anchor = Children.only(children) as React.ReactElement;
  const anchorRef = useRef<HTMLElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsActive(true);
  }, [setIsActive]);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  const handleWindowResize = useCallback(() => {
    setIsActive(false);
  }, [setIsActive]);

  useEffect(() => {
    if (!anchorRef || !anchorRef.current) {
      return;
    }

    anchorRef.current.addEventListener("mouseenter", handleMouseEnter);
    anchorRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (!anchorRef || !anchorRef.current) {
        return;
      }

      anchorRef.current.removeEventListener("mouseenter", handleMouseEnter);
      anchorRef.current.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [anchorRef.current]);

  const anchorWithRef = cloneElement(anchor, {
    ref: anchorRef,
  });

  return (
    <>
      {anchorWithRef}
      {isActive &&
        createPortal(
          <TooltipContent text={text} controlRef={anchorRef} />,
          document.body
        )}
    </>
  );
};

TooltipControl.displayName = "Tooltip.Control";
