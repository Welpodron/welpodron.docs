import { IconHome2, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { BreadcrumbsTreeBranchType } from '@/utils/utils';

export type BreadcrumbsControlPropsType = {
  branch: BreadcrumbsTreeBranchType;
  isFirst: boolean;
  isLast: boolean;
};

export const BreadcrumbsControl = ({
  branch,
  isFirst,
  isLast,
}: BreadcrumbsControlPropsType) => {
  return (
    <li className="inline-flex items-center m-1">
      {isFirst ? (
        <Link
          scroll={false}
          href="/"
          className="p-1 px-2 rounded-full bg-indigo-500 dark:text-slate-300 dark:bg-indigo-700 text-white"
        >
          <IconHome2 strokeWidth={1.5} className="shrink-0 w-4 h-4" />
          <span className="sr-only">Домашняя страница</span>
        </Link>
      ) : (
        <IconChevronRight className="shrink-0 mr-1 w-4 h-4" />
      )}
      {!isFirst &&
        (isLast ? (
          <span className="p-1 px-2 rounded-full bg-slate-50 dark:bg-slate-900">
            {branch.title}
          </span>
        ) : (
          <span>{branch.title}</span>
        ))}
    </li>
  );
};

BreadcrumbsControl.displayName = 'Breadcrumbs.Control';
