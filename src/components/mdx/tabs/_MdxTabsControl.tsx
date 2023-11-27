'use client';

import { TabsControl } from '@/components/tabs/TabsControl';
import { TabsContext } from '@/components/tabs/TabsContext';

import { useContext } from 'react';
import {
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandCss3,
} from '@tabler/icons-react';

export type MdxTabsControlPropsType = {
  children: React.ReactNode;
  itemId: string;
};

export const MdxTabsControl = ({
  children,
  itemId,
  ...props
}: MdxTabsControlPropsType) => {
  const { activeItemId } = useContext(TabsContext);

  return (
    <TabsControl
      className={`font-medium p-3 ${
        activeItemId === itemId ? 'bg-indigo-500 text-white' : 'bg-transparent'
      } inline-flex items-center leading-none`}
      itemId={itemId}
      {...props}
    >
      {itemId === 'HTML' && <IconBrandHtml5 className="shrink-0 mr-2" />}
      {itemId === 'JS' && <IconBrandJavascript className="shrink-0 mr-2" />}
      {itemId === 'CSS' && <IconBrandCss3 className="shrink-0 mr-2" />}
      {children}
    </TabsControl>
  );
};
