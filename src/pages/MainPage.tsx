import Leaderboard from 'components/main/Leaderboard/index'
import LeaderboardIntro from 'components/main/Leaderboard/LeaderboardIntro'

export default function MainPage() {
  return (
    <div className='w-full'>
      <LeaderboardIntro />
      <Leaderboard />
    </div>
  )
}
