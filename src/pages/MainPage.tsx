import useFragmentLeaderboard from 'hooks/leaderboard/useFragmentLeaderboard'
import useFragmentLeaderboardColumns from 'components/leaderboard/table/useFragmentLeaderboardColumns'
import Table from 'components/common/Table'
import Intro from 'components/intro/Intro'
import FragmentStats from 'components/FragmentStats'
import UserRankingCard from 'components/leaderboard/UserRankingCard'

// Force server-side rendering to prevent static generation
export async function getServerSideProps() {
  return {
    props: {},
  }
}

export default function MainPage() {
  const { data: fragmentLeaderboard, isLoading } = useFragmentLeaderboard(1)
  const columns = useFragmentLeaderboardColumns({ isLoading })

  return (
    <div className='w-full'>
      <Intro />
      <FragmentStats />
      <UserRankingCard />
      <Table
        title=''
        columns={columns}
        data={fragmentLeaderboard || []}
        initialSorting={[{ id: 'rank', desc: false }]}
      />
    </div>
  )
}
