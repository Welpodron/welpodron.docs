import { NavTreeBranchType } from "@/utils/utils";
import { IconChevronUp } from "@tabler/icons-react";
import Link from "next/link";
import { ShowcaseCollapse } from "@/components/showcase/ShowcaseCollapse";
import { Collapse } from "@/components/collapse/Collapse";

export type LayoutNavPropsType = {
  tree: NavTreeBranchType[];
};

const renderLeaf = (leaf: NavTreeBranchType[]) => (
  <ul className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4 xl:gap-x-8">
    {leaf.map((seed) => (
      <li
        key={seed.url}
        className="rounded border border-slate-50 relative dark:border-slate-800 text-sm font-medium"
      >
        <Link
          className="absolute block left-0 rounded top-0 w-full h-full"
          href={seed.url}
        >
          <span className="sr-only">{seed.title}</span>
        </Link>
        <div className="min-h-[200px] flex items-center justify-center bg-slate-50 dark:bg-slate-900 showcase-preview">
          <div className="w-[90%] h-[90%]">
            {!seed.showcaseComponent?.trim() ? (
              <p className="text-sm font-bold text-center">{seed.title}</p>
            ) : (
              seed.showcaseComponent?.trim() === "ShowcaseCollapse" && (
                <ShowcaseCollapse />
              )
            )}
          </div>
        </div>
        <h4 className="p-4">{seed.title}</h4>
      </li>
    ))}
  </ul>
);

const renderBranch = (branch: NavTreeBranchType[]) => {
  return (
    <div className="border-t border-slate-50 dark:border-slate-800">
      {branch.map((leaf) => (
        <div key={leaf.url}>
          <Collapse isActiveDefault={true}>
            <div className="flex py-10 justify-between items-center">
              <h3 className="text-base font-semibold">{leaf.title}</h3>
              <Collapse.Control className="rounded p-2 bg-slate-200 dark:bg-slate-800 justify-self-end">
                <IconChevronUp />
              </Collapse.Control>
            </div>
            <Collapse.Content>
              {leaf.children.length > 0 && renderLeaf(leaf.children)}
            </Collapse.Content>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

const renderTree = (tree: NavTreeBranchType[]) => {
  return (
    <>
      {tree.map((branch) => (
        <section key={branch.url}>
          <header className="pb-10">
            <h2 className="text-xl font-bold">{branch.title}</h2>
            {branch.description && (
              <p className="mt-3 text-sm leading-7 text-slate-500">
                {branch.description}
              </p>
            )}
          </header>
          {branch.children.length > 0 && renderBranch(branch.children)}
        </section>
      ))}
    </>
  );
};

export const LayoutNav = ({ tree, ...props }: LayoutNavPropsType) => {
  return <>{renderTree(tree)}</>;
};

LayoutNav.displayName = "Layout.Nav";
