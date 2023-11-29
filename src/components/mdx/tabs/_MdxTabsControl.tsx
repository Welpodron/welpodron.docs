'use client';

import {
  TabsControl,
  TabsControlPropsType,
} from '@/components/tabs/TabsControl';
import { TabsContext } from '@/components/tabs/TabsContext';

import { useContext } from 'react';
import {
  IconBrandHtml5,
  IconBrandJavascript,
  IconBrandCss3,
} from '@tabler/icons-react';
import { classnamify } from '@/utils/classnamify/classnamify';

export type MdxTabsControlPropsType = {} & TabsControlPropsType;

export const MdxTabsControl = ({
  children,
  itemId,
  ...props
}: MdxTabsControlPropsType) => {
  const { activeItemId } = useContext(TabsContext);

  return (
    <TabsControl
      className={classnamify(
        `font-medium p-3 inline-flex items-center leading-none`,
        activeItemId === itemId ? 'bg-indigo-500 text-white' : 'bg-transparent'
      )}
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
