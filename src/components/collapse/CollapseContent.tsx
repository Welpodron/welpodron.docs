'use client';

import { forwardRef, useContext, useEffect, useRef, useState } from 'react';

import { polymorphize } from '@/utils/polymorphize/polymorphize';

import { CollapseContext } from './CollapseContext';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';
import { useMergedRef } from '@/hooks/useMergedRef/useMergedRef';

type CollapseContentPropsType = {
  /** default children */
  children: React.ReactNode;
} & ComponentGeneralPropsType;

const _CollapseContent = forwardRef<
  HTMLDivElement,
  CollapseContentPropsType & {
    as?: React.ElementType;
  }
>(
  (
    {
      children,
      as,
      style: styleOutside,
      className: classNameOutside,
      ...props
    },
    refForwarded
  ) => {
    const { isActive, _id } = useContext(CollapseContext);

    const componentAttributes: Record<string, string> = {
      'data-w-collapse': '',
    };

    if (isActive) {
      componentAttributes['data-w-collapse-active'] = '';
    }

    const insideRef = useRef<HTMLDivElement>(null);
    const animationTimerRef = useRef(0);
    const mountedRef = useRef(false);

    const mergedRef = useMergedRef(insideRef, refForwarded);

    const Element = as || 'div';

    useEffect(() => {
      if (!mountedRef.current) {
        return;
      }

      const element = insideRef.current;

      if (!element) {
        return;
      }

      clearTimeout(animationTimerRef.current);

      if (isActive) {
        // show
        element.style.height = '0px';
        element.setAttribute('data-w-collapse-active', '');
        element.scrollHeight;
        element.style.height = element.scrollHeight + 'px';

        animationTimerRef.current = window.setTimeout(() => {
          element.addEventListener(
            'transitionend',
            () => {
              element.style.removeProperty('height');
            },
            { once: true }
          );
          element.dispatchEvent(new TransitionEvent('transitionend'));
        }, parseFloat(getComputedStyle(element).transitionDuration) * 1000);
      } else {
        // hide
        element.style.display = 'block';
        element.style.height = element.scrollHeight + 'px';
        element.removeAttribute('data-w-collapse-active');
        element.scrollHeight;
        element.style.height = `0px`;

        animationTimerRef.current = window.setTimeout(() => {
          element.addEventListener(
            'transitionend',
            () => {
              element.style.removeProperty('height');
              element.style.removeProperty('display');
            },
            { once: true }
          );
          element.dispatchEvent(new TransitionEvent('transitionend'));
        }, parseFloat(getComputedStyle(element).transitionDuration) * 1000);
      }
    }, [isActive]);

    useEffect(() => {
      mountedRef.current = true;

      return () => {
        mountedRef.current = false;
      };
    }, []);

    return (
      <Element
        {...props}
        {...componentAttributes}
        style={{
          ...styleOutside,
        }}
        ref={mergedRef}
        className={classnamify(classNameOutside)}
        id={_id}
      >
        {children}
      </Element>
    );
  }
);

_CollapseContent.displayName = 'Collapse.Content';

export const CollapseContent = polymorphize<'div', CollapseContentPropsType>(
  _CollapseContent
);
