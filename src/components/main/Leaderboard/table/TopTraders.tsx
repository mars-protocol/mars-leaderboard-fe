import { useEffect, useState } from 'react'
import { ColumnDef, SortingState } from '@tanstack/react-table'
import Table from 'components/common/Table'
import Pagination from 'components/main/Leaderboard/table/Pagination'
import useTopTraders from 'hooks/leaderboard/useTopTraders'
import { CircularProgress } from 'components/common/CircularProgress'
import Text from 'components/common/Text'

interface Props {
  columns: ColumnDef<TopTradersData>[]
}

export default function TopTraders(props: Props) {
  const { columns } = props
  const [page, setPage] = useState<number>(1)
  const [sorting, setSorting] = useState<SortingState>([{ id: 'total_pnl', desc: true }])

  const pageSize = 6

  const sortOrder = sorting[0]?.desc ? 'desc' : 'asc'
  const sortField = sorting[0]?.id || 'total_pnl'

  const { data: topTradersData, isLoading } = useTopTraders(page, sortOrder, sortField)
  const maxEntries = topTradersData?.total || 0

  const totalPages = Math.ceil(maxEntries / pageSize)

  const formattedTime = topTradersData?.last_updated
    ? new Date(topTradersData.last_updated * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      })
    : 'N/A'

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  useEffect(() => {
    setPage(1)
  }, [sorting])

  if (isLoading || !topTradersData || topTradersData.data.length === 0) {
    return (
      <div className='flex flex-wrap justify-center w-full gap-4 mt-4'>
        {isLoading ? (
          <>
            <CircularProgress size={30} />
            <Text className='w-full text-center' size='sm'>
              Fetching data...
            </Text>
          </>
        ) : (
          <Text className='w-full text-center' size='sm'>
            No trading data available.
          </Text>
        )}
      </div>
    )
  }

  return (
    <div className='flex flex-col h-75'>
      <Table
        title='Top Traders'
        columns={columns}
        data={topTradersData.data}
        tableBodyClassName='text-xs'
        initialSorting={sorting}
        onSortingChange={setSorting}
        hideCard
      />
      <div className='mt-auto flex justify-between items-center px-4'>
        <Text size='2xs' className='text-white/40'>
          Last updated: {formattedTime}
        </Text>
        {totalPages > 1 && (
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
        )}
      </div>
    </div>
  )
}
