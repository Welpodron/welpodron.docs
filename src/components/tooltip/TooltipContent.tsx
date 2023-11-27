'use client';

import { useRef, useEffect, useMemo, useCallback, useContext } from 'react';
import { TooltipContext } from './TooltipContext';

export type TooltipContentPropsType = {
  text: string;
  controlRef: React.RefObject<HTMLElement>;
};

export const TooltipContent = ({
  text,
  controlRef,
}: TooltipContentPropsType) => {
  const contentRef = useRef<HTMLSpanElement>(null);

  // const handleWindowResize = () => {
  //   recalculatePosition();
  // };

  // const handleWindowScroll = () => {
  //   recalculatePosition();
  // };

  const recalculatePosition = useCallback(() => {
    const anchor = controlRef.current;
    const tooltipElement = contentRef.current;

    if (!tooltipElement || !anchor) {
      return;
    }

    const {
      width: anchorWidth,
      height: anchorHeight,
      left: anchorLeft,
      top: anchorTop,
      bottom: anchorBottom,
    } = anchor.getBoundingClientRect();

    // tooltipElement.style.left = anchorLeft + window.scrollX + 'px';
    // tooltipElement.style.top = anchorTop + anchorHeight + window.scrollY + 'px';

    //! Код ниже работает если находятся в одном relative контейнере
    // tooltipElement.style.left = anchor.offsetLeft + 'px';
    // tooltipElement.style.top = anchor.offsetTop + anchorHeight + 'px';

    //! Код ниже работает если тултип находится внутри anchor и anchor имеет position: relative
    tooltipElement.style.left = '0';
    tooltipElement.style.top = anchorHeight + 'px';

    const beforeClientHeight = document.documentElement.clientHeight;
    const beforeClientWidth = document.documentElement.clientWidth;

    const {
      width: elementWidth,
      height: elementHeight,
      left: elementLeft,
      top: elementTop,
    } = tooltipElement.getBoundingClientRect();

    // if (Math.ceil(elementLeft + elementWidth) >= beforeClientWidth) {
    //   tooltipElement.style.left =
    //     anchorLeft + window.scrollX - elementWidth + anchorWidth + 'px';
    // }

    // if (Math.ceil(elementTop + elementHeight) >= beforeClientHeight) {
    //   tooltipElement.style.top =
    //     anchorTop + window.scrollY - elementHeight + 'px';
    // }

    //! Код ниже работает если находятся в одном relative контейнере
    // if (Math.ceil(elementLeft + elementWidth) >= beforeClientWidth) {
    //   tooltipElement.style.left =
    //     anchor.offsetLeft - elementWidth + anchorWidth + 'px';
    // }

    // if (Math.ceil(elementTop + elementHeight) >= beforeClientHeight) {
    //   tooltipElement.style.top = anchor.offsetTop - elementHeight + 'px';
    // }

    //! Код ниже работает если тултип находится внутри anchor и anchor имеет position: relative
    if (Math.ceil(elementLeft + elementWidth) >= beforeClientWidth) {
      tooltipElement.style.left = anchorWidth - elementWidth + 'px';
    }

    // if (Math.ceil(elementTop + elementHeight) >= beforeClientHeight) {
    //   tooltipElement.style.top = anchor.offsetTop - elementHeight + 'px';
    // }
  }, [controlRef]);

  const { isActive } = useContext(TooltipContext);

  //! OLD WAY
  // const recalculatePosition = useCallback(() => {
  //   if (
  //     !contentRef ||
  //     !contentRef.current ||
  //     !controlRef ||
  //     !controlRef.current
  //   ) {
  //     return;
  //   }

  //   const {
  //     width: controlWidth,
  //     height: controlHeight,
  //     left: controlLeft,
  //     top: controlTop,
  //   } = controlRef.current.getBoundingClientRect();

  //   let x = controlLeft + window.scrollX;
  //   let y = controlTop + window.scrollY;

  //   contentRef.current.style.left = x + 'px';
  //   contentRef.current.style.top = y + controlHeight + 'px';

  //   const {
  //     width: contentWidth,
  //     height: contentHeight,
  //     left: contentLeft,
  //     top: contentTop,
  //   } = contentRef.current.getBoundingClientRect();

  //   if (
  //     Math.ceil(contentLeft + contentWidth) >=
  //     document.documentElement.clientWidth
  //   ) {
  //     contentRef.current.style.left = x - contentWidth + controlWidth + 'px';
  //   }

  //   if (
  //     Math.ceil(contentTop + contentHeight) >=
  //     document.documentElement.clientHeight
  //   ) {
  //     contentRef.current.style.top = y - contentHeight + 'px';
  //   }
  // }, [contentRef, controlRef]);

  // const resizeObserver = useMemo(
  //   () =>
  //     typeof window !== 'undefined'
  //       ? new ResizeObserver(() => recalculatePosition())
  //       : null,
  //   [recalculatePosition]
  // );

  // useEffect(() => {
  //   if (
  //     !contentRef ||
  //     !contentRef.current ||
  //     !controlRef ||
  //     !controlRef.current
  //   ) {
  //     return;
  //   }

  //   recalculatePosition();

  //   if (resizeObserver) {
  //     resizeObserver.observe(contentRef.current);
  //   }

  //   // window.addEventListener("resize", handleWindowResize);
  //   // window.addEventListener("scroll", handleWindowScroll);

  //   contentRef.current.style.opacity = '1';

  //   return () => {
  //     if (resizeObserver) {
  //       resizeObserver.disconnect();
  //     }
  //     // window.removeEventListener("resize", handleWindowResize);
  //     // window.removeEventListener("scroll", handleWindowScroll);
  //   };
  // }, [contentRef, controlRef]);

  useEffect(() => {
    if (isActive) {
      recalculatePosition();
    }
  }, [isActive, recalculatePosition]);

  return (
    <>
      {isActive && (
        <span
          ref={contentRef}
          className="bg-[#101D41] z-[200] rounded text-white p-2 text-sm absolute left-0 pointer-events-none top-0 max-w-[200px] truncate"
        >
          {text}
        </span>
      )}
    </>
  );
};

TooltipContent.displayName = 'Tooltip.Content';
