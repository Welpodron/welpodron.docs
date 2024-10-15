import { IconChevronUp } from '@tabler/icons-react';
import { useState, useCallback } from 'react';
import { Collapse } from '@/components/collapse/Collapse';
import { NavTreeBranchType } from '@/utils/utils';

export type NavControlCollapsePropsType = {
  branch: NavTreeBranchType;
  depth: number;
  renderTree: (tree: NavTreeBranchType[], depth: number) => JSX.Element;
};

export const NavControlCollapse = ({
  branch,
  depth,
  renderTree,
}: NavControlCollapsePropsType) => {
  const [isActive, setIsActive] = useState(branch.isActive);

  const iconStyle = {
    transform: `rotate(${isActive ? '0' : '180deg'})`,
  };

  return (
    <Collapse state={[isActive, setIsActive]}>
      <Collapse.Control
        className={`flex items-center font-medium justify-between w-full rounded-r p-3`}
      >
        <span>{branch.title}</span>
        <IconChevronUp data-collapse-control-icon="" style={iconStyle} />
      </Collapse.Control>
      <Collapse.Content>
        {branch.children.length > 0 && renderTree(branch.children, depth + 1)}
      </Collapse.Content>
    </Collapse>
  );
};

NavControlCollapse.displayName = 'Nav.Control.Collapse';
