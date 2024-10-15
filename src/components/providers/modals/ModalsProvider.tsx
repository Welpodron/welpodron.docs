"use client";

import { useCallback, useState } from "react";
import { ModalPropsType, ModalsProviderContext } from "./ModalsProviderContext";
import { Modal } from "@/components/modal/Modal";
import { uuid } from "@/utils/uuid/uuid";

export type ModalsProviderPropsType = {
  children: React.ReactNode;
};

export const ModalsProvider = ({ children }: ModalsProviderPropsType) => {
  const [modals, setModals] = useState<ModalPropsType[]>([]);

  const openModal = useCallback((props: ModalPropsType) => {
    setModals((modals) => {
      if (props.id) {
        if (modals.find((modal) => modal.id === props.id)) {
          return modals;
        }
      }

      return [...modals, props.id ? props : { ...props, id: uuid() }];
    });
  }, []);

  const closeModal = useCallback((id?: string) => {
    if (!id) {
      setModals((modals) => modals.slice(0, -1));
    } else {
      setModals((modals) => modals.filter((modal) => modal.id !== id));
    }
  }, []);

  const isModalOpen = useCallback(
    (id?: string) => {
      if (!id) {
        return Boolean(modals.length);
      }

      return Boolean(modals.find((modal) => modal.id === id));
    },
    [modals]
  );

  return (
    <ModalsProviderContext.Provider
      value={{ openModal, closeModal, isModalOpen }}
    >
      {children}
      <div>
        {modals.map(
          ({
            id,
            children,
            onClose,
            firstTrapFocusElementRef,
            lastTrapFocusElementRef,
          }) => (
            <Modal
              key={id}
              isActive={true}
              onClose={onClose}
              firstTrapFocusElementRef={firstTrapFocusElementRef}
              lastTrapFocusElementRef={lastTrapFocusElementRef}
            >
              {children}
            </Modal>
          )
        )}
      </div>
    </ModalsProviderContext.Provider>
  );
};

ModalsProvider.displayName = "ModalsProvider";
