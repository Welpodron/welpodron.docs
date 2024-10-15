"use client";

import { useTooltip } from "@/hooks/useTooltip/useTooltip";
import { classnamify } from "@/utils/classnamify/classnamify";
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconEye,
} from "@tabler/icons-react";
import { useCallback, useEffect, useState } from "react";

export type PreviewPropsType = {
  children: React.ReactNode;
};

export const Preview = ({ children }: PreviewPropsType) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const { refs, update } = useTooltip<HTMLButtonElement, HTMLSpanElement>({
    toggleOnClick: true,
  });

  const handleDocumentKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    update();

    if (isFullscreen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleDocumentKeyDown);
    } else {
      document.removeEventListener("keydown", handleDocumentKeyDown);
      document.body.style.removeProperty("overflow");
    }

    return () => {
      document.removeEventListener("keydown", handleDocumentKeyDown);
    };
  }, [isFullscreen, handleDocumentKeyDown, update]);

  return (
    <div
      className={classnamify(
        `grid not-prose`,
        isFullscreen
          ? `grid-rows-[min-content_1fr] fixed left-0 top-0 bottom-0 right-0 z-[200] w-full h-full bg-slate-100 dark:bg-slate-800`
          : `rounded border border-slate-200 dark:border-slate-800`
      )}
    >
      <div className="p-4 bg-slate-50  flex items-center justify-between dark:bg-slate-900">
        <p className="font-medium p-2 rounded bg-slate-200  inline-flex items-center leading-none dark:bg-slate-800">
          <IconEye className="shrink-0 mr-2" />
          <span>Превью</span>
        </p>
        <div className="relative">
          <button
            onClick={() => setIsFullscreen((s) => !s)}
            className="rounded p-2 bg-slate-200 dark:bg-slate-800"
            ref={refs.anchorRef}
          >
            {isFullscreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
            <span className="sr-only">
              {isFullscreen ? "Свернуть" : "На весь экран"}
            </span>
          </button>
          <span
            ref={refs.contentRef}
            className="bg-[#101D41] z-[200] hidden rounded text-white p-2 text-xs absolute left-0 pointer-events-none top-0 w-max max-w-[200px] line-clamp-2"
          >
            {isFullscreen ? "Свернуть" : "На весь экран"}
          </span>
        </div>
      </div>
      <div
        className={classnamify(
          `p-4 grid relative place-content-center place-items-center showcase-preview grid-rows-1 grid-cols-1`,
          !isFullscreen && "h-[300px]"
        )}
      >
        <div className="overflow-y-auto w-full h-full max-w-full max-h-full bg-slate-50/40 dark:bg-slate-800/10 rounded">
          <div className="w-full h-full">
            <div className="grid items-center justify-center min-h-[220px]">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Preview.displayName = "Preview";
