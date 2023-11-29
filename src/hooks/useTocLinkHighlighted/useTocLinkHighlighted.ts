import { useRef, useState, useEffect } from 'react';

export const useTocLinkHighlighted = (id: string) => {
  const [activeId, setActiveId] = useState('');
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      rootMargin: '0px 0px -90% 0px',
    });

    const elements = document.querySelectorAll('h2, h3, h4');
    elements.forEach((elem) => observerRef.current?.observe(elem));

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return activeId === id;
};
