"use client";

import { useEffect, useId, useRef } from "react";
import { carousel } from "welpodron.core";
import "node_modules/welpodron.core/css/carousel/style.css";

import { Preview } from "@/components/preview/Preview";

export const CarouselPreview = () => {
  const _id = useId();
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselInstanceRef = useRef<carousel | null>(null);

  useEffect(() => {
    if (!carouselRef.current) {
      return;
    }

    carouselInstanceRef.current = new carousel({
      element: carouselRef.current,
    });

    return () => {
      carouselInstanceRef.current?.removeEventsListeners();
    };
  }, []);

  return (
    <Preview>
      <div className="p-4 rounded border border-slate-800 bg-slate-900 text-slate-100">
        <div className="flex flex-col md:flex-row">
          <button
            data-w-carousel-action="show"
            data-w-carousel-id={_id}
            data-w-carousel-control=""
            data-w-carousel-control-active=""
            data-w-carousel-action-args="0"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between flex-grow"
          >
            Показать слайд 0
          </button>
          <button
            data-w-carousel-action="show"
            data-w-carousel-id={_id}
            data-w-carousel-control=""
            data-w-carousel-action-args="1"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between flex-grow"
          >
            Показать слайд 1
          </button>
          <button
            data-w-carousel-action="show"
            data-w-carousel-id={_id}
            data-w-carousel-control=""
            data-w-carousel-action-args="2"
            type="button"
            className="px-4 py-2 rounded border border-slate-700 bg-slate-800 flex items-center font-medium justify-between flex-grow"
          >
            Показать слайд 2
          </button>
        </div>
        <div
          id="carousel_example"
          data-w-carousel
          data-w-carousel-id={_id}
          ref={carouselRef}
          className="mt-2"
        >
          <div
            data-w-carousel-item-active=""
            data-w-carousel-item="0"
            data-w-carousel-id={_id}
            className="p-4 rounded border border-slate-700 bg-slate-900"
          >
            <p>Содержимое слайда 0</p>
          </div>
          <div
            data-w-carousel-item="1"
            data-w-carousel-id={_id}
            className="p-4 rounded border border-slate-700 bg-slate-900"
          >
            <p>Содержимое слайда 1</p>
          </div>
          <div
            data-w-carousel-item="2"
            data-w-carousel-id={_id}
            className="p-4 rounded border border-slate-700 bg-slate-900"
          >
            <p>Содержимое слайда 2</p>
          </div>
        </div>
      </div>
    </Preview>
  );
};
