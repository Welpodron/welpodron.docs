export type MdxMethodPropsType = {
  children: React.ReactNode;
  isAsync?: boolean;
  name: string;
  description?: string;
};

export const MdxMethod = ({
  children,
  name,
  isAsync,
  description,
  ...props
}: MdxMethodPropsType) => {
  return (
    <div {...props} className=" not-prose  rounded mb-4">
      <div className="p-4 border rounded-t border-b-0 dark:border-slate-800 dark:bg-slate-900">
        <div className="text-xs font-bold">
          {isAsync && (
            <span className="p-1 mb-2 inline-block rounded bg-yellow-500 text-slate-900">
              async
            </span>
          )}
        </div>
        <p className="font-bold font-mono p-2 rounded bg-slate-100 inline-flex items-center leading-none text-xl dark:bg-slate-800">
          {name}
        </p>
        {description?.length && (
          <p className="mt-2 text-sm leading-[1.2] dark:text-slate-400">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
};

MdxMethod.displayName = 'Mdx.Method';
