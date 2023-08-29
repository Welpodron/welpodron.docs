import { IconBrandJavascript, IconBrandReact } from "@tabler/icons-react";
import { ButtonTheme } from "@/components/buttons/ButtonTheme";

export type LayoutHeaderPropsType = {};

export const LayoutHeader = ({ ...props }: LayoutHeaderPropsType) => {
  return (
    <header
      {...props}
      className="sticky top-0 bg-slate-50  z-10  dark:bg-slate-900"
    >
      <div className="p-4 flex items-center justify-between container max-w-7xl mx-auto h-[72px]">
        <ButtonTheme className="ml-auto bg-slate-200 dark:bg-slate-800" />
      </div>
    </header>
  );
};

LayoutHeader.displayName = "Layout.Header";
