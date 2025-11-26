import useFragmentLeaderboard from 'hooks/leaderboard/useFragmentLeaderboard'
import useFragmentLeaderboardColumns from 'components/leaderboard/table/column/useFragmentLeaderboardColumns'
import Table from 'components/common/Table'
import Intro from 'components/Intro'
import FragmentStats from 'components/FragmentStats'
import UserRankingCard from 'components/leaderboard/UserRankingCard'

export default function MainPage() {
  const { data: fragmentLeaderboard, isLoading, error } = useFragmentLeaderboard(1)
  const columns = useFragmentLeaderboardColumns({ isLoading })

  return (
    <div className='relative w-full'>
      {/* Content */}
      <div className='relative z-10'>
        <Intro />
        <FragmentStats />
        <div className='container mx-auto max-w-screen-xl px-4'>
          <UserRankingCard />
        </div>
        <Table
          title=''
          columns={columns}
          data={fragmentLeaderboard || []}
          initialSorting={[{ id: 'rank', desc: false }]}
        />
      </div>
    </div>
  )
}
