"use client";

import { RefObject } from "react";
import { ModalContent } from "./ModalContent";

export type ModalPropsType = {
  children: React.ReactNode;
  isActive: boolean;
  onClose: () => void;
  firstTrapFocusElementRef?: RefObject<HTMLElement>;
  lastTrapFocusElementRef?: RefObject<HTMLElement>;
};

export const Modal = ({
  children,
  isActive,
  onClose,
  firstTrapFocusElementRef,
  lastTrapFocusElementRef,
  ...props
}: ModalPropsType) => {
  return (
    isActive && (
      <ModalContent
        onClose={onClose}
        firstTrapFocusElementRef={firstTrapFocusElementRef}
        lastTrapFocusElementRef={lastTrapFocusElementRef}
      >
        {children}
      </ModalContent>
    )
  );
};

Modal.displayName = "Modal";
