'use client'

import Card from 'components/common/Card'
import Table from 'components/common/Table'
import TableSkeleton from 'components/common/Table/TableSkeleton'
import useFragmentLeaderboard from 'hooks/leaderboard/useFragmentLeaderboard'
import useFragmentLeaderboardColumns from 'components/leaderboard/table/useFragmentLeaderboardColumns'

export default function LeaderboardTable() {
  const { data: fragmentLeaderboard, isLoading } = useFragmentLeaderboard(50)
  const columns = useFragmentLeaderboardColumns({ isLoading })

  return (
    <div className='flex-1 overflow-y-auto max-h-[calc(100vh-400px)] min-h-96'>
      {isLoading ? (
        <Card
          className='w-full overflow-hidden h-fit'
          contentClassName='max-w-full overflow-x-scroll scrollbar-hide overflow-y-visible px-2'
        >
          <TableSkeleton
            labels={['Rank', 'Wallet', 'Total Fragments']}
            rowCount={10}
            alignments={['right', 'left', 'right']}
          />
        </Card>
      ) : (
        <Table columns={columns} data={fragmentLeaderboard || []} />
      )}
    </div>
  )
}
