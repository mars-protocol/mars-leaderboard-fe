import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import classNames from 'classnames'
import React, { ReactElement, useEffect } from 'react'

import Card from 'components/common/Card'
import { SortAsc, SortDesc, SortNone } from 'components/common/Icons'
import Row from 'components/common/Table/Row'
import Text from 'components/common/Text'
import ConditionalWrapper from 'hocs/ConditionalWrapper'

interface Props<T> {
  title: string | ReactElement
  columns: ColumnDef<T>[]
  data: T[]
  initialSorting: SortingState
  onSortingChange?: OnChangeFn<SortingState>
  disableSortingRow?: boolean
  tableBodyClassName?: string
  type?: TableType
  hideCard?: boolean
  setRowSelection?: OnChangeFn<RowSelectionState>
  selectedRows?: RowSelectionState
}

export default function Table<T>(props: Props<T>) {
  const {
    title,
    columns,
    initialSorting,
    onSortingChange,
    data,
    tableBodyClassName,
    type,
    hideCard,
    selectedRows,
    setRowSelection,
  } = props

  const [internalSorting, setInternalSorting] = React.useState<SortingState>(initialSorting)

  useEffect(() => {
    setInternalSorting(props.initialSorting)
  }, [props.initialSorting])

  const sorting = onSortingChange ? initialSorting : internalSorting
  const sortingChange = onSortingChange ?? setInternalSorting

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      rowSelection: selectedRows,
    },
    manualSorting: true,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: (newSorting) => {
      sortingChange(newSorting)
      if (!onSortingChange) setInternalSorting(newSorting)
    },
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <ConditionalWrapper
      condition={!hideCard}
      wrapper={(children) => (
        <Card
          className={classNames('w-full', type !== 'balances' && 'h-fit')}
          contentClassName='max-w-full overflow-x-scroll scrollbar-hide'
        >
          {children}
        </Card>
      )}
    >
      <table className={classNames('w-full max-w-[90%] mx-auto', tableBodyClassName)}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='relative h-12'>
              <th
                colSpan={headerGroup.headers.length}
                className={classNames(
                  'absolute inset-0 m-1',
                  'bg-linear-to-r from-white/10 to-white/3 -skew-x-25',
                )}
              />
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className={classNames(
                    'relative z-10',
                    'px-16 py-4',
                    header.column.getCanSort() && 'hover:cursor-pointer',
                    header.column.columnDef.meta?.className,
                  )}
                >
                  <div
                    className={classNames(
                      'flex items-center gap-2',
                      header.column.columnDef.meta?.className?.includes('text-left')
                        ? 'justify-start'
                        : 'justify-end w-full',
                    )}
                  >
                    <Text
                      tag='span'
                      size='2xs'
                      className={classNames(
                        'font-normal text-white/60',
                        header.column.columnDef.meta?.className || 'text-right',
                      )}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </Text>
                    {header.column.getCanSort() && (
                      <span className='w-4 h-4 text-white'>
                        {header.column.getCanSort()
                          ? ({
                              asc: <SortAsc size={16} />,
                              desc: <SortDesc />,
                              false: <SortNone />,
                            }[header.column.getIsSorted() as string] ?? null)
                          : null}
                      </span>
                    )}
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
