import { useTocLinkHighlighted } from '@/hooks/useTocLinkHighlighted/useTocLinkHighlighted';
import { classnamify } from '@/utils/classnamify/classnamify';
import { TocTreeBranchType } from '@/utils/utils';

export type TocControlPropsType = {
  branch: TocTreeBranchType;
  depth: number;
  renderTree: (tree: TocTreeBranchType[], depth: number) => JSX.Element;
};

export const TocControl = ({
  branch,
  depth,
  renderTree,
}: TocControlPropsType) => {
  const isHighlighted = useTocLinkHighlighted(branch.url.replace('#', ''));

  return (
    <>
      <a
        href={branch.url}
        style={{
          paddingLeft: (depth + 2) * 4 + 'px',
        }}
        className={classnamify(
          `block font-medium rounded p-3`,
          isHighlighted &&
            'bg-slate-50 dark:bg-slate-800 text-indigo-700 dark:text-indigo-300'
        )}
      >
        {branch.title}
      </a>
      {branch.children?.length > 0 && renderTree(branch.children, depth + 1)}
    </>
  );
};

TocControl.displayName = 'Toc.Control';
