import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { useMatchMedia } from '../useMatchMedia/useMatchMedia';

export type useTooltipPropsType = {
  showOnMouseEnter?: boolean;
  hideOnMouseLeave?: boolean;
  toggleOnClick?: boolean;
};

export const useTooltip = <
  AnchorType extends HTMLElement,
  ContentType extends HTMLElement
>(
  {
    toggleOnClick = false,
    showOnMouseEnter = true,
    hideOnMouseLeave = true,
  }: useTooltipPropsType = {
    toggleOnClick: false,
    showOnMouseEnter: true,
    hideOnMouseLeave: true,
  }
) => {
  const anchorRef = useRef<AnchorType>(null);
  const contentRef = useRef<ContentType>(null);

  const isTouch = useMatchMedia('(hover: none)');

  const update = useCallback(() => {
    const anchorElement = anchorRef.current;
    const contentElement = contentRef.current;

    if (!anchorElement || !contentElement) {
      return;
    }
    const contentRect = contentElement.getBoundingClientRect();
    const anchorRect = anchorElement.getBoundingClientRect();

    contentElement.style.top = `${
      anchorElement.offsetTop + anchorRect.height + 5
    }px`;

    contentElement.style.left = `${
      anchorElement.offsetLeft + anchorRect.width - contentRect.width
    }px`;
  }, []);

  const handleMouseEnter = useCallback(() => {
    const contentElement = contentRef.current;

    if (!contentElement) {
      return;
    }

    contentElement.style.display = 'block';
    update();
  }, [update]);

  const handleMouseLeave = useCallback(() => {
    const contentElement = contentRef.current;

    if (!contentElement) {
      return;
    }

    contentElement.style.display = 'none';
  }, []);

  const handleAnchorClick = useCallback(
    (event: MouseEvent) => {
      const contentElement = contentRef.current;

      if (!contentElement) {
        return;
      }

      if (contentElement.style.display === 'block') {
        contentElement.style.display = 'none';
      } else {
        contentElement.style.display = 'block';
        update();
      }
    },
    [update]
  );

  useLayoutEffect(() => {
    update();
  }, [update]);

  useEffect(() => {
    if (isTouch) {
      return;
    }

    const anchorElement = anchorRef.current;
    const contentElement = contentRef.current;

    if (!anchorElement || !contentElement) {
      return;
    }

    if (showOnMouseEnter) {
      anchorElement.addEventListener('mouseenter', handleMouseEnter);
    }
    if (hideOnMouseLeave) {
      anchorElement.addEventListener('mouseleave', handleMouseLeave);
    }

    if (toggleOnClick) {
      anchorElement.addEventListener('click', handleAnchorClick);
    }

    return () => {
      anchorElement.removeEventListener('click', handleAnchorClick);
      anchorElement.removeEventListener('mouseenter', handleMouseEnter);
      anchorElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [
    showOnMouseEnter,
    hideOnMouseLeave,
    toggleOnClick,
    handleMouseEnter,
    handleMouseLeave,
    handleAnchorClick,
    isTouch,
  ]);

  return { refs: { anchorRef, contentRef }, update };
};
