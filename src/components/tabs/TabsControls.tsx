'use client';

import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';
import { polymorphize } from '@/utils/polymorphize/polymorphize';

import { forwardRef } from 'react';

export type TabsControlsPropsType = {
  children: React.ReactNode;
} & ComponentGeneralPropsType;

const _TabsControls = forwardRef<
  HTMLDivElement,
  TabsControlsPropsType & {
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
    const Element = as || 'div';

    return (
      <Element
        {...props}
        ref={refForwarded}
        style={{
          ...styleOutside,
        }}
        className={classnamify(classNameOutside)}
      >
        {children}
      </Element>
    );
  }
);

_TabsControls.displayName = 'Tabs.Controls';

export const TabsControls = polymorphize<'div', TabsControlsPropsType>(
  _TabsControls
);
