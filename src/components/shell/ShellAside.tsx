import { useMergedRef } from "@/hooks/useMergedRef/useMergedRef";
import { IconChevronRight, IconChevronLeft } from "@tabler/icons-react";
import { forwardRef, useState, useRef } from "react";
import { Toc } from "@/components/toc/Toc";
import { TocTreeBranchType } from "@/utils/utils";

export type ShellAsidePropsType = {
  tocTree: TocTreeBranchType[];
  tocRef?: React.RefObject<HTMLDivElement>;
  tocParentRef?: React.RefObject<HTMLDivElement>;
};

export const ShellAside = forwardRef<HTMLElement, ShellAsidePropsType>(
  ({ tocTree, tocRef, tocParentRef }, forwardedRef) => {
    const [isActive, setIsActive] = useState(true);

    const ref = useRef(null);

    const mergedRef = useMergedRef(ref, forwardedRef);

    return (
      <aside
        ref={mergedRef}
        style={{
          width: isActive ? "320px" : "20px",
        }}
        className="sticky self-start h-screen w-[320px] bg-white top-0 z-[100] right-0 border-l border-slate-200 dark:bg-slate-900 dark:border-slate-800"
      >
        <div
          ref={tocParentRef}
          style={{
            display: isActive ? "block" : "none",
          }}
          className="overflow-y-auto max-h-full p-4 space-y-8"
        >
          <Toc ref={tocRef} tree={tocTree} />
        </div>
        <button
          type="button"
          onClick={() => setIsActive((currentState) => !currentState)}
          className="bg-slate-200 dark:bg-slate-800 rounded w-8 h-12 inline-flex justify-center items-center absolute -translate-y-1/2 translate-x-[40%] top-1/2 right-full"
        >
          {isActive ? <IconChevronRight /> : <IconChevronLeft />}
          <span className="sr-only">
            {isActive ? "Свернуть сайдбар" : "Развернуть сайдбар"}
          </span>
        </button>
      </aside>
    );
  }
);

ShellAside.displayName = "Shell.Aside";
