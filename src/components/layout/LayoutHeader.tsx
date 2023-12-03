import { ButtonTheme } from '@/components/buttons/ButtonTheme';
import Link from 'next/link';

import Image from 'next/image';

export type LayoutHeaderPropsType = {};

export const LayoutHeader = ({ ...props }: LayoutHeaderPropsType) => {
  //TODO: Добавить поиск

  return (
    <header
      {...props}
      className="sticky top-0 bg-slate-50/70 z-10  dark:bg-slate-900/70 backdrop-blur"
    >
      <div className="p-4 flex items-center justify-between container max-w-7xl mx-auto h-[72px]">
        <Link
          scroll={false}
          href="/"
          className="inline-flex items-center p-2 font-medium text-xs lowercase bg-slate-200 dark:bg-slate-800 rounded"
        >
          <Image
            width={255}
            height={236}
            src="/logo.svg"
            className="shrink-0 mr-1 w-5 h-5"
            alt="logo"
          />
          Welpodron.Docs
        </Link>
        <ButtonTheme className=" bg-slate-200 dark:bg-slate-800" />
      </div>
    </header>
  );
};

LayoutHeader.displayName = 'Layout.Header';
