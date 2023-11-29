import { TabsItem, TabsItemPropsType } from '@/components/tabs/TabsItem';

export type MdxTabsControlPropsType = {} & TabsItemPropsType;

export const MdxTabsItem = ({
  children,
  ...props
}: MdxTabsControlPropsType) => {
  return <TabsItem {...props}>{children}</TabsItem>;
};
