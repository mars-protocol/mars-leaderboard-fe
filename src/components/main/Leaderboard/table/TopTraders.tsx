import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/common/Table'
import Pagination from 'components/main/Leaderboard/table/Pagination'
import useTopTraders from 'hooks/leaderboard/useTopTraders'

interface Props {
  columns: ColumnDef<TopTradersData>[]
}

export default function TopTraders(props: Props) {
  const { columns } = props
  const [page, setPage] = useState<number>(1)

  const pageSize = 6
  const maxEntries = 50

  const { data: topTradersData, isLoading } = useTopTraders(page)

  const totalPages = Math.ceil(maxEntries / pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  if (!topTradersData || isLoading) return []

  return (
    <div className='flex flex-col h-75'>
      <Table
        title='Top Traders'
        columns={columns}
        data={topTradersData}
        tableBodyClassName='text-xs'
        initialSorting={[]}
        hideCard
      />
      {totalPages > 1 && (
        <div className='mt-auto'>
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      )}
    </div>
  )
}
