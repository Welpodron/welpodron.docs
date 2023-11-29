import { createContext } from 'react';

export type TabsItemType = {
  id: string;
  itemId: string;
  ref: React.RefObject<HTMLDivElement>;
};

export type TabsActionType = {
  type: 'ADD_ITEM' | 'REMOVE_ITEM';
  payload: TabsItemType;
};

export type TabsContextType = {
  items: TabsItemType[];
  dispatchItems: React.Dispatch<TabsActionType>;

  activeItemId: string;
  setActiveItemId: React.Dispatch<React.SetStateAction<string>>;
};

export const TabsContext = createContext<TabsContextType>({
  items: [],
  dispatchItems: () => {},
  activeItemId: '',
  setActiveItemId: () => {},
});

TabsContext.displayName = 'Tabs.Context';
