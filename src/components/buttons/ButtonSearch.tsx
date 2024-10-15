import { useTooltip } from "@/hooks/useTooltip/useTooltip";
import { IconSearch } from "@tabler/icons-react";
import { useCallback, useContext, useRef } from "react";
import { SEARCH_MODAL_ID } from "@/constants/constants";
import { ModalsProviderContext } from "@/components/providers/modals/ModalsProviderContext";
import { Search } from "@/components/search/Search";

export const ButtonSearch = () => {
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { openModal, closeModal } = useContext(ModalsProviderContext);

  const handleSearchBtnClick = useCallback(() => {
    openModal({
      id: SEARCH_MODAL_ID,
      onClose: () => closeModal(SEARCH_MODAL_ID),
      firstTrapFocusElementRef: searchInputRef,
      children: <Search searchInputRef={searchInputRef} />,
    });
  }, [openModal, closeModal]);

  const { refs, update } = useTooltip<HTMLButtonElement, HTMLSpanElement>();

  return (
    <div className="relative">
      <button
        type="button"
        ref={refs.anchorRef}
        onClick={handleSearchBtnClick}
        className="p-2 rounded bg-slate-200 dark:bg-slate-800 mr-2"
      >
        <IconSearch className="shrink-0 dark:text-slate-100" />
      </button>
      <span
        ref={refs.contentRef}
        className="bg-[#101D41] z-[200] hidden rounded text-white p-2 text-xs absolute left-0 pointer-events-none top-0 w-max max-w-[200px] line-clamp-2"
      >
        Поиск
      </span>
    </div>
  );
};

ButtonSearch.displayName = "Button.Search";
