import {
  MdxTabsControl as _MdxTabsControl,
  MdxTabsControlPropsType as _MdxTabsControlPropsType,
} from './_MdxTabsControl';

export type MdxTabsControlPropsType = {} & _MdxTabsControlPropsType;

export const MdxTabsControl = ({
  children,
  ...props
}: MdxTabsControlPropsType) => {
  return <_MdxTabsControl {...props}>{children}</_MdxTabsControl>;
};
