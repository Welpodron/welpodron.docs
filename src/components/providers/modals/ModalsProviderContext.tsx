import { createContext, RefObject } from "react";

export type ModalPropsType = {
  id?: string;
  children: React.ReactNode;
  onClose: () => void;
  firstTrapFocusElementRef?: RefObject<HTMLElement>;
  lastTrapFocusElementRef?: RefObject<HTMLElement>;
};

export type ModalsProviderContextType = {
  openModal: (props: ModalPropsType) => void;
  isModalOpen: (id?: string) => boolean;
  closeModal: (id?: string) => void;
};

export const ModalsProviderContext = createContext<ModalsProviderContextType>({
  openModal: () => {},
  isModalOpen: () => false,
  closeModal: () => {},
});

ModalsProviderContext.displayName = "ModalsProvider.Context";
