import { _MdxTabsControl } from "./_MdxTabsControl";

export type MdxTabsControlPropsType = {
  children: React.ReactNode;
  itemId: string;
};

export const MdxTabsControl = ({
  children,
  itemId,
  ...props
}: MdxTabsControlPropsType) => {
  return (
    <_MdxTabsControl {...{ itemId }} {...props}>
      {children}
    </_MdxTabsControl>
  );
};
