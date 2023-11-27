'use client';

import { forwardRef, useContext, useEffect, useId, useRef } from 'react';
import { TabsContext } from './TabsContext';
import { classnamify } from '@/utils/classnamify/classnamify';
import { polymorphize } from '@/utils/polymorphize/polymorphize';
import { useMergedRef } from '@/hooks/useMergedRef/useMergedRef';

export type TabsItemPropsType = {
  itemId: string;
  className?: string;
  children: React.ReactNode;
};

const _TabsItem = forwardRef<
  HTMLDivElement,
  TabsItemPropsType & {
    as?: React.ElementType;
  }
>(
  (
    { children, itemId, as, className: classNameOutside, ...props },
    refForwarded
  ) => {
    const idInside = useId();

    const { activeItemId, dispatchItems } = useContext(TabsContext);

    const Element = as || 'div';

    const refInside = useRef<HTMLDivElement>(null);
    const refMerged = useMergedRef(refInside, refForwarded);

    const classNameMerged = classnamify(classNameOutside);

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
        id={idInside}
        ref={refMerged}
        role="tabpanel"
        className={classNameMerged}
        style={{ display: activeItemId === itemId ? 'block' : 'none' }}
      >
        {children}
      </Element>
    );
  }
);

_TabsItem.displayName = 'Tabs.Item';

export const TabsItem = polymorphize<'div', TabsItemPropsType>(_TabsItem);
