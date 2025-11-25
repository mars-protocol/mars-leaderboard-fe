import useFragmentLeaderboard from 'hooks/leaderboard/useFragmentLeaderboard'
import useFragmentLeaderboardColumns from 'components/leaderboard/table/column/useFragmentLeaderboardColumns'
import Table from 'components/common/Table'
import Intro from 'components/Intro'
import FragmentStats from 'components/FragmentStats'
import UserRankingCard from 'components/leaderboard/UserRankingCard'
import { MarsFragments } from 'components/common/Icons'

export default function MainPage() {
  const { data: fragmentLeaderboard, isLoading, error } = useFragmentLeaderboard(1)
  const columns = useFragmentLeaderboardColumns({ isLoading })

  return (
    <div className='relative w-full'>
      {/* Large centered with radial fade */}
      <div className='fixed inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden'>
        <div
          className='relative'
          style={{
            maskImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)',
            WebkitMaskImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)',
          }}
        >
          <MarsFragments className='w-[1000px] h-[1000px] md:w-[1400px] md:h-[1400px] opacity-40' />
        </div>
      </div>

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
