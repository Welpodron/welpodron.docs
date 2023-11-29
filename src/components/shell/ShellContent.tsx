import { IconBrandGithub } from '@tabler/icons-react';
import Link from 'next/link';
import { ButtonTheme } from '@/components/buttons/ButtonTheme';
import { ButtonTop } from '@/components/buttons/ButtonTop';
import { forwardRef } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs/Breadcrumbs';
import { BreadcrumbsTreeBranchType } from '@/utils/utils';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';

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
    return (
      <div
        {...props}
        ref={forwardedRef}
        tabIndex={0}
        style={{ ...styleOutside }}
        className={classnamify(
          'grid relative grid-rows-[auto_minmax(0,_1fr)_auto]',
          classNameOutside
        )}
      >
        <header className="p-4  bg-slate-50 flex items-center justify-end z-10 h-[72px] dark:bg-slate-900">
          <ButtonTheme className="ml-auto bg-slate-200 dark:bg-slate-800" />
        </header>
        <main className="p-4 relative grid">
          <div className="min-h-screen p-4 xl:p-6 space-y-8">
            <Breadcrumbs tree={breadcrumbsTree} />
            <div className="prose max-w-full">{children}</div>
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

ShellContent.displayName = 'Shell.Content';
