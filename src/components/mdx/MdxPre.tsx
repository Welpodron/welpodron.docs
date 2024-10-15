"use client";

import {
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandPhp,
} from "@tabler/icons-react";
import { ButtonCopy } from "@/components/buttons/ButtonCopy";
import { useRef } from "react";

export type MdxPrePropsType = {
  children: React.ReactNode;
  "data-language": string;
};

export const MdxPre = ({
  children,
  "data-language": lang = "shell",
  ...props
}: MdxPrePropsType) => {
  const preRef = useRef<HTMLPreElement>(null);

  return (
    <div className="rounded grid border border-slate-200 not-prose dark:border-slate-800 ">
      <div className="grid not-prose">
        <div className="p-4 top-0 z-10 sticky bg-slate-50/70 flex items-center justify-between dark:bg-slate-900/70 backdrop-blur">
          <p className="font-medium p-2 rounded bg-slate-200 inline-flex items-center leading-none uppercase dark:bg-slate-800">
            {lang === "html" && (
              <IconBrandHtml5 className="shrink-0 mr-2 text-red-500" />
            )}
            {lang === "js" && (
              <IconBrandJavascript className="shrink-0 mr-2 text-yellow-500" />
            )}
            {lang === "php" && (
              <IconBrandPhp className="shrink-0 mr-2 text-blue-500" />
            )}
            <span>{lang}</span>
          </p>
          <ButtonCopy
            className="bg-slate-200 dark:bg-slate-800"
            preElementRef={preRef}
          />
        </div>
        <pre {...props} ref={preRef} className="overflow-x-auto px-0 py-2">
          {children}
        </pre>
      </div>
    </div>
  );
};

MdxPre.displayName = "Mdx.Pre";
