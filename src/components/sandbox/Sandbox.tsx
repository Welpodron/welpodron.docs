'use client';

import { classnamify } from '@/utils/classnamify/classnamify';
import {
  IconArrowsMaximize,
  IconArrowsMinimize,
  IconEye,
  IconLoader2,
} from '@tabler/icons-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export const Sandbox = ({ ...props }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [isFullscreen, setIsFullscreen] = useState(false);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleDocumentKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleDocumentKeyDown);
    } else {
      document.removeEventListener('keydown', handleDocumentKeyDown);
      document.body.style.removeProperty('overflow');
    }

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown);
    };
  }, [isFullscreen, handleDocumentKeyDown]);

  useEffect(() => {
    if (!iframeRef.current) {
      return;
    }

    if (iframeRef.current?.contentWindow?.document?.body) {
      return setIsLoading(false);
    }

    let counter = 0;

    const timer = setInterval(() => {
      counter++;

      if (iframeRef.current?.contentWindow?.document?.body) {
        clearInterval(timer);
        setIsLoading(false);
        return;
      }

      if (counter >= 10) {
        clearInterval(timer);
        return;
      }
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
        <button
          onClick={() => setIsFullscreen((s) => !s)}
          className="rounded p-2 bg-slate-200 dark:bg-slate-800"
        >
          {isFullscreen ? <IconArrowsMinimize /> : <IconArrowsMaximize />}
          <span className="sr-only">
            {isFullscreen ? 'Свернуть' : 'На весь экран'}
          </span>
        </button>
      </div>
      <div
        className={classnamify(
          `p-4 flex justify-center items-center showcase-preview overflow-y-auto min-h-[300px]`
        )}
      >
        {isLoading && <IconLoader2 className="animate-spin w-12 h-12" />}
        <iframe
          className={classnamify(
            'w-full h-full m-auto bg-slate-50/40 dark:bg-slate-800/10 rounded',
            isLoading ? 'sr-only' : ''
          )}
          ref={iframeRef}
          src="/templates/static/modal/index.html"
        />
      </div>
    </div>
  );
};

Sandbox.displayName = 'Sandbox';
