import { useMergedRef } from '@/hooks/useMergedRef/useMergedRef';
import { IconArrowsHorizontal } from '@tabler/icons-react';
import { forwardRef, useState, useRef } from 'react';
import { Toc } from '@/components/toc/Toc';
import { TocTreeBranchType } from '@/utils/utils';
import { ComponentGeneralPropsType } from '@/components/component/Component';
import { classnamify } from '@/utils/classnamify/classnamify';

export type ShellAsidePropsType = {
  tocTree: TocTreeBranchType[];
  tocRef?: React.RefObject<HTMLDivElement>;
  tocParentRef?: React.RefObject<HTMLDivElement>;
} & ComponentGeneralPropsType;

export const ShellAside = forwardRef<HTMLElement, ShellAsidePropsType>(
  (
    {
      tocTree,
      tocRef,
      tocParentRef,
      className: classNameOutside,
      style: styleOutside,
      ...props
    },
    forwardedRef
  ) => {
    const [isActive, setIsActive] = useState(true);

    const ref = useRef(null);

    const mergedRef = useMergedRef(ref, forwardedRef);

    if (!tocTree.length) {
      return <></>;
    }

    return (
      <aside
        {...props}
        style={{
          ...styleOutside,
          width: isActive ? '310px' : '20px',
        }}
        ref={mergedRef}
        className={classnamify(
          'sticky hidden xl:block text-sm self-start h-screen w-[310px] bg-white top-0 z-[100] right-0 border-l border-slate-200 dark:bg-slate-900 dark:border-slate-800',
          classNameOutside
        )}
      >
        <div
          ref={tocParentRef}
          style={{
            display: isActive ? 'block' : 'none',
          }}
          className="overflow-y-auto max-h-full p-4 space-y-8"
        >
          <Toc ref={tocRef} tree={tocTree} />
        </div>
        <button
          type="button"
          onClick={() => setIsActive((currentState) => !currentState)}
          className="bg-slate-200 dark:bg-slate-800 rounded w-8 h-12 inline-flex justify-center items-center absolute -translate-y-1/2 translate-x-[40%] top-1/2 right-full"
        >
          <IconArrowsHorizontal />
          <span className="sr-only">
            {isActive ? 'Свернуть сайдбар' : 'Развернуть сайдбар'}
          </span>
        </button>
      </aside>
    );
  }
);

ShellAside.displayName = 'Shell.Aside';
