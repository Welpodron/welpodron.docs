import { BreadcrumbsControl } from "./BreadcrumbsControl";
import { BreadcrumbsTreeBranchType } from "@/utils/utils";

export type BreadcrumbsPropsType = {
  tree: BreadcrumbsTreeBranchType[];
};

export const Breadcrumbs = ({ tree }: BreadcrumbsPropsType) => {
  return (
    <ol className="flex text-xs flex-wrap">
      {tree.map((branch, index) => (
        <BreadcrumbsControl
          key={branch.url}
          {...{
            branch,
            isFirst: index === 0,
            isLast: index === tree.length - 1,
          }}
        />
      ))}
    </ol>
  );
};

Breadcrumbs.displayName = "Breadcrumbs";
