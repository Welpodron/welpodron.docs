import { NavTreeBranchType } from "@/utils/utils";
import Link from "next/link";

export type NavControlLinkPropsType = {
  branch: NavTreeBranchType;
  depth: number;
  renderTree: (tree: NavTreeBranchType[], depth: number) => JSX.Element;
};

export const NavControlLink = ({
  branch,
  depth,
  renderTree,
}: NavControlLinkPropsType) => {
  return (
    <>
      <Link
        className={`block hover:accent-color font-medium rounded p-3 ${
          branch.isActive
            ? "bg-slate-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300"
            : ""
        }`}
        href={"/" + branch.url}
      >
        {branch.title}
      </Link>
      {branch.children?.length > 0 && renderTree(branch.children, depth + 1)}
    </>
  );
};

NavControlLink.displayName = "Nav.Control.Link";
