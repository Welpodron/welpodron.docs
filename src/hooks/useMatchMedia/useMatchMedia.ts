import { useState, useEffect, useCallback } from "react";

export const useMatchMedia = (query: string) => {
  const [isMatch, setIsMatch] = useState(false);

  const handleMediaChange = useCallback(
    (media: MediaQueryListEvent) => {
      setIsMatch(media.matches);
    },
    [setIsMatch]
  );

  useEffect(() => {
    if (!window) {
      return;
    }

    const media = window.matchMedia(query);

    setIsMatch(media.matches);

    media.addEventListener("change", handleMediaChange);

    return () => {
      media.removeEventListener("change", handleMediaChange);
    };
  }, [setIsMatch, handleMediaChange, query]);

  return isMatch;
};
