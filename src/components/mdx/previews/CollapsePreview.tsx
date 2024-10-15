"use client";

import { useEffect, useId, useRef } from "react";
import { collapse } from "welpodron.core";
import "node_modules/welpodron.core/css/collapse/style.css";
import { Preview } from "@/components/preview/Preview";

export const CollapsePreview = () => {
  const _id = useId();
  const collapseRef = useRef<HTMLDivElement>(null);
  const collapseInstanceRef = useRef<collapse | null>(null);

  useEffect(() => {
    if (!collapseRef.current) {
      return;
    }
    
    collapseInstanceRef.current = new collapse({
      element: collapseRef.current,
    });

    return () => {
      collapseInstanceRef.current?.removeEventsListeners();
    };
  }, []);

  return (
    <Preview>
      <div className="p-4 rounded border border-slate-800 bg-slate-900 text-slate-100">
        <button
          data-w-collapse-control
          data-w-collapse-id={_id}
          data-w-collapse-action="toggle"
          type="button"
          className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between w-full"
        >
          Содержимое управляющего элемента
        </button>
        <div data-w-collapse data-w-collapse-id={_id} ref={collapseRef}>
          <div className="p-4 rounded border border-slate-700 bg-slate-900 mt-4">
            Содержимое управляемого элемента
          </div>
        </div>
      </div>
    </Preview>
  );
};
