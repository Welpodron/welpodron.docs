import { ModalsProviderContext } from "@/components/providers/modals/ModalsProviderContext";
import { Search } from "@/components/search/Search";
import { SEARCH_MODAL_ID } from "@/constants/constants";
import { useCallback, useContext, useEffect, useRef } from "react";

export const useInitSearch = () => {
  const { openModal, closeModal } = useContext(ModalsProviderContext);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleDocumentKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && event.ctrlKey) {
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        openModal({
          id: SEARCH_MODAL_ID,
          onClose: () => closeModal(SEARCH_MODAL_ID),
          firstTrapFocusElementRef: searchInputRef,
          children: <Search searchInputRef={searchInputRef} />,
        });
      }
    },
    [openModal, closeModal]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, []);
};
