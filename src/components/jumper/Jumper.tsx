'use client';
import { usePathname } from 'next/navigation';
import { memo, useEffect } from 'react';

//! https://github.com/vercel/next.js/issues/45187
export const Jumper = memo(() => {
  const pathname = usePathname();

  useEffect(() => {
    window.scroll(0, 0);
  }, [pathname]);
  return <></>;
});

Jumper.displayName = 'NEXT_SCROLL_JUMPER';
