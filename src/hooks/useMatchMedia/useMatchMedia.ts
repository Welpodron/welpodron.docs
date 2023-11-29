import { useState, useCallback, useLayoutEffect } from 'react';

export const useMatchMedia = (query: string) => {
  const [isMatch, setIsMatch] = useState(false);

  const handleMediaChange = useCallback((media: MediaQueryListEvent) => {
    setIsMatch(media.matches);
  }, []);

  useLayoutEffect(() => {
    const media = window.matchMedia(query);

    setIsMatch(media.matches);

    media.addEventListener('change', handleMediaChange);

    return () => {
      media.removeEventListener('change', handleMediaChange);
    };
  }, [handleMediaChange, query]);

  return isMatch;
};
