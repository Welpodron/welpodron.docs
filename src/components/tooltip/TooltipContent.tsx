"use client";

import { useRef, useEffect, useMemo, useCallback } from "react";

export type TooltipContentPropsType = {
  text: string;
  controlRef: React.RefObject<HTMLElement>;
};

export const TooltipContent = ({
  text,
  controlRef,
}: TooltipContentPropsType) => {
  const contentRef = useRef<HTMLSpanElement>(null);

  const handleWindowResize = () => {
    recalculatePosition();
  };

  const handleWindowScroll = () => {
    recalculatePosition();
  };

  const recalculatePosition = useCallback(() => {
    if (
      !contentRef ||
      !contentRef.current ||
      !controlRef ||
      !controlRef.current
    ) {
      return;
    }

    const {
      width: controlWidth,
      height: controlHeight,
      left: controlLeft,
      top: controlTop,
    } = controlRef.current.getBoundingClientRect();

    let x = controlLeft + window.scrollX;
    let y = controlTop + window.scrollY;

    contentRef.current.style.left = x + "px";
    contentRef.current.style.top = y + controlHeight + "px";

    const {
      width: contentWidth,
      height: contentHeight,
      left: contentLeft,
      top: contentTop,
    } = contentRef.current.getBoundingClientRect();

    if (
      Math.ceil(contentLeft + contentWidth) >=
      document.documentElement.clientWidth
    ) {
      contentRef.current.style.left = x - contentWidth + controlWidth + "px";
    }

    if (
      Math.ceil(contentTop + contentHeight) >=
      document.documentElement.clientHeight
    ) {
      contentRef.current.style.top = y - contentHeight + "px";
    }
  }, [contentRef, controlRef]);

  const resizeObserver = useMemo(
    () =>
      typeof window !== "undefined"
        ? new ResizeObserver(() => recalculatePosition())
        : null,
    [recalculatePosition]
  );

  useEffect(() => {
    if (
      !contentRef ||
      !contentRef.current ||
      !controlRef ||
      !controlRef.current
    ) {
      return;
    }

    recalculatePosition();

    if (resizeObserver) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener("resize", handleWindowResize);
    window.addEventListener("scroll", handleWindowScroll);

    contentRef.current.style.opacity = "1";

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", handleWindowResize);
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [contentRef, controlRef]);

  return (
    <span
      ref={contentRef}
      className="bg-[#101D41] z-[200] rounded text-white p-2 text-sm absolute left-0 pointer-events-none top-0 opacity-0 max-w-[200px] truncate"
    >
      {text}
    </span>
  );
};

TooltipContent.displayName = "Tooltip.Content";
