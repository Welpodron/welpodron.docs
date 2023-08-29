import { TabsItem } from "@/components/tabs/TabsItem";

export type MdxTabsControlPropsType = {
  children: React.ReactNode;
  itemId: string;
};

export const MdxTabsItem = ({
  children,
  itemId,
  ...props
}: MdxTabsControlPropsType) => {
  return (
    <TabsItem itemId={itemId} {...props}>
      {children}
    </TabsItem>
  );
};
