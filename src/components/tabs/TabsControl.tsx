'use client';

import { forwardRef, useCallback, useContext } from 'react';
import { TabsContext } from './TabsContext';
import { classnamify } from '@/utils/classnamify/classnamify';
import { polymorphize } from '@/utils/polymorphize/polymorphize';
import { ComponentGeneralPropsType } from '@/components/component/Component';

export type TabsControlPropsType = {
  itemId: string;
  children: React.ReactNode;
} & ComponentGeneralPropsType;

const _TabsControl = forwardRef<
  HTMLButtonElement,
  TabsControlPropsType & {
    as?: React.ElementType;
  }
>(
  (
    {
      children,
      itemId,
      style: styleOutside,
      className: classNameOutside,
      as,
      ...props
    },
    refForwarded
  ) => {
    const { activeItemId, setActiveItemId, items } = useContext(TabsContext);

    const item = items.find((item) => item.itemId === itemId);

    const Element = as || 'button';

    return (
      <Element
        {...props}
        style={{ ...styleOutside }}
        ref={refForwarded}
        role="tab"
        aria-controls={item?.id}
        aria-selected={activeItemId === itemId}
        className={classnamify(classNameOutside)}
        onClick={() => setActiveItemId(itemId)}
      >
        {children}
      </Element>
    );
  }
);

_TabsControl.displayName = 'Tabs.Control';

export const TabsControl = polymorphize<'button', TabsControlPropsType>(
  _TabsControl
);
