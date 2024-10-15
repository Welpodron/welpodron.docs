"use client";

import { RefObject, useCallback, useEffect, useRef } from "react";

export type ModalPropsType = {
  children: React.ReactNode;
  onClose: () => void;
  firstTrapFocusElementRef?: RefObject<HTMLElement>;
  lastTrapFocusElementRef?: RefObject<HTMLElement>;
};

export const ModalContent = ({
  children,
  onClose,
  firstTrapFocusElementRef: firstTrapFocusElementRefOutside,
  lastTrapFocusElementRef: lastTrapFocusElementRefOutside,
}: ModalPropsType) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstTrapFocusElementRefInside = useRef<HTMLDivElement>(null);
  const lastTrapFocusElementRefInside = useRef<HTMLDivElement>(null);

  const firstTrapFocusElementRef =
    firstTrapFocusElementRefOutside ?? firstTrapFocusElementRefInside;
  const lastTrapFocusElementRef =
    lastTrapFocusElementRefOutside ?? lastTrapFocusElementRefInside;

  const lastActiveElement = useRef<HTMLElement | null>(null);
  const trapFlowDirection = useRef<"forwards" | "backwards">();
  const mountedRef = useRef(false);
  const windowLastScrollX = useRef(0);
  const windowLastScrollY = useRef(0);

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === overlayRef.current) {
        if (lastActiveElement.current?.focus) {
          lastActiveElement.current?.focus();
        }

        onClose();
      }
    },
    [onClose]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        if (lastActiveElement.current?.focus) {
          lastActiveElement.current?.focus();
        }

        onClose();
      } else if (event.key === "Tab") {
        trapFlowDirection.current = "forwards";

        if (event.shiftKey) {
          trapFlowDirection.current = "backwards";

          if (event.target === firstTrapFocusElementRef.current) {
            event.preventDefault();
            event.stopPropagation();
            lastTrapFocusElementRef.current?.focus();
          }
          return;
        }

        if (event.target === lastTrapFocusElementRef.current) {
          event.preventDefault();
          event.stopPropagation();
          firstTrapFocusElementRef.current?.focus();
        }
      }
    },
    [onClose]
  );

  const handleFirstTrapFocusElementFocus = useCallback(() => {
    window.scrollTo({
      left: windowLastScrollX.current,
      top: windowLastScrollY.current,
      behavior: "instant",
    });
  }, []);

  const handleLastTrapFocusElementFocus = useCallback(() => {
    window.scrollTo({
      left: windowLastScrollX.current,
      top: windowLastScrollY.current,
      behavior: "instant",
    });

    if (trapFlowDirection.current === "forwards") {
      firstTrapFocusElementRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    const lastTrapFocusElementOutside = lastTrapFocusElementRefOutside?.current;

    if (!firstTrapFocusElementRef || !lastTrapFocusElementRef) {
      return;
    }

    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    // play on mount animation

    if (lastTrapFocusElementOutside) {
      lastTrapFocusElementOutside.addEventListener(
        "focus",
        handleLastTrapFocusElementFocus
      );
    }

    document.body.style.overflow = "hidden";
    windowLastScrollY.current = window.scrollY;
    windowLastScrollX.current = window.screenX;
    lastActiveElement.current = document.activeElement as HTMLElement;
    firstTrapFocusElementRef.current?.focus();

    return () => {
      if (lastTrapFocusElementOutside) {
        lastTrapFocusElementOutside.removeEventListener(
          "focus",
          handleLastTrapFocusElementFocus
        );
      }

      if (!document.querySelector("[data-modal]")) {
        document.body.style.removeProperty("overflow");
      }
    };
  }, []);

  return (
    <div
      onClick={handleClick}
      ref={
        firstTrapFocusElementRefOutside
          ? undefined
          : firstTrapFocusElementRefInside
      }
      tabIndex={0}
      onKeyDown={handleKeyDown}
      data-modal=""
      onFocus={
        firstTrapFocusElementRefOutside
          ? undefined
          : handleFirstTrapFocusElementFocus
      }
    >
      <div
        ref={overlayRef}
        className="w-full h-full fixed z-[200] left-0 top-0 bottom-0 right-0 dark:bg-slate-900/70 backdrop-blur bg-slate-500/30"
      />
      <div className="flex items-center justify-center w-full h-full fixed md:p-4 xl:p-16 fixed z-[200] left-0 top-0 bottom-0 right-0 pointer-events-none">
        <div className="max-w-full max-h-full h-full md:h-auto pointer-events-auto relative flex justify-center w-full">
          {children}
        </div>
      </div>
      {!lastTrapFocusElementRefOutside && (
        <div
          ref={lastTrapFocusElementRefInside}
          className="sr-only"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onFocus={handleLastTrapFocusElementFocus}
        />
      )}
    </div>
  );
};

ModalContent.displayName = "Modal.Content";
