export type MdxTablePropsType = {
  children: React.ReactNode;
};

export const MdxTable = ({ children, ...props }: MdxTablePropsType) => {
  return (
    <table className="content-table border rounded grid border-slate-200 not-prose dark:border-slate-800">
      {children}
      <tfoot className="grid bottom-0 z-10 sticky font-medium">
        <tr className="grid  p-4 bg-slate-50 items-center dark:bg-slate-900">
          <td colSpan={3}>
            <b className="text-red-500">*</b> - обязательны для заполнения
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

MdxTable.displayName = "Mdx.Table";
