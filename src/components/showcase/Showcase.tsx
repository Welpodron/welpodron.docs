"use client";

import { IconEye } from "@tabler/icons-react";

export type ShowcasePropsType = {
  children: React.ReactNode;
};

export const Showcase = ({ children }: ShowcasePropsType) => {
  return (
    <div className="rounded grid border border-slate-200 not-prose dark:border-slate-800 ">
      <div>
        <div className="p-4 bg-slate-50  flex items-center justify-between dark:bg-slate-900">
          <p className="font-medium p-2 rounded bg-slate-200  inline-flex items-center leading-none dark:bg-slate-800">
            <IconEye className="shrink-0 mr-2" />
            <span>Превью</span>
          </p>
        </div>
        <div className="p-4 min-h-[300px] flex justify-center items-center showcase-preview">
          <div className="m-auto max-w-md w-full p-4 bg-slate-800/50 rounded">
            <div className="w-full">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
