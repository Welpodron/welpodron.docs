'use client';

import { forwardRef, useContext, useEffect, useId, useRef } from 'react';
import { TabsContext } from './TabsContext';
import { classnamify } from '@/utils/classnamify/classnamify';
import { polymorphize } from '@/utils/polymorphize/polymorphize';
import { useMergedRef } from '@/hooks/useMergedRef/useMergedRef';
import { ComponentGeneralPropsType } from '@/components/component/Component';

export type TabsItemPropsType = {
  itemId: string;
  children: React.ReactNode;
} & ComponentGeneralPropsType;

const _TabsItem = forwardRef<
  HTMLDivElement,
  TabsItemPropsType & {
    as?: React.ElementType;
  }
>(
  (
    {
      children,
      itemId,
      as,
      style: styleOutside,
      className: classNameOutside,
      ...props
    },
    refForwarded
  ) => {
    const idInside = useId();

    const { activeItemId, dispatchItems } = useContext(TabsContext);

    const Element = as || 'div';

    const refInside = useRef<HTMLDivElement>(null);
    const refMerged = useMergedRef(refInside, refForwarded);

    useEffect(() => {
      if (!refInside.current) {
        return;
      }

      dispatchItems({
        type: 'ADD_ITEM',
        payload: { id: idInside, ref: refInside, itemId },
      });

      return () => {
        dispatchItems({
          type: 'REMOVE_ITEM',
          payload: { id: idInside, ref: refInside, itemId },
        });
      };
    }, [dispatchItems, idInside, itemId]);

    return (
      <Element
        {...props}
        style={{
          ...styleOutside,
          display: activeItemId === itemId ? 'block' : 'none',
        }}
        id={idInside}
        ref={refMerged}
        role="tabpanel"
        className={classnamify(classNameOutside)}
      >
        {children}
      </Element>
    );
  }
);

_TabsItem.displayName = 'Tabs.Item';

export const TabsItem = polymorphize<'div', TabsItemPropsType>(_TabsItem);
