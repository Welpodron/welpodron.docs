import { Tabs } from "@/components/tabs/Tabs";

export type MdxTabsPropsType = {
  children: React.ReactNode;
};

export const MdxTabs = ({ children, ...props }: MdxTabsPropsType) => {
  return <Tabs {...props}>{children}</Tabs>;
};
