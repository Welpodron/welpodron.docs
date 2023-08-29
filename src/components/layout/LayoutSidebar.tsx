import { IconX } from "@tabler/icons-react";
import { useLayoutEffect, useState } from "react";

export type LayoutSidebarPropsType = {};

export const LayoutSidebar = ({ ...props }: LayoutSidebarPropsType) => {
  const [isActive, setIsActive] = useState(false);

  useLayoutEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.removeProperty("overflow");
      document.body.style.removeProperty("touch-action");
    }
  }, [isActive]);

  return (
    <>
      {isActive && (
        <div
          onClick={() => setIsActive(false)}
          className="z-40 fixed h-full w-full bg-black/20 backdrop-blur-sm"
        ></div>
      )}
      <aside
        aria-expanded={isActive}
        className={`fixed ${
          isActive ? "w-[95%] xl:w-[500px] block" : "hidden"
        } h-full bg-white top-0 z-[100] left-0 border-r border-slate-200 dark:bg-slate-900 dark:border-slate-800`}
      >
        <div className="overflow-y-auto max-h-full p-4 space-y-8">
          <button
            onClick={() => setIsActive(false)}
            className="rounded p-2 bg-slate-200 dark:bg-slate-800"
          >
            <IconX />
          </button>
        </div>
      </aside>
    </>
  );
};

LayoutSidebar.displayName = "Layout.Sidebar";
