import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/common/Table'
import Pagination from 'components/main/Leaderboard/table/Pagination'

interface Props {
  columns: ColumnDef<TopTradersData>[]
  isLoading: boolean
  data: TopTradersData[]
}

export default function TopTraders(props: Props) {
  const { columns, isLoading, data } = props

  const [page, setPage] = useState<number>(1)
  const pageSize = 6
  const totalEntries = data?.length || 0
  const totalPages = Math.ceil(totalEntries / pageSize)

  const currentData = data ? data.slice((page - 1) * pageSize, page * pageSize) : []

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setPage(newPage)
    console.log('Page changed to:', newPage)
  }

  return (
    <>
      <Table
        title='Top Traders'
        columns={columns}
        data={currentData}
        tableBodyClassName='text-lg '
        initialSorting={[]}
        hideCard
      />
      {totalPages > 1 && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  )
}
