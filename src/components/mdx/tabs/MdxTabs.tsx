import { Tabs, TabsPropsType } from '@/components/tabs/Tabs';

export type MdxTabsPropsType = {} & TabsPropsType;

export const MdxTabs = ({ children, ...props }: MdxTabsPropsType) => {
  return <Tabs {...props}>{children}</Tabs>;
};
