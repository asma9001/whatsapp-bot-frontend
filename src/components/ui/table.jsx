export function Table({ children, className = "", ...props }) {
  return (
    <div className="w-full overflow-auto">
      <table className={`w-full caption-bottom text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children, className = "", ...props }) {
  return (
    <thead className={`[&_tr]:border-b ${className}`} {...props}>
      {children}
    </thead>
  )
}

export function TableBody({ children, className = "", ...props }) {
  return (
    <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props}>
      {children}
    </tbody>
  )
}

export function TableFooter({ children, className = "", ...props }) {
  return (
    <tfoot className={`bg-slate-900 font-medium text-slate-50 ${className}`} {...props}>
      {children}
    </tfoot>
  )
}

export function TableRow({ children, className = "", ...props }) {
  return (
    <tr className={`border-b border-slate-200 transition-colors hover:bg-slate-50 ${className}`} {...props}>
      {children}
    </tr>
  )
}

export function TableHead({ children, className = "", ...props }) {
  return (
    <th
      className={`h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 ${className}`}
      {...props}
    >
      {children}
    </th>
  )
}

export function TableCell({ children, className = "", ...props }) {
  return (
    <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props}>
      {children}
    </td>
  )
}
