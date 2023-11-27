import {
  useState,
  Children,
  useRef,
  useCallback,
  useEffect,
  cloneElement,
} from 'react';
import { createPortal } from 'react-dom';
import { TooltipContent } from './TooltipContent';
import { classnamify } from '@/utils/classnamify/classnamify';
import { TooltipContext } from './TooltipContext';

export type TooltipControlPropsType = {
  text: string;
  children: React.ReactNode;
};

export const TooltipControl = ({ children, text }: TooltipControlPropsType) => {
  // const [isActive, setIsActive] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const anchor = Children.only(children) as React.ReactElement;
  const anchorRef = useRef<HTMLElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  // const handleWindowResize = useCallback(() => {
  //   setIsActive(false);
  // }, [setIsActive]);

  useEffect(() => {
    const anchorElement = anchorRef.current;

    if (!anchorElement) {
      return;
    }

    anchorElement.addEventListener('mouseenter', handleMouseEnter);
    anchorElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      anchorElement.removeEventListener('mouseenter', handleMouseEnter);
      anchorElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseEnter, handleMouseLeave]);

  const anchorWithRef = cloneElement(
    anchor,
    {
      ref: anchorRef,
      className: classnamify(anchor.props.className, 'relative'),
    },
    ...anchor.props.children,
    <TooltipContent text={text} controlRef={anchorRef} />
  );

  return (
    <TooltipContext.Provider value={{ isActive }}>
      {anchorWithRef}
      {/* {isActive && <TooltipContent text={text} controlRef={anchorRef} />} */}

      {/* {isActive &&
        createPortal(
          <TooltipContent text={text} controlRef={anchorRef} />,
          document.body
        )} */}
    </TooltipContext.Provider>
  );
};

TooltipControl.displayName = 'Tooltip.Control';
