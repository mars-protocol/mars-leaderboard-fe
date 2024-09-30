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
  const pageSize = 15
  const maxEntries = 100
  const totalPages = Math.ceil(maxEntries / pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <>
      <Table
        title='Top Traders'
        columns={columns}
        data={data}
        tableBodyClassName='text-lg '
        initialSorting={[]}
        hideCard
      />
      {data.length > pageSize && (
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  )
}
