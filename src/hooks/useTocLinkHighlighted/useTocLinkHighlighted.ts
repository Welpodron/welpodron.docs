import { useRef, useState, useLayoutEffect } from "react";

export const useTocLinkHighlighted = (id: string) => {
  const [activeId, setActiveId] = useState("");
  const observer = useRef<IntersectionObserver>();

  useLayoutEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry?.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleObserver, {
      rootMargin: "0px 0px -90% 0px",
    });

    const elements = document.querySelectorAll("h2, h3, h4");
    elements.forEach((elem) => observer?.current?.observe(elem));

    return () => {
      observer.current?.disconnect();
    };
  }, []);

  return activeId === id;
};
