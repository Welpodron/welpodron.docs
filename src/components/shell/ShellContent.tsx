import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandGithub,
} from "@tabler/icons-react";
import Link from "next/link";
import { ButtonTheme } from "@/components/buttons/ButtonTheme";
import { ButtonTop } from "@/components/buttons/ButtonTop";
import { forwardRef } from "react";
import { Breadcrumbs } from "@/components/breadcrumbs/Breadcrumbs";
import { BreadcrumbsTreeBranchType } from "@/utils/utils";

export type ShellContentPropsType = {
  children: React.ReactNode;
  breadcrumbsTree: BreadcrumbsTreeBranchType[];
};

export const ShellContent = forwardRef<HTMLDivElement, ShellContentPropsType>(
  ({ children, breadcrumbsTree }, forwardedRef) => {
    return (
      <div
        ref={forwardedRef}
        tabIndex={0}
        className="grid relative grid-rows-[auto_minmax(0,_1fr)_auto]"
      >
        <header className="p-4  bg-slate-50 flex items-center justify-end z-10 h-[72px] dark:bg-slate-900">
          <ButtonTheme className="ml-auto bg-slate-200 dark:bg-slate-800" />
        </header>
        <main className="p-4 relative grid">
          <div className="min-h-screen p-4 xl:p-6 space-y-8">
            <Breadcrumbs tree={breadcrumbsTree} />
            {/* <div className="bg-yellow-400/20 dark:bg-slate-900 dark:text-yellow-500 relative rounded overflow-hidden before:bg-yellow-500 before:left-0 before:top-0 before:w-1 before:absolute before:h-full pl-1">
              <p className="p-4 font-medium flex items-center justify-between pb-0">
                <span className="inline-flex items-center rounded p-2 bg-yellow-500 dark:bg-slate-800">
                  <IconAlertOctagon className="shrink-0 mr-2" />
                  <span>Внимание!</span>
                </span>
                <span className="rounded p-2 bg-yellow-500 dark:bg-slate-800 cursor-pointer">
                  <IconX />
                </span>
              </p>
              <p className="p-4">
                Перед подключением компонента убедитесь, что все необходимые для
                требуемого компонента зависимости установлены и подключены!
              </p>
            </div> */}
            <div className="prose max-w-full">{children}</div>
          </div>
          <ButtonTop />
          <div className="flex">
            <Link
              className="flex items-center m-4 grow rounded border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4"
              href="/"
            >
              <IconArrowLeft className="hidden md:block shrink-0 mr-4" />
              <div>
                <p className="text-sm mb-2">Предыдущая страница</p>
                <p className="font-medium">Аккордеон</p>
              </div>
            </Link>
            <Link
              className="flex items-center m-4 grow rounded text-right border border-slate-200 dark:bg-slate-900 dark:border-slate-800 p-4"
              href="/"
            >
              <div className="ml-auto">
                <p className="text-sm mb-2">Следующая страница</p>
                <p className="font-medium">Модальное окно</p>
              </div>
              <IconArrowRight className="hidden md:block shrink-0 ml-4" />
            </Link>
          </div>
        </main>
        <footer className="px-4 py-6  bg-slate-50 flex items-center justify-between text-sm dark:bg-slate-900">
          <Link
            className="rounded text-white inline-block p-2 bg-slate-950"
            href="https://github.com/Welpodron"
            target="_blank"
          >
            <IconBrandGithub />
            <span className="sr-only">
              Ссылка на GitHub аккаунт пользователя welpodron
            </span>
          </Link>
          <p className="font-medium text-xs lowercase">
            <span className="inline-block p-2 bg-slate-200 dark:bg-slate-800 rounded">
              Welpodron.Docs
            </span>{" "}
            / @welpodron 2023
          </p>
        </footer>
      </div>
    );
  }
);

ShellContent.displayName = "Shell.Content";
