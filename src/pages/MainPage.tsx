import useFragmentLeaderboard from 'hooks/leaderboard/useFragmentLeaderboard'
import useFragmentLeaderboardColumns from 'components/leaderboard/table/column/useFragmentLeaderboardColumns'
import Table from 'components/common/Table'

export default function MainPage() {
  const { data: fragmentLeaderboard, isLoading, error } = useFragmentLeaderboard(1)
  const columns = useFragmentLeaderboardColumns({ isLoading })

  return (
    <div className='w-full'>
      <Table
        title='Fragment Leaderboard'
        columns={columns}
        data={fragmentLeaderboard || []}
        initialSorting={[{ id: 'rank', desc: false }]}
      />
    </div>
  )
}
