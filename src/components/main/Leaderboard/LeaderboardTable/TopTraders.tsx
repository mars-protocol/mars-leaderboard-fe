import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import Table from 'components/common/Table'
import Pagination from 'components/main/Leaderboard/LeaderboardTable/Pagination'
import Text from 'components/common/Text'

interface Props {
  columns: ColumnDef<TopTradersData>[]
  isLoading: boolean
  data: TopTradersData[]
}

export default function TopTraders(props: Props) {
  const { columns, isLoading, data } = props

  const [page, setPage] = useState<number>(1)
  const pageSize = 6
  const maxEntries = 1_000
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
      <div>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  )
}
