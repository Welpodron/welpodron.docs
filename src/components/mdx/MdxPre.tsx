import {
  IconBrandHtml5,
  IconBrandJavascript,
  IconEye,
} from "@tabler/icons-react";
import { ButtonCopy } from "@/components/buttons/ButtonCopy";

export type MdxPrePropsType = {
  children: React.ReactNode;
  rawCode: string;
  isPreview?: boolean;
};

export const MdxPre = ({
  children,
  rawCode,
  isPreview,
  ...props
}: MdxPrePropsType) => {
  const lang = (props as any)["data-language"] || "shell";
  return (
    <div className="rounded grid border border-slate-200 not-prose dark:border-slate-800 ">
      {isPreview && (
        <div>
          <div className="p-4 bg-slate-50  flex items-center justify-between dark:bg-slate-900">
            <p className="font-medium p-2 rounded bg-slate-200  inline-flex items-center leading-none dark:bg-slate-800">
              <IconEye className="shrink-0 mr-2" />
              <span>Превью</span>
            </p>
          </div>
          <div className="p-4 min-h-[300px] flex justify-center items-center showcase-preview">
            <div className="m-auto max-w-md w-full p-4 bg-slate-800/50 rounded">
              <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: rawCode }}
              ></div>
            </div>
          </div>
        </div>
      )}
      <div className="grid not-prose">
        <div className="p-4 top-0 z-10 sticky bg-slate-50 flex items-center justify-between dark:bg-slate-900">
          <p className="font-medium p-2 rounded bg-slate-200 inline-flex items-center leading-none uppercase dark:bg-slate-800">
            {lang === "html" && (
              <IconBrandHtml5 className="shrink-0 mr-2 text-red-500" />
            )}
            {lang === "js" && (
              <IconBrandJavascript className="shrink-0 mr-2 text-yellow-500" />
            )}
            <span>{lang}</span>
          </p>
          <ButtonCopy
            className="bg-slate-200 dark:bg-slate-800"
            text={rawCode}
          />
        </div>
        <pre {...props} className="overflow-x-auto px-0 py-2">
          {children}
        </pre>
      </div>
    </div>
  );
};

MdxPre.displayName = "Mdx.Pre";
