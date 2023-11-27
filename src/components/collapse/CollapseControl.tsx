'use client';

import { forwardRef, useContext, useCallback } from 'react';

import { polymorphize } from '@/utils/polymorphize/polymorphize';

import { CollapseContext } from './CollapseContext';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';

type CollapseControlPropsType = {
  /** default children */
  children: React.ReactNode;
} & ComponentGeneralPropsType;

const _CollapseControl = forwardRef<
  HTMLButtonElement,
  CollapseControlPropsType & {
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
    const { isActive, setIsActive, _id } = useContext(CollapseContext);

    const Element = as || 'button';

    const handleElementClick = useCallback(
      (event: React.MouseEvent) => {
        event.preventDefault();

        setIsActive((currentState) => !currentState);
      },
      [setIsActive]
    );

    //! need to merge ref here

    return (
      <Element
        {...props}
        style={{
          ...styleOutside,
        }}
        className={classnamify(classNameOutside)}
        data-w-collapse-control=""
        ref={refForwarded}
        aria-expanded={isActive}
        aria-controls={_id}
        onClick={handleElementClick}
      >
        {children}
      </Element>
    );
  }
);

_CollapseControl.displayName = 'Collapse.Control';

export const CollapseControl = polymorphize<'button', CollapseControlPropsType>(
  _CollapseControl
);
