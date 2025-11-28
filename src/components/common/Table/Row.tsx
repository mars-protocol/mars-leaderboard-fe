import { flexRender, Row as TanstackRow, Table as TanstackTable } from '@tanstack/react-table'
import classNames from 'classnames'

interface Props<T> {
  row: TanstackRow<T>
}

export default function StyledRow<T>(props: Props<T>) {
  const { row } = props
  const rank = (row.original as any)?.rank || 0

  return (
    <>
      <tr key={`${row.id}-row`} className='group relative h-10 md:h-14 z-0'>
        <td
          colSpan={row.getVisibleCells().length}
          className={classNames(
            'absolute inset-0 mt-0 mb-1 mx-2 transition-all duration-200 group-hover:bg-white/5',
            'bg-linear-to-r from-white/3 to-white/1',
            'border-solid -skew-x-25',
            'z-0',
            {
              'border-[#FF4D4D69]': rank === 1,
              'border-[#B31F1F69]': rank === 2,
              'border-[#FF8C8C69]': rank === 3,
              'border-white/10': rank > 3 || rank === 0,
              'border-2': rank <= 3,
              border: rank > 3,
            },
          )}
        />
        {row.getVisibleCells().map((cell) => (
          <td
            key={cell.id}
            className={classNames(
              'text-xs md:text-sm text-white/80 text-right px-4 md:px-16 relative z-10',
              cell.column.columnDef.meta?.className,
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        ))}
      </tr>
    </>
  )
}
