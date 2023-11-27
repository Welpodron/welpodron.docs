import { NavTreeBranchType } from '@/utils/utils';
import { NavControlCollapse } from './NavControlCollapse';
import { NavControlLink } from './NavControlLink';

export type NavControlPropsType = {
  branch: NavTreeBranchType;
  depth: number;
  renderTree: (tree: NavTreeBranchType[], depth: number) => JSX.Element;
};

export const NavControl = ({
  branch,
  depth,
  renderTree,
}: NavControlPropsType) => {
  return branch.children.length ? (
    <NavControlCollapse {...{ branch, depth, renderTree }} />
  ) : (
    <NavControlLink {...{ branch, depth, renderTree }} />
  );
};

NavControl.displayName = 'Nav.Control';

NavControl.Collapse = NavControlCollapse;
NavControl.Link = NavControlLink;
