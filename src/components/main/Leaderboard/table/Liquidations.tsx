import Table from 'components/common/Table'
import { ColumnDef } from '@tanstack/react-table'
import useTradersLiquidations from 'hooks/leaderboard/useTradersLiquidations'
import { CircularProgress } from 'components/common/CircularProgress'
import Text from 'components/common/Text'
import Pagination from './Pagination'
import { useState } from 'react'

interface Props {
  columns: ColumnDef<ProcessedLiquidation>[]
}
export default function Liquidations(props: Props) {
  const { columns } = props

  const [page, setPage] = useState<number>(1)
  const pageSize = 6
  const maxEntries = 24
  const totalPages = Math.ceil(maxEntries / pageSize)

  const { data, isLoading } = useTradersLiquidations()

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const getCurrentPageData = () => {
    if (!data) return []
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    return data.slice(startIndex, endIndex)
  }

  if (isLoading || !data || data.length === 0) {
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
            No liquidations data available.
          </Text>
        )}
      </div>
    )
  }

  return (
    <>
      <Table
        title='Liquidations'
        columns={columns}
        data={getCurrentPageData()}
        tableBodyClassName='text-xs'
        initialSorting={[]}
        hideCard
      />
      <div className='text-right px-4 py-2'>
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </>
  )
}
