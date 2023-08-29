import {
  IconChevronUp,
  IconChevronDown,
  IconBrandJavascript,
} from "@tabler/icons-react";
import { useState, useCallback } from "react";
import { Collapse } from "@/components/collapse/Collapse";
import { NavTreeBranchType } from "@/utils/utils";

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

  const handleActiveChange = useCallback(
    (isActive: boolean) => {
      setIsActive(isActive);
    },
    [setIsActive]
  );

  return (
    <Collapse onChange={handleActiveChange} isActiveDefault={isActive}>
      <Collapse.Control
        className={`flex items-center font-medium justify-between w-full rounded-r p-3`}
      >
        <span className="inline-flex items-center">
          {branch.iconComponent &&
            branch.iconComponent.trim() === "IconBrandJavascript" && (
              <IconBrandJavascript className="shrink-0 mr-2 text-yellow-500" />
            )}
          <span>{branch.title}</span>
        </span>
        {isActive ? <IconChevronUp /> : <IconChevronDown />}
      </Collapse.Control>
      <Collapse.Content>
        {branch.children.length > 0 && renderTree(branch.children, depth + 1)}
      </Collapse.Content>
    </Collapse>
  );
};

NavControlCollapse.displayName = "Nav.Control.Collapse";
