import Intro from 'components/intro/Intro'
import FragmentStats from 'components/FragmentStats'
import UserRankingCard from 'components/leaderboard/UserRankingCard'
import LeaderboardTable from 'components/leaderboard/LeaderboardTable'

export default function MainPage() {
  return (
    <div className='w-full flex flex-col'>
      <Intro />
      <FragmentStats />
      <UserRankingCard />
      <LeaderboardTable />
    </div>
  )
}
