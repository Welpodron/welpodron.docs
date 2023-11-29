'use client';

import { LayoutHeader } from './LayoutHeader';
import { LayoutFooter } from './LayoutFooter';
import { LayoutContent } from './LayoutContent';

import { classnamify } from '@/utils/classnamify/classnamify';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { NavTreeBranchType } from '@/utils/utils';

export type LayoutPropsType = {
  navTree: NavTreeBranchType[];
} & ComponentGeneralPropsType;

export const Layout = ({
  navTree,
  style: styleOutside,
  className: classNameOutside,
  ...props
}: LayoutPropsType) => {
  return (
    <div
      {...props}
      style={{
        ...styleOutside,
      }}
      className={classnamify(
        'grid relative grid-rows-[auto_minmax(0,_1fr)_auto]',
        classNameOutside
      )}
    >
      <LayoutHeader />
      <LayoutContent {...{ navTree }} />
      <LayoutFooter />
    </div>
  );
};

Layout.Header = LayoutHeader;
Layout.Content = LayoutContent;
Layout.Footer = LayoutFooter;

Layout.displayName = 'Layout';
