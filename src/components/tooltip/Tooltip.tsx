import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useMatchMedia } from "@/hooks/useMatchMedia/useMatchMedia";

export type TooltipPropsType = {
  children: React.ReactElement;
  placement?: "portal" | "relative";
  label: string;
  toggleOnClick?: boolean;
};

export const Tooltip = ({
  children,
  label,
  placement = "portal",
  toggleOnClick,
}: TooltipPropsType) => {
  const isTouch = useMatchMedia("(hover: none)");

  const anchorElement = Children.only(children);
  const anchorRef = useRef<HTMLElement>(null);

  const anchorWithRef = cloneElement(anchorElement, {
    ref: anchorRef,
  });

  const [isMounted, setIsMounted] = useState(false);
  const [isMountedState, setIsMountedState] = useState(false);

  const spanRef = useRef<HTMLSpanElement>(null);

  const isMountedRef = useRef(false);

  const [opacityAnimationFinished, setOpacityAnimationFinished] =
    useState(false);
  const [transformAnimationFinished, setTransformAnimationFinished] =
    useState(false);

  const handleTransitionEnd = useCallback((event: TransitionEvent) => {
    if (event.target !== spanRef.current) {
      return;
    }

    if (event.propertyName === "transform") {
      setTransformAnimationFinished(true);
    }

    if (event.propertyName === "opacity") {
      setOpacityAnimationFinished(true);
    }
  }, []);

  const update = useCallback(() => {
    const anchorElement = anchorRef.current;
    const contentElement = spanRef.current;

    if (!anchorElement || !contentElement) {
      return;
    }

    const {
      width: anchorWidth,
      height: anchorHeight,
      left: anchorLeft,
      top: anchorTop,
    } = anchorElement.getBoundingClientRect();

    if (placement === "portal") {
      contentElement.style.left = anchorLeft + window.scrollX + "px";
      contentElement.style.top =
        anchorTop + anchorHeight + window.scrollY + 5 + "px";

      const beforeClientHeight = document.documentElement.clientHeight;
      const beforeClientWidth = document.documentElement.clientWidth;

      const {
        width: elementWidth,
        height: elementHeight,
        left: elementLeft,
        top: elementTop,
      } = contentElement.getBoundingClientRect();

      if (Math.ceil(elementLeft + elementWidth) >= beforeClientWidth) {
        contentElement.style.left =
          anchorLeft + window.scrollX - elementWidth + anchorWidth + "px";
      }

      if (Math.ceil(elementTop + elementHeight) >= beforeClientHeight) {
        contentElement.style.top =
          anchorTop + window.scrollY - elementHeight - 5 + "px";
      }
    } else {
      const contentRect = contentElement.getBoundingClientRect();

      contentElement.style.top = `${
        anchorElement.offsetTop + anchorHeight + 5
      }px`;

      contentElement.style.left = `${
        anchorElement.offsetLeft + anchorWidth - contentRect.width
      }px`;
    }
  }, [placement]);

  const handleAnchorMouseEnter = useCallback(() => {
    setIsMounted(true);
  }, []);

  const handleAnchorMouseLeave = useCallback(() => {
    setIsMounted(false);
  }, []);

  const handleAnchorClick = useCallback(() => {
    setIsMounted((value) => !value);
  }, []);

  useEffect(() => {
    if (!isTouch) {
      anchorRef.current?.addEventListener("mouseenter", handleAnchorMouseEnter);
      anchorRef.current?.addEventListener("mouseleave", handleAnchorMouseLeave);

      if (toggleOnClick === true) {
        anchorRef.current?.addEventListener("click", handleAnchorClick);
      }
    }

    return () => {
      anchorRef.current?.removeEventListener(
        "mouseenter",
        handleAnchorMouseEnter
      );
      anchorRef.current?.removeEventListener(
        "mouseleave",
        handleAnchorMouseLeave
      );
      anchorRef.current?.removeEventListener("click", handleAnchorClick);
    };
  }, [isTouch, toggleOnClick]);

  useLayoutEffect(() => {
    if (!isMountedState) {
      return;
    }

    update();
  }, [update, isMountedState, label]);

  useLayoutEffect(() => {
    setOpacityAnimationFinished(false);
    setTransformAnimationFinished(false);

    if (!isMounted && isMountedRef.current) {
      isMountedRef.current = false;
      spanRef.current?.addEventListener("transitionend", handleTransitionEnd);
      spanRef.current?.classList.add("opacity-0", "translate-y-2");
    } else if (isMounted) {
      // will add state update to queue and exit (will add some props on next hit)
      setIsMountedState(true);

      if (isMountedState) {
        isMountedRef.current = true;
        spanRef.current?.addEventListener("transitionend", handleTransitionEnd);

        spanRef.current?.scrollHeight;
        spanRef.current?.classList.remove("opacity-0", "translate-y-2");
      }
    }

    return () => {
      spanRef.current?.removeEventListener(
        "transitionend",
        handleTransitionEnd
      );
    };
  }, [update, isMounted, isMountedState]);

  useEffect(() => {
    if (transformAnimationFinished && opacityAnimationFinished) {
      if (!isMountedRef.current) {
        setIsMountedState(false);
      }
    }
  }, [opacityAnimationFinished, transformAnimationFinished]);

  return (
    <>
      {anchorWithRef}
      {isMountedState &&
        (placement === "portal" ? (
          createPortal(
            <span
              ref={spanRef}
              className="bg-[#101D41] z-[200] opacity-0 translate-y-2 transition motion-reduce:transition-none rounded text-white p-2 text-xs absolute left-0 pointer-events-none top-0 w-max max-w-[200px] line-clamp-2"
            >
              {label}
            </span>,
            document.body
          )
        ) : (
          <span
            ref={spanRef}
            className="bg-[#101D41] z-[200] opacity-0 translate-y-2 transition motion-reduce:transition-none rounded text-white p-2 text-xs absolute left-0 pointer-events-none top-0 w-max max-w-[200px] line-clamp-2"
          >
            {label}
          </span>
        ))}
    </>
  );
};

Tooltip.displayName = "Tooltip";
