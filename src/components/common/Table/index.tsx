import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  RowSelectionState,
  useReactTable,
} from '@tanstack/react-table'
import classNames from 'classnames'

import Card from 'components/common/Card'
import Row from 'components/common/Table/Row'
import Text from 'components/common/Text'
import ConditionalWrapper from 'hocs/ConditionalWrapper'

interface Props<T> {
  columns: ColumnDef<T>[]
  data: T[]
  tableClassName?: string
  type?: TableType
  hideCard?: boolean
  setRowSelection?: OnChangeFn<RowSelectionState>
  selectedRows?: RowSelectionState
}

export default function Table<T>(props: Props<T>) {
  const { columns, data, tableClassName, type, hideCard, selectedRows, setRowSelection } = props

  const table = useReactTable({
    data,
    columns,
    state: {
      ...(selectedRows !== undefined && { rowSelection: selectedRows }),
    },
    enableRowSelection: !!setRowSelection,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <ConditionalWrapper
      condition={!hideCard}
      wrapper={(children) => (
        <Card
          className={classNames('w-full overflow-hidden', type !== 'balances' && 'h-fit')}
          contentClassName='max-w-full overflow-x-scroll scrollbar-hide overflow-y-visible px-2'
        >
          {children}
        </Card>
      )}
    >
      <table className={classNames('w-full', tableClassName)}>
        <thead className='sticky top-0 z-20 bg-body'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='relative h-12 bg-body'>
              <th
                colSpan={headerGroup.headers.length}
                className={classNames('absolute -inset-x-2 top-0 bottom-0 bg-body z-0')}
              />
              <th
                colSpan={headerGroup.headers.length}
                className={classNames(
                  'absolute inset-0 my-2 mx-1 z-1',
                  'bg-linear-to-r from-white/10 to-white/3 -skew-x-25',
                )}
              />
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={classNames(
                    'relative z-10',
                    'px-4 py-3 md:px-16 md:py-4',
                    header.column.columnDef.meta?.className,
                  )}
                >
                  <div
                    className={classNames(
                      'flex items-center',
                      header.column.columnDef.meta?.className?.includes('text-left')
                        ? 'justify-start'
                        : 'justify-end w-full',
                    )}
                  >
                    <Text
                      tag='span'
                      size='xs'
                      className={classNames(
                        'font-normal text-white/40 uppercase tracking-wide text-[10px] md:text-xs',
                        header.column.columnDef.meta?.className || 'text-right',
                      )}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return <Row key={row.id} row={row} />
          })}
        </tbody>
      </table>
    </ConditionalWrapper>
  )
}
