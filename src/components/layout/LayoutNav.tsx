import { NavTreeBranchType } from '@/utils/utils';
import { LayoutNavBranch } from './LayoutNavBranch';

export type LayoutNavPropsType = {
  tree: NavTreeBranchType[];
};

const renderTree = (tree: NavTreeBranchType[]) => {
  return (
    <>
      {tree.map((branch) => (
        <section key={branch.url}>
          <header className="pb-10">
            <h2 className="text-xl font-bold">{branch.title}</h2>
            {branch.description && (
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">
                {branch.description}
              </p>
            )}
          </header>
          {branch.children.length > 0 && (
            <LayoutNavBranch branch={branch.children} />
          )}
        </section>
      ))}
    </>
  );
};

export const LayoutNav = ({ tree, ...props }: LayoutNavPropsType) => {
  return <>{renderTree(tree)}</>;
};

LayoutNav.displayName = 'Layout.Nav';
