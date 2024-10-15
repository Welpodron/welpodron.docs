"use client";

import { useEffect, useId, useRef } from "react";
import { accordion } from "welpodron.core";
import "node_modules/welpodron.core/css/accordion/style.css";

import { Preview } from "@/components/preview/Preview";

export const AccordionPreview = () => {
  const _id = useId();
  const mountedRef = useRef(false);
  const accordionRef = useRef<HTMLDivElement>(null);
  const accordionInstanceRef = useRef<accordion | null>(null);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    if (!accordionRef.current) {
      return;
    }

    accordionInstanceRef.current = new accordion({
      element: accordionRef.current,
    });

    return () => {
      accordionInstanceRef.current?.removeEventsListeners();
    };
  }, []);

  return (
    <Preview>
      <div className="p-4 rounded border border-slate-800 bg-slate-900 text-slate-100">
        <div
          id="accordion_example"
          data-w-accordion
          data-w-accordion-id={_id}
          ref={accordionRef}
        >
          <button
            data-w-accordion-action="show"
            data-w-accordion-id={_id}
            data-w-accordion-control=""
            data-w-accordion-control-active=""
            data-w-accordion-action-args="0"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between w-full"
          >
            Показать блок 0
          </button>
          <div
            data-w-accordion-item-active=""
            data-w-accordion-item=""
            data-w-accordion-item-id="0"
            data-w-accordion-id={_id}
          >
            <p className="p-4 rounded border border-slate-700 bg-slate-900">
              Содержимое блока 0
            </p>
          </div>
          <button
            data-w-accordion-action="show"
            data-w-accordion-id={_id}
            data-w-accordion-control=""
            data-w-accordion-action-args="1"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between w-full"
          >
            Показать блок 1
          </button>
          <div
            data-w-accordion-item=""
            data-w-accordion-item-id="1"
            data-w-accordion-id={_id}
          >
            <p className="p-4 rounded border border-slate-700 bg-slate-900">
              Содержимое блока 1
            </p>
          </div>
          <button
            data-w-accordion-action="show"
            data-w-accordion-id={_id}
            data-w-accordion-control=""
            data-w-accordion-action-args="2"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between w-full"
          >
            Показать блок 2
          </button>
          <div
            data-w-accordion-item=""
            data-w-accordion-item-id="2"
            data-w-accordion-id={_id}
          >
            <p className="p-4 rounded border border-slate-700 bg-slate-900">
              Содержимое блока 2
            </p>
          </div>
        </div>
      </div>
    </Preview>
  );
};
