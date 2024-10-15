"use client";

import { useEffect, useId, useRef } from "react";
import { tabs } from "welpodron.core";
import "node_modules/welpodron.core/css/tabs/style.css";

import { Preview } from "@/components/preview/Preview";

export const TabsPreview = () => {
  const _id = useId();
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabsInstanceRef = useRef<tabs | null>(null);

  useEffect(() => {
    if (!tabsRef.current) {
      return;
    }

    tabsInstanceRef.current = new tabs({
      element: tabsRef.current,
    });

    return () => {
      tabsInstanceRef.current?.removeEventsListeners();
    };
  }, []);

  return (
    <Preview>
      <div className="p-4 rounded border border-slate-800 bg-slate-900 text-slate-100">
        <div className="flex flex-col md:flex-row">
          <button
            data-w-tabs-action="show"
            data-w-tabs-id={_id}
            data-w-tabs-control=""
            data-w-tabs-control-active=""
            data-w-tabs-action-args="0"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between flex-grow"
          >
            Показать таб 0
          </button>
          <button
            data-w-tabs-action="show"
            data-w-tabs-id={_id}
            data-w-tabs-control=""
            data-w-tabs-action-args="1"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between flex-grow"
          >
            Показать таб 1
          </button>
          <button
            data-w-tabs-action="show"
            data-w-tabs-id={_id}
            data-w-tabs-control=""
            data-w-tabs-action-args="2"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between flex-grow"
          >
            Показать таб 2
          </button>
        </div>
        <div
          id="tabs_example"
          data-w-tabs
          data-w-tabs-id={_id}
          ref={tabsRef}
          className="mt-2"
        >
          <div
            data-w-tabs-item-active=""
            data-w-tabs-item=""
            data-w-tabs-item-id="0"
            data-w-tabs-id={_id}
            className="p-4 rounded border border-slate-700 bg-slate-900"
          >
            <p>Содержимое таба 0</p>
          </div>
          <div
            data-w-tabs-item=""
            data-w-tabs-item-id="1"
            data-w-tabs-id={_id}
            className="p-4 rounded border border-slate-700 bg-slate-900"
          >
            <p>Содержимое таба 1</p>
          </div>
          <div
            data-w-tabs-item=""
            data-w-tabs-item-id="2"
            data-w-tabs-id={_id}
            className="p-4 rounded border border-slate-700 bg-slate-900"
          >
            <p>Содержимое таба 2</p>
          </div>
        </div>
      </div>
    </Preview>
  );
};
