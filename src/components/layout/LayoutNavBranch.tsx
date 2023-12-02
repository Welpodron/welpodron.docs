import { NavTreeBranchType } from '@/utils/utils';
import { LayoutNavLeaf } from './LayoutNavLeaf';

export type LayoutNavBranchPropsType = {
  branch: NavTreeBranchType[];
};

export const LayoutNavBranch = ({ branch }: LayoutNavBranchPropsType) => {
  return (
    <div className="border-t border-slate-200 dark:border-slate-800">
      {branch.map((leaf) => (
        <LayoutNavLeaf
          key={leaf.url}
          title={leaf.title}
          seeds={leaf.children}
        />
      ))}
    </div>
  );
};

LayoutNavBranch.displayName = 'Layout.Nav.Branch';
