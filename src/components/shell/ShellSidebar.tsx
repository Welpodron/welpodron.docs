import { useMergedRef } from "@/hooks/useMergedRef/useMergedRef";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { forwardRef, useState, useRef, useLayoutEffect, useId } from "react";
import { Nav } from "@/components/nav/Nav";
import { useMatchMedia } from "@/hooks/useMatchMedia/useMatchMedia";
import { NavTreeBranchType } from "@/utils/utils";

export type ShellSidebarPropsType = {
  navTree: NavTreeBranchType[];

  tocMobileRef?: React.RefObject<HTMLDivElement>;
  shellContentRef?: React.RefObject<HTMLDivElement>;
};

export const ShellSidebar = forwardRef<HTMLElement, ShellSidebarPropsType>(
  ({ navTree, tocMobileRef, shellContentRef }, forwardedRef) => {
    const _id = useId();

    const isDesktop = useMatchMedia("(min-width: 1280px)");

    const [isActive, setIsActive] = useState(false);

    const ref = useRef(null);

    const mergedRef = useMergedRef(ref, forwardedRef);

    useLayoutEffect(() => {
      if (isDesktop) {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("touch-action");
        return;
      }

      if (isActive) {
        document.body.style.overflow = "hidden";
        document.body.style.touchAction = "none";
      } else {
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("touch-action");
      }
    }, [isActive, isDesktop]);

    return (
      <>
        <aside
          ref={mergedRef}
          id={_id}
          aria-expanded={isActive}
          className={`fixed ${
            isActive ? "w-[95%] xl:w-[400px]" : "w-5"
          } xl:sticky xl:self-start h-full xl:h-screen bg-white top-0 z-[100] left-0 border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800`}
        >
          <div
            style={{
              display: isActive ? "block" : "none",
            }}
            className="overflow-y-auto max-h-full p-4 space-y-8"
          >
            <Nav tree={navTree} {...{ shellContentRef, tocMobileRef }} />
          </div>
          <button
            type="button"
            aria-expanded={isActive}
            aria-controls={_id}
            onClick={() => setIsActive((currentState) => !currentState)}
            className="bg-slate-200  dark:bg-slate-800 rounded w-8 h-12 inline-flex justify-center items-center absolute -translate-y-1/2 -translate-x-[40%] top-1/2 left-full"
          >
            {isActive ? <IconChevronLeft /> : <IconChevronRight />}
            <span className="sr-only">
              {isActive ? "Свернуть сайдбар" : "Развернуть сайдбар"}
            </span>
          </button>
        </aside>
        {isActive && !isDesktop && (
          <div
            onClick={() => setIsActive(false)}
            className="fixed w-full h-full backdrop-blur-sm bg-black/20 z-[99]"
          ></div>
        )}
      </>
    );
  }
);

ShellSidebar.displayName = "Shell.Sidebar";
