import {
  TabsControls,
  TabsControlsPropsType,
} from '@/components/tabs/TabsControls';

export type MdxTabsControlsPropsType = {} & TabsControlsPropsType;

export const MdxTabsControls = ({
  children,
  ...props
}: MdxTabsControlsPropsType) => {
  return (
    <TabsControls
      className=" bg-slate-50 space-x-0 border overflow-hidden rounded-t border-b-0 inline-flex items-center dark:bg-slate-900 mt-4 mx-4 dark:border-slate-800"
      {...props}
    >
      {children}
    </TabsControls>
  );
};
