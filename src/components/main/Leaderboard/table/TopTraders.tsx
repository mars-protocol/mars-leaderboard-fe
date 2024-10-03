import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
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
  const pageSize = 6

  const { data: topTradersData, isLoading } = useTopTraders(page)
  const maxEntries = topTradersData?.total || 0

  const totalPages = Math.ceil(maxEntries / pageSize)

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  return (
    <div className='flex flex-col h-75'>
      {!topTradersData || isLoading ? (
        <div className='flex flex-wrap justify-center w-full gap-4 mt-4'>
          <CircularProgress size={30} />
          <Text className='w-full text-center' size='sm'>
            Fetching data...
          </Text>
        </div>
      ) : (
        <>
          <Table
            title='Top Traders'
            columns={columns}
            data={topTradersData.data}
            tableBodyClassName='text-xs'
            initialSorting={[]}
            hideCard
          />
          {totalPages > 1 && (
            <div className='mt-auto'>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
