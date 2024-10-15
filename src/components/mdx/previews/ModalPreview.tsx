"use client";

import { useEffect, useId, useRef } from "react";
import { modal } from "welpodron.core";
import "node_modules/welpodron.core/css/modal/style.css";
import { Preview } from "@/components/preview/Preview";

export const ModalPreview = () => {
  const _id = useId();
  const mountedRef = useRef(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalInstanceRef = useRef<modal | null>(null);

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }

    if (!modalRef.current) {
      return;
    }
    
    modalInstanceRef.current = new modal({
      element: modalRef.current,
    });

    return () => {
      modalInstanceRef.current?.removeEventsListeners();
    };
  }, []);

  return (
    <Preview>
      <div className="p-4 rounded border border-slate-800 bg-slate-900 text-slate-100">
        <button
          data-w-modal-control
          data-w-modal-id={_id}
          data-w-modal-action="show"
          type="button"
          className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between w-full"
        >
          Содержимое управляющего элемента
        </button>
        <div data-w-modal data-w-modal-id={_id} ref={modalRef}>
          <div className="p-4 rounded border border-slate-700 bg-slate-900 text-slate-100">
            Содержимое управляемого элемента
          </div>
        </div>
      </div>
    </Preview>
  );
};
