import { NavTreeBranchType } from "@/utils/utils";
import { LayoutNav } from "./LayoutNav";

export type LayoutContentPropsType = {
  navTree: NavTreeBranchType[];
};

export const LayoutContent = ({
  navTree,
  ...props
}: LayoutContentPropsType) => {
  return (
    <main
      {...props}
      className="p-4 relative min-h-[100vh] container max-w-7xl mx-auto"
    >
      <div className="space-y-20 py-20">
        <LayoutNav tree={navTree} />
      </div>
    </main>
  );
};

LayoutContent.displayName = "Layout.Content";
