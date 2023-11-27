export type MdxTablePropsType = {
  children: React.ReactNode;
};

export const MdxTable = ({ children, ...props }: MdxTablePropsType) => {
  return (
    <table className="content-table border rounded grid border-slate-200 not-prose dark:border-slate-800">
      {children}
    </table>
  );
};

MdxTable.displayName = 'Mdx.Table';
