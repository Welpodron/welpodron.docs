import { IconSearch } from "@tabler/icons-react";
import { useCallback, useContext, useRef } from "react";
import { SEARCH_MODAL_ID } from "@/constants/constants";
import { ModalsProviderContext } from "@/components/providers/modals/ModalsProviderContext";
import { Search } from "@/components/search/Search";
import { Tooltip } from "@/components/tooltip/Tooltip";

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

  return (
    <div className="relative">
      <Tooltip placement="relative" label="Поиск">
        <button
          type="button"
          onClick={handleSearchBtnClick}
          className="p-2 rounded bg-slate-200 dark:bg-slate-800 mr-2"
        >
          <IconSearch className="shrink-0 dark:text-slate-100" />
          <span className="sr-only">Поиск</span>
        </button>
      </Tooltip>
    </div>
  );
};

ButtonSearch.displayName = "Button.Search";
