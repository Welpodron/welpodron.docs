import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export type LayoutFooterPropsType = {};

export const LayoutFooter = ({ ...props }: LayoutFooterPropsType) => {
  return (
    <footer {...props} className="bg-slate-50  dark:bg-slate-900">
      <div className="px-4 py-6  flex items-center justify-between text-sm container max-w-7xl mx-auto">
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
      </div>
    </footer>
  );
};

LayoutFooter.displayName = "Layout.Footer";
