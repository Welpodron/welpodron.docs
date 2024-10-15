import { IconBrandGithub, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { ButtonTheme } from "@/components/buttons/ButtonTheme";
import { ButtonTop } from "@/components/buttons/ButtonTop";
import { forwardRef, useCallback, useContext, useRef } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { BreadcrumbsTreeBranchType } from "@/utils/utils";
import { ComponentGeneralPropsType } from "@/components/component/Component";
import { classnamify } from "@/utils/classnamify/classnamify";
import { SEARCH_MODAL_ID } from "@/constants/constants";
import { ModalsProviderContext } from "@/components/providers/modals/ModalsProviderContext";
import { Search } from "@/components/search/Search";

export type ShellContentPropsType = {
  children: React.ReactNode;
  breadcrumbsTree: BreadcrumbsTreeBranchType[];
} & ComponentGeneralPropsType;

export const ShellContent = forwardRef<HTMLDivElement, ShellContentPropsType>(
  (
    {
      children,
      breadcrumbsTree,
      style: styleOutside,
      className: classNameOutside,
      ...props
    },
    forwardedRef
  ) => {
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
      <div
        {...props}
        ref={forwardedRef}
        tabIndex={0}
        style={{ ...styleOutside }}
        className={classnamify(
          "grid relative grid-rows-[auto_minmax(0,_1fr)_auto]",
          classNameOutside
        )}
      >
        <header className="p-4 bg-slate-50 flex items-center z-10 h-[72px] dark:bg-slate-900">
          <button
            onClick={handleSearchBtnClick}
            className="border p-2 rounded bg-white border-slate-200 not-prose dark:border-slate-800 flex flex-grow items-center leading-none dark:bg-slate-800"
          >
            <IconSearch
              width={20}
              height={20}
              className="shrink-0 text-slate-500 dark:text-slate-100"
            />
            <span className="ml-2 dark:text-slate-100 text-sm">
              Поиск по сайту
            </span>
            <span className="ml-auto text-xs font-bold p-1 inline-block rounded bg-slate-200 text-slate-900 dark:bg-slate-900 dark:text-slate-100">
              Ctrl + K
            </span>
          </button>
          <ButtonTheme className="ml-4 bg-slate-200 dark:bg-slate-800" />
        </header>
        <main className="p-4 relative grid">
          <div className="min-h-screen p-4 xl:p-6 space-y-8">
            <Breadcrumbs tree={breadcrumbsTree} />
            <div className="max-w-full prose">{children}</div>
          </div>
          <ButtonTop />
        </main>
        <footer className="px-4 py-6  bg-slate-50 flex items-center justify-between text-sm dark:bg-slate-900">
          <Link
            scroll={false}
            className="rounded text-white inline-block p-2 bg-slate-950"
            href="https://github.com/Welpodron"
            target="_blank"
          >
            <IconBrandGithub />
            <span className="sr-only">
              Ссылка на GitHub аккаунт пользователя welpodron
            </span>
          </Link>
          <p className="font-medium text-xs lowercase">@welpodron 2023</p>
        </footer>
      </div>
    );
  }
);

ShellContent.displayName = "Shell.Content";
