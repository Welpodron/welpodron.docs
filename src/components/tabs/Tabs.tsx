'use client';

import { TabsControls } from './TabsControls';
import { TabsControl } from './TabsControl';
import { TabsItem } from './TabsItem';

import { TabsActionType, TabsContext, TabsItemType } from './TabsContext';
import { useEffect, useReducer, useState } from 'react';

export type TabsPropsType = {
  /**
   * Активен ли элемент сейчас (полный контроль над состоянием извне)
   */
  activeItemId?: string;
  /**
   * Опциональный аргумент, влияющий на начальное состояние (контроль над состоянием внутри компонента, а не извне)
   */
  activeItemIdDefault?: string;

  /**
   * Срабатывает при изменении состояния
   */
  onChange?: (activeItemId: string) => void;

  children: React.ReactNode;
};

const tabsReducer = (
  state: TabsItemType[],
  { type, payload }: TabsActionType
) => {
  switch (type) {
    case 'ADD_ITEM': {
      const { id, ref, itemId } = payload;

      if (!state.some((item) => item.id === id)) {
        return [...state, { id, ref, itemId }];
      }
    }
    case 'REMOVE_ITEM': {
      const { id } = payload;

      return state.filter((item) => item.id !== id);
    }
    default: {
      return state;
    }
  }
};

export const Tabs = ({
  children,
  activeItemId: activeItemIdOutside,
  activeItemIdDefault = '',
  onChange,
  ...props
}: TabsPropsType) => {
  const [activeItemIdInside, setActiveItemIdInside] =
    useState(activeItemIdDefault);

  useEffect(() => {
    if (onChange) {
      onChange(activeItemIdInside);
    }
  }, [activeItemIdInside, onChange]);

  const [items, dispatchItems] = useReducer(tabsReducer, []);

  return (
    <div role="tablist" {...props}>
      <TabsContext.Provider
        value={{
          items,
          dispatchItems,
          activeItemId: activeItemIdOutside ?? activeItemIdInside,
          setActiveItemId:
            activeItemIdOutside != null
              ? () => setActiveItemIdInside(activeItemIdOutside)
              : setActiveItemIdInside,
        }}
      >
        {children}
      </TabsContext.Provider>
    </div>
  );
};

Tabs.Controls = TabsControls;
Tabs.Control = TabsControl;
Tabs.Item = TabsItem;

Tabs.displayName = 'Tabs';
